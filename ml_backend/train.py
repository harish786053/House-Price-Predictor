import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
import pickle
import os

def create_dummy_data():
    np.random.seed(42)
    n_samples = 1000
    
    # Features
    area = np.random.randint(500, 4000, n_samples)
    bedrooms = np.random.randint(1, 6, n_samples)
    bathrooms = np.random.randint(1, 5, n_samples)
    age = np.random.randint(0, 30, n_samples)
    
    # Calculate price roughly based on features + noise
    # Base price: 20L
    # 10k per sqft roughly
    # Adjusting so typical 1500 sqft is around 75 Lakhs
    # base = 10,000 * area
    
    price = 10000 + (area * 4000) + (bedrooms * 500000) + (bathrooms * 300000) - (age * 50000)
    # Add noise
    price = price + np.random.normal(0, 500000, n_samples)
    
    df = pd.DataFrame({
        'area': area,
        'bedrooms': bedrooms,
        'bathrooms': bathrooms,
        'age': age,
        'price': price
    })
    return df

def train_and_save_model():
    df = create_dummy_data()
    X = df[['area', 'bedrooms', 'bathrooms', 'age']]
    y = df['price']
    
    model = LinearRegression()
    model.fit(X, y)
    
    score = model.score(X, y)
    print(f"Model trained with R^2 score: {score:.3f}")
    
    with open('model.pkl', 'wb') as f:
        pickle.dump(model, f)
    print("Model saved to model.pkl")

if __name__ == '__main__':
    train_and_save_model()
