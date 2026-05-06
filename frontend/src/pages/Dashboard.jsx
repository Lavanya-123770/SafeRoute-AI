import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity, AlertTriangle, CloudRain, Sun, Clock, Map as MapIcon } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import MapComponent from '../components/MapComponent';

const Dashboard = () => {
    const [analytics, setAnalytics] = useState(null);
    const [zones, setZones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [analyticsRes, zonesRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/analytics').catch(() => ({ data: null })),
                    axios.get('http://localhost:5000/api/zones').catch(() => ({ data: [] }))
                ]);

                let dummyAnalytics = analyticsRes.data;
                if (!dummyAnalytics) {
                    dummyAnalytics = {
                        trends: [
                            { date: 'Mon', count: 12 }, { date: 'Tue', count: 19 },
                            { date: 'Wed', count: 15 }, { date: 'Thu', count: 22 },
                            { date: 'Fri', count: 30 }, { date: 'Sat', count: 45 },
                            { date: 'Sun', count: 38 }
                        ],
                        categories: { LOW: 120, MEDIUM: 45, HIGH: 15 },
                        peakTiming: '18:00 - 20:00'
                    };
                }

                let dummyZones = zonesRes.data;
                if (!dummyZones || dummyZones.length === 0) {
                    dummyZones = [
                        { id: 1, lat: 40.7128, lng: -74.0060, risk: "HIGH" },
                        { id: 2, lat: 40.7200, lng: -74.0100, risk: "MEDIUM" },
                        { id: 3, lat: 40.7300, lng: -73.9900, risk: "LOW" },
                        { id: 4, lat: 40.7400, lng: -73.9800, risk: "HIGH" },
                    ];
                }

                setAnalytics(dummyAnalytics);
                setZones(dummyZones);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="fade-in">Loading dashboard data...</div>;

    const totalAnalyzed = analytics.categories.LOW + analytics.categories.MEDIUM + analytics.categories.HIGH;

    return (
        <div className="fade-in">
            <header>
                <div>
                    <h1 className="page-title">Real-Time Risk Overview</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Smart Accident-Prone Zone Analyzer System</p>
                </div>
                <div className="btn btn-primary">
                    <Activity size={18} /> Live Monitoring Active
                </div>
            </header>

            <div className="grid-system grid-3">
                <div className="glass-panel stat-card">
                    <div className="stat-icon">
                        <MapIcon size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>Zones Monitored</h3>
                        <p>{totalAnalyzed}</p>
                    </div>
                </div>
                <div className="glass-panel stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--risk-high)' }}>
                        <AlertTriangle size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>High Risk Zones</h3>
                        <p>{analytics.categories.HIGH}</p>
                    </div>
                </div>
                <div className="glass-panel stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--risk-medium)' }}>
                        <Clock size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>Peak Accident Timing</h3>
                        <p style={{ fontSize: '20px' }}>{analytics.peakTiming}</p>
                    </div>
                </div>
            </div>

            <div className="grid-system grid-2">
                <div className="glass-panel">
                    <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Incident Trends (7 Days)</h3>
                    <div style={{ height: '300px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={analytics.trends}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="date" stroke="#a0aec0" />
                                <YAxis stroke="#a0aec0" />
                                <Tooltip contentStyle={{ backgroundColor: '#1a202c', borderColor: '#4a5568', color: '#fff' }} />
                                <Area type="monotone" dataKey="count" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCount)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-panel">
                    <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Live Risk Heatmap</h3>
                    <div className="map-container">
                        <MapComponent zones={zones} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
