async function getProjects() {
    // TODO: 實作 API 串接
    return []
}

export default async function ProjectsPage() {
    const projects = await getProjects()

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">工程實績</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(() => (
                    // 專案列表項目
                    <></>
                ))}
            </div>
        </main>
    )
} 