export function repeatArrayItems<T>(items: T[], times: number): T[] {
    if (times <= 0 || items.length === 0) {
        return []
    }

    return Array.from({ length: times }, () => items).flat()
}

