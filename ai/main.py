from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="AntiGravity AI Risk Engine")

class RiskRequest(BaseModel):
    traffic_density: str # LOW, MEDIUM, HIGH
    weather_condition: str # CLEAR, RAIN, SNOW, FOG
    visibility: str # GOOD, POOR
    road_type: str # HIGHWAY, CITY_STREET, RURAL
    time_of_day: str # DAY, NIGHT

class RiskResponse(BaseModel):
    risk_score: str
    recommendations: list[str]
    alerts: list[str]

@app.post("/predict", response_model=RiskResponse)
def predict_risk(data: RiskRequest):
    # Rule-based risk scoring
    risk = "LOW"
    score = 0
    
    if data.traffic_density == "HIGH":
        score += 2
    elif data.traffic_density == "MEDIUM":
        score += 1

    if data.weather_condition in ["RAIN", "SNOW", "FOG"]:
        score += 2

    if data.visibility == "POOR":
        score += 2

    if data.time_of_day == "NIGHT":
        score += 1
        
    if data.road_type == "HIGHWAY" and data.weather_condition != "CLEAR":
        score += 1

    alerts = []
    recommendations = []

    if score >= 5:
        risk = "HIGH"
        alerts.append("High accident probability ahead")
        recommendations.append("Reduce speed by at least 20 mph")
        recommendations.append("Consider alternate routes")
    elif score >= 3:
        risk = "MEDIUM"
        alerts.append("Moderate risk conditions detected")
        recommendations.append("Maintain safe following distance")
    else:
        risk = "LOW"
        recommendations.append("Conditions are currently safe")

    # Specific alerts
    if data.visibility == "POOR":
        alerts.append("Poor visibility detected")
    if data.weather_condition == "RAIN":
        alerts.append("Heavy rain risk zone")
    if data.time_of_day == "NIGHT":
        recommendations.append("Use high beams appropriately and stay alert")

    # Ensure unique alerts and recommendations
    alerts = list(set(alerts))
    recommendations = list(set(recommendations))

    return RiskResponse(
        risk_score=risk,
        recommendations=recommendations,
        alerts=alerts
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
