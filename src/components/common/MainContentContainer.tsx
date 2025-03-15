const MainContentContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="border-2 border-[#C5ECFF] rounded-lg p-8 min-h-[170px] bg-gradient-to-br from-[#FFFFFF] to-[#F8FDFF] shadow-[3.12px_9.37px_21.85px_rgba(0,0,0,0.06)]">
            {children}
        </div>
    )
}

export default MainContentContainer;