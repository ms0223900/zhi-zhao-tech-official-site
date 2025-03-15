import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
    prefix: '',
    extend: {
        classGroups: {
            'font-size': ['text-h1', 'text-h2', 'text-h3', 'text-h4', 'text-h5', 'text-h6'],
        },
    }
});

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
} 