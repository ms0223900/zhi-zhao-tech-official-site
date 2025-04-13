import CommonTrainingSection from "@/components/careers/CommonTrainingSection"
import { employeeBenefitsCarouselItems, talentTrainingCarouselItems } from "@/components/careers/data"
import Banner from "@/components/common/Banner"
import LinkCard from "@/components/common/LinkCard"

export const metadata = {
    title: '人才專區',
    description: '加入我們的團隊',
}

const linkCardList = [
    {
        id: 1,
        link: "/careers#talent-training",
        image: "/images/careers/talent-training-cover.jpg",
        title: "人才培養",
        subtitle: "Talent Training"
    }, {
        id: 2,
        link: "/careers#employee-benefits",
        image: "/images/careers/employee-benefits-cover.webp",
        title: "員工福利",
        subtitle: "Employee Benefits"
    }, {
        id: 3,
        link: "/careers#join-us",
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
                imageSrc="/images/careers/careers-banner.webp"
                imgClassName="object-bottom"
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
            <div className="md--theme-gradient-blue py-[71px]">
                <CommonTrainingSection
                    anchorId="talent-training"
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
                    anchorId="employee-benefits"
                    title="員工福利"
                    subTitle="Employee Benefits"
                    description="智兆科技致力於打造員工友善的工作環境與完善的福利制度 "
                    detailDescriptions={[
                        { title: '- 全面保障', content: '享有勞保、健保與團體保險，提供全方位安全保障' },
                        { title: '- 優渥獎勵', content: '績效獎金、年終獎金，認可每位員工的付出' },
                        { title: '- 休閒活動', content: '定期舉辦員工旅遊、節日聚餐與團建活動' },
                    ]}
                    carouselItems={employeeBenefitsCarouselItems}
                    themeColor="#FFE01F"
                />
                <CommonTrainingSection
                    anchorId="join-us"
                    title="加入我們"
                    subTitle="Join Us"
                    description="加入智兆科技，開啟屬於您的精彩職涯！ "
                    detailDescriptions={[
                        { title: '- 挑戰與成長', content: '參與多元專案，拓展專業技能與視野' },
                        { title: '- 專業團隊', content: '與行業頂尖專家並肩合作，共同成就卓越' },
                        { title: '- 多元文化', content: '尊重多元背景與觀點，打造包容且創新的企業文化 ' },
                        { title: '- 開放職缺', content: '我們正在尋找熱情與才華兼具的夥伴，加入我們一起實現夢想！' },
                    ]}
                    carouselItems={employeeBenefitsCarouselItems}
                    themeColor="#55BBF9"
                />
                <section>
                    <p className="text-h3 text-center whitespace-pre-line">
                        {`立即投遞履歷  成為智兆科技的一份子\n與我們攜手開創更美好的未來`}
                    </p>
                </section>
            </div>
        </main>
    )
} 