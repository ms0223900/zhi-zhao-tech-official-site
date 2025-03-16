import ProjectList from "@/components/projects/ProjectList";
import { client } from "@/gql/client";
import { Project } from "@/types/Project";
import { gql } from "@apollo/client";
import { ProjectDto, ProjectVoConverter } from "./ProjectDto";

async function asyncGetProjects(): Promise<Project[]> {

    // TODO: 實作 API 串接
    try {
        const { data } = await client.query<{
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

export default async function ProjectsPage() {
    const projects = await asyncGetProjects();

    return (
        <main className="container mx-auto px-4 py-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">工程實績</h1>
            <ProjectList projects={projects} />
        </main>
    );
} 