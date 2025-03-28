import CommonTrainingSection from "@/components/careers/CommonTrainingSection"
import { talentTrainingCarouselItems } from "@/components/careers/data"
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
            <div className="md--theme-gradient-blue">
                <CommonTrainingSection
                    title="人才培養"
                    subTitle="Talent Training"
                    description="我們深信人才是企業的核心競爭力，致力於為員工提供多元化的學習與成長機會，與我們一起，透過持續學習，突破自我界限，攜手共創未來"
                    detailDescriptions={[
                        { title: '- 內部訓練', content: '專業技能培訓、職場軟實力提升課程' },
                        { title: '- 外部學習資源', content: '補助專業證照考取與外部進修計畫' },
                        { title: '- 職涯發展', content: '量身打造個人化職涯規劃，助力員工實現長期成長' }
                    ]}
                    carouselItems={talentTrainingCarouselItems}
                    themeColor="#E57B42"
                />
                <CommonTrainingSection
                    title="員工福利"
                    subTitle="Employee Benefits"
                    description="智兆科技致力於打造員工友善的工作環境與完善的福利制度 "
                    detailDescriptions={[
                        { title: '- 全面保障', content: '享有勞保、健保與團體保險，提供全方位安全保障' },
                        { title: '- 優渥獎勵', content: '績效獎金、年終獎金，認可每位員工的付出' },
                        { title: '- 休閒動', content: '定期舉辦員工旅遊、節日聚餐與團建活動' },
                    ]}
                    carouselItems={talentTrainingCarouselItems}
                    themeColor="#FFE01F"
                />
            </div>
        </main>
    )
} 