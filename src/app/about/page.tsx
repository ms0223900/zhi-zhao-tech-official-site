/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    description: "About page",
};

export default function About() {
    return (
        <div className="min-h-screen">
            <section className="relative h-[400px]">
                <div className="absolute inset-0">
                    <img
                        src="/images/about-banner.jpg"
                        alt="關於智兆"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="relative h-full flex flex-col items-center justify-center text-center">
                    <h1 className="text-white text-5xl font-bold mb-4">關於智兆</h1>
                    <p className="text-white text-xl">About Us</p>
                </div>
            </section>
        </div>
    );
} 