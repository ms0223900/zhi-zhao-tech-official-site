/**
 * 專業證照輪播展示頁（用於開發驗證）
 * 可透過 /certificate-demo 預覽 CertificateSection
 */
import { CertificateSection } from "@/components/certificate";
import type { CertificateMediaItem } from "@/types/certificate-media";

const DEMO_ITEMS: CertificateMediaItem[] = [
  {
    id: "1",
    previewImageUrl: "https://placehold.co/400x500/e5e7eb/6b7280?text=證照1",
    sourceUrl: "https://example.com/doc1.pdf",
    name: "電器承裝業合格執照",
    mediaType: "image",
  },
  {
    id: "2",
    previewImageUrl: "https://placehold.co/400x500/e5e7eb/6b7280?text=證照2",
    sourceUrl: "https://example.com/doc2.pdf",
    name: "冷凍空調同業公會 會員證書",
    mediaType: "image",
  },
  {
    id: "3",
    previewImageUrl: "https://placehold.co/400x500/e5e7eb/6b7280?text=證照3",
    sourceUrl: "https://example.com/video3.mp4",
    name: "工程圖",
    mediaType: "video",
  },
  {
    id: "4",
    previewImageUrl: "https://placehold.co/400x500/e5e7eb/6b7280?text=證照4",
    sourceUrl: "https://example.com/doc4.pdf",
    name: "專業認證書",
    mediaType: "pdf",
  },
];

export default function CertificateDemoPage() {
  return (
    <main className="min-h-screen py-16">
      <CertificateSection items={DEMO_ITEMS} />
    </main>
  );
}
