import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "智兆科技 | Zhi Zhao Tech",
  description: "智兆科技官方網站",
};

export default function Home() {
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
            <NewsCard
              category="EVENT"
              content="內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容"
              date="2025-01-05"
              bgColor="bg-yellow-100"
              textColor="text-yellow-600"
            />
            <NewsCard
              category="NEWS"
              content="內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容"
              date="2025-01-06"
              bgColor="bg-orange-100"
              textColor="text-orange-600"
            />
            <NewsCard
              category="OTHER"
              content="內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容"
              date="2025-01-07"
              bgColor="bg-blue-100"
              textColor="text-blue-600"
            />
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
              <button className="flex items-center space-x-2 text-orange-600 hover:text-orange-700">
                <span>了解更多</span>
                <span>→</span>
              </button>
            </div>
            <ServiceCard
              title="卓越服務"
              description="領先技術創新"
              detailDescription="內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容"
              image="/images/service1.jpg"
              bgColor="bg-orange-100"
            />
            <ServiceCard
              title="技術實力"
              description="完整整合服務"
              detailDescription="內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容"
              image="/images/service2.jpg"
              bgColor="bg-blue-100"
            />
            <ServiceCard
              title="務實可靠"
              description="務實可靠執行"
              detailDescription="內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容"
              image="/images/service3.jpg"
              bgColor="bg-gray-100"
            />
          </div>
        </div>
      </section>
    </main>
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
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <span className={`${bgColor} ${textColor} text-sm font-medium px-3 py-1 rounded-full`}>
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
    <div className="relative group overflow-hidden rounded-lg">
      <Image
        src={image}
        alt={title}
        width={300}
        height={400}
        className="w-full h-[300px] object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 to-transparent">
        <h3 className="text-white text-xl font-bold">{title}</h3>
        <p className="text-white/80">{description}</p>
      </div>
      {/* hovered and move from bottom to top */}
      <div className={`absolute inset-0 bg-black/50 group-hover:opacity-100 transition-opacity duration-300 ${bgColor}`} >
        <p>
          {detailDescription}
        </p>

      </div>
    </div>
  );
}