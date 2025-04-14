'use client';

import Image from 'next/image';
import { Project } from '@/types/Project';
import Link from 'next/link';

interface ProjectCardProps {
    project: Project;
    gradientFrom: string;
    gradientTo: string;
    buttonColor: string;
}

const ProjectCard = ({ project, gradientFrom, gradientTo, buttonColor }: ProjectCardProps) => {
    return (
        <Link href={project.projectLink}>
            <div className="flex relative">
                <div className="relative z-10 w-1/2 flex items-center justify-center">
                    <div className="relative w-full aspect-[245/166] rounded-lg overflow-hidden">
                        <Image
                            src={project.coverImageUrl}
                            alt={project.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
                <div className={`w-[60%] absolute top-6 left-[40%] flex flex-col items-center`}>
                    <h3 className="text-h4 text-center font-semibold mb-4 ml-4 max-w-[70%]">{`${project.title} - ${project.subtitle}`}</h3>
                    <div className={`w-full space-y-2 bg-gradient-to-r ${gradientFrom} ${gradientTo} py-3 pb-5 px-10 pl-[60px] rounded-lg`}>
                        {[
                            {
                                label: '工程地址：',
                                value: project.address,
                                condition: true,
                            },
                            {
                                label: '工程概述：',
                                value: project.description,
                                condition: true,
                            },
                            {
                                label: '工程期間：',
                                value: project.projectDuration,
                                condition: !!project.projectDuration,
                            },
                            {
                                label: '承攬系統：',
                                value: project.related_project_genres.map((genre) => genre.title).join(', '),
                                condition: !!project.related_project_genres.length,
                            },
                        ].map(
                            (item, index) =>
                                item.condition && (
                                    <p key={index} className="line-clamp-1 text-[10px]">
                                        <span className="font-medium">{item.label}</span>
                                        <span>{item.value}</span>
                                    </p>
                                ),
                        )}
                    </div>
                    <div
                        className={`absolute -bottom-[15px] right-4 flex items-center justify-center w-[30px] h-[30px] ${buttonColor} rounded-full cursor-pointer`}
                    >
                        <img src="/images/icons/project-card-link-arrow.svg" alt="project-card-link-arrow" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;
