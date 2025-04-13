type ServiceId =
    'clean-room' |
    'fire-engineering' |
    'mechanical-electrical' |
    'process-piping' |
    'hvac' |
    'duct' |
    'civil' |
    'steel' |
    'waste-treatment'


export const services: Record<ServiceId, {
    id: ServiceId
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
        imageList: [
            '/images/services/clean-room/cover.jpg',
            '/images/services/clean-room/clean-room-1.jpg',
            '/images/services/clean-room/clean-room-2.jpg',
            '/images/services/clean-room/clean-room-3.jpg',
            '/images/services/clean-room/clean-room-4.jpg',
            '/images/services/clean-room/clean-room-5.jpg',
        ],
    },
    'fire-engineering': {
        id: 'fire-engineering',
        title: '消防工程',
        subtitle: 'Fire Engineering',
        content: '符合業主需求及設計規範準則，提供與建築物的消防安全設施規劃、安裝、檢測及取得使用許可',
        imageList: [
            '/images/services/fire-engineering/cover.jpg',
            '/images/services/fire-engineering/fire-engineering-1.jpg',
            '/images/services/fire-engineering/fire-engineering-2.jpg',
            '/images/services/fire-engineering/fire-engineering-3.jpg',
            '/images/services/fire-engineering/fire-engineering-4.jpg',
        ],
    },
    'mechanical-electrical': {
        id: 'mechanical-electrical',
        title: '機電工程',
        subtitle: 'Electromechanical Engineering',
        content: '從系統規劃到施工與維護，涵蓋機電設備安裝、配線工程等，助力打造高效運作的智慧建築與設施。',
        imageList: [
            '/images/services/mechanical-electrical/cover.jpg',
            '/images/services/mechanical-electrical/mechanical-electrical-1.jpg',
            '/images/services/mechanical-electrical/mechanical-electrical-2.jpg',
            '/images/services/mechanical-electrical/mechanical-electrical-3.jpg',
            '/images/services/mechanical-electrical/mechanical-electrical-4.jpg',
            '/images/services/mechanical-electrical/mechanical-electrical-5.jpg',
            '/images/services/mechanical-electrical/mechanical-electrical-6.jpg',
        ],
    },
    'process-piping': {
        id: 'process-piping',
        title: '製程管路工程',
        subtitle: 'Process Piping Engineering',
        content: '設計與安裝高精度製程管路系統，包含氣體、真空及化學管路，確保高科技產業的穩定運作與生產需求。',
        imageList: [
            '/images/services/process-piping/cover.jpg',
            '/images/services/process-piping/process-piping-1.jpg',
            '/images/services/process-piping/process-piping-2.jpg',
        ],
    },
    'hvac': {
        id: 'hvac',
        title: '冷凍空調工程',
        subtitle: 'HVAC Engineering',
        content: '專業提供中央空調、工業冷卻系統的設計與安裝，確保良好的空調效能與節能表現。',
        imageList: [
            '/images/services/hvac/cover.jpg',
            '/images/services/hvac/hvac-1.jpg',
            '/images/services/hvac/hvac-2.jpg',
            '/images/services/hvac/hvac-3.jpg',
            '/images/services/hvac/hvac-4.jpg',
            '/images/services/hvac/hvac-5.jpg',
        ],
    },
    'duct': {
        id: 'duct',
        title: '風管工程',
        subtitle: 'Ductwork Engineering',
        content: '提供高效能的空氣分配與排氣系統設計，適用於無塵室、實驗室及商業空間，滿足空氣品質與能源效率需求。',
        imageList: [
            '/images/services/duct/cover.jpg',
            '/images/services/duct/duct-1.jpg',
            '/images/services/duct/duct-2.jpg',
            '/images/services/duct/duct-3.jpg',
            '/images/services/duct/duct-4.jpg',
        ],
    },
    'civil': {
        id: 'civil',
        title: '土建工程',
        subtitle: 'Civil Engineering',
        content: '提供專業的建築與土木工程服務，從基礎設計到施工管理，保證建築結構的安全與穩定。',
        imageList: [
            '/images/services/civil/cover.jpg',
            '/images/services/civil/civil-1.jpg',
            '/images/services/civil/civil-2.jpg',
            '/images/services/civil/civil-3.jpg',
            '/images/services/civil/civil-4.jpg',
        ],
    },
    'steel': {
        id: 'steel',
        title: '鋼構工程',
        subtitle: 'Steel Structure Engineering',
        content: '專注於鋼結構的設計、製造與安裝，提供高強度、耐用的建築解決方案，適用於工業廠房與大型建築物。',
        imageList: [
            '/images/services/steel/cover.jpg',
            '/images/services/steel/steel-1.jpg',
            '/images/services/steel/steel-2.jpg',
            '/images/services/steel/steel-3.jpg',
            '/images/services/steel/steel-4.jpg',
            '/images/services/steel/steel-5.jpg',
        ],
    },
    'waste-treatment': {
        id: 'waste-treatment',
        title: '廢水與廢氣處理工程',
        subtitle: 'Environmental Engineering',
        content: '設計與建置廢水及廢氣處理系統，涵蓋一般、酸鹼、有機及熱排氣，實現環保法規要求與永續經營目標。',
        imageList: [
            '/images/services/waste-treatment/cover.jpg',
            '/images/services/waste-treatment/waste-treatment-1.jpg',
            '/images/services/waste-treatment/waste-treatment-2.jpg',
            '/images/services/waste-treatment/waste-treatment-3.jpg',
            '/images/services/waste-treatment/waste-treatment-4.jpg',
        ],
    },
}
