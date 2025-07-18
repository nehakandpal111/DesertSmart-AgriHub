// --- Tab Navigation ---
window.showTab = function(tab) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    const tabEl = document.getElementById(tab);
    if (tabEl) tabEl.classList.add('active');
    const btn = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.getAttribute('onclick')?.includes(`showTab('${tab}')`));
    if (btn) btn.classList.add('active');
};

// --- Dynamic Dashboard Stats ---
async function updateDashboardStats() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async pos => {
        const { latitude, longitude } = pos.coords;
        const weather = await window.fetchWeather(latitude, longitude);
        // Example: update dashboard with real weather
        document.getElementById('temperature').textContent = weather.current_weather?.temperature ? `${weather.current_weather.temperature}°C` : 'N/A';
        document.getElementById('humidity').textContent = weather.current_weather?.humidity ? `${weather.current_weather.humidity}%` : 'N/A';
        document.getElementById('windSpeed').textContent = weather.current_weather?.windspeed ? `${weather.current_weather.windspeed} km/h` : 'N/A';
        document.getElementById('solarIrradiance').textContent = weather.current_weather?.solar_radiation ? `${weather.current_weather.solar_radiation} W/m²` : 'N/A';
    });
}
window.addEventListener('DOMContentLoaded', updateDashboardStats);

// --- AI Q&A Tool ---
const aiAnswers = {
    'best crop for hot desert': 'Pearl Millet and Quinoa are best for hot deserts due to their drought resistance.',
    'solar energy 10 hours': 'With 10 hours of sunlight, you can generate up to 60-80 kWh per kW of solar panels per week.',
    'improve soil moisture': 'Use drip irrigation, mulching, and organic matter to retain soil moisture in arid regions.',
    'subsidy for solar irrigation': 'Small and marginal farmers are eligible for solar irrigation subsidies. Check the Subsidy tab.',
    'irrigation schedule for chickpea': 'Chickpea in semi-arid zones needs irrigation every 10-15 days, especially at flowering and podding.'
};

document.addEventListener('DOMContentLoaded', () => {
    // AI Q&A
    const aiForm = document.getElementById('aiQuestionForm');
    if (aiForm) {
        aiForm.addEventListener('submit', async e => {
            e.preventDefault();
            const q = document.getElementById('aiQuestion').value.toLowerCase();
            let answer = 'Sorry, I do not have an answer for that yet.';
            for (const key in aiAnswers) {
                if (q.includes(key)) answer = aiAnswers[key];
            }
            document.getElementById('aiAnswer').textContent = answer;
            document.getElementById('aiAnswer').style.display = 'block';
        });
    }

    // Knowledge Hub
    const knowledgeContent = document.getElementById('knowledgeContent');
    if (knowledgeContent) {
        knowledgeContent.innerHTML = `
        <h4>How to Grow Crops in Deserts</h4>
        <ul>
            <li>Choose drought-resistant crops: Pearl Millet, Quinoa, Date Palm, Chickpea.</li>
            <li>Prepare soil with organic matter and mulching.</li>
            <li>Use drip irrigation and water-saving techniques.</li>
            <li>Monitor soil moisture and weather conditions.</li>
            <li>Rotate crops and use GM varieties for climate resilience.</li>
        </ul>
        <h4>Climate-Resilient & GM Crops</h4>
        <ul>
            <li>GM crops are bred for drought, heat, and pest resistance.</li>
            <li>They help maintain yield even in harsh desert climates.</li>
        </ul>
        <h4>Irrigation Support in Desert Areas</h4>
        <ul>
            <li>Drip and sprinkler systems save water.</li>
            <li>Mulching and soil cover reduce evaporation.</li>
            <li>Schedule irrigation for early morning or late evening.</li>
        </ul>
        `;
    }

    // Learn Energy
    const learnEnergyContent = document.getElementById('learnEnergyContent');
    if (learnEnergyContent) {
        learnEnergyContent.innerHTML = `
        <h4>Solar Energy in Deserts</h4>
        <ul>
            <li>Deserts have high solar potential: install photovoltaic panels for reliable energy.</li>
            <li>Low maintenance, long lifespan (25+ years).</li>
        </ul>
        <h4>Wind Energy in Deserts</h4>
        <ul>
            <li>Wind turbines work well in open, windy desert areas.</li>
            <li>Combine with solar for hybrid systems.</li>
        </ul>
        <h4>Micro Nuclear Power</h4>
        <ul>
            <li>Future tech: small modular reactors for baseload power.</li>
            <li>High reliability, but requires government support and safety checks.</li>
        </ul>
        `;
    }

    // Community Q&A
    const communityQnA = document.getElementById('communityQnA');
    if (communityQnA) {
        communityQnA.innerHTML = `
        <form id="communityForm">
            <input type="text" class="form-input" id="communityQuestion" placeholder="Ask a question or share a tip..." required>
            <button type="submit" class="btn btn-primary">Post</button>
        </form>
        <div id="communityPosts"></div>
        `;
        window.loadPosts();
        document.getElementById('communityForm').addEventListener('submit', e => {
            e.preventDefault();
            const q = document.getElementById('communityQuestion').value;
            window.addPost(q);
            document.getElementById('communityQuestion').value = '';
        });
    }
});
// Main Application Logic
class DesertSmartApp {
    constructor() {
        this.currentLanguage = 'en';
        this.isOnline = navigator.onLine;
        this.init();
    }

    init() {
        this.initLanguage();
        this.initOfflineDetection();
        this.initServiceWorker();
        this.loadInitialData();
        this.initEventListeners();
    }

    initLanguage() {
        // Set initial language based on browser preference
        const browserLang = navigator.language.slice(0, 2);
        if (browserLang === 'hi') {
            this.setLanguage('hi');
        }
    }

    initOfflineDetection() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.hideOfflineIndicator();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.showOfflineIndicator();
        });

        if (!this.isOnline) {
            this.showOfflineIndicator();
        }
    }

    initServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered successfully:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }

    showOfflineIndicator() {
        const indicator = document.getElementById('offlineIndicator');
        indicator.classList.add('show');
    }

    hideOfflineIndicator() {
        const indicator = document.getElementById('offlineIndicator');
        indicator.classList.remove('show');
    }

    loadInitialData() {
        this.loadWeatherData();
        this.loadSoilData();
        this.updateDashboardMetrics();
    }

    initEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Auto-refresh data every 5 minutes
        setInterval(() => {
            if (this.isOnline) {
                this.loadWeatherData();
                this.loadSoilData();
                this.updateDashboardMetrics();
            }
        }, 300000);
    }

    async loadWeatherData() {
        try {
            // Simulated weather data for demo
            const weatherData = await this.simulateWeatherAPI();
            this.updateWeatherDisplay(weatherData);
        } catch (error) {
            console.error('Error loading weather data:', error);
            this.loadCachedWeatherData();
        }
    }

    async simulateWeatherAPI() {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate realistic desert weather data
        const baseTemp = 35 + Math.random() * 15; // 35-50°C
        const humidity = 10 + Math.random() * 20; // 10-30%
        const windSpeed = 5 + Math.random() * 15; // 5-20 km/h
        const uvIndex = 7 + Math.random() * 4; // 7-11

        return {
            temperature: Math.round(baseTemp),
            humidity: Math.round(humidity),
            windSpeed: Math.round(windSpeed),
            uvIndex: Math.round(uvIndex),
            condition: this.getWeatherCondition(baseTemp, humidity)
        };
    }

    getWeatherCondition(temp, humidity) {
        if (temp > 45) return 'extreme-heat';
        if (temp > 40) return 'very-hot';
        if (humidity < 15) return 'very-dry';
        return 'hot-dry';
    }

    updateWeatherDisplay(data) {
        document.getElementById('temperature').textContent = `${data.temperature}°C`;
        document.getElementById('humidity').textContent = `${data.humidity}%`;
        document.getElementById('windSpeed').textContent = `${data.windSpeed} km/h`;
        document.getElementById('uvIndex').textContent = `${data.uvIndex} (High)`;

        // Cache data for offline use
        this.cacheData('weather', data);
    }

    async loadSoilData() {
        try {
            // Simulated soil sensor data
            const soilData = await this.simulateSoilSensors();
            this.updateSoilDisplay(soilData);
        } catch (error) {
            console.error('Error loading soil data:', error);
            this.loadCachedSoilData();
        }
    }

    async simulateSoilSensors() {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const moisture = 20 + Math.random() * 30; // 20-50%
        const waterUsage = 100 + Math.random() * 100; // 100-200L
        const efficiency = 70 + Math.random() * 25; // 70-95%

        return {
            moisture: Math.round(moisture),
            waterUsage: Math.round(waterUsage),
            efficiency: Math.round(efficiency)
        };
    }

    updateSoilDisplay(data) {
        document.getElementById('soilMoisture').textContent = `${data.moisture}%`;
        document.getElementById('waterUsage').textContent = `${data.waterUsage}L`;
        document.getElementById('efficiencyScore').textContent = `${data.efficiency}%`;

        this.cacheData('soil', data);
    }

    updateDashboardMetrics() {
        // Update subsidy metrics
        const subsidyData = {
            available: 5 + Math.floor(Math.random() * 5),
            totalAid: 35000 + Math.floor(Math.random() * 20000),
            pending: Math.floor(Math.random() * 3)
        };

        document.getElementById('availableSubsidies').textContent = subsidyData.available;
        document.getElementById('totalAid').textContent = `₹${subsidyData.totalAid.toLocaleString()}`;
        document.getElementById('pendingApps').textContent = subsidyData.pending;

        this.cacheData('subsidies', subsidyData);
    }

    cacheData(key, data) {
        try {
            localStorage.setItem(`desert-smart-${key}`, JSON.stringify({
                data: data,
                timestamp: Date.now()
            }));
        } catch (error) {
            console.error('Error caching data:', error);
        }
    }

    getCachedData(key) {
        try {
            const cached = localStorage.getItem(`desert-smart-${key}`);
            if (cached) {
                const parsed = JSON.parse(cached);
                // Check if data is less than 1 hour old
                if (Date.now() - parsed.timestamp < 3600000) {
                    return parsed.data;
                }
            }
        } catch (error) {
            console.error('Error retrieving cached data:', error);
        }
        return null;
    }

    loadCachedWeatherData() {
        const cached = this.getCachedData('weather');
        if (cached) {
            this.updateWeatherDisplay(cached);
        }
    }

    loadCachedSoilData() {
        const cached = this.getCachedData('soil');
        if (cached) {
            this.updateSoilDisplay(cached);
        }
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        
        // Update active language button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        // Update all text elements
        document.querySelectorAll('[data-en]').forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else {
                    element.textContent = text;
                }
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Cache language preference
        localStorage.setItem('desert-smart-language', lang);
    }
}

// Tab Navigation
function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');

    // Initialize specific tab functionality
    if (tabName === 'irrigation') {
        initIrrigationMap();
    } else if (tabName === 'crops') {
        loadCropDatabase();
    } else if (tabName === 'community') {
        loadCommunityPosts();
    }
}

// Language switching
function setLanguage(lang) {
    app.setLanguage(lang);
}

// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.querySelector('.nav-menu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new DesertSmartApp();
});

// PWA Installation
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button
    const installBtn = document.createElement('button');
    installBtn.textContent = 'Install App';
    installBtn.className = 'btn btn-primary';
    installBtn.style.position = 'fixed';
    installBtn.style.bottom = '20px';
    installBtn.style.right = '20px';
    installBtn.style.zIndex = '1000';
    
    installBtn.addEventListener('click', () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            }
            deferredPrompt = null;
            installBtn.remove();
        });
    });
    
    document.body.appendChild(installBtn);
});