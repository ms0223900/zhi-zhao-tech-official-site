import { NewsClient } from '@/components/news/NewsClient';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "最新消息 News｜智兆科技",
    description: "最新消息提供公司最新動態、技術分享與業界新聞，讓您隨時了解智兆科技的最新發展與工程趨勢。",
};

export default async function NewsPage() {
    return (
        <main className="container mx-auto px-4 py-12 min-h-screen">
            <NewsClient />
        </main>
    );
} 