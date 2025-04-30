import Banner from "@/components/common/Banner";
import RelatedIndustriesSection from "@/components/common/RelatedIndustriesSection";
import TitleWithEngSubtitle from "@/components/common/TitleWithEngSubtitle";
import ProjectListContainer from "@/components/projects/ProjectList";
import { Metadata } from "next";

// meta
export const metadata: Metadata = {
    title: "工程實績 Projects｜智兆科技",
    description: "工程實績展示多項成功的工程案例，涵蓋無塵室、空調、製程管路等領域，豐富的技術實力和豐富的產業經驗，成功打造了多個高端項目，包括日月光半導體廠、勝一化工、恩智浦、台虹科技、光寶科技、醫強科技、南茂科技、住華科技及多家國內科技企業的工程建設。",
}

export default async function ProjectsPage() {
    return (
        <main className="mx-auto md:theme-gradient-blue">
            <Banner
                title="工程實績"
                subtitle="Project Performance"
                imageSrc="/images/projects-banner.jpg"
            />
            <section className="theme-gradient-blue px-4">
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