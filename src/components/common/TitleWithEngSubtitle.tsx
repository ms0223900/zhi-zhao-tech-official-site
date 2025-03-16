
function TitleWithEngSubtitle({ title, subtitle }: { title: string, subtitle: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-1 mb-12">
            <h2 className="text-center text-h2 font-bold ">{title}</h2>
            <span className="text-h6 text-[#A6A4A4]">{subtitle}</span>
        </div>
    )
}

export default TitleWithEngSubtitle;