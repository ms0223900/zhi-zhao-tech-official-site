'use client'

export default function ContactPage() {
    // react useForm

    // const [formData, setFormData] = useState({
    //     name: '',
    //     email: '',
    //     message: '',
    // })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: 實作表單提交邏輯
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">聯絡我們</h1>
            <form onSubmit={handleSubmit} className="max-w-lg">
                {/* 表單欄位 */}
            </form>
        </main>
    )
} 