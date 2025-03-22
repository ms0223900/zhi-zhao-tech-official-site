export default function ESGSection() {
    return (
        <section className="container py-16 px-10 md:px-8 flex flex-col gap-9">
            <h1 className="text-center md:text-h1 text-h3 text-black font-bold">智兆科技用最堅毅的步伐，持續進步，永不懈怠！</h1>
            <div className="grid grid-cols-3 gap-8 text-center">
                {/* E - Environment */}
                <div className="flex flex-col items-center">
                    <h2 className="text-[60px] leading-none font-black text-[#3EB1F3] mb-2">E</h2>
                    <h3 className="md:text-h2 text-h6 text-primary-blue-dark font-medium">環境保護</h3>
                    <p className="md:text-h2 text-h6 text-primary-blue-dark">Environment</p>
                </div>

                {/* S - Social */}
                <div className="flex flex-col items-center text-[#E57B42]">
                    <h2 className="text-[60px] font-black leading-none mb-2">S</h2>
                    <h3 className="md:text-h2 text-h6 whitespace-nowrap font-medium">企業社會責任</h3>
                    <p className="md:text-h2 text-h6">Social</p>
                </div>

                {/* G - Governance */}
                <div className="flex flex-col items-center text-[#eaca00]">
                    <h2 className="text-[60px] font-black leading-none mb-2">G</h2>
                    <h3 className="md:text-h2 text-h6 nowrap font-medium">公司治理</h3>
                    <p className="md:text-h2 text-h6">Governance</p>
                </div>
            </div>
        </section>
    )
} 