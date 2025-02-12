import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "智兆科技 | Zhi Zhao Tech",
  description: "智兆科技官方網站",
};

export default function Home() {
  const news = [
    {
      category: "EVENT",
      content: "內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容",
      date: "2025-01-05",
      bgColor: "bg-yellow-400",
      textColor: "text-white",
    },
    {
      category: "NEWS",
      content: "內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容",
      date: "2025-01-06",
      bgColor: "bg-orange-500",
      textColor: "text-white",
    },
    {
      category: "OTHER",
      content: "內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容",
      date: "2025-01-07",
      bgColor: "bg-sky-400",
      textColor: "text-white",
    },
  ];

  const services = [
    {
      title: "卓越服務",
      description: "領先技術創新",
      detailDescription: "內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容",
      image: "/images/home-service-1.jpg",
      bgColor: "bg-orange-100",
    },
    {
      title: "技術實力",
      description: "完整整合服務",
      detailDescription: "內容內容內容內容內容內容內容內容內容",
      image: "/images/home-service-2.jpg",
      bgColor: "bg-orange-100",
    },
    {
      title: "務實可靠",
      description: "務實可靠執行",
      detailDescription: "內容內容內容內容內",
      image: "/images/home-service-3.jpg",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <Image
          src="/images/home-banner.jpg"
          alt="Modern building facade"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent">
          <div className="container mx-auto px-8 h-full flex flex-col justify-center">
            <h1 className="text-white text-5xl font-bold mb-4">智兆科技</h1>
            <p className="text-white text-xl mb-2">專業 快速 負責</p>
            <p className="text-white text-xl">認真 細心 誠信</p>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-8">
          <h2 className="text-center text-3xl font-bold mb-12">最新消息</h2>
          <div className="grid grid-cols-3 gap-8">
            {news.map((item, index) => (
              <NewsCard
                key={index}
                category={item.category}
                content={item.content}
                date={item.date}
                bgColor={item.bgColor}
                textColor={item.textColor}
              />
            ))}
          </div>
          <div className="text-right mt-4">
            <button className="text-gray-600 hover:text-gray-800">閱讀更多</button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-8">
          <h2 className="text-center text-3xl font-bold mb-4">業界領航，攜手共創輝煌</h2>
          <div className="grid grid-cols-4 gap-8 mt-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">製造和供應鏈服務</h3>
              <p className="text-gray-600">內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容</p>
              <button className="flex items-center space-x-2 text-black hover:text-orange-700 rounded-full bg-[#E57B42]/50 px-6 py-1.5 border border-2 border-orange-500">
                <span>了解更多</span>
              </button>
            </div>
            {services.map((item, index) => (
              <ServiceCard
                key={index}
                title={item.title}
                description={item.description}
                detailDescription={item.detailDescription}
                image={item.image}
                bgColor={item.bgColor}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Service Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-8">
          <h2 className="text-center text-3xl font-bold mb-12">六大服務範圍</h2>
          <div className="grid grid-cols-3 gap-8">
            <ServiceFlipCardItem
              title="駭客防禦工程"
              subtitle="資安服務為先"
              icon={
                <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              }
              backContent="提供全方位的資安防護解決方案，保護您的系統免受威脅"
            />
            <ServiceFlipCardItem
              title="營運管理工程師"
              subtitle="系統維運"
              icon={
                <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
              }
              backContent="專業的系統維運服務，確保您的系統穩定運行"
            />
            <ServiceFlipCardItem
              title="服務建置工程師"
              subtitle="系統建置"
              icon={
                <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              }
              backContent="專業的系統建置服務，打造符合您需求的解決方案"
            />
            <ServiceFlipCardItem
              title="服務速通數據應用能力"
              subtitle="數據分析"
              icon={
                <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 flex items-center justify-center"></div>
              }
              backContent="專業的數據分析服務，提供精確的數據分析報告"
            />
          </div>
        </div>
      </section>

    </main>
  );
}

function ServiceFlipCardItem({ title, subtitle, icon, backContent }: { title: string, subtitle: string, icon: React.ReactNode, backContent: string }) {
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

interface NewsCardProps {
  category: string;
  content: string;
  date: string;
  bgColor: string;
  textColor: string;
}

function NewsCard({ category, content, date, bgColor, textColor }: NewsCardProps) {
  return (
    <div className="bg-white p-6 rounded-md shadow-sm">
      <span className={`${bgColor} ${textColor} text-sm font-medium px-3 py-1 rounded-md`}>
        {category}
      </span>
      <p className="mt-4 text-gray-600 line-clamp-3">{content}</p>
      <p className="mt-4 text-gray-400">{date}</p>
    </div>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
  detailDescription: string;
  image: string;
  bgColor: string;
}

function ServiceCard({ title, description, detailDescription, image, bgColor }: ServiceCardProps) {
  return (
    <div className="relative group overflow-hidden rounded-lg h-[300px]">
      <Image
        src={image}
        alt={title}
        width={300}
        height={400}
        className="w-full h-[300px] object-cover absolute inset-0"
      />
      <div className="relative h-full flex flex-col justify-end">
        <div className=" flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="text-white text-xl font-bold">{title}</h3>
          <p className="text-white/80">{description}</p>
        </div>
        <div >
          <div className={`group-hover:mb-0 -mb-[100%] transition-top duration-300 ease-in-out ${bgColor} h-full p-6`}>
            <p className="text-sm">{detailDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}