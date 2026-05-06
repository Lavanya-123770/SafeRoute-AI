import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShieldAlert, Map, Bell, Settings } from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <ShieldAlert className="icon" size={28} />
                AntiGravity
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <NavLink
                    to="/"
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                    end
                >
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/prediction"
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                >
                    <Bell size={20} />
                    <span>Risk Engine</span>
                </NavLink>

                <NavLink
                    to="/map"
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                >
                    <Map size={20} />
                    <span>Live Map</span>
                </NavLink>

                <div style={{ flex: 1 }}></div>

                <div className="nav-link" style={{ marginTop: 'auto', opacity: 0.7, cursor: 'not-allowed' }}>
                    <Settings size={20} />
                    <span>Settings</span>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
