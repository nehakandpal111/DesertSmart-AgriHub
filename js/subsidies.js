function checkSubsidyEligibility({ farmSize, income, category, state, type }) {
    if (farmSize < 2 && income === "below-200000" && (type === "irrigation" || type === "solar")) {
        return { eligible: true, amount: "₹50,000", message: "Eligible for small farmer subsidy." };
    }
    return { eligible: false, message: "Not eligible based on current criteria." };
}
window.checkSubsidyEligibility = checkSubsidyEligibility;
// Subsidy Management System
class SubsidyManager {
    constructor() {
        this.subsidies = [];
        this.eligibilityRules = {};
        this.init();
    }

    init() {
        this.loadSubsidyData();
        this.setupEligibilityRules();
        this.initFormHandler();
    }

    loadSubsidyData() {
        this.subsidies = [
            {
                id: 1,
                name: 'Drip Irrigation Subsidy',
                nameHi: 'ड्रिप सिंचाई सब्सिडी',
                amount: 45000,
                coverage: '90%',
                category: 'irrigation',
                eligibility: {
                    farmSize: { min: 0.5, max: 10 },
                    income: ['below-200000', '200000-500000'],
                    farmerCategory: ['small', 'marginal'],
                    states: ['rajasthan', 'gujarat', 'haryana']
                },
                description: 'Financial support for installing drip irrigation systems to promote water conservation.',
                descriptionHi: 'पानी संरक्षण को बढ़ावा देने के लिए ड्रिप सिंचाई सिस्टम स्थापित करने हेतु वित्तीय सहायता।',
                documents: ['Land Records', 'Income Certificate', 'Farmer Registration'],
                documentsHi: ['भूमि रिकॉर्ड', 'आय प्रमाण पत्र', 'किसान पंजीकरण'],
                applicationProcess: 'Apply through state agriculture department portal',
                applicationProcessHi: 'राज्य कृषि विभाग पोर्टल के माध्यम से आवेदन करें',
                timeline: '45-60 days',
                contact: 'District Agriculture Office'
            },
            {
                id: 2,
                name: 'Solar Pump Subsidy',
                nameHi: 'सोलर पंप सब्सिडी',
                amount: 60000,
                coverage: '70%',
                category: 'energy',
                eligibility: {
                    farmSize: { min: 1, max: 20 },
                    income: ['below-200000', '200000-500000', '500000-1000000'],
                    farmerCategory: ['small', 'marginal', 'medium'],
                    states: ['rajasthan', 'gujarat', 'haryana', 'mp']
                },
                description: 'Subsidy for solar-powered irrigation pumps to reduce electricity costs.',
                descriptionHi: 'बिजली की लागत कम करने के लिए सोलर संचालित सिंचाई पंप के लिए सब्सिडी।',
                documents: ['Land Records', 'Electricity Bill', 'Bank Details'],
                documentsHi: ['भूमि रिकॉर्ड', 'बिजली बिल', 'बैंक विवरण'],
                applicationProcess: 'Apply through renewable energy development agency',
                applicationProcessHi: 'नवीकरणीय ऊर्जा विकास एजेंसी के माध्यम से आवेदन करें',
                timeline: '60-90 days',
                contact: 'REDA Office'
            },
            {
                id: 3,
                name: 'Organic Farming Certification',
                nameHi: 'जैविक खेती प्रमाणन',
                amount: 15000,
                coverage: '100%',
                category: 'organic',
                eligibility: {
                    farmSize: { min: 0.5, max: 50 },
                    income: ['below-200000', '200000-500000', '500000-1000000'],
                    farmerCategory: ['small', 'marginal', 'medium'],
                    states: ['rajasthan', 'gujarat', 'haryana', 'mp', 'punjab']
                },
                description: 'Support for organic farming certification and transition period.',
                descriptionHi: 'जैविक खेती प्रमाणन और संक्रमण अवधि के लिए सहायता।',
                documents: ['Farm Plan', 'Soil Test Report', 'Training Certificate'],
                documentsHi: ['खेत योजना', 'मिट्टी परीक्षण रिपोर्ट', 'प्रशिक्षण प्रमाण पत्र'],
                applicationProcess: 'Apply through organic certification agency',
                applicationProcessHi: 'जैविक प्रमाणन एजेंसी के माध्यम से आवेदन करें',
                timeline: '30-45 days',
                contact: 'Organic Certification Body'
            },
            {
                id: 4,
                name: 'Seed Subsidy Program',
                nameHi: 'बीज सब्सिडी कार्यक्रम',
                amount: 8000,
                coverage: '50%',
                category: 'seeds',
                eligibility: {
                    farmSize: { min: 0.2, max: 5 },
                    income: ['below-200000', '200000-500000'],
                    farmerCategory: ['small', 'marginal'],
                    states: ['rajasthan', 'gujarat', 'haryana', 'mp', 'punjab']
                },
                description: 'Subsidized high-quality seeds for drought-resistant varieties.',
                descriptionHi: 'सूखा प्रतिरोधी किस्मों के लिए सब्सिडी युक्त उच्च गुणवत्ता वाले बीज।',
                documents: ['Farmer ID', 'Land Records', 'Previous Crop Details'],
                documentsHi: ['किसान पहचान पत्र', 'भूमि रिकॉर्ड', 'पिछली फसल विवरण'],
                applicationProcess: 'Apply at nearest agriculture extension center',
                applicationProcessHi: 'निकटतम कृषि विस्तार केंद्र में आवेदन करें',
                timeline: '15-30 days',
                contact: 'Agriculture Extension Officer'
            },
            {
                id: 5,
                name: 'Crop Insurance Premium',
                nameHi: 'फसल बीमा प्रीमियम',
                amount: 12000,
                coverage: '2%',
                category: 'insurance',
                eligibility: {
                    farmSize: { min: 0.1, max: 100 },
                    income: ['below-200000', '200000-500000', '500000-1000000'],
                    farmerCategory: ['small', 'marginal', 'medium', 'large'],
                    states: ['rajasthan', 'gujarat', 'haryana', 'mp', 'punjab']
                },
                description: 'Crop insurance with minimal premium to protect against losses.',
                descriptionHi: 'नुकसान से बचाने के लिए न्यूनतम प्रीमियम के साथ फसल बीमा।',
                documents: ['Land Records', 'Sowing Certificate', 'Bank Details'],
                documentsHi: ['भूमि रिकॉर्ड', 'बुवाई प्रमाण पत्र', 'बैंक विवरण'],
                applicationProcess: 'Apply through insurance company or bank',
                applicationProcessHi: 'बीमा कंपनी या बैंक के माध्यम से आवेदन करें',
                timeline: '7-15 days',
                contact: 'Insurance Company/Bank'
            }
        ];
    }

    setupEligibilityRules() {
        this.eligibilityRules = {
            farmSize: (userSize, criteria) => {
                const size = parseFloat(userSize);
                return size >= criteria.min && size <= criteria.max;
            },
            income: (userIncome, criteria) => {
                return criteria.includes(userIncome);
            },
            farmerCategory: (userCategory, criteria) => {
                return criteria.includes(userCategory);
            },
            states: (userState, criteria) => {
                return criteria.includes(userState);
            }
        };
    }

    initFormHandler() {
        const form = document.getElementById('subsidyForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.checkEligibility();
            });
        }
    }

    checkEligibility() {
        const formData = {
            farmSize: document.getElementById('farmSize').value,
            income: document.getElementById('annualIncome').value,
            farmerCategory: document.getElementById('farmerCategory').value,
            state: document.getElementById('state').value
        };

        // Validate form data
        if (!this.validateForm(formData)) {
            return;
        }

        // Check eligibility for each subsidy
        const eligibleSubsidies = this.subsidies.filter(subsidy => 
            this.isEligible(formData, subsidy.eligibility)
        );

        this.displayResults(eligibleSubsidies, formData);
    }

    validateForm(data) {
        const errors = [];
        
        if (!data.farmSize || parseFloat(data.farmSize) <= 0) {
            errors.push('Please enter a valid farm size');
        }
        
        if (!data.income) {
            errors.push('Please select your annual income range');
        }
        
        if (!data.farmerCategory) {
            errors.push('Please select your farmer category');
        }
        
        if (!data.state) {
            errors.push('Please select your state');
        }

        if (errors.length > 0) {
            this.showError(errors.join(', '));
            return false;
        }
        
        return true;
    }

    isEligible(userData, criteria) {
        return Object.keys(criteria).every(key => {
            const rule = this.eligibilityRules[key];
            if (rule) {
                return rule(userData[key], criteria[key]);
            }
            return true;
        });
    }

    displayResults(eligibleSubsidies, userData) {
        const resultContainer = document.getElementById('eligibilityResult');
        const currentLang = window.app ? window.app.currentLanguage : 'en';
        
        if (eligibleSubsidies.length === 0) {
            resultContainer.className = 'eligibility-result not-eligible';
            resultContainer.innerHTML = `
                <h4>${currentLang === 'hi' ? 'पात्रता परिणाम' : 'Eligibility Results'}</h4>
                <p>${currentLang === 'hi' ? 'वर्तमान में कोई सब्सिडी उपलब्ध नहीं है जो आपकी पात्रता मानदंडों से मेल खाती हो।' : 'Currently no subsidies available that match your eligibility criteria.'}</p>
                <p>${currentLang === 'hi' ? 'कृपया बाद में दोबारा जांचें या स्थानीय कृषि कार्यालय से संपर्क करें।' : 'Please check again later or contact your local agriculture office.'}</p>
            `;
        } else {
            const totalAmount = eligibleSubsidies.reduce((sum, subsidy) => sum + subsidy.amount, 0);
            
            resultContainer.className = 'eligibility-result';
            resultContainer.innerHTML = `
                <h4>${currentLang === 'hi' ? 'बधाई हो! आप पात्र हैं' : 'Congratulations! You are eligible'}</h4>
                <p>${currentLang === 'hi' ? 'आप' : 'You qualify for'} <strong>${eligibleSubsidies.length}</strong> ${currentLang === 'hi' ? 'सब्सिडी के लिए योग्य हैं' : 'subsidies'}</p>
                <p>${currentLang === 'hi' ? 'कुल संभावित लाभ' : 'Total potential benefit'}: <strong>₹${totalAmount.toLocaleString()}</strong></p>
                
                <div class="subsidy-list">
                    ${eligibleSubsidies.map(subsidy => this.renderSubsidyCard(subsidy, currentLang)).join('')}
                </div>
                
                <div class="next-steps">
                    <h5>${currentLang === 'hi' ? 'अगले कदम' : 'Next Steps'}</h5>
                    <ol>
                        <li>${currentLang === 'hi' ? 'आवश्यक दस्तावेज तैयार करें' : 'Prepare required documents'}</li>
                        <li>${currentLang === 'hi' ? 'संबंधित कार्यालय में जाएं' : 'Visit the relevant office'}</li>
                        <li>${currentLang === 'hi' ? 'आवेदन पत्र भरें' : 'Fill out application forms'}</li>
                        <li>${currentLang === 'hi' ? 'अनुमोदन की प्रतीक्षा करें' : 'Wait for approval'}</li>
                    </ol>
                </div>
            `;
        }
        
        resultContainer.style.display = 'block';
    }

    renderSubsidyCard(subsidy, currentLang) {
        const name = currentLang === 'hi' ? subsidy.nameHi : subsidy.name;
        const description = currentLang === 'hi' ? subsidy.descriptionHi : subsidy.description;
        const documents = currentLang === 'hi' ? subsidy.documentsHi : subsidy.documents;
        const applicationProcess = currentLang === 'hi' ? subsidy.applicationProcessHi : subsidy.applicationProcess;
        
        return `
            <div class="subsidy-card">
                <div class="subsidy-header">
                    <h5>${name}</h5>
                    <div class="subsidy-amount">₹${subsidy.amount.toLocaleString()}</div>
                </div>
                <p class="subsidy-description">${description}</p>
                <div class="subsidy-details">
                    <div class="detail-item">
                        <strong>${currentLang === 'hi' ? 'कवरेज' : 'Coverage'}:</strong> ${subsidy.coverage}
                    </div>
                    <div class="detail-item">
                        <strong>${currentLang === 'hi' ? 'समयसीमा' : 'Timeline'}:</strong> ${subsidy.timeline}
                    </div>
                    <div class="detail-item">
                        <strong>${currentLang === 'hi' ? 'संपर्क' : 'Contact'}:</strong> ${subsidy.contact}
                    </div>
                </div>
                <div class="required-documents">
                    <strong>${currentLang === 'hi' ? 'आवश्यक दस्तावेज' : 'Required Documents'}:</strong>
                    <ul>
                        ${documents.map(doc => `<li>${doc}</li>`).join('')}
                    </ul>
                </div>
                <div class="application-process">
                    <strong>${currentLang === 'hi' ? 'आवेदन प्रक्रिया' : 'Application Process'}:</strong>
                    <p>${applicationProcess}</p>
                </div>
            </div>
        `;
    }

    showError(message) {
        const resultContainer = document.getElementById('eligibilityResult');
        resultContainer.className = 'eligibility-result not-eligible';
        resultContainer.innerHTML = `
            <h4>Error</h4>
            <p>${message}</p>
        `;
        resultContainer.style.display = 'block';
    }

    getSubsidyStatistics() {
        return {
            totalSubsidies: this.subsidies.length,
            totalAmount: this.subsidies.reduce((sum, subsidy) => sum + subsidy.amount, 0),
            categories: [...new Set(this.subsidies.map(s => s.category))],
            statesCovered: [...new Set(this.subsidies.flatMap(s => s.eligibility.states))]
        };
    }
}

// Initialize subsidy manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.subsidyManager = new SubsidyManager();
});

// Add CSS for subsidy components
const subsidyCSS = `
    .subsidy-list {
        margin-top: 1.5rem;
    }
    
    .subsidy-card {
        background: #F8FAFC;
        border: 1px solid #E2E8F0;
        border-radius: 0.75rem;
        padding: 1.5rem;
        margin-bottom: 1rem;
        transition: all 0.3s;
    }
    
    .subsidy-card:hover {
        border-color: #F97316;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .subsidy-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .subsidy-header h5 {
        margin: 0;
        color: #1F2937;
        font-weight: 600;
    }
    
    .subsidy-amount {
        background: #10B981;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-weight: 600;
    }
    
    .subsidy-description {
        color: #4B5563;
        margin-bottom: 1rem;
        line-height: 1.6;
    }
    
    .subsidy-details {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .detail-item {
        padding: 0.5rem;
        background: white;
        border-radius: 0.375rem;
        font-size: 0.875rem;
    }
    
    .required-documents {
        background: #EBF8FF;
        border: 1px solid #3B82F6;
        border-radius: 0.5rem;
        padding: 1rem;
        margin-bottom: 1rem;
    }
    
    .required-documents ul {
        margin: 0.5rem 0 0 0;
        padding-left: 1.5rem;
    }
    
    .required-documents li {
        margin-bottom: 0.25rem;
    }
    
    .application-process {
        background: #F0FDF4;
        border: 1px solid #10B981;
        border-radius: 0.5rem;
        padding: 1rem;
    }
    
    .application-process p {
        margin: 0.5rem 0 0 0;
        color: #065F46;
    }
    
    .next-steps {
        background: #FFF7ED;
        border: 1px solid #F97316;
        border-radius: 0.5rem;
        padding: 1rem;
        margin-top: 1.5rem;
    }
    
    .next-steps h5 {
        margin: 0 0 0.5rem 0;
        color: #EA580C;
    }
    
    .next-steps ol {
        margin: 0.5rem 0 0 0;
        padding-left: 1.5rem;
    }
    
    .next-steps li {
        margin-bottom: 0.5rem;
        color: #9A3412;
    }
    
    @media (max-width: 768px) {
        .subsidy-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }
        
        .subsidy-details {
            grid-template-columns: 1fr;
        }
    }
`;

// Inject CSS
const subsidyStyle = document.createElement('style');
subsidyStyle.textContent = subsidyCSS;
document.head.appendChild(subsidyStyle);