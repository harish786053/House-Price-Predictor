# House Predict AI

A modern, dark-themed Full Stack Web Application to predict House Prices.

## Prerequisites
Please ensure you have the following installed:
1. [Node.js (LTS version)](https://nodejs.org/)
2. [Python 3.10+](https://www.python.org/downloads/)
3. [MongoDB Server](https://www.mongodb.com/try/download/community) (Or set `MONGODB_URI` to an Atlas URL in `backend/.env`)

## Project Structure
- `ml_backend`: Python Flask API and Scikit-Learn training sequence.
- `backend`: Node.js Express server caching predictions and handling users.
- `frontend`: React.js (Vite) app matching the premium dark theme dashboard.

## Setup Instructions

### 1. Machine Learning API
Open a terminal and navigate to `HousePredictAI/ml_backend`:
```cmd
cd ml_backend
pip install -r requirements.txt
python train.py
python app.py
```
*(Runs on Port 5001)*

### 2. Node.js Backend
Open another terminal:
```cmd
cd ../backend
npm install
npm start
```
*(Runs on Port 5000)*

### 3. Frontend React App
Open a final terminal:
```cmd
cd ../frontend
npm install
npm run dev
```
*(Runs on Port 5173)*

Navigate to `http://localhost:5173` to see your AI web application!
