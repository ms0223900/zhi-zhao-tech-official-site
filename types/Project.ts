export interface Project {
    id: string
    title: string
    subtitle: string
    description: string
    address: string
    image: {
        url: string
    }[]
    related_project_genre: {
        documentId: string
        title: string
    } | null
    createdAt: string
    from: string | null
    until: string | null
    projectDuration: string
}