import ProjectListContainer from "@/components/projects/ProjectList";
import { Metadata } from "next";

// meta
export const metadata: Metadata = {
    title: "工程實績",
    description: "工程實績",
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