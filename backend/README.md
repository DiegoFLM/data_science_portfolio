# Portfolio Backend API

FastAPI backend for the Data Science Portfolio website.

## Features

- **Project Management**: Endpoints to retrieve project information
- **ML Model Inference**: Real-time predictions using trained models
- **CORS Support**: Configured for frontend integration
- **Interactive Docs**: Automatic API documentation with Swagger UI

## Setup Instructions

### 1. Create Virtual Environment

```bash
cd backend
python -m venv venv

# On Linux/Mac
source venv/bin/activate

# On Windows
venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Create Environment File

```bash
cp .env.example .env
```

Edit `.env` and update the `CORS_ORIGINS` if needed.

### 4. Generate Sample ML Models

```bash
python create_sample_models.py
```

This will create three sample models in `app/models/saved/`:
- `churn_model.pkl` - Customer churn prediction
- `image_classifier_model.pkl` - Medical image classification
- `time_series_model.pkl` - Energy demand forecasting

### 5. Run the Development Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at: `http://localhost:8000`

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc

## API Endpoints

### Projects

- `GET /api/projects/` - Get all projects
- `GET /api/projects/featured?limit=3` - Get featured projects
- `GET /api/projects/{project_id}` - Get specific project details

### Predictions

- `POST /api/predict/churn` - Predict customer churn
- `POST /api/predict/image_classifier` - Classify medical images
- `POST /api/predict/time_series` - Forecast energy demand

### Health Check

- `GET /` - Root health check
- `GET /api/health` - Health status

## Example API Calls

### Get All Projects
```bash
curl http://localhost:8000/api/projects/
```

### Get Project Details
```bash
curl http://localhost:8000/api/projects/customer-churn-prediction
```

### Make a Prediction
```bash
curl -X POST http://localhost:8000/api/predict/churn \
  -H "Content-Type: application/json" \
  -d '{
    "features": {
      "tenure": 24,
      "monthly_charges": 65.5,
      "total_charges": 1572.0,
      "contract_type": 1,
      "payment_method": 2
    }
  }'
```

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   ├── data/
│   │   └── projects.json    # Project data
│   ├── models/
│   │   ├── __init__.py
│   │   ├── schemas.py       # Pydantic models
│   │   └── saved/           # Trained ML models (.pkl files)
│   └── routers/
│       ├── __init__.py
│       ├── projects.py      # Project endpoints
│       └── predictions.py   # ML prediction endpoints
├── .env.example             # Environment variables template
├── .gitignore
├── requirements.txt
├── create_sample_models.py  # Script to generate sample models
└── README.md
```

## Deployment

### Railway

1. Create a new project on Railway
2. Connect your GitHub repository
3. Set root directory to `backend`
4. Add environment variables in Railway dashboard
5. Railway will auto-detect FastAPI and deploy

### Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt && python create_sample_models.py`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables
5. Deploy

## Environment Variables for Production

When deploying, make sure to set:
- `CORS_ORIGINS`: Your frontend URL (e.g., `https://your-portfolio.vercel.app`)

## Testing

Test the API is working:
```bash
# Health check
curl http://localhost:8000/

# Get projects
curl http://localhost:8000/api/projects/

# Test prediction
curl -X POST http://localhost:8000/api/predict/churn \
  -H "Content-Type: application/json" \
  -d '{"features": {"tenure": 12, "monthly_charges": 50.0, "total_charges": 600.0, "contract_type": 0, "payment_method": 0}}'
```
