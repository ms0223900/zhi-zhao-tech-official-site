"use client"

import CommonTrainingSection from './CommonTrainingSection'
import { talentTrainingCarouselItems } from './data'

const TalentTrainingSection = () => (
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
)

export default TalentTrainingSection