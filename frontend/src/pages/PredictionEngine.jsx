import React, { useState } from 'react';
import axios from 'axios';
import { Shield, AlertCircle, Info, CheckCircle } from 'lucide-react';

const PredictionEngine = () => {
    const [formData, setFormData] = useState({
        traffic_density: 'MEDIUM',
        weather_condition: 'CLEAR',
        visibility: 'GOOD',
        road_type: 'CITY_STREET',
        time_of_day: 'DAY'
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePredict = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/predict', formData);
            setResult(response.data);
        } catch (error) {
            console.error("Prediction failed:", error);
            // Fallback if backend is unreachable
            setResult({
                risk_score: "MEDIUM",
                recommendations: ["Maintain safe distance", "Drive carefully"],
                alerts: ["Backend unreachable - displaying simulated medium risk"]
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fade-in">
            <header>
                <div>
                    <h1 className="page-title">AI Risk Prediction Engine</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                        Input contextual parameters to generate real-time safety scores
                    </p>
                </div>
            </header>

            <div className="grid-system grid-2">
                <div className="glass-panel">
                    <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Shield size={20} color="var(--accent-blue)" /> Analysis Parameters
                    </h3>
                    <form onSubmit={handlePredict}>
                        <div className="form-group">
                            <label className="form-label">Traffic Density</label>
                            <select className="form-select" name="traffic_density" value={formData.traffic_density} onChange={handleChange}>
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Weather Conditions</label>
                            <select className="form-select" name="weather_condition" value={formData.weather_condition} onChange={handleChange}>
                                <option value="CLEAR">Clear</option>
                                <option value="RAIN">Rain</option>
                                <option value="SNOW">Snow</option>
                                <option value="FOG">Fog</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Visibility</label>
                            <select className="form-select" name="visibility" value={formData.visibility} onChange={handleChange}>
                                <option value="GOOD">Good</option>
                                <option value="POOR">Poor</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Road Type</label>
                            <select className="form-select" name="road_type" value={formData.road_type} onChange={handleChange}>
                                <option value="CITY_STREET">City Street</option>
                                <option value="HIGHWAY">Highway</option>
                                <option value="RURAL">Rural</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Time of Day</label>
                            <select className="form-select" name="time_of_day" value={formData.time_of_day} onChange={handleChange}>
                                <option value="DAY">Daytime</option>
                                <option value="NIGHT">Nighttime</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }} disabled={loading}>
                            {loading ? "Analyzing Context..." : "Run AI Prediction"}
                        </button>
                    </form>
                </div>

                <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ marginBottom: '20px' }}>Prediction Results</h3>

                    {!result && (
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                            <p>Configure parameters and run prediction to see results.</p>
                        </div>
                    )}

                    {result && (
                        <div className="fade-in">
                            <div style={{ padding: '24px', background: 'var(--bg-secondary)', borderRadius: '12px', marginBottom: '24px', textAlign: 'center' }}>
                                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Calculated Risk Score</p>
                                <span className={`risk-badge ${result.risk_score}`} style={{ fontSize: '24px', padding: '12px 24px' }}>
                                    {result.risk_score} RISK
                                </span>
                            </div>

                            <h4 style={{ marginBottom: '12px', fontSize: '15px' }}>Active Driver Alerts</h4>
                            {result.alerts.length === 0 ? (
                                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>No dangerous conditions detected.</p>
                            ) : (
                                result.alerts.map((alert, i) => (
                                    <div key={i} className={`alert-item ${result.risk_score}`}>
                                        <AlertCircle size={18} className="alert-icon" />
                                        <div className="alert-content">
                                            <h4>System Warning</h4>
                                            <p>{alert}</p>
                                        </div>
                                    </div>
                                ))
                            )}

                            <h4 style={{ margin: '24px 0 12px', fontSize: '15px' }}>AI Safety Recommendations</h4>
                            {result.recommendations.map((rec, i) => (
                                <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'center' }}>
                                    <CheckCircle size={18} color="var(--accent-blue)" />
                                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{rec}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PredictionEngine;
