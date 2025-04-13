'use client';

import Image from 'next/image';
import { Project } from '@/types/Project';
import replaceS3UrlWithCloudFront from '@/utils/replaceS3UrlWithCloudFront';

interface ProjectCardProps {
    project: Project | null;
    gradientFrom: string;
    gradientTo: string;
    buttonColor: string;
}

const ProjectCard = ({ project, gradientFrom, gradientTo, buttonColor }: ProjectCardProps) => {
    return (
        <div className="flex">
            <div className="w-1/2 flex items-center justify-center">
                <div className="relative w-full aspect-[245/166]">
                    {project?.image?.[0]?.url ? (
                        <Image
                            src={replaceS3UrlWithCloudFront(project.image[0].url)}
                            alt={project.title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <>
                            <Image
                                src="/images/placeholder.jpg"
                                alt="待請期待"
                                fill
                                className="object-contain"
                            />
                            <div className="absolute bottom-0 left-0 right-0 text-center pb-2 text-gray-500">
                                敬請期待
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className={`w-2/3 p-6 relative`}>
                <h3 className="text-xl font-semibold mb-4">{project?.title || '公司名稱 - 廠房'}</h3>
                <div className={`space-y-2 bg-gradient-to-r ${gradientFrom} ${gradientTo} py-3 pb-5 rounded-lg`}>
                    {[
                        {
                            label: '工程地址：',
                            value: project?.address,
                            condition: true,
                        },
                        {
                            label: '工程概述：',
                            value: project?.description,
                            condition: true,
                        },
                        {
                            label: '工程期間：',
                            value: project?.projectDuration,
                            condition: !!project?.projectDuration,
                        },
                        {
                            label: '承攬系統：',
                            value: project?.related_project_genre?.title,
                            condition: !!project?.related_project_genre?.title,
                        },
                    ].map(
                        (item, index) =>
                            item.condition && (
                                <p key={index} className="line-clamp-2">
                                    <span className="font-medium">{item.label}</span>
                                    <span>{item.value}</span>
                                </p>
                            ),
                    )}
                </div>
                <div
                    className={`absolute bottom-4 right-4 flex items-center justify-center w-12 h-12 ${buttonColor} rounded-full cursor-pointer`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
