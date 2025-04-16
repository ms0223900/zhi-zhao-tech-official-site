'use client'
import { useState, useMemo } from 'react';
import { csrClient } from '@/gql/client';
import { gql, useQuery } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

const ITEMS_PER_PAGE = 12;

const S3_BUCKET_URL = process.env.NEXT_PUBLIC_S3_BUCKET_URL || '';
const S3_CLOUDFRONT_URL = process.env.NEXT_PUBLIC_S3_CLOUDFRONT_URL || '';

const GET_DOWNLOAD_FILES = gql`
  query GetDownloadFiles {
    downloadFiles(pagination:  {
       limit: -1
    }) {
      documentId
      file {
        mime
        provider
        name
        url
      }
    }
  }
`;

interface UploadedFile {
    mime: string;
    provider: string;
    name: string;
    url: string;
}
interface DownloadFileDto {
    documentId: string;
    file: UploadedFile[];
}

const convertDownloadFileDtoToVo = (downloadFileDto: DownloadFileDto): DownloadFileVo => {
    return DownloadFileVo.create(downloadFileDto.documentId, downloadFileDto.file[0]);
}

class DownloadFileVo {
    private constructor(
        private _id: string,
        private file: UploadedFile
    ) { }

    static create(id: string, file: UploadedFile): DownloadFileVo {
        return new DownloadFileVo(id, file);
    }

    get id(): string {
        return this._id;
    }

    get fileName(): string {
        return this.file.name;
    }

    get fileType(): string {
        return getFileType(this.file);
    }

    get downloadUrl(): string {
        return `${S3_CLOUDFRONT_URL}/${this.file.url.replace(new RegExp(S3_BUCKET_URL + '/?'), '')}`;
    }
}

const getFileType = (fileData: UploadedFile): string => {
    if (fileData.mime.includes('pdf')) return 'PDF';
    if (fileData.mime.includes('word') || fileData.mime.includes('doc')) return 'DOC';
    if (fileData.mime.includes('excel') || fileData.mime.includes('sheet') || fileData.mime.includes('xls')) return 'XLS';
    if (fileData.mime.includes('powerpoint') || fileData.mime.includes('presentation') || fileData.mime.includes('ppt')) return 'PPT';
    if (fileData.mime.includes('image')) return 'IMG';
    if (fileData.mime.includes('zip') || fileData.mime.includes('compressed')) return 'ZIP';
    if (fileData.mime.includes('text')) return 'TXT';

    // If mime type doesn't work, try the file extension from name or url
    const extension = fileData.name.split('.').pop()?.toUpperCase();
    if (extension && ['PDF', 'DOC', 'DOCX', 'XLS', 'XLSX', 'PPT', 'PPTX', 'JPG', 'PNG', 'ZIP', 'TXT'].includes(extension)) {
        return extension;
    }

    return 'FILE';
};


const Select = ({ value, onValueChange, children }: {
    value: string;
    onValueChange: (value: string) => void;
    children: React.ReactNode
}) => {
    return (
        <div className="relative inline-block w-full">
            <select
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {children}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
            </div>
        </div>
    );
};

const SelectItem = ({ value, children }: { value: string; children: React.ReactNode }) => (
    <option className="px-4 py-2 hover:bg-gray-100 cursor-pointer" data-value={value}>{children}</option>
);

// 簡單的分頁組件
const Pagination = ({ className, children }: { className?: string; children: React.ReactNode }) => (
    <div className={`flex justify-center ${className}`}>{children}</div>
);

const PaginationContent = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center space-x-2">{children}</div>
);

const PaginationItem = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
);

const PaginationPrevious = ({
    onClick,
    className
}: {
    onClick: () => void;
    className?: string
}) => (
    <button
        onClick={onClick}
        className={`px-3 py-1 rounded flex items-center ${className}`}
    >
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="ml-1">上一頁</span>
    </button>
);

const PaginationNext = ({
    onClick,
    className
}: {
    onClick: () => void;
    className?: string
}) => (
    <button
        onClick={onClick}
        className={`px-3 py-1 rounded flex items-center ${className}`}
    >
        <span className="mr-1">下一頁</span>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    </button>
);

const FileCard = ({ downloadFile }: { downloadFile: DownloadFileVo }) => {
    const { fileType, downloadUrl } = downloadFile;

    return (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4 hover:bg-gray-100 transition-colors">
            <div className="flex items-center">
                <div className="relative flex-shrink-0">
                    <div className="w-16 h-20 border border-gray-300 rounded flex items-center justify-center bg-white">
                        <span className="text-lg font-bold">{fileType}</span>
                    </div>
                </div>
                <div className="ml-4">
                    <h3 className="text-lg font-medium break-words">{downloadFile.fileName}</h3>
                </div>
            </div>
            <a
                href={downloadUrl}
                target="_blank"
                download={downloadFile.fileName}
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                aria-label="下載檔案"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16L12 8M12 16L9 13M12 16L15 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 15V16C3 18.2091 4.79086 20 7 20H17C19.2091 20 21 18.2091 21 16V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </a>
        </div>
    );
};

const DownloadFileList: React.FC = () => {
    const { loading, error, data } = useQuery<{ downloadFiles: DownloadFileDto[] }>(GET_DOWNLOAD_FILES);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string>('全部');

    const downloadFiles = useMemo(() => {
        if (!data?.downloadFiles) return [];
        return data.downloadFiles.map(convertDownloadFileDtoToVo);
    }, [data]);

    const filteredFiles = useMemo(() => {
        if (downloadFiles.length === 0) return [];

        if (selectedCategory === '全部') {
            return downloadFiles;
        }

        return downloadFiles.filter(downloadFile =>
            downloadFile.fileType === selectedCategory
        );
    }, [downloadFiles, selectedCategory]);

    const totalPages = Math.ceil(filteredFiles.length / ITEMS_PER_PAGE);
    const currentFiles = filteredFiles.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const categories = useMemo(() => {
        if (downloadFiles.length === 0) return ['全部'];

        const fileTypes = downloadFiles
            .map(downloadFile => downloadFile.fileType);
        return ['全部', ...Array.from(new Set(fileTypes))];
    }, [downloadFiles]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return <p className="text-center py-8">Loading...</p>;
    if (error) return <p className="text-center py-8 text-red-500">Error: {error.message}</p>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                    {selectedCategory}
                </h2>
                <div className="relative">
                    <div className="flex flex-col items-center">
                        <span className="mr-2 text-gray-600">依類別搜尋</span>
                        <Select
                            value={selectedCategory}
                            onValueChange={(value: string) => {
                                setSelectedCategory(value);
                                setCurrentPage(1);
                            }}
                        >
                            {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentFiles.map((downloadFile) => (
                    <FileCard key={downloadFile.id} downloadFile={downloadFile} />
                ))}
            </div>

            {totalPages > 1 && (
                <Pagination className="mt-8">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }).map((_, index) => (
                            <PaginationItem key={index}>
                                <button
                                    className={`px-3 py-1 rounded ${currentPage === index + 1
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 hover:bg-gray-200"
                                        }`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};

function Downloads() {
    return (
        <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-300px)]">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">文件下載專區</h1>
                <p className="text-gray-500">File Download Area</p>
                <div className="h-px bg-gray-200 w-full my-6"></div>
            </div>
            <DownloadFileList />
        </div>
    );
}

export default function App() {
    return (
        <ApolloProvider client={csrClient}>
            <Downloads />
        </ApolloProvider>
    );
}
