'use client';
import { Project, ProjectVo } from "@/types/Project";
import { useMemo, useState } from "react";
import LinkCard from "../common/LinkCard";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ProjectDto, ProjectVoConverter } from "@/app/projects/ProjectDto";
import { csrClient } from "@/gql/client";
import { gql } from "@apollo/client";
import RwdComponent from "../common/RwdComponent";
import TitleWithEngSubtitle from "../common/TitleWithEngSubtitle";
import FeaturedProjectCard from './FeaturedProjectCard';
import { ChevronDown } from "lucide-react";

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
                    related_project_genres {
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
        projects.filter(project => project.related_project_genres.some(genre => genre.title === selectedGenre));

    const paginatedProjects = useMemo(() => new PaginatedList(
        filteredProjects,
        currentPage,
        ITEMS_PER_PAGE
    ), [filteredProjects, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const projectGenres = useMemo(() => {
        const allProjectGenres = projects.map(project => project.related_project_genres.map(genre => genre.title));
        return Array.from(new Set(allProjectGenres.flat()));
    }, [projects]);

    const relatedProjects = useMemo(() => {
        return paginatedProjects.paginatedItems.slice(2);
    }, [paginatedProjects]);

    return (
        <div className="space-y-8">
            {/* // genre drop down selector */}
            <div className="flex justify-center gap-2">
                <div className="relative w-full md:w-[500px]">
                    <select
                        className="w-full py-2 px-4 pr-10 rounded-md border border-blue-800 text-center text-h5 bg-transparent appearance-none"
                        onChange={(e) => handleGenreChange(e.target.value)}
                    >
                        <option value="All">依案例類別選擇</option>
                        {projectGenres.map((genre) => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-800" />
                </div>
            </div>
            <RwdComponent
                desktopComponent={
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-[100px]">
                            {/* 左側卡片 */}
                            <FeaturedProjectCard
                                project={paginatedProjects.paginatedItems[0] || ProjectVo.empty()}
                                gradientFrom="from-transparent"
                                gradientTo="to-[#F1BA9C]"
                                buttonColor="bg-[#E57B42]"
                            />

                            {/* 右側卡片 */}
                            <FeaturedProjectCard
                                project={paginatedProjects.paginatedItems[1] || ProjectVo.empty()}
                                gradientFrom="from-transparent"
                                gradientTo="to-[#FFEE85]"
                                buttonColor="bg-[#EACA00]"
                            />
                        </div>
                        {relatedProjects.length > 0 && (
                            <div>
                                <TitleWithEngSubtitle title="相關案例" subtitle="Related Cases" />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {relatedProjects.map((project) => (
                                        <LinkCard
                                            key={project.id}
                                            imageWrapperClassName="aspect-[1.818] h-auto"
                                            link={project.projectLink}
                                            title={project.title}
                                            subtitle={project.subtitle}
                                            image={project.coverImageUrl} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                }
                mobileComponent={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedProjects.paginatedItems.map((project) => (
                        <LinkCard
                            key={project.id}
                            imageWrapperClassName="aspect-[1.818] h-auto"
                            link={project.projectLink}
                            title={project.title}
                            subtitle={project.subtitle}
                            image={project.coverImageUrl} />
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