"use client";

import { useQuery } from "@tanstack/react-query";
import TitleWithEngSubtitle from "../common/TitleWithEngSubtitle";
import { fetchLatestNews } from "@/lib/graphql";
import { NewsCard } from "../news/NewsCard";

export default function LatestNewsSection() {
    const { data, isFetching } = useQuery({
        queryKey: ['latestNews'],
        queryFn: fetchLatestNews,
    });

    return (
        <section className="py-16 theme-gradient-blue">
            <div className="container mx-auto px-8 max-w-[958px]">
                <TitleWithEngSubtitle title="最新消息" subtitle="News" />
                {isFetching && <div>Loading...</div>}
                {data?.map((news) => (
                    <NewsCard key={news.id} item={news} />
                ))}
            </div>
        </section>
    );
}