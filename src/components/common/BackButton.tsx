"use client"

import { useRouter } from "next/navigation";

const BackButton = () => {
    const router = useRouter();
    return <button
        onClick={() => router.back()}
        className="inline-flex items-center px-6 py-2 mb-8 rounded-full bg-blue-500 transition-colors"
    >
        回上一頁
    </button>
}

export default BackButton;