async function runAIPrediction(inputs) {
    if (!window.pyodide) {
        window.pyodide = await loadPyodide();
    }
    await window.pyodide.loadPackage(['pandas', 'scikit-learn']);
    await window.pyodide.runPythonAsync(`import sys\nsys.path.append('/js')`);
    await window.pyodide.FS.writeFile('/data/farm_data.csv', await (await fetch('/data/farm_data.csv')).arrayBuffer());
    await window.pyodide.FS.writeFile('/js/ai-model.py', await (await fetch('/js/ai-model.py')).arrayBuffer());
    await window.pyodide.runPythonAsync(await (await fetch('/js/ai-model.py')).text());
    const predict = window.pyodide.globals.get('predict');
    const [irrigation, energy] = predict(
        inputs.farmSize, inputs.soilMoisture, inputs.windSpeed, inputs.sunlightHours
    ).toJs();
    return { irrigation, energy };
}
window.runAIPrediction = runAIPrediction;
// AI Model Integration using Pyodide
class AIModel {
    constructor() {
        this.pyodide = null;
        this.isLoaded = false;
        this.trainingData = null;
        this.init();
    }

    async init() {
        try {
            await this.loadPyodide();
            await this.loadTrainingData();
            await this.setupModel();
            this.isLoaded = true;
            this.hideLoading();
            this.showForm();
        } catch (error) {
            console.error('Error initializing AI model:', error);
            this.showError('Failed to load AI model. Please refresh the page.');
        }
    }

    async loadPyodide() {
        this.pyodide = await loadPyodide();
        
        // Install required packages
        await this.pyodide.loadPackage(['numpy', 'pandas', 'scikit-learn']);
        
        // Import Python libraries
        await this.pyodide.runPython(`
            import numpy as np
            import pandas as pd
            from sklearn.ensemble import RandomForestRegressor
            from sklearn.model_selection import train_test_split
            from sklearn.preprocessing import StandardScaler
            import json
        `);
    }

    async loadTrainingData() {
        // Generate synthetic training data for demo
        const trainingData = this.generateTrainingData();
        
        // Convert to CSV format
        const csvData = this.convertToCSV(trainingData);
        
        // Load data into Pyodide
        this.pyodide.globals.set('csv_data', csvData);
        
        await this.pyodide.runPython(`
            from io import StringIO
            df = pd.read_csv(StringIO(csv_data))
            print("Training data loaded:", df.shape)
        `);
    }

    generateTrainingData() {
        const data = [];
        
        // Generate 1000 synthetic data points
        for (let i = 0; i < 1000; i++) {
            const farmSize = 0.5 + Math.random() * 10; // 0.5-10.5 hectares
            const soilMoisture = 15 + Math.random() * 50; // 15-65%
            const windSpeed = 2 + Math.random() * 25; // 2-27 km/h
            const sunlightHours = 6 + Math.random() * 8; // 6-14 hours
            const temperature = 25 + Math.random() * 25; // 25-50°C
            const humidity = 10 + Math.random() * 40; // 10-50%
            
            // Crop type encoding
            const cropTypes = ['pearl_millet', 'quinoa', 'date_palm', 'chickpea'];
            const cropType = cropTypes[Math.floor(Math.random() * cropTypes.length)];
            const cropEncoding = {
                'pearl_millet': 0,
                'quinoa': 1,
                'date_palm': 2,
                'chickpea': 3
            };
            
            // Calculate irrigation needs (liters per day)
            let irrigationNeeds = farmSize * 100; // Base: 100L per hectare
            irrigationNeeds *= (1 - soilMoisture / 100); // Adjust for soil moisture
            irrigationNeeds *= (1 + (temperature - 35) / 50); // Adjust for temperature
            irrigationNeeds *= (1 + (50 - humidity) / 100); // Adjust for humidity
            
            // Crop-specific adjustments
            const cropMultipliers = {
                'pearl_millet': 0.8,
                'quinoa': 0.9,
                'date_palm': 1.5,
                'chickpea': 1.1
            };
            irrigationNeeds *= cropMultipliers[cropType];
            
            // Calculate energy needs (kWh per day)
            let energyNeeds = farmSize * 5; // Base: 5 kWh per hectare
            energyNeeds += irrigationNeeds * 0.002; // Irrigation pump energy
            
            // Solar generation potential (kWh per day)
            const solarGeneration = farmSize * sunlightHours * 0.2; // 0.2 kW per hectare per hour
            
            // Wind generation potential (kWh per day)
            const windGeneration = windSpeed > 3 ? farmSize * windSpeed * 0.1 : 0;
            
            // Energy efficiency score (0-100)
            const totalGeneration = solarGeneration + windGeneration;
            const energyEfficiency = Math.min(100, (totalGeneration / energyNeeds) * 100);
            
            data.push({
                farm_size: farmSize.toFixed(2),
                soil_moisture: soilMoisture.toFixed(1),
                wind_speed: windSpeed.toFixed(1),
                sunlight_hours: sunlightHours.toFixed(1),
                temperature: temperature.toFixed(1),
                humidity: humidity.toFixed(1),
                crop_type: cropEncoding[cropType],
                irrigation_needs: irrigationNeeds.toFixed(1),
                energy_needs: energyNeeds.toFixed(1),
                solar_generation: solarGeneration.toFixed(1),
                wind_generation: windGeneration.toFixed(1),
                energy_efficiency: energyEfficiency.toFixed(1)
            });
        }
        
        return data;
    }

    convertToCSV(data) {
        if (data.length === 0) return '';
        
        const headers = Object.keys(data[0]);
        const csvRows = [headers.join(',')];
        
        for (const row of data) {
            const values = headers.map(header => row[header]);
            csvRows.push(values.join(','));
        }
        
        return csvRows.join('\n');
    }

    async setupModel() {
        await this.pyodide.runPython(`
            # Prepare features and targets
            features = ['farm_size', 'soil_moisture', 'wind_speed', 'sunlight_hours', 'temperature', 'humidity', 'crop_type']
            X = df[features]
            
            # Multiple target variables
            y_irrigation = df['irrigation_needs']
            y_energy = df['energy_needs']
            y_solar = df['solar_generation']
            y_wind = df['wind_generation']
            y_efficiency = df['energy_efficiency']
            
            # Split data
            X_train, X_test, y_irrigation_train, y_irrigation_test = train_test_split(X, y_irrigation, test_size=0.2, random_state=42)
            _, _, y_energy_train, y_energy_test = train_test_split(X, y_energy, test_size=0.2, random_state=42)
            _, _, y_solar_train, y_solar_test = train_test_split(X, y_solar, test_size=0.2, random_state=42)
            _, _, y_wind_train, y_wind_test = train_test_split(X, y_wind, test_size=0.2, random_state=42)
            _, _, y_efficiency_train, y_efficiency_test = train_test_split(X, y_efficiency, test_size=0.2, random_state=42)
            
            # Scale features
            scaler = StandardScaler()
            X_train_scaled = scaler.fit_transform(X_train)
            X_test_scaled = scaler.transform(X_test)
            
            # Train models
            irrigation_model = RandomForestRegressor(n_estimators=100, random_state=42)
            energy_model = RandomForestRegressor(n_estimators=100, random_state=42)
            solar_model = RandomForestRegressor(n_estimators=100, random_state=42)
            wind_model = RandomForestRegressor(n_estimators=100, random_state=42)
            efficiency_model = RandomForestRegressor(n_estimators=100, random_state=42)
            
            irrigation_model.fit(X_train_scaled, y_irrigation_train)
            energy_model.fit(X_train_scaled, y_energy_train)
            solar_model.fit(X_train_scaled, y_solar_train)
            wind_model.fit(X_train_scaled, y_wind_train)
            efficiency_model.fit(X_train_scaled, y_efficiency_train)
            
            print("Models trained successfully!")
            
            # Calculate model scores
            irrigation_score = irrigation_model.score(X_test_scaled, y_irrigation_test)
            energy_score = energy_model.score(X_test_scaled, y_energy_test)
            solar_score = solar_model.score(X_test_scaled, y_solar_test)
            wind_score = wind_model.score(X_test_scaled, y_wind_test)
            efficiency_score = efficiency_model.score(X_test_scaled, y_efficiency_test)
            
            print(f"Model Scores - Irrigation: {irrigation_score:.3f}, Energy: {energy_score:.3f}, Solar: {solar_score:.3f}, Wind: {wind_score:.3f}, Efficiency: {efficiency_score:.3f}")
        `);
    }

    async predict(inputData) {
        if (!this.isLoaded) {
            throw new Error('AI model not loaded yet');
        }

        // Prepare input data
        const cropEncoding = {
            'pearl_millet': 0,
            'quinoa': 1,
            'date_palm': 2,
            'chickpea': 3
        };

        const features = [
            parseFloat(inputData.farmSize),
            parseFloat(inputData.soilMoisture),
            parseFloat(inputData.windSpeed),
            parseFloat(inputData.sunlightHours),
            parseFloat(inputData.temperature || 40), // Default temperature
            parseFloat(inputData.humidity || 20), // Default humidity
            cropEncoding[inputData.cropType] || 0
        ];

        // Set input data in Python
        this.pyodide.globals.set('input_features', features);

        // Make predictions
        const results = await this.pyodide.runPython(`
            import numpy as np
            
            # Prepare input
            input_array = np.array(input_features).reshape(1, -1)
            input_scaled = scaler.transform(input_array)
            
            # Make predictions
            irrigation_pred = irrigation_model.predict(input_scaled)[0]
            energy_pred = energy_model.predict(input_scaled)[0]
            solar_pred = solar_model.predict(input_scaled)[0]
            wind_pred = wind_model.predict(input_scaled)[0]
            efficiency_pred = efficiency_model.predict(input_scaled)[0]
            
            # Calculate additional metrics
            total_generation = solar_pred + wind_pred
            energy_surplus = total_generation - energy_pred
            water_efficiency = max(0, 100 - (irrigation_pred / (input_features[0] * 200)) * 100)
            
            # Generate recommendations
            recommendations = []
            
            if irrigation_pred > input_features[0] * 150:
                recommendations.append("Consider drip irrigation to reduce water usage")
            
            if solar_pred > energy_pred:
                recommendations.append("Solar panels can meet your energy needs")
            
            if wind_pred > 5:
                recommendations.append("Wind turbine installation recommended")
            
            if efficiency_pred < 70:
                recommendations.append("Hybrid energy system recommended for better efficiency")
            
            # Return results as JSON
            results = {
                'irrigation_needs': round(irrigation_pred, 1),
                'energy_needs': round(energy_pred, 1),
                'solar_generation': round(solar_pred, 1),
                'wind_generation': round(wind_pred, 1),
                'total_generation': round(total_generation, 1),
                'energy_efficiency': round(efficiency_pred, 1),
                'energy_surplus': round(energy_surplus, 1),
                'water_efficiency': round(water_efficiency, 1),
                'recommendations': recommendations,
                'optimal_irrigation_time': '06:00 AM',
                'next_irrigation': f"{round(irrigation_pred * 0.7, 1)}L in 24 hours",
                'cost_savings': round(energy_surplus * 8, 0),  # ₹8 per kWh
                'carbon_footprint': round(total_generation * 0.5, 1)  # kg CO2 saved
            }
            
            json.dumps(results)
        `);

        return JSON.parse(results);
    }

    hideLoading() {
        const loadingElement = document.getElementById('pyodideLoading');
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
    }

    showForm() {
        const formElement = document.getElementById('aiPredictionForm');
        if (formElement) {
            formElement.style.display = 'block';
        }
    }

    showError(message) {
        const loadingElement = document.getElementById('pyodideLoading');
        if (loadingElement) {
            loadingElement.innerHTML = `
                <div style="color: #EF4444; text-align: center;">
                    <p>⚠️ ${message}</p>
                    <button class="btn btn-primary" onclick="location.reload()">Retry</button>
                </div>
            `;
        }
    }

    displayResults(results, inputData) {
        const resultsContainer = document.getElementById('aiResults');
        const currentLang = window.app ? window.app.currentLanguage : 'en';
        
        const content = `
            <div class="result-section">
                <div class="result-title">
                    🤖 ${currentLang === 'hi' ? 'AI भविष्यवाणी परिणाम' : 'AI Prediction Results'}
                </div>
                <div class="result-grid">
                    <div class="result-item">
                        <div class="result-label">${currentLang === 'hi' ? 'दैनिक सिंचाई आवश्यकता' : 'Daily Irrigation Need'}</div>
                        <div class="result-value">${results.irrigation_needs}L</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">${currentLang === 'hi' ? 'दैनिक ऊर्जा आवश्यकता' : 'Daily Energy Need'}</div>
                        <div class="result-value">${results.energy_needs} kWh</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">${currentLang === 'hi' ? 'सौर उत्पादन क्षमता' : 'Solar Generation Potential'}</div>
                        <div class="result-value">${results.solar_generation} kWh</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">${currentLang === 'hi' ? 'पवन उत्पादन क्षमता' : 'Wind Generation Potential'}</div>
                        <div class="result-value">${results.wind_generation} kWh</div>
                    </div>
                </div>
            </div>
            
            <div class="result-section">
                <div class="result-title">
                    ⚡ ${currentLang === 'hi' ? 'ऊर्जा विश्लेषण' : 'Energy Analysis'}
                </div>
                <div class="result-grid">
                    <div class="result-item">
                        <div class="result-label">${currentLang === 'hi' ? 'कुल उत्पादन' : 'Total Generation'}</div>
                        <div class="result-value">${results.total_generation} kWh</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">${currentLang === 'hi' ? 'ऊर्जा दक्षता' : 'Energy Efficiency'}</div>
                        <div class="result-value">${results.energy_efficiency}%</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">${currentLang === 'hi' ? 'ऊर्जा अधिशेष' : 'Energy Surplus'}</div>
                        <div class="result-value">${results.energy_surplus} kWh</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">${currentLang === 'hi' ? 'लागत बचत' : 'Cost Savings'}</div>
                        <div class="result-value">₹${results.cost_savings}/day</div>
                    </div>
                </div>
            </div>
            
            <div class="result-section">
                <div class="result-title">
                    💧 ${currentLang === 'hi' ? 'जल प्रबंधन' : 'Water Management'}
                </div>
                <div class="result-grid">
                    <div class="result-item">
                        <div class="result-label">${currentLang === 'hi' ? 'जल दक्षता' : 'Water Efficiency'}</div>
                        <div class="result-value">${results.water_efficiency}%</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">${currentLang === 'hi' ? 'अनुकूलित समय' : 'Optimal Time'}</div>
                        <div class="result-value">${results.optimal_irrigation_time}</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">${currentLang === 'hi' ? 'अगली सिंचाई' : 'Next Irrigation'}</div>
                        <div class="result-value">${results.next_irrigation}</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">${currentLang === 'hi' ? 'कार्बन बचत' : 'Carbon Savings'}</div>
                        <div class="result-value">${results.carbon_footprint} kg CO₂</div>
                    </div>
                </div>
            </div>
            
            <div class="result-section">
                <div class="result-title">
                    💡 ${currentLang === 'hi' ? 'AI सिफारिशें' : 'AI Recommendations'}
                </div>
                <ul style="margin: 0; padding-left: 1.5rem;">
                    ${results.recommendations.map(rec => `<li style="margin-bottom: 0.5rem;">${rec}</li>`).join('')}
                </ul>
            </div>
        `;
        
        resultsContainer.innerHTML = content;
        resultsContainer.style.display = 'block';
        
        // Update charts
        this.updatePredictionChart(results, inputData);
    }

    updatePredictionChart(results, inputData) {
        const ctx = document.getElementById('predictionChart');
        if (!ctx) return;

        // Destroy existing chart if it exists
        if (window.predictionChart) {
            window.predictionChart.destroy();
        }

        window.predictionChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Energy Need', 'Solar Gen', 'Wind Gen', 'Total Gen', 'Irrigation (L/10)'],
                datasets: [{
                    label: 'Daily Values',
                    data: [
                        results.energy_needs,
                        results.solar_generation,
                        results.wind_generation,
                        results.total_generation,
                        results.irrigation_needs / 10 // Scale down for visualization
                    ],
                    backgroundColor: [
                        '#EF4444',
                        '#F59E0B',
                        '#06B6D4',
                        '#10B981',
                        '#3B82F6'
                    ],
                    borderColor: [
                        '#DC2626',
                        '#D97706',
                        '#0891B2',
                        '#059669',
                        '#2563EB'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'AI Predictions Overview'
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'kWh / Liters'
                        }
                    }
                }
            }
        });
    }
}

// Form submission handler
document.addEventListener('DOMContentLoaded', () => {
    window.aiModel = new AIModel();
    
    const form = document.getElementById('aiPredictionForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!window.aiModel.isLoaded) {
                alert('AI model is still loading. Please wait...');
                return;
            }
            
            const formData = new FormData(form);
            const inputData = {
                farmSize: formData.get('farmSize'),
                soilMoisture: formData.get('soilMoistureInput'),
                windSpeed: formData.get('windSpeedInput'),
                sunlightHours: formData.get('sunlightHours'),
                cropType: formData.get('cropType')
            };
            
            try {
                const results = await window.aiModel.predict(inputData);
                window.aiModel.displayResults(results, inputData);
                
                // Track event
                if (window.Utils) {
                    window.Utils.trackEvent('ai_prediction_generated', {
                        farmSize: inputData.farmSize,
                        cropType: inputData.cropType,
                        irrigationNeeds: results.irrigation_needs,
                        energyEfficiency: results.energy_efficiency
                    });
                }
            } catch (error) {
                console.error('Prediction error:', error);
                alert('Error generating predictions. Please try again.');
            }
        });
    }
});