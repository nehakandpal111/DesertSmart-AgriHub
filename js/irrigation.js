// Irrigation Management System
class IrrigationManager {
    constructor() {
        this.map = null;
        this.irrigationZones = [];
        this.schedule = [];
        this.sensors = [];
        this.init();
    }

    init() {
        this.generateMockSensors();
        this.generateIrrigationSchedule();
    }

    generateMockSensors() {
        // Generate mock sensor data for different zones
        const zones = [
            { name: 'Zone A', lat: 26.9124, lng: 75.7873, crop: 'Pearl Millet' },
            { name: 'Zone B', lat: 26.9224, lng: 75.7973, crop: 'Quinoa' },
            { name: 'Zone C', lat: 26.9324, lng: 75.8073, crop: 'Date Palm' },
            { name: 'Zone D', lat: 26.9424, lng: 75.8173, crop: 'Chickpea' }
        ];

        this.sensors = zones.map(zone => ({
            ...zone,
            moisture: 25 + Math.random() * 30,
            temperature: 35 + Math.random() * 10,
            ph: 6.5 + Math.random() * 2,
            salinity: 0.5 + Math.random() * 1.5,
            lastWatered: new Date(Date.now() - Math.random() * 86400000 * 3)
        }));
    }

    generateIrrigationSchedule() {
        const now = new Date();
        const scheduleItems = [];

        this.sensors.forEach((sensor, index) => {
            const recommendation = this.calculateIrrigationRecommendation(sensor);
            
            // Generate schedule for next 7 days
            for (let i = 0; i < 7; i++) {
                const date = new Date(now);
                date.setDate(date.getDate() + i);
                
                if (recommendation.shouldIrrigate || Math.random() > 0.7) {
                    const scheduleTime = new Date(date);
                    scheduleTime.setHours(recommendation.optimalHour, 0, 0, 0);
                    
                    scheduleItems.push({
                        zone: sensor.name,
                        crop: sensor.crop,
                        date: scheduleTime,
                        duration: recommendation.duration,
                        waterAmount: recommendation.waterAmount,
                        priority: recommendation.priority,
                        reason: recommendation.reason
                    });
                }
            }
        });

        this.schedule = scheduleItems.sort((a, b) => a.date - b.date);
    }

    calculateIrrigationRecommendation(sensor) {
        const moistureThreshold = this.getMoistureThreshold(sensor.crop);
        const daysSinceWatered = (Date.now() - sensor.lastWatered) / (1000 * 60 * 60 * 24);
        
        const shouldIrrigate = sensor.moisture < moistureThreshold || daysSinceWatered > 3;
        
        // Optimal irrigation time (early morning for desert conditions)
        const optimalHour = 5 + Math.floor(Math.random() * 3); // 5-7 AM
        
        // Calculate water amount based on crop type and soil moisture
        const baseAmount = this.getBaseWaterAmount(sensor.crop);
        const moistureMultiplier = Math.max(0.5, 1 - (sensor.moisture / 100));
        const waterAmount = Math.round(baseAmount * moistureMultiplier);
        
        // Duration in minutes
        const duration = Math.round(waterAmount / 10); // Assuming 10L per minute flow rate
        
        let priority = 'Medium';
        let reason = 'Scheduled maintenance irrigation';
        
        if (sensor.moisture < moistureThreshold * 0.7) {
            priority = 'High';
            reason = 'Critical moisture levels detected';
        } else if (daysSinceWatered > 5) {
            priority = 'High';
            reason = 'Extended dry period';
        } else if (sensor.moisture < moistureThreshold) {
            priority = 'Medium';
            reason = 'Moisture below optimal threshold';
        }

        return {
            shouldIrrigate,
            optimalHour,
            duration,
            waterAmount,
            priority,
            reason
        };
    }

    getMoistureThreshold(crop) {
        const thresholds = {
            'Pearl Millet': 30,
            'Quinoa': 25,
            'Date Palm': 40,
            'Chickpea': 35,
            'Sorghum': 28,
            'Barley': 32
        };
        return thresholds[crop] || 30;
    }

    getBaseWaterAmount(crop) {
        const baseAmounts = {
            'Pearl Millet': 120,
            'Quinoa': 100,
            'Date Palm': 200,
            'Chickpea': 140,
            'Sorghum': 110,
            'Barley': 130
        };
        return baseAmounts[crop] || 120;
    }

    renderSchedule() {
        const container = document.getElementById('scheduleGrid');
        if (!container) return;

        const upcomingSchedule = this.schedule.slice(0, 10); // Show next 10 irrigation events
        
        container.innerHTML = upcomingSchedule.map(item => {
            const date = item.date.toLocaleDateString();
            const time = item.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const priorityClass = item.priority.toLowerCase();
            
            return `
                <div class="schedule-item ${priorityClass}" data-priority="${item.priority}">
                    <div class="schedule-header">
                        <span class="schedule-zone">${item.zone}</span>
                        <span class="schedule-priority priority-${priorityClass}">${item.priority}</span>
                    </div>
                    <div class="schedule-details">
                        <div class="schedule-time">${date} at ${time}</div>
                        <div class="schedule-crop">${item.crop}</div>
                        <div class="schedule-amount">${item.waterAmount}L • ${item.duration} min</div>
                        <div class="schedule-reason">${item.reason}</div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// Initialize irrigation map
function initIrrigationMap() {
    if (document.getElementById('irrigationMap') && !window.irrigationMap) {
        // Initialize map centered on Rajasthan (desert region)
        window.irrigationMap = L.map('irrigationMap').setView([26.9124, 75.7873], 13);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(window.irrigationMap);
        
        // Add irrigation zones
        const irrigationManager = new IrrigationManager();
        
        irrigationManager.sensors.forEach(sensor => {
            const moistureColor = sensor.moisture > 40 ? '#10B981' : 
                                 sensor.moisture > 25 ? '#F59E0B' : '#EF4444';
            
            const marker = L.circleMarker([sensor.lat, sensor.lng], {
                color: moistureColor,
                fillColor: moistureColor,
                fillOpacity: 0.7,
                radius: 8
            }).addTo(window.irrigationMap);
            
            const popupContent = `
                <div class="sensor-popup">
                    <h4>${sensor.name}</h4>
                    <p><strong>Crop:</strong> ${sensor.crop}</p>
                    <p><strong>Moisture:</strong> ${sensor.moisture.toFixed(1)}%</p>
                    <p><strong>Temperature:</strong> ${sensor.temperature.toFixed(1)}°C</p>
                    <p><strong>pH:</strong> ${sensor.ph.toFixed(1)}</p>
                    <p><strong>Salinity:</strong> ${sensor.salinity.toFixed(2)} dS/m</p>
                    <p><strong>Last Watered:</strong> ${sensor.lastWatered.toLocaleDateString()}</p>
                </div>
            `;
            
            marker.bindPopup(popupContent);
        });
        
        // Render irrigation schedule
        irrigationManager.renderSchedule();
    }
}

// Add CSS for irrigation schedule
const irrigationCSS = `
    .schedule-grid {
        display: grid;
        gap: 1rem;
        margin-top: 1.5rem;
    }
    
    .schedule-item {
        background: white;
        border-radius: 0.5rem;
        padding: 1rem;
        border-left: 4px solid #E5E7EB;
        transition: all 0.3s;
    }
    
    .schedule-item:hover {
        transform: translateX(4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .schedule-item.high {
        border-left-color: #EF4444;
    }
    
    .schedule-item.medium {
        border-left-color: #F59E0B;
    }
    
    .schedule-item.low {
        border-left-color: #10B981;
    }
    
    .schedule-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }
    
    .schedule-zone {
        font-weight: 600;
        color: #1F2937;
    }
    
    .schedule-priority {
        padding: 0.25rem 0.5rem;
        border-radius: 0.375rem;
        font-size: 0.75rem;
        font-weight: 500;
    }
    
    .priority-high {
        background: #FEE2E2;
        color: #DC2626;
    }
    
    .priority-medium {
        background: #FEF3C7;
        color: #D97706;
    }
    
    .priority-low {
        background: #D1FAE5;
        color: #059669;
    }
    
    .schedule-details {
        display: grid;
        gap: 0.25rem;
    }
    
    .schedule-time {
        font-weight: 500;
        color: #374151;
    }
    
    .schedule-crop {
        color: #6B7280;
        font-size: 0.875rem;
    }
    
    .schedule-amount {
        color: #059669;
        font-weight: 500;
        font-size: 0.875rem;
    }
    
    .schedule-reason {
        color: #6B7280;
        font-size: 0.875rem;
        font-style: italic;
    }
    
    .sensor-popup {
        min-width: 200px;
    }
    
    .sensor-popup h4 {
        margin: 0 0 0.5rem 0;
        color: #1F2937;
    }
    
    .sensor-popup p {
        margin: 0.25rem 0;
        font-size: 0.875rem;
    }
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = irrigationCSS;
document.head.appendChild(style);