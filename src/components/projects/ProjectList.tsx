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
                    projectGenre
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
                <select onChange={(e) => handleGenreChange(e.target.value)}>
                    <option>
                        All
                    </option>
                    {projects.map((project) => (
                        <option key={project.id} value={project.related_project_genre?.title || ''}>
                            {project.related_project_genre?.title || ''}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProjects.map((project) => (
                    <LinkCard
                        key={project.id}
                        imageWrapperClassName="aspect-[1.818] h-auto"
                        link={`/projects/${project.id}`}
                        title={project.title}
                        subtitle={project.subtitle}
                        image={project.image[0]?.url ? replaceS3UrlWithCloudFront(project.image[0].url) : ''} />
                ))}
            </div>

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