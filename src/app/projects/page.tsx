import ProjectList from "@/components/projects/ProjectList";
import { Project } from "@/types/Project";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    'http://localhost:1337/graphql';

const client = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache(),
});

type ProjectDto = {
    documentId: string;
    title: string;
    description: string;
    image: {
        url: string;
    };
    createdAt: string;
};

const ProjectVoConverter = {
    toVo: (projectDto: ProjectDto) => {
        return {
            id: projectDto.documentId,
            title: projectDto.title,
            description: projectDto.description,
            image: projectDto.image.url,
        };
    }
};

async function asyncGetProjects(): Promise<Project[]> {

    // TODO: 實作 API 串接
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
                    createdAt
                }
            }
        `,
    });

    return data.projects.map(ProjectVoConverter.toVo);
}

export default async function ProjectsPage() {
    const projects = await asyncGetProjects();
    console.log(projects);

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">工程實績</h1>
            <ProjectList projects={projects} />
        </main>
    );
} 