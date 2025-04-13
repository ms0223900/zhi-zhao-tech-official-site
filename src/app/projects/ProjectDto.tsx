import { Project } from "@/types/Project";

export type ProjectDto = {
    documentId: string;
    title: string;
    subtitle: string;
    description: string;
    address: string;
    image: {
        url: string;
    }[];
    createdAt: string;
    related_project_genre: {
        documentId: string;
        title: string;
    };
    from: string | null;
    until: string | null;
};

export const ProjectVoConverter = {
    toVo: (projectDto: ProjectDto): Project => {
        return {
            id: projectDto.documentId,
            title: projectDto.title,
            subtitle: projectDto.subtitle,
            description: projectDto.description,
            address: projectDto.address,
            image: projectDto.image.map((_img) => ({ url: _img.url })),
            related_project_genre: projectDto.related_project_genre,
            createdAt: projectDto.createdAt,
            from: projectDto.from,
            until: projectDto.until,
            projectDuration: projectDto.from
                ? `${projectDto.from} ~ ${projectDto.until || ''}`
                : '',
        };
    }
};

