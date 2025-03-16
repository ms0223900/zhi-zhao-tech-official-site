import Link from "next/link";
import Image from "next/image";
import ArrowRight from "/public/images/icons/icon-long-arrow-right.svg";

function LinkCard({
    arrowColor = "#1E88E5",
    link,
    image,
    title,
    subtitle,
}: {
    arrowColor?: string,
    link: string,
    image: string,
    title: string,
    subtitle: string,
}) {
    return (
        <Link
            href={link}
            className="w-full group block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
            <div className="aspect-w-16 aspect-h-14 bg-gray-100 h-[230px] overflow-hidden">
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
                <div>
                    <ArrowRight width={22} fill={arrowColor} />
                </div>
            </div>
        </Link>
    )
}

export default LinkCard;