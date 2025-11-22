# Adding Your ML Models for Interactive Demos

This guide shows you how to add your trained ML models to create interactive demos in your portfolio.

## Overview

Interactive demos allow visitors to input features and get real-time predictions from your models. This is a powerful way to showcase your work!

---

## Quick Start

1. Train and save your model as a `.pkl` file
2. Add the model file to `backend/app/models/saved/`
3. Create a prediction endpoint in `backend/app/routers/predictions.py`
4. Configure the demo UI in `frontend/components/ModelDemo.tsx`
5. Update your project's `demoAvailable` and `modelEndpoint` fields

---

## Step 1: Save Your Trained Model

### Using scikit-learn

```python
import joblib
from sklearn.ensemble import RandomForestClassifier

# Train your model
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, 'my_model.pkl')
```

### Using PyTorch

```python
import torch
import joblib

# For PyTorch, wrap in a sklearn-compatible wrapper
class PyTorchModelWrapper:
    def __init__(self, model):
        self.model = model
        self.model.eval()

    def predict(self, X):
        with torch.no_grad():
            X_tensor = torch.FloatTensor(X)
            outputs = self.model(X_tensor)
            predictions = torch.argmax(outputs, dim=1)
            return predictions.numpy()

    def predict_proba(self, X):
        with torch.no_grad():
            X_tensor = torch.FloatTensor(X)
            outputs = torch.softmax(self.model(X_tensor), dim=1)
            return outputs.numpy()

# Wrap and save
wrapper = PyTorchModelWrapper(your_pytorch_model)
joblib.dump(wrapper, 'my_pytorch_model.pkl')
```

### Using TensorFlow/Keras

```python
import joblib
import numpy as np

class KerasModelWrapper:
    def __init__(self, model):
        self.model = model

    def predict(self, X):
        probas = self.model.predict(X)
        return np.argmax(probas, axis=1)

    def predict_proba(self, X):
        return self.model.predict(X)

# Wrap and save
wrapper = KerasModelWrapper(your_keras_model)
joblib.dump(wrapper, 'my_keras_model.pkl')
```

### Important: Include Preprocessing

If your model requires preprocessing, include it in the wrapper:

```python
class ModelWithPreprocessing:
    def __init__(self, model, scaler, encoder=None):
        self.model = model
        self.scaler = scaler
        self.encoder = encoder

    def predict(self, X):
        # Apply preprocessing
        X_scaled = self.scaler.transform(X)
        if self.encoder:
            X_scaled = self.encoder.transform(X_scaled)
        return self.model.predict(X_scaled)

    def predict_proba(self, X):
        X_scaled = self.scaler.transform(X)
        if self.encoder:
            X_scaled = self.encoder.transform(X_scaled)
        return self.model.predict_proba(X_scaled)

# Save everything together
pipeline = ModelWithPreprocessing(model, scaler, encoder)
joblib.dump(pipeline, 'model_with_preprocessing.pkl')
```

---

## Step 2: Add Model to Backend

Copy your `.pkl` file to:
```
backend/app/models/saved/your_model_name.pkl
```

**File naming convention**: `{model_endpoint_name}_model.pkl`

Example: If your endpoint is `/api/predict/fraud`, name it `fraud_model.pkl`

---

## Step 3: Create Prediction Endpoint

Edit `backend/app/routers/predictions.py` and add your endpoint:

### Template for Classification Models

```python
@router.post("/your_model_name", response_model=PredictionOutput)
async def predict_your_model(input_data: PredictionInput):
    """
    Description of what your model predicts

    Expected features:
    - feature1: Description (range or categories)
    - feature2: Description (range or categories)
    - feature3: Description (range or categories)
    """
    try:
        # Load model
        model = load_model("your_model_name")

        # Define feature order (important!)
        feature_names = ["feature1", "feature2", "feature3"]

        # Extract features in correct order
        features = np.array([[input_data.features.get(f, 0) for f in feature_names]])

        # Make prediction
        prediction = model.predict(features)[0]
        probabilities = model.predict_proba(features)[0]

        # Get probability for positive class
        probability = float(probabilities[1]) if len(probabilities) > 1 else float(probabilities[0])

        return PredictionOutput(
            prediction=int(prediction),
            probability=round(probability, 3),
            model_name="your_model_name",
            confidence=get_confidence_level(probability)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
```

### Template for Regression Models

```python
@router.post("/your_regression_model", response_model=PredictionOutput)
async def predict_regression(input_data: PredictionInput):
    """
    Description of what value your model predicts

    Expected features:
    - feature1: Description
    - feature2: Description
    """
    try:
        model = load_model("your_regression_model")

        feature_names = ["feature1", "feature2", "feature3"]
        features = np.array([[input_data.features.get(f, 0) for f in feature_names]])

        # For regression, prediction is the value
        prediction = model.predict(features)[0]

        # For regression, confidence could be based on prediction intervals
        # or historical error metrics
        confidence_score = 0.85  # Placeholder - use your actual confidence metric

        return PredictionOutput(
            prediction=float(prediction),  # Return the actual predicted value
            probability=round(confidence_score, 3),
            model_name="your_regression_model",
            confidence=get_confidence_level(confidence_score)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
```

### Real Example: Fraud Detection

```python
@router.post("/fraud_detection", response_model=PredictionOutput)
async def predict_fraud(input_data: PredictionInput):
    """
    Predict if a transaction is fraudulent

    Expected features:
    - amount: Transaction amount in dollars (0-10000)
    - hour: Hour of transaction (0-23)
    - day_of_week: Day of week (0=Mon, 6=Sun)
    - merchant_category: Category code (0-9)
    - distance_from_home: Distance in miles (0-1000)
    """
    try:
        model = load_model("fraud_detection")

        feature_names = [
            "amount",
            "hour",
            "day_of_week",
            "merchant_category",
            "distance_from_home"
        ]

        features = np.array([[input_data.features.get(f, 0) for f in feature_names]])

        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0][1]  # Probability of fraud

        return PredictionOutput(
            prediction=int(prediction),
            probability=round(float(probability), 3),
            model_name="fraud_detection",
            confidence=get_confidence_level(probability)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
```

---

## Step 4: Configure Frontend Demo UI

Edit `frontend/components/ModelDemo.tsx` and add your model's features:

```typescript
const modelFeatures: Record<string, Array<{
  name: string;
  label: string;
  min: number;
  max: number;
  default: number;
  step?: number
}>> = {
  // ... existing models ...

  fraud_detection: [
    {
      name: 'amount',
      label: 'Transaction Amount ($)',
      min: 0,
      max: 10000,
      default: 150,
      step: 10
    },
    {
      name: 'hour',
      label: 'Hour of Day',
      min: 0,
      max: 23,
      default: 14
    },
    {
      name: 'day_of_week',
      label: 'Day of Week (0=Mon)',
      min: 0,
      max: 6,
      default: 2
    },
    {
      name: 'merchant_category',
      label: 'Merchant Category',
      min: 0,
      max: 9,
      default: 5
    },
    {
      name: 'distance_from_home',
      label: 'Distance from Home (miles)',
      min: 0,
      max: 1000,
      default: 10,
      step: 5
    },
  ],
};
```

### Field Configuration

- **name**: Must match the feature name in your backend
- **label**: Display name shown to users
- **min/max**: Range for the slider and number input
- **default**: Initial value when page loads
- **step**: Increment size (optional, defaults to 1)

---

## Step 5: Update Project Metadata

In `backend/app/data/projects.json`, update your project:

```json
{
  "id": "fraud-detection",
  "title": "Fraud Detection System",
  ...
  "demoAvailable": true,
  "modelEndpoint": "fraud_detection"
}
```

**Important**: `modelEndpoint` must match:
- The route name in `predictions.py` (without `/api/predict/`)
- The key in `modelFeatures` in `ModelDemo.tsx`
- The model filename (without `_model.pkl`)

---

## Step 6: Test Your Model

### Test Backend Endpoint

```bash
curl -X POST http://localhost:8000/api/predict/fraud_detection \
  -H "Content-Type: application/json" \
  -d '{
    "features": {
      "amount": 250,
      "hour": 14,
      "day_of_week": 2,
      "merchant_category": 5,
      "distance_from_home": 10
    }
  }'
```

Expected response:
```json
{
  "prediction": 0,
  "probability": 0.123,
  "model_name": "fraud_detection",
  "confidence": "Low"
}
```

### Test Frontend Demo

1. Start both backend and frontend
2. Navigate to `http://localhost:3000/projects/fraud-detection`
3. Scroll to "Interactive Demo" section
4. Adjust sliders and click "Get Prediction"
5. Verify prediction appears correctly

---

## Advanced: Handling Different Input Types

### Categorical Features

If your model needs categorical inputs, you can use dropdown selects:

**Option 1**: Encode in backend
```python
# Backend handles encoding
contract_type_map = {0: "Month-to-month", 1: "One year", 2: "Two year"}
```

**Option 2**: Enhanced UI (requires frontend customization)
```typescript
// In ModelDemo.tsx, add custom input types
type: 'select',
options: [
  { value: 0, label: 'Month-to-month' },
  { value: 1, label: 'One year' },
  { value: 2, label: 'Two year' }
]
```

### Text Inputs (NLP Models)

For NLP models, you'll need to customize `ModelDemo.tsx`:

```typescript
// Add text input instead of sliders
<textarea
  value={inputText}
  onChange={(e) => setInputText(e.target.value)}
  className="w-full p-3 border rounded-lg"
  rows={4}
  placeholder="Enter text to analyze..."
/>
```

Backend processes text:
```python
from sklearn.feature_extraction.text import TfidfVectorizer

# Load vectorizer with model
vectorizer = joblib.load("vectorizer.pkl")
features = vectorizer.transform([input_text])
```

### Image Inputs (Computer Vision)

For image models, accept base64 encoded images:

```python
import base64
import io
from PIL import Image
import numpy as np

@router.post("/image_classifier")
async def classify_image(image_data: str):
    # Decode base64 image
    image_bytes = base64.b64decode(image_data.split(',')[1])
    image = Image.open(io.BytesIO(image_bytes))

    # Preprocess
    image = image.resize((224, 224))
    image_array = np.array(image) / 255.0

    # Predict
    prediction = model.predict(image_array.reshape(1, 224, 224, 3))
    ...
```

---

## Production Best Practices

### 1. Model Versioning

```python
# Include version in model filename
joblib.dump(model, 'fraud_detection_v2.pkl')

# Track in code
MODEL_VERSION = "v2.0"
```

### 2. Input Validation

```python
from pydantic import validator

class FraudPredictionInput(BaseModel):
    features: Dict[str, float]

    @validator('features')
    def validate_features(cls, v):
        required = ['amount', 'hour', 'day_of_week']
        if not all(f in v for f in required):
            raise ValueError(f"Missing required features: {required}")

        # Validate ranges
        if v['amount'] < 0 or v['amount'] > 10000:
            raise ValueError("Amount must be between 0 and 10000")

        return v
```

### 3. Error Handling

```python
try:
    prediction = model.predict(features)[0]
except Exception as e:
    logger.error(f"Prediction error: {str(e)}")
    raise HTTPException(
        status_code=500,
        detail="Model prediction failed. Please try again."
    )
```

### 4. Logging Predictions

```python
import logging

logger = logging.getLogger(__name__)

# Log each prediction
logger.info(f"Prediction request: {features} -> {prediction} (conf: {probability})")
```

### 5. Model Caching

Models are already cached in memory after first load:

```python
# In predictions.py - models cached in loaded_models dict
loaded_models: Dict = {}  # Already implemented
```

---

## Troubleshooting

### Model Not Loading
- Check filename: Must be `{endpoint_name}_model.pkl`
- Check path: Must be in `backend/app/models/saved/`
- Verify file permissions

### Wrong Predictions
- Verify feature order matches training
- Check preprocessing steps
- Test with known examples from training set

### Frontend Demo Not Showing
- Verify `demoAvailable: true` in project JSON
- Check `modelEndpoint` matches route name
- Ensure features defined in `ModelDemo.tsx`

### CORS Errors
- Backend CORS_ORIGINS must include frontend URL
- Check `.env` file in backend

---

## Examples Repository

Check `backend/create_sample_models.py` for examples of creating and saving models.

---

## Next Steps

- [ADDING_VISUALIZATIONS.md](ADDING_VISUALIZATIONS.md) - Add interactive plots
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy to production
- [MONITORING.md](MONITORING.md) - Monitor model performance
