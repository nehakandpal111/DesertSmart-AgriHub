function recommendEnergy({ windSpeed, sunlightHours, gridIndependence }) {
    if (sunlightHours > 8 && gridIndependence < 90) return "Solar Panels";
    if (windSpeed > 10) return "Wind Turbines";
    if (gridIndependence > 95) return "Hybrid System";
    return "Micro Nuclear (future tech)";
}
window.recommendEnergy = recommendEnergy;
// Energy Solutions Management System
class EnergySolutions {
    constructor() {
        this.selectedOption = null;
        this.energyData = {};
        this.init();
    }

    init() {
        this.loadEnergyData();
        this.setupEventListeners();
    }

    loadEnergyData() {
        this.energyData = {
            solar: {
                name: 'Solar Panels',
                nameHi: 'सौर पैनल',
                icon: '☀️',
                efficiency: 22,
                lifespan: 25,
                costPerKW: 50000,
                roi: '6-8 years',
                roiHi: '6-8 साल',
                maintenance: 'Low',
                maintenanceHi: 'कम',
                description: 'Photovoltaic systems convert sunlight directly into electricity. Ideal for desert regions with high solar irradiance.',
                descriptionHi: 'फोटोवोल्टिक सिस्टम सूर्य की रोशनी को सीधे बिजली में बदलते हैं। उच्च सौर विकिरण वाले मरुस्थलीय क्षेत्रों के लिए आदर्श।',
                advantages: [
                    'Zero fuel costs',
                    'Minimal maintenance',
                    'Scalable installation',
                    'Government subsidies available'
                ],
                advantagesHi: [
                    'शून्य ईंधन लागत',
                    'न्यूनतम रखरखाव',
                    'स्केलेबल स्थापना',
                    'सरकारी सब्सिडी उपलब्ध'
                ],
                requirements: {
                    minSunlight: 6,
                    spacePerKW: 10,
                    orientation: 'South-facing'
                }
            },
            wind: {
                name: 'Wind Turbines',
                nameHi: 'पवन टर्बाइन',
                icon: '💨',
                efficiency: 35,
                lifespan: 20,
                costPerKW: 80000,
                roi: '8-10 years',
                roiHi: '8-10 साल',
                maintenance: 'Medium',
                maintenanceHi: 'मध्यम',
                description: 'Small-scale wind turbines harness wind energy for consistent power generation, especially effective in windy desert areas.',
                descriptionHi: 'छोटे पैमाने के पवन टर्बाइन निरंतर बिजली उत्पादन के लिए पवन ऊर्जा का उपयोग करते हैं, विशेष रूप से हवादार मरुस्थलीय क्षेत्रों में प्रभावी।',
                advantages: [
                    'Works day and night',
                    'Complements solar power',
                    'High energy density',
                    'Suitable for remote areas'
                ],
                advantagesHi: [
                    'दिन और रात काम करता है',
                    'सौर ऊर्जा का पूरक',
                    'उच्च ऊर्जा घनत्व',
                    'दूरदराज के क्षेत्रों के लिए उपयुक्त'
                ],
                requirements: {
                    minWindSpeed: 3,
                    averageWindSpeed: 6,
                    height: '15-30 meters'
                }
            },
            nuclear: {
                name: 'Micro Nuclear',
                nameHi: 'माइक्रो न्यूक्लियर',
                icon: '⚛️',
                efficiency: 90,
                lifespan: 60,
                costPerKW: 500000,
                roi: '15-20 years',
                roiHi: '15-20 साल',
                maintenance: 'High',
                maintenanceHi: 'उच्च',
                description: 'Small modular reactors (SMRs) provide reliable baseload power with advanced safety features. Future technology for large-scale operations.',
                descriptionHi: 'छोटे मॉड्यूलर रिएक्टर (SMRs) उन्नत सुरक्षा सुविधाओं के साथ विश्वसनीय बेसलोड पावर प्रदान करते हैं। बड़े पैमाने के संचालन के लिए भविष्य की तकनीक।',
                advantages: [
                    'Continuous power generation',
                    'Very high capacity factor',
                    'Small footprint',
                    'Weather independent'
                ],
                advantagesHi: [
                    'निरंतर बिजली उत्पादन',
                    'बहुत उच्च क्षमता कारक',
                    'छोटा फुटप्रिंट',
                    'मौसम स्वतंत्र'
                ],
                requirements: {
                    capacity: '1-10 MW',
                    licensing: 'Required',
                    safety: 'Advanced systems'
                },
                status: 'Future Technology',
                statusHi: 'भविष्य की तकनीक'
            },
            hybrid: {
                name: 'Hybrid System',
                nameHi: 'हाइब्रिड सिस्टम',
                icon: '🔋',
                efficiency: 85,
                lifespan: 20,
                costPerKW: 120000,
                roi: '7-9 years',
                roiHi: '7-9 साल',
                maintenance: 'Medium',
                maintenanceHi: 'मध्यम',
                description: 'Combined solar, wind, and battery storage system providing 24/7 reliable power with maximum efficiency.',
                descriptionHi: 'संयुक्त सौर, पवन और बैटरी भंडारण सिस्टम अधिकतम दक्षता के साथ 24/7 विश्वसनीय बिजली प्रदान करता है।',
                advantages: [
                    '99% reliability',
                    '24-hour backup',
                    'Optimal resource utilization',
                    'Grid independence'
                ],
                advantagesHi: [
                    '99% विश्वसनीयता',
                    '24 घंटे बैकअप',
                    'अनुकूलित संसाधन उपयोग',
                    'ग्रिड स्वतंत्रता'
                ],
                components: {
                    solar: '60%',
                    wind: '25%',
                    battery: '15%'
                }
            }
        };
    }

    setupEventListeners() {
        // Energy option selection will be handled by onclick in HTML
    }

    selectEnergyOption(type) {
        // Remove previous selection
        document.querySelectorAll('.energy-option').forEach(option => {
            option.classList.remove('selected');
        });

        // Add selection to clicked option
        const selectedOption = document.querySelector(`[data-type="${type}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }

        this.selectedOption = type;
        this.showEnergyRecommendation(type);
        this.updateEnergyChart(type);
    }

    showEnergyRecommendation(type) {
        const energy = this.energyData[type];
        if (!energy) return;

        const currentLang = window.app ? window.app.currentLanguage : 'en';
        const recommendationDiv = document.getElementById('energyRecommendation');
        const contentDiv = document.getElementById('energyRecommendationContent');

        if (!recommendationDiv || !contentDiv) return;

        const name = currentLang === 'hi' ? energy.nameHi : energy.name;
        const description = currentLang === 'hi' ? energy.descriptionHi : energy.description;
        const advantages = currentLang === 'hi' ? energy.advantagesHi : energy.advantages;
        const roi = currentLang === 'hi' ? energy.roiHi : energy.roi;
        const maintenance = currentLang === 'hi' ? energy.maintenanceHi : energy.maintenance;

        let content = `
            <div style="display: grid; gap: 1rem;">
                <div>
                    <h4 style="margin: 0 0 0.5rem 0; color: #1F2937;">${energy.icon} ${name}</h4>
                    <p style="margin: 0 0 1rem 0; color: #4B5563;">${description}</p>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div style="background: white; padding: 1rem; border-radius: 0.5rem; border: 1px solid #E5E7EB;">
                        <div style="font-weight: 600; color: #1F2937; margin-bottom: 0.5rem;">${currentLang === 'hi' ? 'तकनीकी विवरण' : 'Technical Details'}</div>
                        <div style="font-size: 0.875rem; color: #6B7280;">
                            <div>${currentLang === 'hi' ? 'दक्षता' : 'Efficiency'}: ${energy.efficiency}%</div>
                            <div>${currentLang === 'hi' ? 'जीवनकाल' : 'Lifespan'}: ${energy.lifespan} ${currentLang === 'hi' ? 'साल' : 'years'}</div>
                            <div>${currentLang === 'hi' ? 'रखरखाव' : 'Maintenance'}: ${maintenance}</div>
                        </div>
                    </div>
                    
                    <div style="background: white; padding: 1rem; border-radius: 0.5rem; border: 1px solid #E5E7EB;">
                        <div style="font-weight: 600; color: #1F2937; margin-bottom: 0.5rem;">${currentLang === 'hi' ? 'वित्तीय विवरण' : 'Financial Details'}</div>
                        <div style="font-size: 0.875rem; color: #6B7280;">
                            <div>${currentLang === 'hi' ? 'लागत' : 'Cost'}: ₹${energy.costPerKW.toLocaleString()}/kW</div>
                            <div>ROI: ${roi}</div>
                            <div>${currentLang === 'hi' ? 'सब्सिडी' : 'Subsidy'}: ${currentLang === 'hi' ? 'उपलब्ध' : 'Available'}</div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <div style="font-weight: 600; color: #1F2937; margin-bottom: 0.5rem;">${currentLang === 'hi' ? 'मुख्य लाभ' : 'Key Advantages'}</div>
                    <ul style="margin: 0; padding-left: 1.5rem; color: #4B5563;">
                        ${advantages.map(advantage => `<li style="margin-bottom: 0.25rem;">${advantage}</li>`).join('')}
                    </ul>
                </div>
        `;

        // Add specific requirements or status
        if (energy.requirements) {
            content += `
                <div>
                    <div style="font-weight: 600; color: #1F2937; margin-bottom: 0.5rem;">${currentLang === 'hi' ? 'आवश्यकताएं' : 'Requirements'}</div>
                    <div style="background: #F0F9FF; padding: 1rem; border-radius: 0.5rem; border: 1px solid #0EA5E9;">
                        ${Object.entries(energy.requirements).map(([key, value]) => 
                            `<div style="font-size: 0.875rem; color: #0369A1; margin-bottom: 0.25rem;">
                                <strong>${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> ${value}
                            </div>`
                        ).join('')}
                    </div>
                </div>
            `;
        }

        if (energy.status) {
            const status = currentLang === 'hi' ? energy.statusHi : energy.status;
            content += `
                <div style="background: #FEF3C7; padding: 1rem; border-radius: 0.5rem; border: 1px solid #F59E0B;">
                    <div style="font-weight: 600; color: #92400E; margin-bottom: 0.5rem;">${currentLang === 'hi' ? 'स्थिति' : 'Status'}</div>
                    <div style="color: #92400E; font-size: 0.875rem;">${status}</div>
                </div>
            `;
        }

        content += '</div>';
        contentDiv.innerHTML = content;
        recommendationDiv.style.display = 'block';

        // Calculate and show personalized recommendation
        this.calculatePersonalizedRecommendation(type);
    }

    calculatePersonalizedRecommendation(type) {
        // Get farm data if available
        const farmSize = parseFloat(document.getElementById('farmSize')?.value || 2.5);
        const energy = this.energyData[type];
        
        // Calculate system size and costs
        const estimatedEnergyNeed = farmSize * 5; // 5 kWh per hectare per day
        const systemSize = Math.ceil(estimatedEnergyNeed / 6); // Assuming 6 hours of peak generation
        const totalCost = systemSize * energy.costPerKW;
        const subsidyAmount = Math.min(totalCost * 0.7, 200000); // 70% subsidy up to ₹2L
        const netCost = totalCost - subsidyAmount;
        const annualSavings = estimatedEnergyNeed * 365 * 8; // ₹8 per kWh
        const paybackPeriod = Math.ceil(netCost / annualSavings);

        // Add personalized calculation to recommendation
        const currentLang = window.app ? window.app.currentLanguage : 'en';
        const personalizedDiv = document.createElement('div');
        personalizedDiv.style.cssText = 'background: #F0FDF4; padding: 1rem; border-radius: 0.5rem; border: 1px solid #10B981; margin-top: 1rem;';
        
        personalizedDiv.innerHTML = `
            <div style="font-weight: 600; color: #065F46; margin-bottom: 0.75rem;">
                ${energy.icon} ${currentLang === 'hi' ? 'आपके लिए व्यक्तिगत सिफारिश' : 'Personalized Recommendation for You'}
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0.75rem; font-size: 0.875rem; color: #065F46;">
                <div><strong>${currentLang === 'hi' ? 'सिस्टम आकार' : 'System Size'}:</strong> ${systemSize} kW</div>
                <div><strong>${currentLang === 'hi' ? 'कुल लागत' : 'Total Cost'}:</strong> ₹${totalCost.toLocaleString()}</div>
                <div><strong>${currentLang === 'hi' ? 'सब्सिडी' : 'Subsidy'}:</strong> ₹${subsidyAmount.toLocaleString()}</div>
                <div><strong>${currentLang === 'hi' ? 'शुद्ध लागत' : 'Net Cost'}:</strong> ₹${netCost.toLocaleString()}</div>
                <div><strong>${currentLang === 'hi' ? 'वार्षिक बचत' : 'Annual Savings'}:</strong> ₹${annualSavings.toLocaleString()}</div>
                <div><strong>${currentLang === 'hi' ? 'पेबैक अवधि' : 'Payback Period'}:</strong> ${paybackPeriod} ${currentLang === 'hi' ? 'साल' : 'years'}</div>
            </div>
        `;

        const contentDiv = document.getElementById('energyRecommendationContent');
        if (contentDiv) {
            contentDiv.appendChild(personalizedDiv);
        }
    }

    updateEnergyChart(type) {
        const ctx = document.getElementById('energyChart');
        if (!ctx) return;

        // Destroy existing chart if it exists
        if (window.energyChart) {
            window.energyChart.destroy();
        }

        const energy = this.energyData[type];
        const farmSize = parseFloat(document.getElementById('farmSize')?.value || 2.5);
        
        // Calculate generation data for different times of day
        const hourlyData = this.calculateHourlyGeneration(type, farmSize);
        
        window.energyChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({length: 24}, (_, i) => `${i}:00`),
                datasets: [{
                    label: `${energy.name} Generation (kWh)`,
                    data: hourlyData,
                    borderColor: this.getEnergyColor(type),
                    backgroundColor: this.getEnergyColor(type, 0.1),
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: `24-Hour ${energy.name} Generation Profile`
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Power Generation (kWh)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Time of Day'
                        }
                    }
                }
            }
        });
    }

    calculateHourlyGeneration(type, farmSize) {
        const systemSize = Math.ceil(farmSize * 5 / 6); // kW
        const hourlyData = new Array(24).fill(0);

        switch (type) {
            case 'solar':
                // Solar generation curve (6 AM to 6 PM)
                for (let hour = 6; hour < 18; hour++) {
                    const efficiency = Math.sin((hour - 6) * Math.PI / 12);
                    hourlyData[hour] = systemSize * efficiency * 0.8; // 80% system efficiency
                }
                break;

            case 'wind':
                // Wind generation (varies by time, typically higher at night)
                for (let hour = 0; hour < 24; hour++) {
                    const baseWind = 0.3 + 0.4 * Math.sin((hour + 18) * Math.PI / 12);
                    hourlyData[hour] = systemSize * baseWind * 0.35; // 35% wind efficiency
                }
                break;

            case 'nuclear':
                // Constant baseload generation
                hourlyData.fill(systemSize * 0.9); // 90% capacity factor
                break;

            case 'hybrid':
                // Combination of solar and wind with battery storage
                for (let hour = 0; hour < 24; hour++) {
                    let generation = 0;
                    
                    // Solar component (60% of system)
                    if (hour >= 6 && hour < 18) {
                        const solarEfficiency = Math.sin((hour - 6) * Math.PI / 12);
                        generation += systemSize * 0.6 * solarEfficiency * 0.8;
                    }
                    
                    // Wind component (25% of system)
                    const windEfficiency = 0.3 + 0.4 * Math.sin((hour + 18) * Math.PI / 12);
                    generation += systemSize * 0.25 * windEfficiency * 0.35;
                    
                    // Battery smoothing (15% of system for storage)
                    const averageGeneration = systemSize * 0.4;
                    generation = Math.min(generation + systemSize * 0.15, averageGeneration * 1.2);
                    
                    hourlyData[hour] = generation;
                }
                break;
        }

        return hourlyData;
    }

    getEnergyColor(type, alpha = 1) {
        const colors = {
            solar: `rgba(245, 158, 11, ${alpha})`,
            wind: `rgba(6, 182, 212, ${alpha})`,
            nuclear: `rgba(139, 92, 246, ${alpha})`,
            hybrid: `rgba(16, 185, 129, ${alpha})`
        };
        return colors[type] || `rgba(107, 114, 128, ${alpha})`;
    }

    generateEnergyReport() {
        if (!this.selectedOption) {
            alert('Please select an energy option first');
            return;
        }

        const energy = this.energyData[this.selectedOption];
        const farmSize = parseFloat(document.getElementById('farmSize')?.value || 2.5);
        const currentLang = window.app ? window.app.currentLanguage : 'en';

        // Calculate comprehensive metrics
        const systemSize = Math.ceil(farmSize * 5 / 6);
        const totalCost = systemSize * energy.costPerKW;
        const subsidyAmount = Math.min(totalCost * 0.7, 200000);
        const netCost = totalCost - subsidyAmount;
        const annualGeneration = systemSize * 365 * 6; // Assuming 6 hours average
        const annualSavings = annualGeneration * 8;
        const carbonSavings = annualGeneration * 0.5; // kg CO2 per kWh

        const report = {
            energyType: this.selectedOption,
            farmSize: farmSize,
            systemSize: systemSize,
            totalCost: totalCost,
            subsidyAmount: subsidyAmount,
            netCost: netCost,
            annualGeneration: annualGeneration,
            annualSavings: annualSavings,
            carbonSavings: carbonSavings,
            paybackPeriod: Math.ceil(netCost / annualSavings),
            roi: ((annualSavings * energy.lifespan - netCost) / netCost * 100).toFixed(1)
        };

        // Display report in modal or new section
        this.displayEnergyReport(report);
        
        return report;
    }

    displayEnergyReport(report) {
        const currentLang = window.app ? window.app.currentLanguage : 'en';
        const energy = this.energyData[report.energyType];
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3>${energy.icon} ${currentLang === 'hi' ? 'ऊर्जा समाधान रिपोर्ट' : 'Energy Solution Report'}</h3>
                    <button class="close-btn" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
                </div>
                <div style="padding: 1rem 0;">
                    <div style="display: grid; gap: 1rem;">
                        <div style="background: #F8FAFC; padding: 1rem; border-radius: 0.5rem;">
                            <h4 style="margin: 0 0 0.5rem 0;">${currentLang === 'hi' ? 'सिस्टम विवरण' : 'System Details'}</h4>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.875rem;">
                                <div><strong>${currentLang === 'hi' ? 'खेत का आकार' : 'Farm Size'}:</strong> ${report.farmSize} ha</div>
                                <div><strong>${currentLang === 'hi' ? 'सिस्टम आकार' : 'System Size'}:</strong> ${report.systemSize} kW</div>
                                <div><strong>${currentLang === 'hi' ? 'वार्षिक उत्पादन' : 'Annual Generation'}:</strong> ${report.annualGeneration.toLocaleString()} kWh</div>
                                <div><strong>${currentLang === 'hi' ? 'दक्षता' : 'Efficiency'}:</strong> ${energy.efficiency}%</div>
                            </div>
                        </div>
                        
                        <div style="background: #F0FDF4; padding: 1rem; border-radius: 0.5rem;">
                            <h4 style="margin: 0 0 0.5rem 0;">${currentLang === 'hi' ? 'वित्तीय विश्लेषण' : 'Financial Analysis'}</h4>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.875rem;">
                                <div><strong>${currentLang === 'hi' ? 'कुल लागत' : 'Total Cost'}:</strong> ₹${report.totalCost.toLocaleString()}</div>
                                <div><strong>${currentLang === 'hi' ? 'सब्सिडी' : 'Subsidy'}:</strong> ₹${report.subsidyAmount.toLocaleString()}</div>
                                <div><strong>${currentLang === 'hi' ? 'शुद्ध लागत' : 'Net Cost'}:</strong> ₹${report.netCost.toLocaleString()}</div>
                                <div><strong>${currentLang === 'hi' ? 'वार्षिक बचत' : 'Annual Savings'}:</strong> ₹${report.annualSavings.toLocaleString()}</div>
                                <div><strong>${currentLang === 'hi' ? 'पेबैक अवधि' : 'Payback Period'}:</strong> ${report.paybackPeriod} ${currentLang === 'hi' ? 'साल' : 'years'}</div>
                                <div><strong>ROI:</strong> ${report.roi}%</div>
                            </div>
                        </div>
                        
                        <div style="background: #EBF8FF; padding: 1rem; border-radius: 0.5rem;">
                            <h4 style="margin: 0 0 0.5rem 0;">${currentLang === 'hi' ? 'पर्यावरणीय प्रभाव' : 'Environmental Impact'}</h4>
                            <div style="font-size: 0.875rem;">
                                <div><strong>${currentLang === 'hi' ? 'वार्षिक कार्बन बचत' : 'Annual Carbon Savings'}:</strong> ${report.carbonSavings.toLocaleString()} kg CO₂</div>
                                <div><strong>${currentLang === 'hi' ? 'जीवनकाल कार्बन बचत' : 'Lifetime Carbon Savings'}:</strong> ${(report.carbonSavings * energy.lifespan).toLocaleString()} kg CO₂</div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 1rem; text-align: center;">
                        <button class="btn btn-primary" onclick="window.energySolutions.downloadReport(${JSON.stringify(report).replace(/"/g, '&quot;')})">
                            ${currentLang === 'hi' ? 'रिपोर्ट डाउनलोड करें' : 'Download Report'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    downloadReport(report) {
        const energy = this.energyData[report.energyType];
        const currentLang = window.app ? window.app.currentLanguage : 'en';
        
        const reportContent = `
DesertSmart AgriHub - Energy Solution Report
==========================================

Energy Type: ${energy.name}
Farm Size: ${report.farmSize} hectares
System Size: ${report.systemSize} kW

Financial Analysis:
- Total Cost: ₹${report.totalCost.toLocaleString()}
- Subsidy Amount: ₹${report.subsidyAmount.toLocaleString()}
- Net Cost: ₹${report.netCost.toLocaleString()}
- Annual Savings: ₹${report.annualSavings.toLocaleString()}
- Payback Period: ${report.paybackPeriod} years
- ROI: ${report.roi}%

Technical Specifications:
- Efficiency: ${energy.efficiency}%
- Lifespan: ${energy.lifespan} years
- Annual Generation: ${report.annualGeneration.toLocaleString()} kWh

Environmental Impact:
- Annual Carbon Savings: ${report.carbonSavings.toLocaleString()} kg CO₂
- Lifetime Carbon Savings: ${(report.carbonSavings * energy.lifespan).toLocaleString()} kg CO₂

Generated on: ${new Date().toLocaleDateString()}
        `;

        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `energy-solution-report-${report.energyType}-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Global functions for HTML onclick handlers
function selectEnergyOption(type) {
    if (window.energySolutions) {
        window.energySolutions.selectEnergyOption(type);
    }
}

// Initialize energy solutions
document.addEventListener('DOMContentLoaded', () => {
    window.energySolutions = new EnergySolutions();
});