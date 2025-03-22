export default function EnvironmentSection() {
    return (
        <section className="max-w-[1440px] mx-auto py-8 px-4 md:px-8 mb-16">
            <div className="border border-blue-500 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 左側文字區塊 */}
                    <div className="p-8 flex flex-col justify-center">
                        <div className="flex flex-col mb-8">
                            <h2 className="text-[80px] font-bold text-[#3EB1F3]">E</h2>
                            <h3 className="text-xl md:text-2xl font-medium mb-2">環境保護</h3>
                            <p className="text-gray-600 tracking-wide">environment</p>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xl font-medium">太陽能發電綠能</h4>
                            <h4 className="text-xl font-medium">能源管理 節能減碳</h4>
                        </div>
                    </div>

                    {/* 右側圖片區塊 */}
                    <div className="p-4 flex items-center justify-center">
                        <img
                            src="/images/esg/esg-e/esg-e-cover.jpg"
                            alt="太陽能發電"
                            className="rounded-lg w-full h-auto max-h-[400px] object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
} 