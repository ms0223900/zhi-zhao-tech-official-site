/* eslint-disable @next/next/no-img-element */
import routerConfig from "../routerConfig";
import Link from "next/link";

const ZHI_ZHAO_EMAIL = "info@zhi-zhao.com";


const Footer = () => {
    return (
        <>
            <div className="hidden md:block">
                <FooterPC />
            </div>
            <div className="block md:hidden">
                <FooterMobile />
            </div>
        </>
    )
}

const navLinks = [
    routerConfig.about,
    routerConfig.services,
    routerConfig.solutions,
    routerConfig.projects,
    routerConfig.news,
    routerConfig.esg,
    routerConfig.careers,
]
const section2NavLinks = [
    routerConfig.contact,
    routerConfig.downloads,
    routerConfig.privacyPolicy,
]

const iconConfigs: {
    key: string;
    link: string;
    iconSrc: string;
    alt: string;
}[] = [
        {
            key: "fb",
            link: "https://www.facebook.com/zhi-zhao.com",
            iconSrc: "/images/icons/fb-icon.svg",
            alt: "Facebook",
        },
        {
            key: "email",
            link: `mailto:${ZHI_ZHAO_EMAIL}`,
            iconSrc: "/images/icons/email-icon.svg",
            alt: "Email",
        },
        {
            key: "line",
            link: "https://line.me/R/ti/p/%40zhi-zhao",
            iconSrc: "/images/icons/line-icon.svg",
            alt: "Line",
        },
    ]

const pcIconConfigs = iconConfigs.filter((icon) => icon.key !== "email");

function FooterPC() {
    return (
        <footer className="bg-gradient-to-r from-[#55BBF9] to-[#FFFFFF] py-4">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full flex items-center space-x-8 px-12 py-10 border-b-[1px] border-[#373C3F]">
                        {navLinks.map((link) => (
                            <Link href={link.href} className="text-h6 hover:underline" key={link.href}>{link.label}</Link>
                        ))}
                        <div className="flex items-center space-x-2">
                            {pcIconConfigs.map((icon) => (
                                <a href={icon.link} aria-label={icon.alt} className="w-6 h-6 flex items-center justify-center rounded-full" key={icon.link}>
                                    <img src={icon.iconSrc} alt={icon.alt} className="w-6 h-6" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex items-center py-4 pt-8">
                    <div className="flex items-center">
                        <div>
                            <img src="/images/zhi-zhao-logo-black-with-text.svg" alt="智兆科技" className="w-[200px]" />
                        </div>
                        <div className="flex items-center gap-6 pl-8">
                            {section2NavLinks.map((link) => (
                                <Link href={link.href} className="text-h6 hover:underline" key={link.href}>{link.label}</Link>
                            ))}
                            <p className="text-sm">Copyright 2025 © 智兆科技企業有限公司 All rights reserved</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterMobile() {
    return (
        <footer className="bg-gradient-to-r from-[#55BBF9] to-[#FFFFFF] py-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center">


                    <div className="flex justify-center space-x-4 mb-4">
                        {section2NavLinks.map((link, index) => (
                            <div key={link.href} className="flex items-center">
                                {index > 0 && <div className="w-px h-4 bg-gray-400 mr-4" />}
                                <Link href={link.href} className="text-sm hover:underline">
                                    {link.label}
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center items-center space-x-4 mb-4">
                        <div>
                            <img src="/images/zhi-zhao-logo-black-with-text.svg" alt="智兆科技" className="w-[150px]" />
                        </div>
                        <div className="flex items-center gap-3">
                            {iconConfigs.map((icon) => (
                                <a
                                    href={icon.link}
                                    aria-label={icon.alt}
                                    className="w-[30px] flex items-center justify-center"
                                    key={icon.link}
                                >
                                    <img src={icon.iconSrc} alt={icon.alt} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <p className="text-xs text-center mt-2">
                        Copyright 2025 © 智兆科技企業有限公司 All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;