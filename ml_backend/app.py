from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load model
MODEL_PATH = 'model.pkl'

model = None
if os.path.exists(MODEL_PATH):
    with open(MODEL_PATH, 'rb') as f:
        model = pickle.load(f)

@app.route('/health', methods=['GET'])
def health():
    if model is None:
        return jsonify({'status': 'warning', 'message': 'Model not loaded'}), 200
    return jsonify({'status': 'ok'}), 200

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Prediction model is not available.'}), 500
        
    data = request.json
    try:
        area = float(data.get('area', 0))
        bedrooms = float(data.get('bedrooms', 0))
        bathrooms = float(data.get('bathrooms', 0))
        age = float(data.get('age', 0))
        
        # Match feature order: ['area', 'bedrooms', 'bathrooms', 'age']
        features = np.array([[area, bedrooms, bathrooms, age]])
        
        prediction = model.predict(features)[0]
        
        return jsonify({
            'success': True,
            'prediction': prediction,
            'formated_prediction': f"{prediction/100000:.2f} Lakhs"
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=5001, debug=True)
