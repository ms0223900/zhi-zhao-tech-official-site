import { NewsClient } from '@/components/news/NewsClient';

export default async function NewsPage() {
    return (
        <main className="container mx-auto px-4 py-12 min-h-screen">
            <NewsClient />
        </main>
    );
} 