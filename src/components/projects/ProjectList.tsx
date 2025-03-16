'use client';
import { Project } from "@/types/Project";
import replaceS3UrlWithCloudFront from "@/utils/replaceS3UrlWithCloudFront";
import { useState } from "react";
import LinkCard from "../common/LinkCard";

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

export default ProjectList