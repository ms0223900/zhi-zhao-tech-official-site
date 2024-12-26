import { Metadata } from "next";

export const metadata: Metadata = {
  title: "智兆科技 | Zhi Zhao Tech",
  description: "智兆科技官方網站",
};

export default function Home() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex flex-col w-full">
        {/* Left Section - Welcome */}
        <div className="flex items-center w-full p-8">
          <div>
            <h1 className="text-gray-500 text-lg mb-4">Welcome to</h1>
            <h2 className="text-2xl font-bold mb-6">歡迎來到智兆科技</h2>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            智兆科技是業有限公司成立於2012年，專注於機器工程、空調工程、規劃管理給各類工程的整體解決方案。專門從事各類中小型、大型工程化學的全方面服務技術支援與供應整合工程服務，以達成客戶對高品質、高效率、高安全性的需求。
          </p>
        </div>

        {/* Right Section - Gray Box */}
        <div className="w-full bg-gray-200 p-8">
          <p className="text-gray-700 leading-relaxed">
            智兆科技以「熱誠、專業、服務、誠信」為核心價值，結合卓越的技術力和豐富的產業經驗，成功打造了多項完整項目，包括機電工程、機器維護、同一化工程、自動科技、清淨系統、廢水科技及多項重內科技企業的工程建案。
          </p>

          {/* Services Section */}
          <div className="mt-8">
            <h3 className="font-bold mb-4">智兆科技優勢</h3>
            <ul className="list-decimal pl-5 space-y-2">
              <li>專業服務經驗：深度設計、施工、維護的全方位服務</li>
              <li>機器施工管理：ISO-45001認證，確保施工過程的品質與安全</li>
              <li>外部溝通能力：與多家客戶維持有順合作，實現即時維修與及時反饋</li>
              <li>跨領域整合能力：具備研發與技術能力，對工法及施工品質的高度要求，具有EGS整合能力</li>
            </ul>
          </div>

          {/* Four Icons Section */}
          <div className="flex justify-between mt-8">
            <div className="text-center">
              <div className="text-lg font-bold">熱</div>
              <div className="text-sm">誠</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">專</div>
              <div className="text-sm">業</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">團</div>
              <div className="text-sm">隊</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">誠</div>
              <div className="text-sm">信</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2>智兆科技</h2>
        {/* Service Cards Section */}
        <div className="w-full py-12">
          <h3 className="text-xl font-bold text-center mb-8">六大服務宗旨</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-4">
            <FlipCard
              title="最實在"
              subtitle="專業品質服務"
              icon={<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V12M12 12V18M12 12H18M12 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>}
              backContent="提供專業的品質服務，確保每個項目都能達到最高標準"
            />

            <FlipCard
              title="最優質"
              subtitle="施工管理"
              icon={<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V12M12 12V18M12 12H18M12 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>}
              backContent="嚴格的施工管理制度，確保工程品質與安全"
            />

            <FlipCard
              title="最熱誠"
              subtitle="工程管理"
              icon={<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V12M12 12V18M12 12H18M12 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>}
              backContent="以熱誠的態度提供最優質的工程管理服務"
            />

            <FlipCard
              title="最快速"
              subtitle="整合專業能力"
              icon={<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V12M12 12V18M12 12H18M12 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>}
              backContent="快速整合各項專業能力，提供完整解決方案"
            />

            <FlipCard
              title="最細到"
              subtitle="專業能力"
              icon={<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V12M12 12V18M12 12H18M12 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>}
              backContent="注重細節，展現專業實力"
            />

            <FlipCard
              title="最貼心"
              subtitle="工程服務管理"
              icon={<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V12M12 12V18M12 12H18M12 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>}
              backContent="提供最貼心的工程服務管理，確保每個項目都能達到最高標準"
            />
          </div>
        </div>
      </div>


    </div>
  );
}

function FlipCard({ title, subtitle, icon, backContent }: { title: string, subtitle: string, icon: React.ReactNode, backContent: string }) {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front flex flex-col items-center justify-center">
          {icon}
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className="flip-card-back py-2.5 px-5">{backContent}</div>
      </div>
    </div>
  );
}