import pandas as pd
from sklearn.linear_model import LinearRegression

def load_data():
    df = pd.read_csv('data/farm_data.csv')
    X = df[['farm_size', 'soil_moisture', 'wind_speed', 'sunlight_hours']]
    y_irrigation = df['irrigation_need']
    y_energy = df['energy_usage']
    return X, y_irrigation, y_energy

def train_models():
    X, y_irrigation, y_energy = load_data()
    model_irrigation = LinearRegression().fit(X, y_irrigation)
    model_energy = LinearRegression().fit(X, y_energy)
    return model_irrigation, model_energy

def predict(farm_size, soil_moisture, wind_speed, sunlight_hours):
    model_irrigation, model_energy = train_models()
    X_new = [[farm_size, soil_moisture, wind_speed, sunlight_hours]]
    irrigation = model_irrigation.predict(X_new)[0]
    energy = model_energy.predict(X_new)[0]
    return float(irrigation), float(energy)
