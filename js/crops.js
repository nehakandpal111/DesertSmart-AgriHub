const crops = [
    { name: "Pearl Millet", type: "pearl_millet", climate: ["arid", "hot-desert"], gm: true },
    { name: "Quinoa", type: "quinoa", climate: ["arid", "semi-arid"], gm: true },
    { name: "Date Palm", type: "date_palm", climate: ["hot-desert"], gm: false },
    { name: "Chickpea", type: "chickpea", climate: ["semi-arid"], gm: true }
];

function recommendCrops(climateZone) {
    return crops.filter(crop => crop.climate.includes(climateZone));
}
window.recommendCrops = recommendCrops;
// Crop Database and Recommendation System
class CropDatabase {
    constructor() {
        this.crops = [];
        this.filteredCrops = [];
        this.init();
    }

    init() {
        this.loadCropData();
        this.filteredCrops = [...this.crops];
    }

    loadCropData() {
        this.crops = [
            {
                id: 1,
                name: 'Pearl Millet',
                nameHi: 'बाजरा',
                scientific: 'Pennisetum glaucum',
                climateZone: 'arid',
                waterRequirement: 'Very Low',
                waterRequirementHi: 'बहुत कम',
                growthPeriod: '70-90 days',
                growthPeriodHi: '70-90 दिन',
                yieldPerHectare: '800-1200 kg',
                description: 'Extremely drought-resistant grain crop, perfect for arid regions. High in protein and minerals.',
                descriptionHi: 'अत्यधिक सूखा प्रतिरोधी अनाज फसल, शुष्क क्षेत्रों के लिए बिल्कुल सही। प्रोटीन और खनिजों से भरपूर।',
                benefits: ['Low Water', 'High Nutrition', 'Heat Tolerant', 'Drought Resistant'],
                benefitsHi: ['कम पानी', 'उच्च पोषण', 'गर्मी सहनशील', 'सूखा प्रतिरोधी'],
                sowingTime: 'June-July',
                sowingTimeHi: 'जून-जुलाई',
                soilPh: '6.0-8.0',
                temperature: '25-35°C',
                rainfall: '200-600mm',
                marketPrice: '₹2,500-3,000/quintal',
                nutritionalValue: 'High protein (11-12%), Iron, Calcium, Phosphorus',
                cultivationTips: 'Sow after first monsoon rain, maintain 25-30cm row spacing',
                cultivationTipsHi: 'पहली मानसून बारिश के बाद बोएं, 25-30 सेमी कतार दूरी बनाए रखें',
                diseases: ['Downy Mildew', 'Blast', 'Ergot'],
                pests: ['Shoot Fly', 'Stem Borer', 'Armyworm']
            },
            {
                id: 2,
                name: 'Quinoa',
                nameHi: 'क्विनोआ',
                scientific: 'Chenopodium quinoa',
                climateZone: 'arid',
                waterRequirement: 'Low',
                waterRequirementHi: 'कम',
                growthPeriod: '90-120 days',
                growthPeriodHi: '90-120 दिन',
                yieldPerHectare: '1000-1500 kg',
                description: 'Superfood grain with complete amino acid profile. Excellent export potential and premium pricing.',
                descriptionHi: 'पूर्ण अमीनो एसिड प्रोफाइल के साथ सुपरफूड अनाज। उत्कृष्ट निर्यात क्षमता और प्रीमियम मूल्य।',
                benefits: ['Premium Price', 'Export Quality', 'Complete Protein', 'Salt Tolerant'],
                benefitsHi: ['प्रीमियम मूल्य', 'निर्यात गुणवत्ता', 'पूर्ण प्रोटीन', 'नमक सहनशील'],
                sowingTime: 'October-November',
                sowingTimeHi: 'अक्टूबर-नवंबर',
                soilPh: '6.0-8.5',
                temperature: '15-25°C',
                rainfall: '300-500mm',
                marketPrice: '₹8,000-12,000/quintal',
                nutritionalValue: 'Complete protein (14-16%), Fiber, Iron, Magnesium',
                cultivationTips: 'Requires well-drained soil, avoid waterlogging',
                cultivationTipsHi: 'अच्छी जल निकासी वाली मिट्टी की आवश्यकता, जल जमाव से बचें',
                diseases: ['Damping Off', 'Leaf Spot', 'Downy Mildew'],
                pests: ['Aphids', 'Leaf Miners', 'Cutworms']
            },
            {
                id: 3,
                name: 'Date Palm',
                nameHi: 'खजूर',
                scientific: 'Phoenix dactylifera',
                climateZone: 'hot-desert',
                waterRequirement: 'Medium',
                waterRequirementHi: 'मध्यम',
                growthPeriod: '3-4 years to fruit',
                growthPeriodHi: 'फल देने में 3-4 साल',
                yieldPerHectare: '5000-8000 kg',
                description: 'Long-term investment crop with excellent returns. Thrives in hot, arid conditions.',
                descriptionHi: 'उत्कृष्ट रिटर्न के साथ दीर्घकालिक निवेश फसल। गर्म, शुष्क परिस्थितियों में फलती-फूलती है।',
                benefits: ['High Value', 'Long Term', 'Heat Resistant', 'Water Efficient'],
                benefitsHi: ['उच्च मूल्य', 'दीर्घकालिक', 'गर्मी प्रतिरोधी', 'पानी कुशल'],
                sowingTime: 'March-April',
                sowingTimeHi: 'मार्च-अप्रैल',
                soilPh: '7.0-8.0',
                temperature: '20-50°C',
                rainfall: '100-200mm',
                marketPrice: '₹150-300/kg',
                nutritionalValue: 'Natural sugars, Fiber, Potassium, Antioxidants',
                cultivationTips: 'Plant female and male trees in 50:1 ratio, deep irrigation',
                cultivationTipsHi: 'मादा और नर पेड़ों को 50:1 अनुपात में लगाएं, गहरी सिंचाई',
                diseases: ['Bayoud Disease', 'Black Scorch', 'Leaf Spot'],
                pests: ['Red Palm Weevil', 'Scale Insects', 'Mites']
            },
            {
                id: 4,
                name: 'Chickpea',
                nameHi: 'चना',
                scientific: 'Cicer arietinum',
                climateZone: 'semi-arid',
                waterRequirement: 'Low',
                waterRequirementHi: 'कम',
                growthPeriod: '90-120 days',
                growthPeriodHi: '90-120 दिन',
                yieldPerHectare: '1200-1800 kg',
                description: 'Nitrogen-fixing legume that improves soil fertility. High protein content and market demand.',
                descriptionHi: 'नाइट्रोजन फिक्सिंग दलहन जो मिट्टी की उर्वरता में सुधार करती है। उच्च प्रोटीन सामग्री और बाजार मांग।',
                benefits: ['Soil Improvement', 'High Protein', 'Market Demand', 'Nitrogen Fixing'],
                benefitsHi: ['मिट्टी सुधार', 'उच्च प्रोटीन', 'बाजार मांग', 'नाइट्रोजन फिक्सिंग'],
                sowingTime: 'October-November',
                sowingTimeHi: 'अक्टूबर-नवंबर',
                soilPh: '6.0-7.5',
                temperature: '20-30°C',
                rainfall: '400-600mm',
                marketPrice: '₹4,500-6,000/quintal',
                nutritionalValue: 'High protein (20-22%), Fiber, Folate, Iron',
                cultivationTips: 'Sow in rows 30cm apart, avoid waterlogging',
                cultivationTipsHi: '30 सेमी की दूरी पर कतारों में बोएं, जल जमाव से बचें',
                diseases: ['Wilt', 'Blight', 'Rust'],
                pests: ['Pod Borer', 'Aphids', 'Cutworms']
            },
            {
                id: 5,
                name: 'Sorghum',
                nameHi: 'ज्वार',
                scientific: 'Sorghum bicolor',
                climateZone: 'arid',
                waterRequirement: 'Very Low',
                waterRequirementHi: 'बहुत कम',
                growthPeriod: '100-130 days',
                growthPeriodHi: '100-130 दिन',
                yieldPerHectare: '1000-1500 kg',
                description: 'Highly drought-tolerant cereal grain. Excellent for food, feed, and biofuel production.',
                descriptionHi: 'अत्यधिक सूखा सहनशील अनाज। भोजन, चारा और बायोफ्यूल उत्पादन के लिए उत्कृष्ट।',
                benefits: ['Drought Tolerant', 'Multi-purpose', 'Heat Resistant', 'Low Input'],
                benefitsHi: ['सूखा सहनशील', 'बहुउद्देश्यीय', 'गर्मी प्रतिरोधी', 'कम लागत'],
                sowingTime: 'June-July',
                sowingTimeHi: 'जून-जुलाई',
                soilPh: '5.5-8.0',
                temperature: '25-35°C',
                rainfall: '200-750mm',
                marketPrice: '₹2,000-2,800/quintal',
                nutritionalValue: 'Carbohydrates, Protein (10-12%), Iron, Phosphorus',
                cultivationTips: 'Suitable for marginal lands, requires minimal inputs',
                cultivationTipsHi: 'सीमांत भूमि के लिए उपयुक्त, न्यूनतम इनपुट की आवश्यकता',
                diseases: ['Grain Mold', 'Leaf Blight', 'Rust'],
                pests: ['Shoot Fly', 'Stem Borer', 'Armyworm']
            },
            {
                id: 6,
                name: 'Barley',
                nameHi: 'जौ',
                scientific: 'Hordeum vulgare',
                climateZone: 'semi-arid',
                waterRequirement: 'Medium',
                waterRequirementHi: 'मध्यम',
                growthPeriod: '120-150 days',
                growthPeriodHi: '120-150 दिन',
                yieldPerHectare: '1500-2500 kg',
                description: 'Hardy cereal crop with good salt tolerance. Used for food, feed, and brewing industry.',
                descriptionHi: 'अच्छी नमक सहनशीलता के साथ मजबूत अनाज फसल। भोजन, चारा और शराब उद्योग के लिए उपयोग।',
                benefits: ['Salt Tolerant', 'Cold Hardy', 'Industrial Use', 'Stable Market'],
                benefitsHi: ['नमक सहनशील', 'ठंड हार्डी', 'औद्योगिक उपयोग', 'स्थिर बाजार'],
                sowingTime: 'November-December',
                sowingTimeHi: 'नवंबर-दिसंबर',
                soilPh: '6.0-8.0',
                temperature: '12-25°C',
                rainfall: '300-500mm',
                marketPrice: '₹1,800-2,500/quintal',
                nutritionalValue: 'Carbohydrates, Protein (8-10%), Fiber, Beta-glucan',
                cultivationTips: 'Sow early for better grain filling, avoid late sowing',
                cultivationTipsHi: 'बेहतर अनाज भरने के लिए जल्दी बोएं, देर से बोने से बचें',
                diseases: ['Stripe Rust', 'Powdery Mildew', 'Leaf Spot'],
                pests: ['Aphids', 'Termites', 'Wireworms']
            }
        ];
    }

    filterCrops(climateZone = 'all') {
        if (climateZone === 'all') {
            this.filteredCrops = [...this.crops];
        } else {
            this.filteredCrops = this.crops.filter(crop => crop.climateZone === climateZone);
        }
        this.renderCrops();
    }

    renderCrops() {
        const container = document.getElementById('cropGrid');
        if (!container) return;

        const currentLang = window.app ? window.app.currentLanguage : 'en';
        
        container.innerHTML = this.filteredCrops.map(crop => {
            const name = currentLang === 'hi' ? crop.nameHi : crop.name;
            const description = currentLang === 'hi' ? crop.descriptionHi : crop.description;
            const benefits = currentLang === 'hi' ? crop.benefitsHi : crop.benefits;
            const waterReq = currentLang === 'hi' ? crop.waterRequirementHi : crop.waterRequirement;
            const growthPeriod = currentLang === 'hi' ? crop.growthPeriodHi : crop.growthPeriod;
            const sowingTime = currentLang === 'hi' ? crop.sowingTimeHi : crop.sowingTime;
            const tips = currentLang === 'hi' ? crop.cultivationTipsHi : crop.cultivationTips;
            
            return `
                <div class="crop-card-detailed" data-crop-id="${crop.id}">
                    <div class="crop-card-header">
                        <h3 class="crop-name">${name}</h3>
                        <span class="crop-scientific">${crop.scientific}</span>
                    </div>
                    
                    <div class="crop-description">
                        ${description}
                    </div>
                    
                    <div class="crop-metrics">
                        <div class="metric-item">
                            <span class="metric-label">${currentLang === 'hi' ? 'पानी की आवश्यकता' : 'Water Requirement'}</span>
                            <span class="metric-value water-${crop.waterRequirement.toLowerCase().replace(' ', '-')}">${waterReq}</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">${currentLang === 'hi' ? 'विकास अवधि' : 'Growth Period'}</span>
                            <span class="metric-value">${growthPeriod}</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">${currentLang === 'hi' ? 'उपज' : 'Yield/Hectare'}</span>
                            <span class="metric-value">${crop.yieldPerHectare}</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">${currentLang === 'hi' ? 'बाजार मूल्य' : 'Market Price'}</span>
                            <span class="metric-value price">${crop.marketPrice}</span>
                        </div>
                    </div>
                    
                    <div class="crop-benefits">
                        ${benefits.map(benefit => `<span class="benefit-tag">${benefit}</span>`).join('')}
                    </div>
                    
                    <div class="crop-details-expandable">
                        <button class="expand-btn" onclick="toggleCropDetails(${crop.id})">
                            ${currentLang === 'hi' ? 'विस्तृत जानकारी' : 'Detailed Information'}
                        </button>
                        <div class="crop-details-content" id="details-${crop.id}">
                            <div class="detail-section">
                                <h4>${currentLang === 'hi' ? 'खेती की जानकारी' : 'Cultivation Information'}</h4>
                                <div class="detail-grid">
                                    <div class="detail-item">
                                        <strong>${currentLang === 'hi' ? 'बुवाई का समय' : 'Sowing Time'}:</strong> ${sowingTime}
                                    </div>
                                    <div class="detail-item">
                                        <strong>${currentLang === 'hi' ? 'मिट्टी pH' : 'Soil pH'}:</strong> ${crop.soilPh}
                                    </div>
                                    <div class="detail-item">
                                        <strong>${currentLang === 'hi' ? 'तापमान' : 'Temperature'}:</strong> ${crop.temperature}
                                    </div>
                                    <div class="detail-item">
                                        <strong>${currentLang === 'hi' ? 'वर्षा' : 'Rainfall'}:</strong> ${crop.rainfall}
                                    </div>
                                </div>
                            </div>
                            
                            <div class="detail-section">
                                <h4>${currentLang === 'hi' ? 'पोषण मूल्य' : 'Nutritional Value'}</h4>
                                <p>${crop.nutritionalValue}</p>
                            </div>
                            
                            <div class="detail-section">
                                <h4>${currentLang === 'hi' ? 'खेती की सलाह' : 'Cultivation Tips'}</h4>
                                <p>${tips}</p>
                            </div>
                            
                            <div class="detail-section">
                                <h4>${currentLang === 'hi' ? 'सामान्य रोग' : 'Common Diseases'}</h4>
                                <div class="disease-pest-list">
                                    ${crop.diseases.map(disease => `<span class="disease-tag">${disease}</span>`).join('')}
                                </div>
                            </div>
                            
                            <div class="detail-section">
                                <h4>${currentLang === 'hi' ? 'सामान्य कीट' : 'Common Pests'}</h4>
                                <div class="disease-pest-list">
                                    ${crop.pests.map(pest => `<span class="pest-tag">${pest}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    getCropRecommendations(location, soilType, waterAvailability) {
        // AI-based crop recommendation logic
        const recommendations = [];
        
        this.crops.forEach(crop => {
            let score = 0;
            
            // Water availability scoring
            if (waterAvailability === 'low' && crop.waterRequirement === 'Very Low') score += 30;
            if (waterAvailability === 'low' && crop.waterRequirement === 'Low') score += 20;
            if (waterAvailability === 'medium' && crop.waterRequirement === 'Medium') score += 25;
            
            // Climate zone scoring
            if (location.includes('rajasthan') || location.includes('desert')) {
                if (crop.climateZone === 'arid' || crop.climateZone === 'hot-desert') score += 25;
            }
            
            // Market price scoring
            const price = parseFloat(crop.marketPrice.replace(/[^\d]/g, ''));
            if (price > 5000) score += 20;
            if (price > 3000) score += 15;
            if (price > 2000) score += 10;
            
            // Growth period scoring (shorter is better for risk management)
            const growthDays = parseInt(crop.growthPeriod.split('-')[0]);
            if (growthDays < 100) score += 15;
            if (growthDays < 120) score += 10;
            
            recommendations.push({
                crop: crop,
                score: score,
                reasons: this.getRecommendationReasons(crop, score)
            });
        });
        
        return recommendations
            .sort((a, b) => b.score - a.score)
            .slice(0, 3); // Top 3 recommendations
    }

    getRecommendationReasons(crop, score) {
        const reasons = [];
        
        if (crop.waterRequirement === 'Very Low' || crop.waterRequirement === 'Low') {
            reasons.push('Low water requirement');
        }
        
        if (crop.benefits.includes('High Value') || crop.benefits.includes('Premium Price')) {
            reasons.push('High market value');
        }
        
        if (crop.benefits.includes('Drought Resistant') || crop.benefits.includes('Heat Tolerant')) {
            reasons.push('Climate resilient');
        }
        
        if (crop.benefits.includes('Export Quality')) {
            reasons.push('Export potential');
        }
        
        return reasons;
    }
}

// Toggle crop details
function toggleCropDetails(cropId) {
    const detailsElement = document.getElementById(`details-${cropId}`);
    const button = event.target;
    
    if (detailsElement.style.display === 'none' || !detailsElement.style.display) {
        detailsElement.style.display = 'block';
        button.textContent = window.app.currentLanguage === 'hi' ? 'कम जानकारी' : 'Less Information';
    } else {
        detailsElement.style.display = 'none';
        button.textContent = window.app.currentLanguage === 'hi' ? 'विस्तृत जानकारी' : 'Detailed Information';
    }
}

// Filter crops by climate zone
function filterCrops() {
    const climateFilter = document.getElementById('climateFilter').value;
    if (window.cropDatabase) {
        window.cropDatabase.filterCrops(climateFilter);
    }
}

// Load crop database
function loadCropDatabase() {
    if (!window.cropDatabase) {
        window.cropDatabase = new CropDatabase();
    }
    window.cropDatabase.renderCrops();
}

// Add CSS for crop cards
const cropCSS = `
    .crop-card-detailed {
        background: white;
        border-radius: 1rem;
        padding: 1.5rem;
        border: 1px solid #E5E7EB;
        transition: all 0.3s;
        margin-bottom: 1rem;
    }
    
    .crop-card-detailed:hover {
        border-color: #F97316;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .crop-card-header {
        border-bottom: 1px solid #F3F4F6;
        padding-bottom: 1rem;
        margin-bottom: 1rem;
    }
    
    .crop-name {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1F2937;
        margin: 0 0 0.25rem 0;
    }
    
    .crop-scientific {
        color: #6B7280;
        font-style: italic;
        font-size: 0.875rem;
    }
    
    .crop-description {
        color: #4B5563;
        line-height: 1.6;
        margin-bottom: 1rem;
    }
    
    .crop-metrics {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .metric-item {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .metric-label {
        font-size: 0.75rem;
        color: #6B7280;
        font-weight: 500;
    }
    
    .metric-value {
        font-weight: 600;
        color: #1F2937;
    }
    
    .metric-value.water-very-low {
        color: #059669;
    }
    
    .metric-value.water-low {
        color: #10B981;
    }
    
    .metric-value.water-medium {
        color: #F59E0B;
    }
    
    .metric-value.price {
        color: #7C3AED;
    }
    
    .crop-benefits {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .benefit-tag {
        background: #FEF3C7;
        color: #92400E;
        padding: 0.25rem 0.5rem;
        border-radius: 0.375rem;
        font-size: 0.75rem;
        font-weight: 500;
    }
    
    .expand-btn {
        background: #F97316;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        cursor: pointer;
        font-weight: 500;
        transition: background 0.3s;
        width: 100%;
    }
    
    .expand-btn:hover {
        background: #EA580C;
    }
    
    .crop-details-content {
        display: none;
        padding-top: 1rem;
        border-top: 1px solid #F3F4F6;
        margin-top: 1rem;
    }
    
    .detail-section {
        margin-bottom: 1.5rem;
    }
    
    .detail-section h4 {
        font-size: 1rem;
        font-weight: 600;
        color: #1F2937;
        margin-bottom: 0.5rem;
    }
    
    .detail-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 0.75rem;
    }
    
    .detail-item {
        padding: 0.5rem;
        background: #F9FAFB;
        border-radius: 0.375rem;
        font-size: 0.875rem;
    }
    
    .disease-pest-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    
    .disease-tag {
        background: #FEE2E2;
        color: #DC2626;
        padding: 0.25rem 0.5rem;
        border-radius: 0.375rem;
        font-size: 0.75rem;
        font-weight: 500;
    }
    
    .pest-tag {
        background: #FECACA;
        color: #B91C1C;
        padding: 0.25rem 0.5rem;
        border-radius: 0.375rem;
        font-size: 0.75rem;
        font-weight: 500;
    }
    
    .crop-filters {
        margin-bottom: 2rem;
    }
    
    @media (max-width: 768px) {
        .crop-metrics {
            grid-template-columns: 1fr;
        }
        
        .detail-grid {
            grid-template-columns: 1fr;
        }
    }
`;

// Inject CSS
const cropStyle = document.createElement('style');
cropStyle.textContent = cropCSS;
document.head.appendChild(cropStyle);