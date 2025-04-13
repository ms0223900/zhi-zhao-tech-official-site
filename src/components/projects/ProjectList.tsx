'use client';
import { Project } from "@/types/Project";
import replaceS3UrlWithCloudFront from "@/utils/replaceS3UrlWithCloudFront";
import { useState } from "react";
import LinkCard from "../common/LinkCard";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ProjectDto, ProjectVoConverter } from "@/app/projects/ProjectDto";
import { csrClient } from "@/gql/client";
import { gql } from "@apollo/client";
import RwdComponent from "../common/RwdComponent";
import Image from 'next/image';
import TitleWithEngSubtitle from "../common/TitleWithEngSubtitle";


async function asyncGetProjects(): Promise<Project[]> {

    // TODO: 實作 API 串接
    try {
        const { data } = await csrClient.query<{
            projects: ProjectDto[];
        }>({
            query: gql`
            query GetProjects {
                projects {
                    documentId
                    title
                    subtitle
                    description
                    image {
                        url
                    }
                    related_project_genre {
                        documentId
                        title
                        }
                        createdAt
                    }
                }
            `,
            fetchPolicy: 'no-cache',
        });

        return data.projects.map(ProjectVoConverter.toVo);
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}


interface ProjectListProps {
    projects: Project[]
}

const ITEMS_PER_PAGE = 4;

const ProjectList = ({ projects }: ProjectListProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState('All');

    const handleGenreChange = (genre: string) => {
        setSelectedGenre(genre);
    };

    const filteredProjects = selectedGenre === 'All' ?
        projects :
        projects.filter(project => project.related_project_genre?.title === selectedGenre);

    // Calculate pagination
    const indexOfLastProject = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstProject = indexOfLastProject - ITEMS_PER_PAGE;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="space-y-8">
            {/* // genre drop down selector */}
            <div className="flex justify-center gap-2">
                <select className="w-full md:w-[500px] py-2 px-4 rounded-md border border-blue-800 text-center text-h5 bg-transparent" onChange={(e) => handleGenreChange(e.target.value)}>
                    <option value="All">
                        依案例類別選擇
                    </option>
                    {projects.map((project) => (
                        <option key={project.id} value={project.related_project_genre?.title || ''}>
                            {project.related_project_genre?.title || ''}
                        </option>
                    ))}
                </select>
            </div>
            <RwdComponent
                desktopComponent={
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* 左側卡片 - 漸層色從 #FFFFFF 到 #F1BA9C */}
                            <div className="flex rounded-lg overflow-hidden shadow-md">
                                <div className="w-1/3 bg-gray-100 flex items-center justify-center p-4">
                                    <div className="relative w-full h-48">
                                        <Image
                                            src="/images/placeholder.jpg"
                                            alt="待請期待"
                                            fill
                                            className="object-contain"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 text-center pb-2 text-gray-500">
                                            敬請期待
                                        </div>
                                    </div>
                                </div>
                                <div className="w-2/3 p-6 relative bg-gradient-to-r from-white to-[#F1BA9C]">
                                    <h3 className="text-xl font-semibold mb-4">公司名稱 - 廠房</h3>
                                    <div className="space-y-2">
                                        <p><span className="font-medium">工程地址：</span></p>
                                        <p><span className="font-medium">工程概述：</span></p>
                                        <p><span className="font-medium">工程期間：</span></p>
                                        <p><span className="font-medium">承攬系統：</span></p>
                                    </div>
                                    <div className="absolute bottom-4 right-4 flex items-center justify-center w-12 h-12 bg-[#E57B42] rounded-full cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* 右側卡片 - 漸層色從 #FFFFFF 到 #FFEE85 */}
                            <div className="flex rounded-lg overflow-hidden shadow-md">
                                <div className="w-1/3 bg-gray-100 flex items-center justify-center p-4">
                                    <div className="relative w-full h-48">
                                        <Image
                                            src="/images/placeholder.jpg"
                                            alt="待請期待"
                                            fill
                                            className="object-contain"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 text-center pb-2 text-gray-500">
                                            敬請期待
                                        </div>
                                    </div>
                                </div>
                                <div className="w-2/3 p-6 relative bg-gradient-to-r from-white to-[#FFEE85]">
                                    <h3 className="text-xl font-semibold mb-4">公司名稱 - 廠房</h3>
                                    <div className="space-y-2">
                                        <p><span className="font-medium">工程地址：</span></p>
                                        <p><span className="font-medium">工程概述：</span></p>
                                        <p><span className="font-medium">工程期間：</span></p>
                                        <p><span className="font-medium">承攬系統：</span></p>
                                    </div>
                                    <div className="absolute bottom-4 right-4 flex items-center justify-center w-12 h-12 bg-[#EACA00] rounded-full cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <TitleWithEngSubtitle title="相關案例" subtitle="Related Cases" />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {currentProjects.slice(2).map((project) => (
                                    <LinkCard
                                        key={project.id}
                                        imageWrapperClassName="aspect-[1.818] h-auto"
                                        link={`/projects/${project.id}`}
                                        title={project.title}
                                        subtitle={project.subtitle}
                                        image={project.image[0]?.url ? replaceS3UrlWithCloudFront(project.image[0].url) : ''} />
                                ))}
                            </div>
                        </div>
                    </div>
                }
                mobileComponent={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentProjects.map((project) => (
                        <LinkCard
                            key={project.id}
                            imageWrapperClassName="aspect-[1.818] h-auto"
                            link={`/projects/${project.id}`}
                            title={project.title}
                            subtitle={project.subtitle}
                            image={project.image[0]?.url ? replaceS3UrlWithCloudFront(project.image[0].url) : ''} />
                    ))}
                </div>}
            />


            {/* Pagination */}
            <div className="flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-4 py-2 rounded ${currentPage === pageNumber
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    );
};

const queryClient = new QueryClient();

const ProjectListContainer = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['projects'],
        queryFn: () => asyncGetProjects(),
    });

    return (
        <>
            {isLoading && (
                <div className="flex justify-center items-center min-h-[200px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                    <span className="ml-4 text-gray-600">載入中...</span>
                </div>
            )}
            {error && <div>Error: {error.message}</div>}
            {data && <ProjectList projects={data} />}
        </>
    )
}

const ProjectListContainerWithQueryClient = () => (
    <QueryClientProvider client={queryClient}>
        <ProjectListContainer />
    </QueryClientProvider>
);

export default ProjectListContainerWithQueryClient;