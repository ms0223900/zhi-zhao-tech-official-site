import { cn } from "../../../utils/cn";

const MainContentContainer = ({ className, children }: { className?: string, children: React.ReactNode }) => {
    return (
        <div className={cn(`border-2 border-[#C5ECFF] rounded-lg p-8 min-h-[170px] bg-gradient-to-br from-[#FFFFFF] to-[#F8FDFF] shadow-[3.12px_9.37px_21.85px_rgba(0,0,0,0.06)]`, className)}>
            {children}
        </div>
    )
}

export default MainContentContainer;