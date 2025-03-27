import TalentTrainingSection from "@/components/careers/TalentTrainingSection"
import Banner from "@/components/common/Banner"
import LinkCard from "@/components/common/LinkCard"

export const metadata = {
    title: '人才專區',
    description: '加入我們的團隊',
}

const linkCardList = [
    {
        id: 1,
        link: "/careers#recruitment",
        image: "/images/careers/talent-training-cover.jpg",
        title: "人才培養",
        subtitle: "Talent Training"
    }, {
        id: 2,
        link: "/careers#recruitment",
        image: "/images/careers/employee-benefits-cover.jpg",
        title: "員工福利",
        subtitle: "Employee Benefits"
    }, {
        id: 3,
        link: "/careers#recruitment",
        image: "/images/careers/join-us-cover.jpg",
        title: "加入我們",
        subtitle: "Join Us"
    }
]

export default function CareersPage() {
    return (
        <main>
            <Banner
                title="人才專區"
                subtitle="Talent Area"
                imageSrc="/images/careers/careers-banner.jpg"
            />

            <section className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {linkCardList.map((item) => (
                        <LinkCard
                            key={item.id}
                            link={item.link}
                            image={item.image}
                            title={item.title}
                            subtitle={item.subtitle}
                        />
                    ))}
                </div>
            </section>

            <TalentTrainingSection />
        </main>
    )
} 