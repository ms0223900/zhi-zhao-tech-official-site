import ProjectList from "@/components/projects/ProjectList";
import { client } from "@/gql/client";
import { Project } from "@/types/Project";
import { gql } from "@apollo/client";

export const API_URL =
    // (process.env.NEXT_PUBLIC_SERVER_API_URL + '/graphql') ||
    'http://localhost:1337/graphql';

export type ProjectDto = {
    documentId: string;
    title: string;
    description: string;
    image: {
        url: string;
    }[];
    createdAt: string;
    projectGenre: {
        documentId: string;
        title: string;
    };
    related_project_genre: {
        documentId: string;
        title: string;
    };
    from: string | null;
    until: string | null;
};

export const ProjectVoConverter = {
    toVo: (projectDto: ProjectDto) => {
        return {
            id: projectDto.documentId,
            title: projectDto.title,
            description: projectDto.description,
            image: projectDto.image.map((_img) => ({ url: _img.url })),
            related_project_genre: projectDto.related_project_genre,
            createdAt: projectDto.createdAt,
            from: projectDto.from,
            until: projectDto.until,
        };
    }
};

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
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">工程實績</h1>
            <ProjectList projects={projects} />
        </main>
    );
} 