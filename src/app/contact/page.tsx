'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormInput } from '@/components/FormInput'

const formSchema = z.object({
    company: z.string().min(1, '請輸入公司/單位名稱'),
    location: z.string().min(1, '請選擇所在地區'),
    name: z.string().min(1, '請輸入姓名'),
    phone: z.string().min(1, '請輸入聯絡電話'),
    email: z.string().email('請輸入有效的電子郵件'),
    message: z.string().min(1, '請輸入諮詢內容'),
})

type FormValues = z.infer<typeof formSchema>

const strapiToken = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
const SEND_EMAIL_API_URL = process.env.NEXT_PUBLIC_API_URL + "/api/email/send";


// 台灣地區選項
const locationOptions = [
    '基隆市', '台北市', '新北市', '桃園市', '新竹市', '新竹縣',
    '苗栗縣', '台中市', '彰化縣', '南投縣', '雲林縣', '嘉義市',
    '嘉義縣', '台南市', '高雄市', '屏東縣', '宜蘭縣', '花蓮縣',
    '台東縣', '澎湖縣', '金門縣', '連江縣'
]

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            company: '',
            location: '',
            name: '',
            phone: '',
            email: '',
            message: '',
        },
        // defaultValues: {
        //     company: 'testCompany',
        //     location: '台中市',
        //     name: 'testName',
        //     phone: 'testPhone',
        //     email: 'testEmail@gmail.com',
        //     message: 'testMessage',
        // },
    })

    const onSubmit = async (data: FormValues) => {
        try {
            setIsSubmitting(true)
            setSubmitStatus('idle')

            const response = await fetch(SEND_EMAIL_API_URL!, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${strapiToken}`,
                },
                body: JSON.stringify({
                    to: 'taiwan53588280@gmail.com', // 可以換成動態設定的收件人
                    subject: `來自 ${data.company} 的諮詢`,
                    html: `
            <h2>聯絡表單提交</h2>
            <p><strong>公司/單位名稱:</strong> ${data.company}</p>
            <p><strong>所在地區:</strong> ${data.location}</p>
            <p><strong>姓名:</strong> ${data.name}</p>
            <p><strong>聯絡電話:</strong> ${data.phone}</p>
            <p><strong>電子郵件:</strong> ${data.email}</p>
            <p><strong>諮詢內容:</strong></p>
            <p>${data.message.replace(/\n/g, '<br>')}</p>
          `,
                    // 也可以加入其他附加資訊
                    data: data,
                }),
            })

            if (!response.ok) {
                throw new Error('郵件發送失敗')
            }

            setSubmitStatus('success')
            reset() // 重置表單
        } catch (error) {
            console.error('提交表單時發生錯誤:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">聯絡我們</h1>

            <div>
                <div>
                    {submitStatus === 'success' && (
                        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
                            感謝您的來信！我們已收到您的訊息，將盡快回覆您。
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
                            抱歉，訊息發送失敗。請稍後再試或直接聯繫我們。
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/2 w-full flex flex-col gap-4">
                            <FormInput
                                id="company"
                                label="公司/單位名稱"
                                register={register}
                                error={errors.company}
                            />

                            <div>
                                <div className="flex flex-row items-center gap-1 pb-1">
                                    <label htmlFor="location" className="block">所在地區</label>
                                    {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                                </div>
                                <select
                                    id="location"
                                    className={`w-full p-2 border rounded-md ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                                    {...register('location')}
                                >
                                    <option value="">請選擇</option>
                                    {locationOptions.map((location) => (
                                        <option key={location} value={location}>{location}</option>
                                    ))}
                                </select>
                            </div>

                            <FormInput
                                id="name"
                                label="姓名"
                                register={register}
                                error={errors.name}
                            />

                            <FormInput
                                id="phone"
                                label="聯絡電話"
                                type="tel"
                                register={register}
                                error={errors.phone}
                            />

                            <FormInput
                                id="email"
                                label="E-mail"
                                type="email"
                                register={register}
                                error={errors.email}
                            />

                        </div>
                        <div className="md:w-1/2 w-full">
                            <label htmlFor="message" className="block mb-1">諮詢內容</label>
                            <textarea
                                id="message"
                                rows={5}
                                className={`w-full p-2 border rounded-md ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                                {...register('message')}
                            ></textarea>
                            {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message.message}</p>}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
                                >
                                    {isSubmitting ? '提交中...' : '送出表單'}
                                </button>
                                <div className="space-y-3 text-center">
                                    <p className="flex items-center justify-center">
                                        <span className="font-medium">營業時間：</span>
                                        <span>8:00 - 17:00</span>
                                    </p>
                                    <p className="flex items-center justify-center">
                                        <span className="font-medium">電話號碼：</span>
                                        <span>07-3642101</span>
                                    </p>
                                    <p className="flex items-center justify-center">
                                        <span className="font-medium">FAX：</span>
                                        <span>07-3649490</span>
                                    </p>
                                    <p className="flex items-center justify-center">
                                        <span className="font-medium">E-mail：</span>
                                        <span>taiwan53588280@gmail.com</span>
                                    </p>
                                </div>       </div>
                        </div>


                    </form>
                </div>


            </div>
        </main>
    )
} 