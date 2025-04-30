import Banner from '@/components/common/Banner'
import { MapSection } from '../../components/contact/MapSection'
import FormSection from '@/components/contact/FormSection'
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "聯絡我們 Contact｜智兆科技",
    description: "提供多元聯絡方式，歡迎洽詢工程服務、合作機會與業務合作，智兆科技將竭誠為您服務。",
}

export default function ContactPage() {
    return (
        <main>
            <Banner title="聯絡我們" subtitle="Contact Us" imageSrc="/images/contact-banner.jpg" />
            <div className="container w-full flex flex-col -center items-center gap-14 py-14 px-4 md:px-0">
                <FormSection />
                <MapSection />
            </div>
        </main>
    )
}