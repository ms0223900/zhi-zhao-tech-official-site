export default function ESGSection() {
    return (
        <section className="container py-16 px-4 md:px-8 flex flex-col gap-9">
            <h1 className="text-center text-h1 text-black font-bold">智兆科技用最堅毅的步伐，持續進步，永不懈怠！</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {/* E - Environment */}
                <div className="flex flex-col items-center">
                    <h2 className="text-[80px] md:text-[100px] font-bold text-[#3EB1F3]">E</h2>
                    <h3 className="text-xl md:text-2xl font-medium mb-2">環境保護</h3>
                    <p className="text-gray-600 tracking-wide">environment</p>
                </div>

                {/* S - Social */}
                <div className="flex flex-col items-center">
                    <h2 className="text-[80px] md:text-[100px] font-bold text-[#F5984E]">S</h2>
                    <h3 className="text-xl md:text-2xl font-medium mb-2">企業社會責任</h3>
                    <p className="text-gray-600 tracking-wide">social</p>
                </div>

                {/* G - Governance */}
                <div className="flex flex-col items-center">
                    <h2 className="text-[80px] md:text-[100px] font-bold text-[#FEDC47]">G</h2>
                    <h3 className="text-xl md:text-2xl font-medium mb-2">公司治理</h3>
                    <p className="text-gray-600 tracking-wide">governance</p>
                </div>
            </div>
        </section>
    )
} 