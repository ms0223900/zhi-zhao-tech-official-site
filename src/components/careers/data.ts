export interface CareerCarouselItem {
    id: number;
    image: string;
}

const createCarouselItems = (prefix: string, count: number) =>
    Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        image: `/images/careers/${prefix}/${prefix}-${i + 1}.jpg`
    }));

export const talentTrainingCarouselItems = createCarouselItems('talent-training', 5);

export const joinUsCarouselItems = createCarouselItems('join-us', 6);

export const employeeBenefitsCarouselItems = createCarouselItems('employee-benefits', 6);