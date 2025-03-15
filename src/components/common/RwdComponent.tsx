import React from "react"

const RwdComponent = ({
    mobileClassName,
    desktopClassName,
    mobileComponent,
    desktopComponent,
}: {
    mobileComponent: React.ReactNode
    mobileClassName?: string
    desktopComponent: React.ReactNode
    desktopClassName?: string
}) => {
    return <React.Fragment>
        <div className={`md:hidden w-full ${mobileClassName}`}>
            {mobileComponent}
        </div>
        <div className={`hidden md:block ${desktopClassName}`}>
            {desktopComponent}
        </div>
    </React.Fragment>
}

export default RwdComponent
