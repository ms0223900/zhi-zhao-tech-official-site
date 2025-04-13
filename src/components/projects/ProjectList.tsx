'use client';
import { Project, ProjectImpl } from "@/types/Project";
import replaceS3UrlWithCloudFront from "@/utils/replaceS3UrlWithCloudFront";
import { useState } from "react";
import LinkCard from "../common/LinkCard";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ProjectDto, ProjectVoConverter } from "@/app/projects/ProjectDto";
import { csrClient } from "@/gql/client";
import { gql } from "@apollo/client";
import RwdComponent from "../common/RwdComponent";
import TitleWithEngSubtitle from "../common/TitleWithEngSubtitle";
import FeaturedProjectCard from './FeaturedProjectCard';

async function asyncGetProjects(): Promise<Project[]> {
    try {
        const { data } = await csrClient.query<{
            projects: ProjectDto[];
        }>({
            query: gql`
            query GetProjects {
                projects(
                    sort: ["updatedAt:desc"]
                ) {
                    documentId
                    title
                    subtitle
                    description
                    address
                    image {
                        url
                    }
                    related_project_genre {
                        documentId
                        title
                    }
                    createdAt
                    from
                    until
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

export class PaginatedList<T> {
    constructor(
        private readonly items: T[],
        private readonly currentPage: number,
        private readonly itemsPerPage: number,
    ) { }

    get paginatedItems(): T[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return this.items.slice(startIndex, startIndex + this.itemsPerPage);
    }

    get totalPages(): number {
        return Math.ceil(this.items.length / this.itemsPerPage);
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

    const paginatedProjects = new PaginatedList(
        filteredProjects,
        currentPage,
        ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-[100px]">
                            {/* 左側卡片 */}
                            <FeaturedProjectCard
                                project={paginatedProjects.paginatedItems[0] || ProjectImpl.empty()}
                                gradientFrom="from-transparent"
                                gradientTo="to-[#F1BA9C]"
                                buttonColor="bg-[#E57B42]"
                            />

                            {/* 右側卡片 */}
                            <FeaturedProjectCard
                                project={paginatedProjects.paginatedItems[1] || ProjectImpl.empty()}
                                gradientFrom="from-transparent"
                                gradientTo="to-[#FFEE85]"
                                buttonColor="bg-[#EACA00]"
                            />
                        </div>
                        <div>
                            <TitleWithEngSubtitle title="相關案例" subtitle="Related Cases" />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {paginatedProjects.paginatedItems.slice(2).map((project) => (
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
                    {paginatedProjects.paginatedItems.map((project) => (
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
                {Array.from({ length: paginatedProjects.totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200'
                            }`}
                    >
                        {page}
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