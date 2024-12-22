import { Project } from "@/types/Project";
interface ProjectListProps {
    projects: Project[]
}

const ProjectList = ({ projects }: ProjectListProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <div key={project.id} className="bg-white shadow-md rounded-md p-4">
                    <h3 className="text-lg font-semibold text-black">{project.title}</h3>
                    <p className="text-sm text-gray-600">{project.description}</p>
                </div>
            ))}
        </div>
    )
}

export default ProjectList