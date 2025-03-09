/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";
import routerConfig from "@/components/routerConfig";
import Link from "next/link";

const ZHI_ZHAO_EMAIL = "info@zhi-zhao.com";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
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

const mailTo = `mailto:${ZHI_ZHAO_EMAIL}`;

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#55BBF9] to-[#FFFFFF] py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full flex items-center space-x-8 px-12 py-10 border-b-[1px] border-[#373C3F]">
            {navLinks.map((link) => (
              <Link href={link.href} className="text-h6 hover:underline" key={link.href}>{link.label}</Link>
            ))}
            <div className="flex items-center space-x-2">
              <a href="#" aria-label="Facebook" className="w-6 h-6 flex items-center justify-center rounded-full">
                <img src="/images/icons/fb-icon.svg" alt="Facebook" className="w-6 h-6" />
              </a>
              <a href={mailTo} aria-label="Email" className="w-6 h-6 flex items-center justify-center bg-gray-500 rounded-full">
                <img src="/images/icons/email-icon.svg" alt="Email" className="w-6 h-6" />
              </a>
              <a href="#" aria-label="YouTube" className="w-6 h-6 flex items-center justify-center bg-gray-500 rounded-full">
                <img src="/images/icons/line-icon.svg" alt="Line" className="w-6 h-6" />
              </a>
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
