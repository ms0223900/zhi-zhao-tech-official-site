import Banner from "@/components/common/Banner";
import RelatedIndustriesSection from "@/components/common/RelatedIndustriesSection";
import TitleWithEngSubtitle from "@/components/common/TitleWithEngSubtitle";
import ProjectListContainer from "@/components/projects/ProjectList";
import { Metadata } from "next";

// meta
export const metadata: Metadata = {
    title: "工程實績",
    description: "工程實績",
}

export default async function ProjectsPage() {
    return (
        <main className="mx-auto px-4 md:theme-gradient-blue">
            <Banner
                title="工程實績"
                subtitle="Project Performance"
                imageSrc="/images/projects-banner.jpg"
            />
            <section>
                <div className="container mx-auto py-8">
                    <ProjectListContainer />
                </div>
            </section>
            <section className="container mx-auto pt-8">
                <TitleWithEngSubtitle title="工程實績" subtitle="Related Projects" />
                <RelatedIndustriesSection />
            </section>
        </main>
    );
} 