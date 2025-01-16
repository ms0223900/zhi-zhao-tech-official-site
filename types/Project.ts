export interface Project {
    id: string
    title: string
    description: string
    image: {
        url: string
    }[]
    related_project_genre: {
        documentId: string
        title: string
    }
    createdAt: string
    from: string | null
    until: string | null
}