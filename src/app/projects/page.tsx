import ProjectList from "@/components/projects/ProjectList";
import { client } from "@/gql/client";
import { Project } from "@/types/Project";
import { gql } from "@apollo/client";
import { ProjectDto, ProjectVoConverter } from "./ProjectDto";
import ProjectListContainer from "@/components/projects/ProjectList";

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
    // TODO: 看要不要改成 CSR
    // const projects = await asyncGetProjects();

    return (
        <main className="container mx-auto px-4 py-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">工程實績</h1>
            <ProjectListContainer />
        </main>
    );
} 