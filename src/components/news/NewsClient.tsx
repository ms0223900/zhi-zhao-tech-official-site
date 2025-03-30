'use client';

import { useState, useEffect } from 'react';
import { NewsItem } from '@/lib/graphql';
import { NewsCard } from './NewsCard';
import TitleWithEngSubtitle from '../common/TitleWithEngSubtitle';

interface NewsClientProps {
    news: NewsItem[];
}

export function NewsClient({ news }: NewsClientProps) {
    const [selectedGenre, setSelectedGenre] = useState<string>('全部');
    const [filteredNews, setFilteredNews] = useState<NewsItem[]>(news);

    const uniqueGenres = Array.from(
        new Set(
            news
                .filter(item => item.newsGenre?.name)
                .map(item => item.newsGenre!.name)
        )
    );

    // 當 selectedGenre 或 news 改變時過濾新聞
    useEffect(() => {
        if (selectedGenre === '全部') {
            setFilteredNews(news);
        } else {
            setFilteredNews(
                news.filter(item =>
                    item.newsGenre?.name === selectedGenre
                )
            );
        }
    }, [selectedGenre, news]);

    // 處理分類選擇改變
    const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGenre(e.target.value);
    };

    return (
        <div>
            {/* 分類選擇器 */}
            <div className='flex justify-center items-center'>
                <TitleWithEngSubtitle
                    title="最新消息"
                    subtitle="News"
                    className="mb-0"
                />
            </div>
            <div className="flex w-full justify-end translate-y-[-60px]">
                <div className="relative inline-block">
                    <select
                        className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedGenre}
                        onChange={handleGenreChange}
                    >
                        <option value="全部">全部</option>
                        {uniqueGenres.map(genre => (
                            <option key={genre} value={genre}>
                                {genre.toUpperCase()}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* 新聞卡片網格 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredNews.map((item) => (
                    <NewsCard key={item.id} item={item} />
                ))}
            </div>

            {/* 沒有新聞時顯示 */}
            {filteredNews.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-500">目前沒有新聞</p>
                </div>
            )}
        </div>
    );
} 