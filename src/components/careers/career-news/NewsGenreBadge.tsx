import { cn } from '@/utils/cn';

interface NewsGenreBadgeProps {
  newsGenre: {
    title: string;
  } | null | undefined;
}

export function NewsGenreBadge({ newsGenre }: NewsGenreBadgeProps) {
  if (!newsGenre) {
    return null;
  }

  return (
    <span
      className={cn(
        "px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap bg-[#55BBF9] text-white",
        newsGenre.title === 'TOP'
          ? 'bg-[#E57B42] text-white'
          : 'bg-white border border-[#55BBF9] text-[#55BBF9]'
      )}>
      {newsGenre.title}
    </span>
  );
}
