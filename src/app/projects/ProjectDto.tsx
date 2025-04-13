import { Project, ProjectImpl } from "@/types/Project";

export type ProjectDto = {
    documentId: string;
    title: string;
    subtitle: string;
    description: string;
    address: string;
    image: { url: string }[];
    related_project_genre: { documentId: string; title: string };
    createdAt: string;
    from: string | null;
    until: string | null;
};

export const ProjectVoConverter = {
    toVo: (projectDto: ProjectDto): Project => {
        return new ProjectImpl(
            projectDto.documentId,
            projectDto.title,
            projectDto.subtitle,
            projectDto.description,
            projectDto.address,
            projectDto.image,
            projectDto.related_project_genre,
            projectDto.createdAt,
            projectDto.from,
            projectDto.until
        );
    },

    // 新增：處理空值或無效資料
    toVoOrEmpty: (projectDto?: ProjectDto | null): Project => {
        return projectDto ? ProjectVoConverter.toVo(projectDto) : ProjectImpl.empty();
    }
};

