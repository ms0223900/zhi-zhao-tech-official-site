import Banner from '@/components/common/Banner'
import { MapSection } from '../../components/contact/MapSection'
import FormSection from '@/components/contact/FormSection'

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