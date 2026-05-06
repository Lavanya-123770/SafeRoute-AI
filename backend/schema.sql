CREATE DATABASE IF NOT EXISTS antigravity_db;
USE antigravity_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE weather_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    zone_id VARCHAR(50),
    weather_condition VARCHAR(50),
    visibility VARCHAR(50),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE road_conditions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    zone_id VARCHAR(50),
    road_type VARCHAR(50),
    traffic_density VARCHAR(50),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE accident_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    zone_id VARCHAR(50),
    severity VARCHAR(50),
    description TEXT,
    accident_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE risk_analysis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    zone_id VARCHAR(50),
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    risk_score VARCHAR(20),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
