'use client';
import { Project } from "@/types/Project";
import Image from "next/image";
import { useState } from "react";

interface ProjectListProps {
    projects: Project[]
}

const ITEMS_PER_PAGE = 4;

const ProjectList = ({ projects }: ProjectListProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate pagination
    const indexOfLastProject = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstProject = indexOfLastProject - ITEMS_PER_PAGE;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProjects.map((project) => (
                    <div key={project.id} className="bg-white shadow-md rounded-md overflow-hidden">
                        {project.image && (
                            <div className="h-48 relative">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-black">{project.title}</h3>
                            <p className="text-sm text-gray-600 mt-2">{project.description}</p>
                        </div>
                    </div>
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