import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">找不到服務項目</h2>
                <p className="text-gray-600 mb-8">
                    抱歉，您所查詢的服務項目不存在。請返回服務項目列表查看所有可用的服務。
                </p>
                <Link
                    href="/services"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    返回服務項目列表
                </Link>
            </div>
        </div>
    )
} 