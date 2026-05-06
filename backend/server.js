const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

// Database config
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'antigravity_db'
};

let pool;
try {
  pool = mysql.createPool(dbConfig);
  console.log('MySQL pool configured (might not be connected if credentials fail)');
} catch (e) {
  console.error('MySQL setup error:', e);
}

// Dummy data for fallback
const dummyZones = [
  { id: 1, lat: 40.7128, lng: -74.0060, risk: "HIGH" },
  { id: 2, lat: 40.7200, lng: -74.0100, risk: "MEDIUM" },
  { id: 3, lat: 40.7300, lng: -73.9900, risk: "LOW" },
  { id: 4, lat: 40.7400, lng: -73.9800, risk: "HIGH" },
];

const dummyAnalytics = {
  trends: [{ date: '2023-01', count: 45 }, { date: '2023-02', count: 50 }, { date: '2023-03', count: 35 }],
  categories: { LOW: 120, MEDIUM: 45, HIGH: 15 },
  peakTiming: '18:00 - 20:00',
  weatherRisk: { CLEAR: 10, RAIN: 40, SNOW: 60, FOG: 70 }
};

// API Routes

// 1. Prediction Route (Now natively in Node.js since Python is unavailable)
app.post('/api/predict', async (req, res) => {
  try {
    const data = req.body;
    let risk = "LOW";
    let score = 0;

    if (data.traffic_density === "HIGH") score += 2;
    else if (data.traffic_density === "MEDIUM") score += 1;

    if (["RAIN", "SNOW", "FOG"].includes(data.weather_condition)) score += 2;

    if (data.visibility === "POOR") score += 2;

    if (data.time_of_day === "NIGHT") score += 1;

    if (data.road_type === "HIGHWAY" && data.weather_condition !== "CLEAR") score += 1;

    let alerts = [];
    let recommendations = [];

    if (score >= 5) {
      risk = "HIGH";
      alerts.push("High accident probability ahead");
      recommendations.push("Reduce speed by at least 20 mph");
      recommendations.push("Consider alternate routes");
    } else if (score >= 3) {
      risk = "MEDIUM";
      alerts.push("Moderate risk conditions detected");
      recommendations.push("Maintain safe following distance");
    } else {
      risk = "LOW";
      recommendations.push("Conditions are currently safe");
    }

    if (data.visibility === "POOR") alerts.push("Poor visibility detected");
    if (data.weather_condition === "RAIN") alerts.push("Heavy rain risk zone");
    if (data.time_of_day === "NIGHT") recommendations.push("Use high beams appropriately and stay alert");

    alerts = [...new Set(alerts)];
    recommendations = [...new Set(recommendations)];

    res.json({
      risk_score: risk,
      recommendations: recommendations,
      alerts: alerts
    });
  } catch (error) {
    console.error("Prediction Logic Error:", error);
    res.status(500).json({ error: "Server error during prediction" });
  }
});

// 2. Map Data
app.get('/api/zones', async (req, res) => {
  try {
    // In a real app we'd query db
    // const [rows] = await pool.query('SELECT * FROM risk_analysis');
    // res.json(rows);
    res.json(dummyZones);
  } catch (error) {
    res.json(dummyZones);
  }
});

// 3. Analytics Data
app.get('/api/analytics', async (req, res) => {
  try {
    // Fetch from DB
    res.json(dummyAnalytics);
  } catch (error) {
    res.json(dummyAnalytics);
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
