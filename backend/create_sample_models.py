"""
Script to create sample ML models for demonstration purposes
Run this script once to generate the model files
"""

import numpy as np
import joblib
import os
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.datasets import make_classification

# Create models directory
os.makedirs("app/models/saved", exist_ok=True)

print("Creating sample ML models...")

# 1. Churn Prediction Model (Binary Classification)
print("\n1. Creating churn prediction model...")
X_churn, y_churn = make_classification(
    n_samples=1000,
    n_features=5,
    n_informative=4,
    n_redundant=1,
    random_state=42
)

churn_model = RandomForestClassifier(n_estimators=100, random_state=42)
churn_model.fit(X_churn, y_churn)
joblib.dump(churn_model, "app/models/saved/churn_model.pkl")
print("   ✓ Churn model saved to app/models/saved/churn_model.pkl")

# 2. Image Classifier Model (Multi-class Classification)
print("\n2. Creating image classifier model...")
X_image, y_image = make_classification(
    n_samples=1000,
    n_features=10,  # Simulating image embeddings
    n_informative=8,
    n_redundant=2,
    n_classes=5,  # 5 disease categories
    random_state=42
)

image_model = RandomForestClassifier(n_estimators=100, random_state=42)
image_model.fit(X_image, y_image)
joblib.dump(image_model, "app/models/saved/image_classifier_model.pkl")
print("   ✓ Image classifier model saved to app/models/saved/image_classifier_model.pkl")

# 3. Time Series Model (Regression for energy demand)
print("\n3. Creating time series forecasting model...")
# Features: hour, day_of_week, temperature, humidity, is_holiday
np.random.seed(42)
n_samples = 1000
X_ts = np.column_stack([
    np.random.randint(0, 24, n_samples),      # hour
    np.random.randint(0, 7, n_samples),       # day_of_week
    np.random.uniform(15, 35, n_samples),     # temperature
    np.random.uniform(30, 90, n_samples),     # humidity
    np.random.randint(0, 2, n_samples)        # is_holiday
])

# Simulate energy demand (higher during day hours, affected by temperature)
y_ts = (
    50 +  # base load
    20 * np.sin(X_ts[:, 0] * np.pi / 12) +  # daily pattern
    0.5 * X_ts[:, 2] +  # temperature effect
    np.random.normal(0, 5, n_samples)  # noise
)

ts_model = RandomForestRegressor(n_estimators=100, random_state=42)
ts_model.fit(X_ts, y_ts)
joblib.dump(ts_model, "app/models/saved/time_series_model.pkl")
print("   ✓ Time series model saved to app/models/saved/time_series_model.pkl")

print("\n✅ All sample models created successfully!")
print("\nModel files:")
print("  - app/models/saved/churn_model.pkl")
print("  - app/models/saved/image_classifier_model.pkl")
print("  - app/models/saved/time_series_model.pkl")
