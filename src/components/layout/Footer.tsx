/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import routerConfig from "../routerConfig";
import Link from "next/link";

const ZHI_ZHAO_EMAIL = "taiwanz2@taiwanz2.com.tw";

const Footer = () => {
    return (
        <>
            <div className="hidden md:block">
                <FooterPC />
            </div>
            <div className="block md:hidden">
                <FooterMobile />
            </div>
            <PinnedButtons />
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
    routerConfig.contact,
]
const section2NavLinks = [
    routerConfig.downloads,
    routerConfig.privacyPolicy,
]

const mobileNavLinks = [
    routerConfig.contact,
    routerConfig.downloads,
    routerConfig.privacyPolicy,
]

interface IconConfig {
    key: string;
    link: string;
    iconSrc: string;
    alt: string;
}

const FB_ICON = {
    key: "fb",
    link: "https://www.facebook.com/zhi-zhao.com",
    iconSrc: "/images/icons/fb-icon.svg",
    alt: "Facebook",
}

const EMAIL_ICON = {
    key: "email",
    link: `mailto:${ZHI_ZHAO_EMAIL}`,
    iconSrc: "/images/icons/email-icon.svg",
    alt: "Email",
}

const iconConfigs: IconConfig[] = [
    // FB_ICON,
    // EMAIL_ICON,
]

const pcIconConfigs = iconConfigs;
const mobileIconConfigs = iconConfigs;

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
                    <div className="flex items-center pl-6">
                        <div className="w-[200px] overflow-hidden">
                            <img src="/images/zhi-zhao-logo-black-with-white-border-with-text.png" alt="智兆科技" className="w-[200px]" />
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
                        {mobileNavLinks.map((link, index) => (
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
                            <img src="/images/zhi-zhao-logo-black-with-white-border-with-text.png" alt="智兆科技" className="w-[150px]" />
                        </div>
                        <div className="flex items-center gap-3">
                            {mobileIconConfigs.map((icon) => (
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

function PinnedButtons() {
    return (
        <div className="fixed z-10 bottom-[140px] md:bottom-8 right-5 md:right-8 flex flex-col gap-4">
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="md:w-12 md:h-12 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Scroll to top"
            >
                <img src="/images/icons/arrow-up.svg" alt="Scroll to top" className="w-full h-full" />
            </button>

            <a
                href={`mailto:${ZHI_ZHAO_EMAIL}`}
                className="md:flex md:w-12 md:h-12 w-8 h-8 bg-white rounded-full shadow-lg items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Send email"
            >
                <img src={EMAIL_ICON.iconSrc} alt={EMAIL_ICON.alt} className="w-full h-full" />
            </a>
        </div>
    );
}

export default Footer;