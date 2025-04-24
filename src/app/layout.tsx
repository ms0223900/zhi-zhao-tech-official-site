/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/layout/Footer";
import { SITE_TITLE, DEFAULT_DESCRIPTION } from "@/constants/metadata";
import Script from 'next/script';

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
  title: SITE_TITLE,
  description: DEFAULT_DESCRIPTION,
  verification: {
    google: '1ymhaGTeTMgJovlOAY0FNv4Uwkko_xvHqTOukHqYpPU'
  },
  icons: {
    icon: '/taiwanz2-favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-R1F9GQ2J8V" strategy="beforeInteractive" />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-R1F9GQ2J8V');
        `}
        </Script>

        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),
            dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-P5C6XVGH');
        `}
        </Script>
      </head>
      {/* Google Analytics */}

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