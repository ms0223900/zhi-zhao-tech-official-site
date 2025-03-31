"use client";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import TitleWithEngSubtitle from "../common/TitleWithEngSubtitle";
import { fetchLatestNews } from "@/lib/graphql";
import { NewsCard } from "../news/NewsCard";

function LatestNewsSection() {
    const { data, isFetching } = useQuery({
        queryKey: ['latestNews'],
        queryFn: fetchLatestNews,
    });

    return (
        <section className="py-16 theme-gradient-blue">
            <div className="container mx-auto px-8 max-w-[958px]">
                <TitleWithEngSubtitle title="最新消息" subtitle="News" />
                {isFetching && <div>Loading...</div>}
                {data && data.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {data.map((news) => (
                            <NewsCard key={news.id} item={news} />
                        ))}
                    </div>
                )}
                {data && data.length === 0 && (
                    <div className="text-center text-gray-500">尚無最新消息</div>
                )}
            </div>
        </section>
    );
}

export default function LatestNewsSectionWithQueryClient() {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <LatestNewsSection />
        </QueryClientProvider>
    );
}