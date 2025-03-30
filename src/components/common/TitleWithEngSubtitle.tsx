import { cn } from "@/utils/cn";

function TitleWithEngSubtitle({ title, subtitle, className }: { title: string, subtitle: string, className?: string }) {
    return (
        <div className={cn(`flex flex-col items-center justify-center gap-1 mb-12`, className)}>
            <h2 className="text-center text-h2 font-bold ">{title}</h2>
            <span className="text-h6 text-[#A6A4A4]">{subtitle}</span>
        </div>
    )
}

export default TitleWithEngSubtitle;