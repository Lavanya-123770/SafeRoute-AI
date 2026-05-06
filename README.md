# AntiGravity - Smart Accident-Prone Zone Analyzer

AntiGravity is an AI-powered full-stack web application designed to proactively predict accident-prone road zones using contextual analytics. It visualizes high-risk zones via an interactive heatmap dashboard, providing risk scores, danger alerts, and safety recommendations based on simulated environmental and traffic factors.

---

## 🏗 System Architecture

The application is built with a modular, microservices-style architecture:

1. **Frontend**: React.js (Vite) for a modern, responsive, glassmorphism UI.
2. **Backend API**: Node.js (Express) serves as the primary gateway, interacting with the AI engine and providing data endpoints.
3. **AI Risk Engine**: Python (FastAPI) responsible for processing contextual data and returning dynamic risk calculations.
4. **Database**: MySQL schema designed for logging users, accidents, weather, and dynamic zone state. (Configured with fallback dummy data for ease of setup).

```text
[ React Dashboard ]
       |
  REST API (JSON)
       |
[ Express Backend ] ----> [ MySQL Database ]
       |
  REST API (JSON)
       |
[ FastAPI AI Model ]
```

---

## 📂 Project Structure

- `frontend/`: React components, CSS Modules, Routing (`npm run dev`)
- `backend/`: Express Server, Database integrations, Proxy controllers (`npm start`)
- `ai/`: FastAPI Prediction Logic, Dummy rule-based models (`uvicorn main:app --reload`)

---

## ⚡ Getting Started Locally

### 1. Run the AI Service (Python)
```bash
cd ai
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### 2. Run the API Gateway (Node.js)
```bash
cd backend
npm install
npm run start
```
*Note: The backend defaults to port 5000 and uses dummy simulation data if MySQL connection fails.*

### 3. Run the Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
*Access the application at `http://localhost:5173`*

---

## 🌐 API Integration Examples

### 1. Risk Prediction API (POST: `/api/predict`)
Proxy to the Python AI Engine to generate risk categories.
**Request Body (`application/json`):**
```json
{
  "traffic_density": "HIGH",
  "weather_condition": "RAIN",
  "visibility": "POOR",
  "road_type": "HIGHWAY",
  "time_of_day": "NIGHT"
}
```
**Response Body:**
```json
{
  "risk_score": "HIGH",
  "recommendations": [
    "Reduce speed by at least 20 mph",
    "Consider alternate routes"
  ],
  "alerts": [
    "High accident probability ahead",
    "Heavy rain risk zone"
  ]
}
```

### 2. Fetch Monitored Zones (GET: `/api/zones`)
**Response Body:**
```json
[
  { "id": 1, "lat": 40.7128, "lng": -74.0060, "risk": "HIGH" },
  { "id": 2, "lat": 40.7200, "lng": -74.0100, "risk": "MEDIUM" }
]
```

---

## 🚀 Future Scope & Upgrades

The AntiGravity architecture is designed to scale. Future updates could include:
1. **Real-time IoT Telemetry**: Processing true live sensory data for road grip constraints and instantaneous visibility.
2. **Advanced ML Pipeline**: Replacing rule-based scoring with a lightweight Random Forest or XGBoost model trained on actual historical traffic accident datasets.
3. **Emergency Contact Integration**: API integration allowing high-risk triggers to pre-alert local EMS or provide automatic SOS dispatch.
4. **Night Driving Mode Enhancements**: Customized UI switches strictly tied to day/night API context configurations.
5. **Smart City Matrix**: Utilizing this application as a node in an interconnected municipal Smart City traffic-routing grid.
6. **Voice Alerts**: Audio feedback triggers mapped onto dashboard alerts.
