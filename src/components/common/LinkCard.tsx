import Link from "next/link";
import Image from "next/image";
import ArrowRight from "/public/images/icons/icon-long-arrow-right.svg";
import { cn } from "@/utils/cn";

interface LinkCardProps {
    arrowColor?: string,
    imageWrapperClassName?: string,
    link: string,
    image: string,
    title: string,
    subtitle: string,
    showArrow?: boolean,
}

function LinkCard({
    arrowColor = "#1E88E5",
    imageWrapperClassName,
    link,
    image,
    title,
    subtitle,
    showArrow = true,
}: LinkCardProps) {
    const LinkWrapperComponent = link ? Link : "div"
    return (
        <LinkWrapperComponent
            href={link}
            className={
                cn(
                    "w-full group block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300",
                    !link && "cursor-default"
                )
            }
        >
            <div className={cn("aspect-w-16 aspect-h-14 bg-gray-100 h-[230px] overflow-hidden", imageWrapperClassName)}>
                <Image
                    src={image}
                    alt={title}
                    width={268}
                    height={230}
                    className="w-full h-full min-h-[230px] object-cover rounded-md"
                />
            </div>
            <div className="p-4 py-3 flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                        {title}
                    </h3>
                    <p className="text-[#9D9D9D] pb-2">{subtitle}</p>
                </div>
                {showArrow && (
                    <div>
                        <ArrowRight width={22} fill={arrowColor} />
                    </div>
                )}
            </div>
        </LinkWrapperComponent>
    )
}

export default LinkCard;