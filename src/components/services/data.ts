type ServiceId =
    'clean-room' |
    'fire-engineering' |
    'mechanical-electrical' |
    'process-piping' |
    'hvac' |
    'duct' |
    'civil' |
    'steel'

export const services: Record<ServiceId, {
    id: ServiceId
    title: string
    subtitle: string
    description: string
    content: string
    imageList: string[]
}> = {
    'clean-room': {
        id: 'clean-room',
        title: '無塵室工程',
        subtitle: 'Clean room project',
        description: '本公司專精於無塵室工程設計與施工，服務對象涵蓋半導體、光電、生技醫療、精密製造等產業。我們提供從需求分析、規劃設計、施工建置到驗證測試的全方位服務，確保潔淨等級達到 ISO 等國際標準。透過精密風速控制、壓差設計與空調整合，打造穩定、安全的高效潔淨環境，提升生產良率與品質穩定性。',
        content: '提供全方位無塵室設計、建造與\n維護服務，適用於半導體、光電及高科技產業，確保高潔淨度與穩定的製程環境。',
        imageList: [
            '/images/services/clean-room/cover.jpg',
            '/images/services/clean-room/clean-room-1.jpg',
            '/images/services/clean-room/clean-room-2.jpg',
            '/images/services/clean-room/clean-room-3.jpg',
            '/images/services/clean-room/clean-room-4.jpg',
            '/images/services/clean-room/clean-room-5.jpg',
            '/images/services/clean-room/clean-room-6.jpg',
            '/images/services/clean-room/clean-room-7.jpg',
            '/images/services/clean-room/clean-room-8.jpg',
            '/images/services/clean-room/clean-room-9.jpg',
            '/images/services/clean-room/clean-room-10.jpg',
            '/images/services/clean-room/clean-room-11.jpg',
            '/images/services/clean-room/clean-room-12.jpg',
        ],
    },
    'fire-engineering': {
        id: 'fire-engineering',
        title: '消防工程',
        subtitle: 'Fire Engineering',
        description: '依據建築法規與客戶使用需求，規劃消防灑水系統、火警警報、排煙與滅火設備，並協助消防申報與使用執照申請流程。專業團隊確保各項消防系統與其他機電設施整合無誤，確保施工驗收順利，保障建築安全與合法使用。',
        content: '符合業主需求及設計規範準則，提供與建築物的消防安全設施規劃、安裝、檢測及取得使用許可',
        imageList: [
            '/images/services/fire-engineering/cover.jpg',
            '/images/services/fire-engineering/fire-engineering-1.jpg',
            '/images/services/fire-engineering/fire-engineering-2.jpg',
            '/images/services/fire-engineering/fire-engineering-3.jpg',
            '/images/services/fire-engineering/fire-engineering-4.jpg',
            '/images/services/fire-engineering/fire-engineering-5.jpg',
            '/images/services/fire-engineering/fire-engineering-6.jpg',
            '/images/services/fire-engineering/fire-engineering-7.jpg',
            '/images/services/fire-engineering/fire-engineering-8.jpg',
        ],
    },
    'mechanical-electrical': {
        id: 'mechanical-electrical',
        title: '機電工程',
        subtitle: 'Electromechanical Engineering',
        description: '整合電力、給排水、弱電、照明與消防等系統，提供機電工程一站式規劃與施工服務。針對各類商業建築、工業廠房與潔淨室設施，量身設計安全可靠的供電與配線架構，搭配監控與備援系統，提高營運效率與用電安全，降低維護成本與系統風險。',
        content: '從系統規劃到施工與維護，涵蓋機電設備安裝、配線工程等，助力打造高效運作的智慧建築與設施。',
        imageList: [
            '/images/services/mechanical-electrical/cover.jpg',
            '/images/services/mechanical-electrical/mechanical-electrical-1.jpg',
            '/images/services/mechanical-electrical/mechanical-electrical-2.jpg',
            '/images/services/mechanical-electrical/mechanical-electrical-3.jpg',
            '/images/services/mechanical-electrical/mechanical-electrical-4.jpg',
            '/images/services/mechanical-electrical/mechanical-electrical-5.jpg',
            '/images/services/mechanical-electrical/mechanical-electrical-6.jpg',
            '/images/services/mechanical-electrical/mechanical-electrical-7.jpg',
            '/images/services/mechanical-electrical/mechanical-electrical-8.jpg',
        ],
    },
    'process-piping': {
        id: 'process-piping',
        title: '二次配製程管路工程',
        subtitle: 'Process Piping Engineering',
        description: '提供高科技產業用製程管路設計與施工服務，包含特殊氣體、高純度氣體、純水、化學品、排廢水與真空系統。所有管材選用符合業界規範之高潔淨等級材料，並搭配自動控制與監測設備，確保整體製程穩定、安全。廣泛應用於半導體、光電、生技及化工產線。',
        content: '設計與安裝高精度製程管路系統，包含氣體、真空及化學管路，確保高科技產業的穩定運作與生產需求。',
        imageList: [
            '/images/services/process-piping/process-piping-1.jpg',
            '/images/services/process-piping/process-piping-2.jpg',
            '/images/services/process-piping/process-piping-3.jpg',
            '/images/services/process-piping/process-piping-4.jpg',
            '/images/services/process-piping/process-piping-5.jpg',
            '/images/services/process-piping/process-piping-6.jpg',
            '/images/services/process-piping/process-piping-7.jpg',
            '/images/services/process-piping/process-piping-8.jpg',
            '/images/services/process-piping/process-piping-9.jpg',
            '/images/services/process-piping/process-piping-10.jpg',
            '/images/services/process-piping/process-piping-11.jpg',
            '/images/services/process-piping/process-piping-12.jpg',
            '/images/services/process-piping/process-piping-13.jpg',
        ],
    },
    'hvac': {
        id: 'hvac',
        title: '冷凍空調工程',
        subtitle: 'HVAC Engineering',
        description: '我們提供高效率的冷凍空調系統設計、安裝與維護，廣泛應用於無塵室、廠房、辦公大樓與醫療空間。專業團隊依據使用需求與環境條件規劃中央空調、工業冷卻與節能系統，並搭配自動控制提升能源使用效率。服務強調節能、靜音與長期穩定運作，幫助企業打造舒適且高效的工作場域。',
        content: '專業提供中央空調、工業冷卻系統的設計與安裝，確保良好的空調效能與節能表現。',
        imageList: [
            '/images/services/hvac/cover.jpg',
            '/images/services/hvac/hvac-1.jpg',
            '/images/services/hvac/hvac-2.jpg',
            '/images/services/hvac/hvac-3.jpg',
            '/images/services/hvac/hvac-4.jpg',
            '/images/services/hvac/hvac-5.jpg',
            '/images/services/hvac/hvac-6.jpg',
            '/images/services/hvac/hvac-7.jpg',
            '/images/services/hvac/hvac-8.jpg',
            '/images/services/hvac/hvac-9.jpg',
            '/images/services/hvac/hvac-10.jpg',
            '/images/services/hvac/hvac-11.jpg',
            '/images/services/hvac/hvac-12.jpg',
            '/images/services/hvac/hvac-13.jpg',
        ],
    },
    'duct': {
        id: 'duct',
        title: '風管工程',
        subtitle: 'Ductwork Engineering',
        description: '風管工程是潔淨室與空調系統的關鍵核心。我們提供各類送風、排風、排氣與氣流平衡系統設計與施工，涵蓋鍍鋅鐵、PVC、PP、不鏽鋼等材質。應用場域包括無塵室、實驗室、餐飲空間及製造廠房，確保氣流分布均勻、汙染源有效排除，並符合節能及環保規範。',
        content: '提供高效能的空氣分配與排氣系統設計，適用於無塵室、實驗室及商業空間，滿足空氣品質與能源效率需求。',
        imageList: [
            '/images/services/duct/cover.jpg',
            '/images/services/duct/duct-1.jpg',
            '/images/services/duct/duct-2.jpg',
            '/images/services/duct/duct-3.jpg',
            '/images/services/duct/duct-4.jpg',
            '/images/services/duct/duct-5.jpg',
            '/images/services/duct/duct-6.jpg',
            '/images/services/duct/duct-7.jpg',
            '/images/services/duct/duct-8.jpg',
        ],
    },
    'civil': {
        id: 'civil',
        title: '土建工程',
        subtitle: 'Civil Engineering',
        description: '土建工程涵蓋廠房、實驗室、機房等空間的基礎設施建設，包括地坪強化、防塵、防震與特殊隔間工程。結合建築結構、使用動線與未來設備需求進行整體評估，確保結構安全、耐用並兼顧施工效率。可配合無塵室與機電工程同步施工，縮短整體工期。',
        content: '提供專業的建築與土木工程服務，從基礎設計到施工管理，保證建築結構的安全與穩定。',
        imageList: [
            '/images/services/civil/civil-1.jpg',
            '/images/services/civil/civil-2.jpg',
            '/images/services/civil/civil-3.jpg',
            '/images/services/civil/civil-4.jpg',
            '/images/services/civil/civil-5.jpg',
            '/images/services/civil/civil-6.jpg',
            '/images/services/civil/civil-7.jpg',
            '/images/services/civil/civil-8.jpg',
            '/images/services/civil/civil-9.jpg',
            '/images/services/civil/civil-10.jpg',
        ],
    },
    'steel': {
        id: 'steel',
        title: '鋼構工程',
        subtitle: 'Steel Structure Engineering',
        description: '提供鋼結構設計、製造與安裝服務，適用於大型廠房、加建樓層與特殊設備平台建置。採用高強度鋼材與結構分析軟體，確保結構穩定性與耐震性。搭配防火、防蝕與耐候塗裝，延長建築使用壽命，提升整體施工彈性與空間利用效率。',
        content: '專注於鋼結構的設計、製造與安裝，提供高強度、耐用的建築解決方案，適用於工業廠房與大型建築物。',
        imageList: [
            '/images/services/steel/cover.jpg',
            '/images/services/steel/steel-1.jpg',
            '/images/services/steel/steel-2.jpg',
            '/images/services/steel/steel-3.jpg',
            '/images/services/steel/steel-4.jpg',
            '/images/services/steel/steel-5.jpg',
            '/images/services/steel/steel-6.jpg',
            '/images/services/steel/steel-7.jpg',
            '/images/services/steel/steel-8.jpg',
            '/images/services/steel/steel-9.png',
            '/images/services/steel/steel-10.jpg',
        ],
    }

}
