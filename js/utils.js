function setLanguage(lang) {
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.lang-btn[onclick="setLanguage('${lang}')"]`).classList.add('active');
}

async function fetchWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const res = await fetch(url);
    return res.json();
}
window.setLanguage = setLanguage;
window.fetchWeather = fetchWeather;
// Utility Functions for DesertSmart AgriHub
class Utils {
    // Weather simulation utilities
    static simulateWeatherData(location = 'rajasthan') {
        const baseTemp = location === 'rajasthan' ? 42 : 38;
        const baseHumidity = location === 'rajasthan' ? 15 : 20;
        
        return {
            temperature: baseTemp + (Math.random() - 0.5) * 10,
            humidity: baseHumidity + (Math.random() - 0.5) * 10,
            windSpeed: 8 + Math.random() * 15,
            uvIndex: 8 + Math.random() * 3,
            rainfall: Math.random() * 5, // Very low for desert
            soilTemperature: baseTemp + 5 + (Math.random() - 0.5) * 8
        };
    }

    // Soil data simulation
    static simulateSoilData(cropType = 'pearl-millet') {
        const baseValues = {
            'pearl-millet': { moisture: 30, ph: 7.0, nitrogen: 150, phosphorus: 25, potassium: 200 },
            'quinoa': { moisture: 25, ph: 7.5, nitrogen: 120, phosphorus: 30, potassium: 180 },
            'date-palm': { moisture: 45, ph: 7.8, nitrogen: 200, phosphorus: 40, potassium: 250 },
            'chickpea': { moisture: 35, ph: 7.2, nitrogen: 100, phosphorus: 35, potassium: 220 }
        };

        const base = baseValues[cropType] || baseValues['pearl-millet'];
        
        return {
            moisture: Math.max(15, base.moisture + (Math.random() - 0.5) * 20),
            ph: Math.max(6.0, Math.min(8.5, base.ph + (Math.random() - 0.5) * 1.5)),
            nitrogen: Math.max(50, base.nitrogen + (Math.random() - 0.5) * 100),
            phosphorus: Math.max(10, base.phosphorus + (Math.random() - 0.5) * 20),
            potassium: Math.max(100, base.potassium + (Math.random() - 0.5) * 100),
            salinity: 0.5 + Math.random() * 2.0,
            organicMatter: 1.0 + Math.random() * 2.0
        };
    }

    // Water requirement calculation
    static calculateWaterRequirement(cropType, area, soilMoisture, weather) {
        const baseRequirements = {
            'pearl-millet': 120, // liters per hectare per day
            'quinoa': 100,
            'date-palm': 200,
            'chickpea': 140,
            'sorghum': 110,
            'barley': 130
        };

        const baseReq = baseRequirements[cropType] || 120;
        
        // Adjust for soil moisture
        const moistureMultiplier = Math.max(0.3, 1.2 - (soilMoisture / 100));
        
        // Adjust for weather conditions
        const tempMultiplier = Math.max(0.8, 1 + (weather.temperature - 35) / 50);
        const humidityMultiplier = Math.max(0.8, 1.5 - (weather.humidity / 100));
        
        return Math.round(baseReq * area * moistureMultiplier * tempMultiplier * humidityMultiplier);
    }

    // Irrigation scheduling
    static generateIrrigationSchedule(crops, weatherForecast) {
        const schedule = [];
        const now = new Date();
        
        crops.forEach(crop => {
            for (let i = 0; i < 7; i++) {
                const date = new Date(now);
                date.setDate(date.getDate() + i);
                
                const weather = weatherForecast[i] || Utils.simulateWeatherData();
                const soilData = Utils.simulateSoilData(crop.type);
                
                if (soilData.moisture < 35 || i % 2 === 0) {
                    const waterReq = Utils.calculateWaterRequirement(crop.type, crop.area, soilData.moisture, weather);
                    
                    // Optimal irrigation time (early morning)
                    const irrigationTime = new Date(date);
                    irrigationTime.setHours(6, 0, 0, 0);
                    
                    schedule.push({
                        date: irrigationTime,
                        cropType: crop.type,
                        area: crop.area,
                        waterAmount: waterReq,
                        duration: Math.round(waterReq / 10), // 10L/min flow rate
                        priority: soilData.moisture < 25 ? 'High' : 'Medium',
                        reason: soilData.moisture < 25 ? 'Critical moisture level' : 'Scheduled irrigation'
                    });
                }
            }
        });
        
        return schedule.sort((a, b) => a.date - b.date);
    }

    // Market price simulation
    static simulateMarketPrices() {
        const basePrices = {
            'pearl-millet': 2500,
            'quinoa': 10000,
            'date-palm': 200, // per kg
            'chickpea': 5000,
            'sorghum': 2200,
            'barley': 2000
        };

        const prices = {};
        
        Object.keys(basePrices).forEach(crop => {
            const basePrice = basePrices[crop];
            const variation = (Math.random() - 0.5) * 0.3; // ±15% variation
            prices[crop] = Math.round(basePrice * (1 + variation));
        });

        return prices;
    }

    // Crop recommendation algorithm
    static getCropRecommendations(location, soilType, waterAvailability, budget) {
        const crops = [
            {
                name: 'Pearl Millet',
                score: 0,
                waterEfficiency: 9,
                heatTolerance: 10,
                soilAdaptability: 8,
                marketDemand: 7,
                profitability: 6
            },
            {
                name: 'Quinoa',
                score: 0,
                waterEfficiency: 8,
                heatTolerance: 7,
                soilAdaptability: 9,
                marketDemand: 9,
                profitability: 9
            },
            {
                name: 'Date Palm',
                score: 0,
                waterEfficiency: 6,
                heatTolerance: 10,
                soilAdaptability: 7,
                marketDemand: 8,
                profitability: 10
            },
            {
                name: 'Chickpea',
                score: 0,
                waterEfficiency: 7,
                heatTolerance: 6,
                soilAdaptability: 8,
                marketDemand: 8,
                profitability: 7
            }
        ];

        // Scoring algorithm
        crops.forEach(crop => {
            let score = 0;
            
            // Water availability scoring
            if (waterAvailability === 'low') {
                score += crop.waterEfficiency * 2;
            } else if (waterAvailability === 'medium') {
                score += crop.waterEfficiency * 1.5;
            }
            
            // Location-based scoring
            if (location.includes('rajasthan') || location.includes('desert')) {
                score += crop.heatTolerance * 2;
            }
            
            // Soil type scoring
            score += crop.soilAdaptability * 1.5;
            
            // Market demand scoring
            score += crop.marketDemand * 1.2;
            
            // Profitability scoring
            if (budget === 'high') {
                score += crop.profitability * 2;
            } else {
                score += crop.profitability * 1;
            }
            
            crop.score = Math.round(score);
        });

        return crops.sort((a, b) => b.score - a.score);
    }

    // Data validation utilities
    static validateFarmData(data) {
        const errors = [];
        
        if (!data.farmSize || data.farmSize <= 0) {
            errors.push('Farm size must be greater than 0');
        }
        
        if (!data.location || data.location.trim() === '') {
            errors.push('Location is required');
        }
        
        if (!data.soilType) {
            errors.push('Soil type is required');
        }
        
        if (!data.waterSource) {
            errors.push('Water source is required');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    // Local storage utilities
    static saveToLocalStorage(key, data) {
        try {
            const serializedData = JSON.stringify({
                data: data,
                timestamp: Date.now()
            });
            localStorage.setItem(`desert-smart-${key}`, serializedData);
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    }

    static loadFromLocalStorage(key, maxAge = 3600000) { // 1 hour default
        try {
            const item = localStorage.getItem(`desert-smart-${key}`);
            if (!item) return null;
            
            const parsed = JSON.parse(item);
            const isExpired = Date.now() - parsed.timestamp > maxAge;
            
            if (isExpired) {
                localStorage.removeItem(`desert-smart-${key}`);
                return null;
            }
            
            return parsed.data;
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return null;
        }
    }

    // Format utilities
    static formatCurrency(amount, currency = 'INR') {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0
        }).format(amount);
    }

    static formatDate(date, locale = 'en-IN') {
        return new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    }

    static formatTime(date, locale = 'en-IN') {
        return new Intl.DateTimeFormat(locale, {
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }

    // API simulation utilities
    static async simulateApiCall(endpoint, data = null, delay = 1000) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Simulate different responses based on endpoint
        switch (endpoint) {
            case 'weather':
                return Utils.simulateWeatherData(data?.location);
            case 'soil':
                return Utils.simulateSoilData(data?.cropType);
            case 'market-prices':
                return Utils.simulateMarketPrices();
            case 'crop-recommendations':
                return Utils.getCropRecommendations(
                    data?.location, 
                    data?.soilType, 
                    data?.waterAvailability, 
                    data?.budget
                );
            default:
                return { success: true, data: {} };
        }
    }

    // Offline detection utilities
    static isOnline() {
        return navigator.onLine;
    }

    static onOnlineStatusChange(callback) {
        window.addEventListener('online', () => callback(true));
        window.addEventListener('offline', () => callback(false));
    }

    // PWA utilities
    static isPWA() {
        return window.matchMedia('(display-mode: standalone)').matches;
    }

    static async installPWA() {
        if (window.deferredPrompt) {
            window.deferredPrompt.prompt();
            const choiceResult = await window.deferredPrompt.userChoice;
            window.deferredPrompt = null;
            return choiceResult.outcome === 'accepted';
        }
        return false;
    }

    // Geolocation utilities
    static async getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported'));
                return;
            }
            
            navigator.geolocation.getCurrentPosition(
                position => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    });
                },
                error => {
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 600000 // 10 minutes
                }
            );
        });
    }

    // Performance monitoring
    static measurePerformance(name, fn) {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        console.log(`${name} took ${end - start} milliseconds`);
        return result;
    }

    // Error handling utilities
    static handleError(error, context = 'Unknown') {
        console.error(`Error in ${context}:`, error);
        
        // In a real app, this would send to error tracking service
        Utils.saveToLocalStorage('error-log', {
            context: context,
            message: error.message,
            stack: error.stack,
            timestamp: Date.now()
        });
    }

    // Analytics utilities (for tracking user interactions)
    static trackEvent(eventName, properties = {}) {
        // In a real app, this would send to analytics service
        console.log('Event tracked:', eventName, properties);
        
        // Save to local storage for offline analysis
        const events = Utils.loadFromLocalStorage('analytics-events') || [];
        events.push({
            name: eventName,
            properties: properties,
            timestamp: Date.now()
        });
        
        // Keep only last 100 events
        const recentEvents = events.slice(-100);
        Utils.saveToLocalStorage('analytics-events', recentEvents);
    }
}

// Export utilities for use in other modules
window.Utils = Utils;