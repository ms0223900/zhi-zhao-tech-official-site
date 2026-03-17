"use client";

/* eslint-disable @next/next/no-img-element */
import type { CertificateMediaItem } from "@/types/certificate-media";
import { getClickBehavior } from "@/types/certificate-media";
import { cn } from "@/utils/cn";
import { repeatArrayItems } from "@/utils/repeatArrayItems";
import { useEffect, useRef, useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

/** PC 版 slidesToShow，用於 clone 數量 */
const SLIDES_TO_SHOW = 5;

function CarouselArrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-10 h-10 md:w-[64px] md:h-[64px] absolute top-[40%] -translate-y-1/2 z-10",
        "rounded-full bg-white/80",
        "flex items-center justify-center",
        "hover:bg-gray-50 transition-colors shadow-sm",
        direction === "prev" ? "left-0 md:-left-2" : "right-0 md:-right-2"
      )}
      aria-label={direction === "prev" ? "上一張" : "下一張"}
    >
      {direction === "prev" ? (
        <span className="text-black font-medium text-lg leading-none">&lt;</span>
      ) : (
        <span className="text-black font-medium text-lg leading-none">&gt;</span>
      )}
    </button>
  );
}

export interface CertificateCarouselProps {
  /** 專業證照素材列表 */
  items: CertificateMediaItem[];
  /** 當前活躍索引（預設 0） */
  activeIndex?: number;
  /** 索引變更時回呼 */
  onChangeActive?: (index: number) => void;
}

/** 將 raw slide index 對應回原始 items 的 index (0 ~ items.length-1) */
function getRealIndex(rawIndex: number, cloneCount: number, itemCount: number): number {
  if (itemCount <= 0) return 0;
  return (((rawIndex - cloneCount) % itemCount) + itemCount) % itemCount;
}

/**
 * 專業證照輪播元件
 * PC 版：3 欄，主素材置中、左右露出相鄰預覽
 * Mobile 版：2 欄，主素材置中、左右露出相鄰預覽
 * 預覽圖維持 4:5 比例，底部顯示素材名稱與輪播進度指示器
 * 使用 clone 方式達成順暢無限滑動，dots 只顯示原始數量與正確 index
 */
export function CertificateCarousel({
  items,
  activeIndex = 0,
  onChangeActive,
}: CertificateCarouselProps) {
  const [mounted, setMounted] = useState(false);
  const [realIndex, setRealIndex] = useState(activeIndex);
  // log realIndex
  console.log("realIndex", realIndex);
  const sliderRef = useRef<Slider>(null);

  const cloneCount = items.length > 1 ? SLIDES_TO_SHOW : 0;
  const displayedItems = repeatArrayItems(items, cloneCount);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setRealIndex(Math.min(activeIndex, Math.max(0, items.length - 1)));
  }, [activeIndex, items.length]);

  const handleBeforeChange = (_current: number, next: number) => {
    const nextReal = getRealIndex(next, cloneCount, items.length);
    setRealIndex(nextReal);
    onChangeActive?.(nextReal);
  };

  const handleAppendDots = (dots: React.ReactNode) => {
    console.log("dots", dots);
    return (
      <ul>
        {Array.from({ length: items.length }, (_, index) => {
          return (
            <li key={index} className="mx-[1px] md:mx-0.5">
              <button
                type="button"
                onClick={() => sliderRef.current?.slickGoTo(cloneCount + index)}
                className={cn(
                  "mx-0.5 w-[20px] h-[5px] md:w-[40px] md:h-[10px] rounded-full transition-colors cursor-pointer border-0 p-0 block",
                  index === realIndex ? "bg-[#78C9FA]" : "bg-[#D9D9D9]",
                  "hover:opacity-80"
                )}
                aria-label={`前往第 ${index + 1} 頁`} />
            </li>
          );
        })}
      </ul>
    );
  };

  const settings: Settings = {
    dots: true,
    dotsClass: "!bottom-[-32px] pt-[25px] flex justify-center list-none",
    infinite: items.length > 1,
    speed: 300,
    cssEase: "ease-in-out",
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "16px",
    initialSlide: cloneCount + Math.min(activeIndex, Math.max(0, items.length - 1)),
    nextArrow: <CarouselArrow direction="next" />,
    prevArrow: <CarouselArrow direction="prev" />,
    // customPaging: handleAppendDots,
    appendDots: handleAppendDots,
    beforeChange: handleBeforeChange,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerPadding: "0",
        },
      },
    ],
  };

  if (!mounted) return null;
  if (items.length === 0) return null;

  return (
    <div className="certificate-carousel relative">
      <Slider ref={sliderRef} {...settings}>
        {displayedItems.map((item, index) => {
          const clickBehavior = getClickBehavior(item);
          const cardContent = (
            <div className="flex flex-col items-center px-1">
              <div className="w-full aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 flex items-center justify-center">
                <img
                  src={item.previewImageUrl}
                  alt={item.name}
                  className="w-full h-auto object-cover"
                />
              </div>
              <p className="mt-5 text-center text-h5 md:text-xl text-foreground line-clamp-1 leading-[2]">
                {item.name}
              </p>
            </div>
          );

          return (
            <div key={`${item.id}-${index}`} className="px-1">
              {clickBehavior.type === "openInNewTab" ? (
                <a
                  href={clickBehavior.href}
                  target={clickBehavior.target}
                  rel={clickBehavior.rel}
                  aria-label={`開啟 ${item.name}`}
                >
                  {cardContent}
                </a>
              ) : (
                cardContent
              )}
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
