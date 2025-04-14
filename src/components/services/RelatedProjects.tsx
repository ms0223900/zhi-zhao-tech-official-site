"use client"

import { gql } from "@apollo/client";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import LinkCard from "../common/LinkCard";
import { csrClient } from "@/gql/client";
import replaceS3UrlWithCloudFront from "@/utils/replaceS3UrlWithCloudFront";
import TitleWithEngSubtitle from "../common/TitleWithEngSubtitle";

interface ProjectDto {
    documentId: string;
    title: string;
    subtitle: string;
    image: {
        url: string;
    }[];
    related_project_genre: {
        key: string;
    };
}

interface RelatedProjectVO {
    id: string;
    title: string;
    subtitle: string;
    image: {
        url: string;
    }[];
}

const ProjectConverter = {
    toVo: (dto: ProjectDto): RelatedProjectVO => ({
        id: dto.documentId,
        title: dto.title,
        subtitle: dto.subtitle,
        image: dto.image || []
    })
};

async function fetchRelatedProjects(slug: string): Promise<RelatedProjectVO[]> {
    try {
        const { data } = await csrClient.query<{
            projects: ProjectDto[];
        }>({
            query: gql`
        query GetRelatedProjects($key: String!) {
  projects(filters:  {
     related_project_genre:  {
        key:  {
           eq: $key
        }
     }
  }) {
    documentId
    title
    subtitle
    image {
      url
    }
    related_project_genres {
      key
    }
  }
}
      `,
            variables: {
                key: slug
            },
            fetchPolicy: 'no-cache',
        });

        return data.projects.map(ProjectConverter.toVo);
    } catch (error) {
        console.error("Error fetching related projects:", error);
        return [];
    }
}

interface RelatedProjectsProps {
    slug: string;
}

function RelatedProjectsList({ slug }: RelatedProjectsProps) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['relatedProjects', slug],
        queryFn: () => fetchRelatedProjects(slug),
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                <span className="ml-4 text-gray-600">載入中...</span>
            </div>
        );
    }

    if (error) {
        return <div>發生錯誤: {(error as Error).message}</div>;
    }

    if (!data || data.length === 0) {
        return <EmptyRelatedProjects />
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((project) => (
                <LinkCard
                    key={project.id}
                    imageWrapperClassName="aspect-[1.818] h-auto"
                    link={`/services/${project.id}`}
                    title={project.title}
                    subtitle={project.subtitle}
                    image={project.image[0]?.url ? replaceS3UrlWithCloudFront(project.image[0].url) : ''}
                />
            ))}
        </div>
    );
}

function EmptyRelatedProjects() {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
            <LinkCard
                key={index}
                imageWrapperClassName="aspect-[1.818] h-auto cursor-not-allowed"
                link={""}
                title="公司名稱"
                subtitle="廠房"
                image={'/images/empty-cover.jpg'}
            />
        ))}
    </div>;
}

const queryClient = new QueryClient();

export default function RelatedProjects({ slug }: RelatedProjectsProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="space-y-6 py-10">
                <TitleWithEngSubtitle title="相關案例" subtitle="Related Cases" />
                <hr />
                <RelatedProjectsList slug={slug} />
            </div>
        </QueryClientProvider>
    );
} 