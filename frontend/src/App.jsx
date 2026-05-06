import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import PredictionEngine from './pages/PredictionEngine';
import LiveMap from './pages/LiveMap';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/prediction" element={<PredictionEngine />} />
            <Route path="/map" element={<LiveMap />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
