import { Project } from '@/types/Project'
import Image from 'next/image'
import { ProjectVoConverter } from "../ProjectDto"
import { ProjectDto } from "../ProjectDto"
import { client } from "@/gql/client"
import { gql } from '@apollo/client'
import replaceS3UrlWithCloudFront from '@/utils/replaceS3UrlWithCloudFront'
import LinkCard from '@/components/common/LinkCard'
import BackButton from '@/components/common/BackButton'
import { Metadata } from 'next'

interface ProjectDetailProps {
    params: Promise<{
        slug: string
    }>
}

async function asyncGetProject(id: string): Promise<Project> {
    try {
        const { data } = await client.query<{
            project: ProjectDto;
        }>({
            query: gql`
            query GetProject($documentId: ID!) {
  project(documentId: $documentId) {
    documentId
    title
    subtitle
    description
    image {
      url
    }
    related_project_genre {
      documentId
      title
    }
    from
    until
  }
}
            `,
            fetchPolicy: 'no-cache',
            variables: {
                documentId: id,
            },
        });

        return ProjectVoConverter.toVo(data.project);
    } catch (error) {
        console.error("Error fetching projects:", error);
        return {} as Project;
    }
}

async function asyncGetProjectIds(): Promise<string[]> {
    try {
        const { data } = await client.query<{
            projects: ProjectDto[];
        }>({
            query: gql`
            query GetProjectIds {
                projects {
                    documentId
                }
            }
            `,
            fetchPolicy: 'no-cache',
        });

        return data.projects.map((project) => project.documentId);
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [] as string[];
    }
}

async function getRelatedProjects(projectId: string, genreId: string): Promise<Project[]> {
    try {
        const { data } = await client.query<{
            projects: ProjectDto[];
        }>({
            query: gql`
            query GetRelatedProjects($filters: ProjectFiltersInput) {
                projects(filters: $filters) {
                    documentId
                    title
                    subtitle
                    image {
                        url
                    }
                }
            }
            `,
            fetchPolicy: 'no-cache',
            variables: {
                filters: {
                    documentId: {
                        notContains: projectId
                    },
                    related_project_genre: {
                        documentId: {
                            contains: genreId
                        }
                    }
                }
            }
        });

        return data.projects.map((project) => ProjectVoConverter.toVo(project));
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [] as Project[];
    }
}

export default async function ProjectDetail({ params }: ProjectDetailProps) {
    const { slug } = await params
    const project = await asyncGetProject(slug)
    const relatedProjects = project.related_project_genre ? await getRelatedProjects(slug, project.related_project_genre.documentId) : []
    console.log(relatedProjects);

    return (
        <div className="theme-gradient-blue min-h-screen">
            <div className="container mx-auto px-4 py-8 ">
                {/* Back Button */}
                <BackButton />

                {/* Title Section */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl mb-2">工程案例</h1>
                    <p className="text-gray-500">Case</p>
                    <h2 className="text-2xl mt-4">{project.title} - {project.subtitle}</h2>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-3 mb-16">
                    {/* Project Image */}
                    <div className="bg-gray-200 aspect-[3/2] rounded-lg overflow-hidden relative">
                        {project.image?.[0] && (
                            <Image
                                src={replaceS3UrlWithCloudFront(project.image[0].url)}
                                alt={project.title}
                                fill
                                className="object-cover"
                            />
                        )}
                    </div>

                    {/* Project Details */}
                    <div className="bg-[#fffef0] border border-[#e6e6c8] rounded-lg p-6 space-y-4">
                        <div className="flex items-center">
                            <span className="text-lg lr-1">工程地址：</span>
                            <span className="text-gray-700">{project.description}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-lg lr-1">工程簡述：</span>
                            <span className="text-gray-700">{project.description}</span>
                        </div>
                        {project.from && project.until && (
                            <div className="flex items-center">
                                <span className="text-lg lr-1">工程期間：</span>
                                <span className="text-gray-700">{project.from} ~ {project.until}</span>
                            </div>
                        )}
                        <div className="flex items-center">
                            <span className="text-lg lr-1">承攬系統：</span>
                            <span className="text-gray-700">{project.related_project_genre?.title}</span>
                        </div>
                    </div>
                </div>

                {/* Related Projects */}
                <div>
                    <h3 className="text-2xl mb-6">相關案例</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {relatedProjects.map((related) => (
                            <LinkCard
                                key={related.id}
                                link={`/projects/${related.id}`}
                                title={related.title}
                                subtitle={related.subtitle}
                                image={related.image[0]?.url ? replaceS3UrlWithCloudFront(related.image[0].url) : ''}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function generateStaticParams() {
    const projectIds = await asyncGetProjectIds()
    return projectIds.map((id) => ({ slug: id }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = await asyncGetProject(slug);

    return {
        title: `工程案例 | ${project.title} - ${project.subtitle}`,
        // You can add more metadata fields here if needed
        // description: project.description,
        // openGraph: {
        //   images: [project.image?.[0]?.url || ''],
        // },
    };
}