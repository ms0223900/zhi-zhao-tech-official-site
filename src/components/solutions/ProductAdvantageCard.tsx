/* eslint-disable @next/next/no-img-element */

interface ProductAdvantageCardProps {
    title: string;
    subtitle: string;
    detailDescription: string;
    iconSrc: string;
}

function ProductAdvantageCard({ title, subtitle, detailDescription, iconSrc }: ProductAdvantageCardProps) {
    return (
        <div className="py-4 px-7 rounded-md shadow-sm flex items-center text-center gap-4 bg-gradient-to-r from-white to-gray-300 border border-[1px] border-[#282423]">
            <div className="text-orange-500 h-[60px] flex items-center justify-center min-w-[60px]">
                <img className="h-full" src={iconSrc} alt={title} />
            </div>
            <div className="w-[3px] h-[40px] bg-black" />
            <div className="flex flex-col items-center text-center w-full">
                <h3 className="font-bold text-lg tracking-[0.12em]">{title + subtitle}</h3>
                <p className="text-gray-600 text-sm">{detailDescription}</p>
            </div>
        </div>
    );
}

export default ProductAdvantageCard;