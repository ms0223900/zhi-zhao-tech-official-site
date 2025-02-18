/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CarouselBanner } from "../components/home/CarouselBanner";

export const metadata: Metadata = {
  title: "智兆科技 | Zhi Zhao Tech",
  description: "智兆科技官方網站",
};

const asyncGetNews = async () => {
  // const { data } = await client.query({
  //   query: gql`
  //     query GetNews {
  //       news {
  //         id
  //         title
  //       }
  //     }
  //   `,
  // });
  // return data.news;
  return [
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
};

const services = [
  {
    title: "卓越服務",
    description: "領先技術創新",
    detailDescription: "內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容",
    image: "/images/home-service-1.jpg",
    bgColor: "bg-[#E57B42]",
  },
  {
    title: "技術實力",
    description: "完整整合服務",
    detailDescription: "內容內容內容內容內容內容內容內容內容",
    image: "/images/home-service-1.jpg",
    bgColor: "bg-[#E57B42]",
  },
  {
    title: "務實可靠",
    description: "務實可靠執行",
    detailDescription: "內容內容內容內容內",
    image: "/images/home-service-1.jpg",
    bgColor: "bg-[#E57B42]",
  },
];

const serviceCardDataList: ServiceCardItemProps[] = [
  {
    title: "最優質",
    subtitle: "施工管理",
    iconSrc: "/images/icons/construction-icon.svg",
    detailDescription: "以高品質工程和實用性為您服務",
  },
  {
    title: "最優質",
    subtitle: "施工管理",
    iconSrc: "/images/icons/construction-icon.svg",
    detailDescription: "以高品質工程和實用性為您服務",
  },
  {
    title: "最嚴謹",
    subtitle: "工安管理",
    iconSrc: "/images/icons/safety-management-icon.svg",
    detailDescription: "實做工安第一、工地6S環境維護與整潔",
  },
  {
    title: "最快速",
    subtitle: "動員庫存能力",
    iconSrc: "/images/icons/shift-fast-icon.svg",
    detailDescription: "駐廠人員皆有機電系統、空調無塵室系統、製程系統等管理專長服務團隊...",
  },
  {
    title: "最絕對",
    subtitle: "專業能力",
    iconSrc: "/images/icons/professional-ability-icon.svg",
    detailDescription: "最絕對的專業能力,建立在專業、快速、負責、認真、細心、誠信 六大原則上",
  },
  {
    title: "最絕對",
    subtitle: "工程服務管理",
    iconSrc: "/images/icons/engineering-service-management-icon.svg",
    detailDescription: "秉持著高規格的理念來執行每件工程",
  }
];

const linkCardDataList = [
  {
    title: "聯絡我們",
    image: "/images/home-route-direct_contact-us.jpg",
    link: "/contact",
  },
  {
    title: "解決方案",
    image: "/images/home-route-direct_contact-us.jpg",
    link: "/solutions",
  },
  {
    title: "文件下載專區",
    image: "/images/home-route-direct_contact-us.jpg",
    link: "/downloads",
  },
  {
    title: "隱私權政策",
    image: "/images/home-route-direct_contact-us.jpg",
    link: "/privacy",
  },
];


export default async function Home() {
  const news = await asyncGetNews();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <CarouselBanner />
        <div className="absolute left-0 md:left-[92px] right-0 md:right-auto bottom-[65px] mx-auto flex flex-col justify-center text-center md:text-left">
          <h1 className="text-white text-5xl font-bold mb-4">智兆科技</h1>
          <p className="text-white text-xl mb-2">專業 快速 負責</p>
          <p className="text-white text-xl">認真 細心 誠信</p>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-8 max-w-[958px]">
          <h2 className="text-center text-3xl font-bold mb-12">最新消息</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        <div className="container mx-auto px-8 max-w-[958px]">
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-4">業界領航，攜手共創輝煌</h2>
          <div className="grid grid-cols-1 md:grid-cols-[280px,repeat(3,1fr)] gap-4 mt-12">
            <div className="flex flex-col items-center md:items-start justify-center space-y-4 md:space-y-6">
              <h3 className="text-xl font-bold">製造和供應鏈服務</h3>
              <p className="text-center md:text-left text-gray-600 leading-[206%]">我們以創新技術為核心，專注於為客戶創造卓越價值。憑藉領先的技術實力與穩健可靠的運行模式，我們致力成為您值得信賴的合作夥伴，攜手共創雙贏的未來！</p>
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
      <section className="py-16 theme-gradient-blue">
        <div className="container mx-auto px-8">
          <h2 className="text-center text-3xl font-bold mb-12">六大服務宗旨</h2>
          <div className="flex flex-wrap justify-center max-w-[635px] mx-auto md:grid md:grid-cols-3 gap-6 md:gap-8 md:items-center md:justify-items-center">
            {serviceCardDataList.map((item, index) => (
              <React.Fragment key={index}>
                <div className="md:hidden">
                  <ServiceMobileCardItem
                    key={index}
                    {...item}
                  />
                </div>
                <div className="hidden md:block">
                  <ServiceFlipCardItem
                    key={index}
                    {...item}
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
      {/* Route Directing Section */}
      <section>
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 ">
            {linkCardDataList.map((item, index) => (
              <Link key={index} href={item.link}>
                <div className="relative group cursor-pointer rounded-md md:rounded-none overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300"></div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full md:h-auto h-[23vw] object-cover aspect-[38/23]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">{item.title}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

interface ServiceCardItemProps {
  title: string;
  subtitle: string;
  detailDescription: string;
  iconSrc: string;
}

function ServiceFlipCardItem({ title, subtitle, detailDescription, iconSrc }: ServiceCardItemProps) {
  return (
    <div className="flip-card w-[185px] h-[178px]">
      <div className="flip-card-inner">
        <div className="flip-card-front flex flex-col items-center justify-center border border-[#282423] rounded-lg bg-gradient-to-r from-white to-gray-300 p-6">
          <div className="text-orange-500 w-auto h-16 flex items-center justify-center">
            <img className="h-full" src={iconSrc} alt={title} />
          </div>
          <h2 className="font-bold text-xl mt-4">{title}</h2>
          <p className="text-gray-600 mt-2">{subtitle}</p>
        </div>
        <div className="flip-card-back flex flex-col items-center justify-center bg-[#4A515D] rounded-lg py-2.5 px-5">{detailDescription}</div>
      </div>
    </div>
  );
}

// ServiceMobileCardItem
function ServiceMobileCardItem({ title, subtitle, detailDescription, iconSrc }: ServiceCardItemProps) {
  return (
    <div className="py-4 px-7 rounded-md shadow-sm flex items-center text-center gap-4 bg-gradient-to-r from-white to-gray-300 border border-[1px] border-[#282423]">
      <div className="text-orange-500 h-[60px] flex items-center justify-center">
        <img className="h-full" src={iconSrc} alt={title} />
      </div>
      <div className="w-[3px] h-[40px] bg-black" />
      <div className="flex flex-col items-center text-center w-full">
        <h3 className="font-bold text-lg">{title + subtitle}</h3>
        <p className="text-gray-600 text-sm">{detailDescription}</p>
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
        <div className="flex flex-col justify-end items-center gap-2 p-6 bg-gradient-to-t from-black/90 to-transparent">
          <h3 className="text-white text-2xl font-bold">{title}</h3>
          <p className="text-white/80">{description}</p>
        </div>
        <div >
          <div className={`md:group-hover:mb-0 md:-mb-[100%] transition-top duration-300 ease-in-out ${bgColor} h-full p-6`}>
            <p className="text-sm text-white">{detailDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}