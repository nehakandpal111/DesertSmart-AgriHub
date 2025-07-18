function renderIrrigationChart(data) {
    new Chart(document.getElementById('irrigationChart'), {
        type: 'bar',
        data: { labels: data.labels, datasets: [{ label: 'Irrigation (L)', data: data.values }] }
    });
}
window.renderIrrigationChart = renderIrrigationChart;
// Chart Management System for DesertSmart AgriHub
class ChartManager {
    constructor() {
        this.charts = {};
        this.init();
    }

    init() {
        // Set Chart.js defaults
        Chart.defaults.font.family = 'Inter, sans-serif';
        Chart.defaults.color = '#374151';
        Chart.defaults.plugins.legend.position = 'bottom';
    }

    createIrrigationChart(data) {
        const ctx = document.getElementById('irrigationChart');
        if (!ctx) return;

        if (this.charts.irrigation) {
            this.charts.irrigation.destroy();
        }

        const currentLang = window.app ? window.app.currentLanguage : 'en';
        
        this.charts.irrigation = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [
                    currentLang === 'hi' ? 'उपयोग किया गया' : 'Used',
                    currentLang === 'hi' ? 'बचाया गया' : 'Saved',
                    currentLang === 'hi' ? 'अनुशंसित' : 'Recommended'
                ],
                datasets: [{
                    data: [
                        data.waterUsed || 145,
                        data.waterSaved || 85,
                        data.waterRecommended || 60
                    ],
                    backgroundColor: [
                        '#EF4444',
                        '#10B981',
                        '#3B82F6'
                    ],
                    borderColor: [
                        '#DC2626',
                        '#059669',
                        '#2563EB'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: currentLang === 'hi' ? 'दैनिक जल उपयोग (लीटर)' : 'Daily Water Usage (Liters)',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ${value}L (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    createWeatherChart(weatherData) {
        const ctx = document.getElementById('weatherChart');
        if (!ctx) return;

        if (this.charts.weather) {
            this.charts.weather.destroy();
        }

        const currentLang = window.app ? window.app.currentLanguage : 'en';
        const days = Array.from({length: 7}, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);
            return date.toLocaleDateString('en-US', { weekday: 'short' });
        });

        this.charts.weather = new Chart(ctx, {
            type: 'line',
            data: {
                labels: days,
                datasets: [
                    {
                        label: currentLang === 'hi' ? 'तापमान (°C)' : 'Temperature (°C)',
                        data: weatherData.temperature || [42, 44, 41, 43, 45, 42, 40],
                        borderColor: '#EF4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        yAxisID: 'y'
                    },
                    {
                        label: currentLang === 'hi' ? 'नमी (%)' : 'Humidity (%)',
                        data: weatherData.humidity || [15, 12, 18, 14, 10, 16, 20],
                        borderColor: '#06B6D4',
                        backgroundColor: 'rgba(6, 182, 212, 0.1)',
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    title: {
                        display: true,
                        text: currentLang === 'hi' ? '7-दिन मौसम पूर्वानुमान' : '7-Day Weather Forecast',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: currentLang === 'hi' ? 'दिन' : 'Days'
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: currentLang === 'hi' ? 'तापमान (°C)' : 'Temperature (°C)'
                        },
                        grid: {
                            drawOnChartArea: false,
                        },
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: currentLang === 'hi' ? 'नमी (%)' : 'Humidity (%)'
                        },
                        grid: {
                            drawOnChartArea: false,
                        },
                    }
                }
            }
        });
    }

    createCropYieldChart(cropData) {
        const ctx = document.getElementById('cropYieldChart');
        if (!ctx) return;

        if (this.charts.cropYield) {
            this.charts.cropYield.destroy();
        }

        const currentLang = window.app ? window.app.currentLanguage : 'en';
        
        this.charts.cropYield = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [
                    currentLang === 'hi' ? 'बाजरा' : 'Pearl Millet',
                    currentLang === 'hi' ? 'क्विनोआ' : 'Quinoa',
                    currentLang === 'hi' ? 'खजूर' : 'Date Palm',
                    currentLang === 'hi' ? 'चना' : 'Chickpea'
                ],
                datasets: [
                    {
                        label: currentLang === 'hi' ? 'वर्तमान उत्पादन (kg/ha)' : 'Current Yield (kg/ha)',
                        data: cropData.currentYield || [800, 1000, 5000, 1200],
                        backgroundColor: '#94A3B8'
                    },
                    {
                        label: currentLang === 'hi' ? 'AI अनुकूलित उत्पादन (kg/ha)' : 'AI Optimized Yield (kg/ha)',
                        data: cropData.optimizedYield || [1200, 1500, 8000, 1800],
                        backgroundColor: '#10B981'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: currentLang === 'hi' ? 'फसल उत्पादन तुलना' : 'Crop Yield Comparison',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: currentLang === 'hi' ? 'उत्पादन (kg/ha)' : 'Yield (kg/ha)'
                        }
                    }
                }
            }
        });
    }

    createEnergyMixChart(energyData) {
        const ctx = document.getElementById('energyMixChart');
        if (!ctx) return;

        if (this.charts.energyMix) {
            this.charts.energyMix.destroy();
        }

        const currentLang = window.app ? window.app.currentLanguage : 'en';
        
        this.charts.energyMix = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [
                    currentLang === 'hi' ? 'सौर ऊर्जा' : 'Solar',
                    currentLang === 'hi' ? 'पवन ऊर्जा' : 'Wind',
                    currentLang === 'hi' ? 'ग्रिड' : 'Grid',
                    currentLang === 'hi' ? 'बैटरी' : 'Battery'
                ],
                datasets: [{
                    data: energyData.mix || [60, 25, 10, 5],
                    backgroundColor: [
                        '#F59E0B',
                        '#06B6D4',
                        '#6B7280',
                        '#8B5CF6'
                    ],
                    borderColor: [
                        '#D97706',
                        '#0891B2',
                        '#4B5563',
                        '#7C3AED'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: currentLang === 'hi' ? 'ऊर्जा मिश्रण (%)' : 'Energy Mix (%)',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                return `${label}: ${value}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    createResourceEfficiencyChart(efficiencyData) {
        const ctx = document.getElementById('resourceEfficiencyChart');
        if (!ctx) return;

        if (this.charts.resourceEfficiency) {
            this.charts.resourceEfficiency.destroy();
        }

        const currentLang = window.app ? window.app.currentLanguage : 'en';
        
        this.charts.resourceEfficiency = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    currentLang === 'hi' ? 'जल दक्षता' : 'Water Efficiency',
                    currentLang === 'hi' ? 'ऊर्जा दक्षता' : 'Energy Efficiency',
                    currentLang === 'hi' ? 'मिट्टी स्वास्थ्य' : 'Soil Health',
                    currentLang === 'hi' ? 'फसल उत्पादकता' : 'Crop Productivity',
                    currentLang === 'hi' ? 'लागत प्रभावशीलता' : 'Cost Effectiveness',
                    currentLang === 'hi' ? 'स्थिरता' : 'Sustainability'
                ],
                datasets: [
                    {
                        label: currentLang === 'hi' ? 'वर्तमान' : 'Current',
                        data: efficiencyData.current || [60, 45, 70, 55, 65, 50],
                        borderColor: '#EF4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.2)',
                        pointBackgroundColor: '#EF4444'
                    },
                    {
                        label: currentLang === 'hi' ? 'AI अनुकूलित' : 'AI Optimized',
                        data: efficiencyData.optimized || [87, 92, 85, 89, 83, 90],
                        borderColor: '#10B981',
                        backgroundColor: 'rgba(16, 185, 129, 0.2)',
                        pointBackgroundColor: '#10B981'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: currentLang === 'hi' ? 'संसाधन दक्षता विश्लेषण' : 'Resource Efficiency Analysis',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                }
            }
        });
    }

    createCostBenefitChart(costData) {
        const ctx = document.getElementById('costBenefitChart');
        if (!ctx) return;

        if (this.charts.costBenefit) {
            this.charts.costBenefit.destroy();
        }

        const currentLang = window.app ? window.app.currentLanguage : 'en';
        const years = Array.from({length: 10}, (_, i) => `Year ${i + 1}`);
        
        this.charts.costBenefit = new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [
                    {
                        label: currentLang === 'hi' ? 'संचयी लागत' : 'Cumulative Cost',
                        data: costData.cumulativeCost || [100000, 110000, 120000, 130000, 140000, 150000, 160000, 170000, 180000, 190000],
                        borderColor: '#EF4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        fill: false
                    },
                    {
                        label: currentLang === 'hi' ? 'संचयी बचत' : 'Cumulative Savings',
                        data: costData.cumulativeSavings || [0, 25000, 55000, 90000, 130000, 175000, 225000, 280000, 340000, 405000],
                        borderColor: '#10B981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    title: {
                        display: true,
                        text: currentLang === 'hi' ? '10-वर्षीय लागत-लाभ विश्लेषण' : '10-Year Cost-Benefit Analysis',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: currentLang === 'hi' ? 'राशि (₹)' : 'Amount (₹)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '₹' + (value / 1000) + 'K';
                            }
                        }
                    }
                }
            }
        });
    }

    updateAllCharts() {
        // Update all charts with fresh data
        this.createIrrigationChart({
            waterUsed: 145,
            waterSaved: 85,
            waterRecommended: 60
        });

        this.createWeatherChart({
            temperature: [42, 44, 41, 43, 45, 42, 40],
            humidity: [15, 12, 18, 14, 10, 16, 20]
        });

        this.createCropYieldChart({
            currentYield: [800, 1000, 5000, 1200],
            optimizedYield: [1200, 1500, 8000, 1800]
        });

        this.createEnergyMixChart({
            mix: [60, 25, 10, 5]
        });

        this.createResourceEfficiencyChart({
            current: [60, 45, 70, 55, 65, 50],
            optimized: [87, 92, 85, 89, 83, 90]
        });

        this.createCostBenefitChart({
            cumulativeCost: [100000, 110000, 120000, 130000, 140000, 150000, 160000, 170000, 180000, 190000],
            cumulativeSavings: [0, 25000, 55000, 90000, 130000, 175000, 225000, 280000, 340000, 405000]
        });
    }

    destroyChart(chartName) {
        if (this.charts[chartName]) {
            this.charts[chartName].destroy();
            delete this.charts[chartName];
        }
    }

    destroyAllCharts() {
        Object.keys(this.charts).forEach(chartName => {
            this.destroyChart(chartName);
        });
    }

    exportChart(chartName, filename) {
        const chart = this.charts[chartName];
        if (!chart) return;

        const url = chart.toBase64Image();
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || `${chartName}-chart.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    // Utility method to create heatmap for soil moisture
    createSoilMoistureHeatmap(containerId, data) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Clear existing content
        container.innerHTML = '';

        // Create grid for heatmap
        const grid = document.createElement('div');
        grid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(10, 1fr);
            gap: 2px;
            padding: 1rem;
            background: #F3F4F6;
            border-radius: 0.5rem;
        `;

        // Generate heatmap cells
        for (let i = 0; i < 100; i++) {
            const cell = document.createElement('div');
            const moisture = data[i] || (20 + Math.random() * 40); // Random moisture if no data
            
            // Color based on moisture level
            let color;
            if (moisture < 25) color = '#EF4444'; // Red - dry
            else if (moisture < 50) color = '#F59E0B'; // Orange - moderate
            else if (moisture < 75) color = '#10B981'; // Green - good
            else color = '#3B82F6'; // Blue - wet

            cell.style.cssText = `
                aspect-ratio: 1;
                background: ${color};
                border-radius: 2px;
                opacity: ${0.3 + (moisture / 100) * 0.7};
                cursor: pointer;
                transition: transform 0.2s;
            `;

            cell.title = `Moisture: ${moisture.toFixed(1)}%`;
            cell.addEventListener('mouseenter', () => {
                cell.style.transform = 'scale(1.1)';
            });
            cell.addEventListener('mouseleave', () => {
                cell.style.transform = 'scale(1)';
            });

            grid.appendChild(cell);
        }

        // Add legend
        const legend = document.createElement('div');
        legend.style.cssText = `
            display: flex;
            justify-content: space-between;
            margin-top: 0.5rem;
            font-size: 0.75rem;
            color: #6B7280;
        `;
        legend.innerHTML = `
            <span style="display: flex; align-items: center;">
                <div style="width: 12px; height: 12px; background: #EF4444; margin-right: 4px; border-radius: 2px;"></div>
                Dry (&lt;25%)
            </span>
            <span style="display: flex; align-items: center;">
                <div style="width: 12px; height: 12px; background: #F59E0B; margin-right: 4px; border-radius: 2px;"></div>
                Moderate (25-50%)
            </span>
            <span style="display: flex; align-items: center;">
                <div style="width: 12px; height: 12px; background: #10B981; margin-right: 4px; border-radius: 2px;"></div>
                Good (50-75%)
            </span>
            <span style="display: flex; align-items: center;">
                <div style="width: 12px; height: 12px; background: #3B82F6; margin-right: 4px; border-radius: 2px;"></div>
                Wet (&gt;75%)
            </span>
        `;

        container.appendChild(grid);
        container.appendChild(legend);
    }
}

// Initialize chart manager
document.addEventListener('DOMContentLoaded', () => {
    window.chartManager = new ChartManager();
    
    // Update charts when tab changes
    const originalShowTab = window.showTab;
    window.showTab = function(tabName) {
        if (originalShowTab) originalShowTab(tabName);
        
        // Update charts after a short delay to ensure DOM is ready
        setTimeout(() => {
            if (window.chartManager) {
                window.chartManager.updateAllCharts();
            }
        }, 100);
    };
});