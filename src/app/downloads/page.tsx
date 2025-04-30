import DownloadListContainer from '@/components/downloads/DownloadListContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "文件下載區 Downloads｜智兆科技",
    description: "立即下載智兆科技提供的無塵室、機電工程等相關型錄與技術文件，掌握最新服務資訊。",
}

export default function App() {
    return (
        <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-300px)]">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">文件下載專區</h1>
                <p className="text-gray-500">File Download Area</p>
                <div className="h-px bg-gray-200 w-full my-6"></div>
            </div>
            <DownloadListContainer />
        </div>
    );
}
