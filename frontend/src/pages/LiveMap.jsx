import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from '../components/MapComponent';
import { Map as MapIcon, Filter } from 'lucide-react';

const LiveMap = () => {
    const [zones, setZones] = useState([]);

    useEffect(() => {
        // Fetch live data (dummy for now)
        axios.get('http://localhost:5000/api/zones')
            .then(res => setZones(res.data))
            .catch((err) => {
                setZones([
                    { id: 1, lat: 40.7128, lng: -74.0060, risk: "HIGH" },
                    { id: 2, lat: 40.7200, lng: -74.0100, risk: "MEDIUM" },
                    { id: 3, lat: 40.7300, lng: -73.9900, risk: "LOW" },
                    { id: 4, lat: 40.7400, lng: -73.9800, risk: "HIGH" },
                ]);
            });
    }, []);

    return (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <header style={{ marginBottom: '20px' }}>
                <div>
                    <h1 className="page-title">Interactive Risk Heatmap</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Visualizing dangerous zones based on contextual analysis</p>
                </div>
                <div className="btn" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                    <Filter size={18} /> Filters
                </div>
            </header>

            <div className="glass-panel" style={{ flex: 1, display: 'flex', padding: 0, overflow: 'hidden' }}>
                <MapComponent zones={zones} />
            </div>
        </div>
    );
};

export default LiveMap;
