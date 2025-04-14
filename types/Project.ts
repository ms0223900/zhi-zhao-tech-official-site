import replaceS3UrlWithCloudFront from "@/utils/replaceS3UrlWithCloudFront"

export interface Project {
    titleToDisplay: string
    projectLink: string
    id: string
    title: string
    subtitle: string
    description: string
    address: string
    image: {
        url: string
    }[]
    coverImageUrl: string
    related_project_genres: {
        documentId: string
        title: string
    }[]
    createdAt: string
    from: string | null
    until: string | null
    projectDuration: string
    genresString: string
}

export class ProjectVo implements Project {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly subtitle: string,
        public readonly description: string,
        public readonly address: string,
        public readonly image: { url: string }[],
        public readonly related_project_genres: { documentId: string; title: string }[],
        public readonly createdAt: string,
        public readonly from: string | null,
        public readonly until: string | null,
    ) { }

    get titleToDisplay(): string {
        return `${this.title}${this.subtitle ? ` - ${this.subtitle}` : ''}`
    }

    get genresString(): string {
        return this.related_project_genres.map(genre => genre.title).join(', ');
    }

    get projectDuration(): string {
        return this.from ? `${this.from} ~ ${this.until || ''}`.trim() : '-';
    }

    get projectLink(): string {
        return this.id ? `/projects/${this.id}` : '';
    }

    get coverImageUrl(): string {
        return this.image[0]?.url ? replaceS3UrlWithCloudFront(this.image[0].url) : '/images/empty-cover.jpg';
    }

    static empty(): Project {
        return new ProjectVo(
            '',
            '公司名稱',
            '廠房',
            '-',
            '-',
            [{ url: '/images/empty-cover.jpg' }],
            [],
            new Date().toISOString(),
            null,
            null
        );
    }
}

