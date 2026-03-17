"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { CertificateMediaItem } from "@/types/certificate-media";
import { getClickBehavior } from "@/types/certificate-media";
import { cn } from "@/utils/cn";

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
        "w-10 h-10 absolute top-1/2 -translate-y-1/2 z-10",
        "rounded-full bg-white border border-gray-200",
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

/**
 * 專業證照輪播元件
 * PC 版：3 欄，主素材置中、左右露出相鄰預覽
 * Mobile 版：2 欄，主素材置中、左右露出相鄰預覽
 * 預覽圖維持 4:5 比例，底部顯示素材名稱與輪播進度指示器
 */
export function CertificateCarousel({
  items,
  activeIndex = 0,
  onChangeActive,
}: CertificateCarouselProps) {
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(activeIndex);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setCurrentSlide(activeIndex);
  }, [activeIndex]);

  const handleBeforeChange = (_current: number, next: number) => {
    setCurrentSlide(next);
    onChangeActive?.(next);
  };

  const settings: Settings = {
    dots: true,
    infinite: items.length > 1,
    speed: 300,
    cssEase: "ease-in-out",
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "16px",
    initialSlide: Math.min(activeIndex, Math.max(0, items.length - 1)),
    nextArrow: <CarouselArrow direction="next" />,
    prevArrow: <CarouselArrow direction="prev" />,
    dotsClass: "slick-dots !bottom-[-32px]",
    customPaging: (index: number) => (
      <div
        className={cn(
          "mx-0.5 w-2 h-2 rounded-full transition-colors cursor-pointer",
          index === currentSlide ? "bg-[#55BBF9]" : "bg-[#D9D9D9]",
          "hover:opacity-80"
        )}
      />
    ),
    beforeChange: handleBeforeChange,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerPadding: "12px",
        },
      },
    ],
  };

  if (!mounted) return null;
  if (items.length === 0) return null;

  return (
    <div className="certificate-carousel relative px-4 md:px-14">
      <Slider {...settings}>
        {items.map((item) => {
          const clickBehavior = getClickBehavior(item);
          const cardContent = (
            <div className="flex flex-col items-center">
              <div className="w-full aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src={item.previewImageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-3 text-center text-h5 text-foreground line-clamp-2">
                {item.name}
              </p>
            </div>
          );

          return (
            <div key={item.id} className="px-1 md:px-2">
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
