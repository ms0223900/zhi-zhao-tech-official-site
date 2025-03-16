import Link from "next/link";

const BackButton = () => <Link
    href="/services"
    className="inline-flex items-center px-6 py-2 mb-8 rounded-full bg-blue-500 transition-colors"
>
    回上一頁
</Link>

export default BackButton;