import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet default icon issue in React
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

const getRiskColor = (risk) => {
    switch (risk) {
        case 'HIGH': return '#ef4444';
        case 'MEDIUM': return '#f59e0b';
        case 'LOW': return '#10b981';
        default: return '#3b82f6';
    }
};

const MapComponent = ({ zones }) => {
    // Center map around New York for dummy data
    const position = [40.7128, -74.0060];

    return (
        <MapContainer center={position} zoom={12} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {zones && zones.map((zone, idx) => (
                <CircleMarker
                    key={idx}
                    center={[zone.lat, zone.lng]}
                    pathOptions={{ color: getRiskColor(zone.risk), fillColor: getRiskColor(zone.risk), fillOpacity: 0.6 }}
                    radius={12}
                >
                    <Popup>
                        <div style={{ color: '#1a202c' }}>
                            <strong>Zone ID:</strong> {zone.id} <br />
                            <strong>Risk Level:</strong> {zone.risk}
                        </div>
                    </Popup>
                </CircleMarker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
