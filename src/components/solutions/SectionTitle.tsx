import { cn } from "@/utils/cn";

function SectionTitle({ title, className }: { title: string, className?: string }) {
    return (
        <h2 className={cn("text-center text-h1 pt-[30px] pb-6 font-bold mb-4 border-b border-[#044E7B] max-w-[732px] mx-auto", className)}>{title}</h2>
    )
}

export default SectionTitle;