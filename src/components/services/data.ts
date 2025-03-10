
export const services: Record<string, {
    id: string
    title: string
    subtitle: string
    content: string
    imageList: string[]
}> = {
    'clean-room': {
        id: 'clean-room',
        title: '無塵室工程',
        subtitle: 'Clean room project',
        content: '提供全方位無塵室設計、建造與維護服務，適用於半導體、光電及高科技產業，確保高潔淨度與穩定的製程環境。',
        imageList: ['/images/services/clean-room.jpg'],
    },
    'painting': {
        id: 'painting',
        title: '塗裝工程',
        subtitle: 'Fire Engineering',
        content: '專精於表面處理與防腐塗裝，提供長效耐用的塗裝方案，有效保護設備和建築結構，提升使用壽命。',
        imageList: ['/images/services/painting.jpg'],
    },
    'mechanical-electrical': {
        id: 'mechanical-electrical',
        title: '機電工程',
        subtitle: 'Electromechanical Engineering',
        content: '從系統規劃到施工與維護，涵蓋機電設備安裝、配線工程等，助力打造高效運作的智慧建築與設施。',
        imageList: ['/images/services/mechanical-electrical.jpg'],
    },
    'process-piping': {
        id: 'process-piping',
        title: '製程管路工程',
        subtitle: 'Process Piping Engineering',
        content: '設計與安裝高精度製程管路系統，包含氣體、真空及化學管路，確保高科技產業的穩定運作與生產需求。',
        imageList: ['/images/services/process-piping.jpg'],
    },
    'hvac': {
        id: 'hvac',
        title: '冷氣空調工程',
        subtitle: 'HVAC Engineering',
        content: '專業提供中央空調、工業冷卻系統的設計與安裝，確保良好的空調效能與節能表現。',
        imageList: ['/images/services/hvac.jpg'],
    },
    'duct': {
        id: 'duct',
        title: '風管工程',
        subtitle: 'Ductwork Engineering',
        content: '提供高效能的空氣分配與排氣系統設計，適用於無塵室、實驗室及商業空間，滿足空氣品質與能源效率需求。',
        imageList: ['/images/services/duct.jpg'],
    },
    'civil': {
        id: 'civil',
        title: '土建工程',
        subtitle: 'Civil Engineering',
        content: '提供專業的建築與土木工程服務，從基礎設計到施工管理，保證建築結構的安全與穩定。',
        imageList: ['/images/services/civil.jpg'],
    },
    'steel': {
        id: 'steel',
        title: '鋼構工程',
        subtitle: 'Steel Structure Engineering',
        content: '專注於鋼結構的設計、製造與安裝，提供高強度、耐用的建築解決方案，適用於工業廠房與大型建築物。',
        imageList: ['/images/services/steel.jpg'],
    },
    'waste-treatment': {
        id: 'waste-treatment',
        title: '廢水與廢氣處理工程',
        subtitle: 'Environmental Engineering',
        content: '設計與建置廢水及廢氣處理系統，涵蓋一般、酸鹼、有機及熱排氣，實現環保法規要求與永續經營目標。',
        imageList: ['/images/services/waste-treatment.jpg'],
    },
}
