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

export class ProjectVo implements Project {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly subtitle: string,
        public readonly description: string,
        public readonly address: string,
        public readonly image: { url: string }[],
        public readonly related_project_genre: { documentId: string; title: string } | null,
        public readonly createdAt: string,
        public readonly from: string | null,
        public readonly until: string | null,
    ) { }

    get projectDuration(): string {
        return this.from ? `${this.from} ~ ${this.until || ''}`.trim() : '-';
    }

    // 檢查是否為空專案（特殊狀態）
    static empty(): Project {
        return new ProjectVo(
            '',
            '公司名稱',
            '廠房',
            '-',
            '-',
            [{ url: '/images/empty-cover.jpg' }],
            { documentId: '', title: '-' },
            new Date().toISOString(),
            null,
            null
        );
    }

    merge(partial: Partial<Project>): Project {
        return new ProjectVo(
            partial.id ?? this.id,
            partial.title ?? this.title,
            partial.subtitle ?? this.subtitle,
            partial.description ?? this.description,
            partial.address ?? this.address,
            partial.image ?? this.image,
            partial.related_project_genre ?? this.related_project_genre,
            partial.createdAt ?? this.createdAt,
            partial.from ?? this.from,
            partial.until ?? this.until
        );
    }
}

