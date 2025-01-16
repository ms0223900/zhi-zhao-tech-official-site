import { Project } from '@/types/Project'
import Image from 'next/image'
import Link from 'next/link'

interface ProjectDetailProps {
    params: {
        slug: string
    }
}

async function getProject(id: string): Promise<Project> {
    // Implement your data fetching logic here
    // This is a placeholder
    return {} as Project
}

async function getRelatedProjects(genre: string): Promise<Project[]> {
    // Implement your data fetching logic here
    // This is a placeholder
    return [] as Project[]
}

export default async function ProjectDetail({ params }: ProjectDetailProps) {
    const project = await getProject(params.slug)
    const relatedProjects = await getRelatedProjects(project.related_project_genre.documentId)

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back Button */}
            <Link
                href="/projects"
                className="inline-flex items-center mb-8 text-gray-600 hover:text-gray-900"
            >
                ← 回上一頁
            </Link>

            {/* Title Section */}
            <div className="mb-12 text-center">
                <h1 className="text-4xl mb-2">工程案例</h1>
                <p className="text-gray-500">Case</p>
                <h2 className="text-2xl mt-4">{project.title}</h2>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {/* Project Image */}
                <div className="bg-gray-200 aspect-square relative">
                    {project.image?.[0] && (
                        <Image
                            src={project.image[0].url}
                            alt={project.title}
                            fill
                            className="object-cover"
                        />
                    )}
                </div>

                {/* Project Details */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium mb-2">工程地址：</h3>
                        <p>{project.description}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium mb-2">工程簡述：</h3>
                        <p>{project.description}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium mb-2">工程期間：</h3>
                        <p>{new Date(project.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium mb-2">承攬系統：</h3>
                        <p>{project.related_project_genre.title}</p>
                    </div>
                </div>
            </div>

            {/* Related Projects */}
            <div>
                <h3 className="text-2xl mb-6">相關案例</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {relatedProjects.map((related) => (
                        <Link
                            key={related.id}
                            href={`/projects/${related.id}`}
                            className="group"
                        >
                            <div className="bg-gray-200 aspect-square relative mb-2">
                                {related.image?.[0] && (
                                    <Image
                                        src={related.image[0].url}
                                        alt={related.title}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>
                            <p className="text-center">{related.title}</p>
                            <div className="flex justify-end">
                                <span className="text-gray-400">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
} 