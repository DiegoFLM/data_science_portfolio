from fastapi import APIRouter, HTTPException
import joblib
import numpy as np
import os
from typing import Dict
from ..models.schemas import PredictionInput, PredictionOutput

router = APIRouter(prefix="/api/predict", tags=["predictions"])

# Model storage
MODELS_DIR = os.path.join(os.path.dirname(__file__), "../models/saved")
loaded_models: Dict = {}


def load_model(model_name: str):
    """Load a model from disk if not already loaded"""
    if model_name not in loaded_models:
        model_path = os.path.join(MODELS_DIR, f"{model_name}_model.pkl")
        if not os.path.exists(model_path):
            raise HTTPException(
                status_code=404,
                detail=f"Model '{model_name}' not found"
            )
        loaded_models[model_name] = joblib.load(model_path)
    return loaded_models[model_name]


def get_confidence_level(probability: float) -> str:
    """Convert probability to human-readable confidence level"""
    if probability >= 0.8:
        return "High"
    elif probability >= 0.6:
        return "Medium"
    else:
        return "Low"


@router.post("/churn", response_model=PredictionOutput)
async def predict_churn(input_data: PredictionInput):
    """
    Predict customer churn probability

    Expected features:
    - tenure: Number of months with company (0-72)
    - monthly_charges: Monthly bill amount (20-120)
    - total_charges: Total amount charged (20-8500)
    - contract_type: 0=Month-to-month, 1=One year, 2=Two year
    - payment_method: 0=Electronic check, 1=Mailed check, 2=Bank transfer, 3=Credit card
    """
    try:
        model = load_model("churn")

        # Extract features in the correct order
        feature_names = ["tenure", "monthly_charges", "total_charges", "contract_type", "payment_method"]
        features = np.array([[input_data.features.get(f, 0) for f in feature_names]])

        # Make prediction
        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0][1]  # Probability of churn (class 1)

        return PredictionOutput(
            prediction=int(prediction),
            probability=round(float(probability), 3),
            model_name="churn",
            confidence=get_confidence_level(probability)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


@router.post("/image_classifier", response_model=PredictionOutput)
async def predict_image_class(input_data: PredictionInput):
    """
    Classify medical images

    Note: This is a simplified demo. In production, this would accept image data.
    For demo purposes, it accepts numerical features representing image embeddings.
    """
    try:
        model = load_model("image_classifier")

        # For demo: using simplified features
        features = np.array([list(input_data.features.values())])

        prediction = model.predict(features)[0]
        probabilities = model.predict_proba(features)[0]
        max_probability = float(max(probabilities))

        return PredictionOutput(
            prediction=int(prediction),
            probability=round(max_probability, 3),
            model_name="image_classifier",
            confidence=get_confidence_level(max_probability)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


@router.post("/time_series", response_model=PredictionOutput)
async def predict_energy_demand(input_data: PredictionInput):
    """
    Forecast energy demand

    Expected features:
    - hour: Hour of day (0-23)
    - day_of_week: Day of week (0-6)
    - temperature: Temperature in Celsius
    - humidity: Humidity percentage (0-100)
    - is_holiday: 0 or 1
    """
    try:
        model = load_model("time_series")

        feature_names = ["hour", "day_of_week", "temperature", "humidity", "is_holiday"]
        features = np.array([[input_data.features.get(f, 0) for f in feature_names]])

        prediction = model.predict(features)[0]

        # For regression, we'll use a dummy confidence based on historical error
        # In production, this would use prediction intervals
        confidence_score = 0.85

        return PredictionOutput(
            prediction=int(prediction),
            probability=round(confidence_score, 3),
            model_name="time_series",
            confidence=get_confidence_level(confidence_score)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
