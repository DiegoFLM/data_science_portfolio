# Data Science Portfolio - Complete Setup Guide

Professional data science portfolio with FastAPI backend and Next.js frontend.

## Project Overview

**Tech Stack:**
- **Backend**: FastAPI, Python, scikit-learn
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Deployment**: Backend on Railway/Render, Frontend on Vercel

## Quick Start (Local Development)

### Prerequisites

- Python 3.9 or higher
- Node.js 18 or higher
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/DiegoFLM/data_science_portfolio.git
cd data_science_portfolio
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Generate sample ML models
python create_sample_models.py

# Start the backend server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be running at: **http://localhost:8000**

API Documentation: **http://localhost:8000/api/docs**

### 3. Frontend Setup

Open a **new terminal** window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start the development server
npm run dev
```

Frontend will be running at: **http://localhost:3000**

### 4. Test the Application

1. Open http://localhost:3000 in your browser
2. You should see the home page with featured projects
3. Navigate to the Projects page
4. Click on a project to see details
5. Try the interactive ML demo (for projects that have demos enabled)

## Project Structure

```
data_science_portfolio/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── main.py         # FastAPI application
│   │   ├── data/           # Project data (JSON)
│   │   ├── models/         # Pydantic schemas & saved ML models
│   │   └── routers/        # API endpoints
│   ├── .env.example
│   ├── requirements.txt
│   ├── create_sample_models.py
│   └── README.md
│
├── frontend/               # Next.js frontend
│   ├── app/
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   └── projects/      # Projects pages
│   ├── components/        # React components
│   ├── lib/              # API client & types
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
└── SETUP.md              # This file
```

## API Endpoints

### Projects
- `GET /api/projects/` - Get all projects
- `GET /api/projects/featured?limit=3` - Get featured projects
- `GET /api/projects/{id}` - Get project details

### ML Predictions
- `POST /api/predict/churn` - Customer churn prediction
- `POST /api/predict/image_classifier` - Image classification
- `POST /api/predict/time_series` - Energy demand forecasting

### Health Check
- `GET /` - Health check
- `GET /api/health` - Detailed health status

## Customization

### Add Your Own Projects

Edit `backend/app/data/projects.json` to add your projects:

```json
{
  "id": "your-project-id",
  "title": "Your Project Title",
  "shortDescription": "Brief description",
  "description": "Full description",
  "icon": "🚀",
  "metrics": {
    "accuracy": "95%"
  },
  "techStack": ["Python", "TensorFlow"],
  "problemStatement": "...",
  "methodology": "...",
  "results": ["Result 1", "Result 2"],
  "githubUrl": "https://github.com/yourusername/project",
  "demoAvailable": false,
  "modelEndpoint": null
}
```

### Add Your Own ML Models

1. Train your model
2. Save it using joblib:
   ```python
   import joblib
   joblib.dump(model, 'backend/app/models/saved/your_model.pkl')
   ```
3. Add an endpoint in `backend/app/routers/predictions.py`
4. Add the model demo in `frontend/components/ModelDemo.tsx`

### Update Personal Information

Edit `frontend/app/page.tsx`:
- Name and tagline
- Bio text
- Profile photo
- Contact links
- Tech stack

## Deployment

### Backend Deployment (Railway)

1. Create account at [railway.app](https://railway.app)
2. Create new project
3. Connect GitHub repository
4. Set root directory: `backend`
5. Add environment variables:
   ```
   CORS_ORIGINS=https://your-frontend.vercel.app,http://localhost:3000
   ```
6. Railway will auto-detect Python and deploy
7. Note your deployment URL (e.g., `https://your-app.railway.app`)

**Alternative: Render**
1. Create account at [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Settings:
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt && python create_sample_models.py`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables

### Frontend Deployment (Vercel)

1. Create account at [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Set root directory: `frontend`
4. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app
   ```
5. Deploy!
6. Update backend CORS_ORIGINS to include your Vercel URL

## Troubleshooting

### Backend Issues

**Models not found:**
```bash
cd backend
python create_sample_models.py
```

**CORS errors:**
Update `backend/.env` with your frontend URL in `CORS_ORIGINS`

**Port already in use:**
```bash
# Use a different port
uvicorn app.main:app --reload --port 8001
```

### Frontend Issues

**API connection failed:**
1. Verify backend is running
2. Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
3. Restart dev server: `npm run dev`

**Build errors:**
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Common Issues

**Projects not loading:**
- Ensure backend is running
- Check browser console for errors
- Verify API URL in `.env.local`

**Predictions failing:**
- Make sure sample models are created
- Check backend logs for errors
- Verify input format matches model expectations

## Development Tips

### Run both servers simultaneously

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn app.main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### View API Documentation

While backend is running, visit:
- Swagger UI: http://localhost:8000/api/docs
- ReDoc: http://localhost:8000/api/redoc

### Test API Endpoints

```bash
# Get all projects
curl http://localhost:8000/api/projects/

# Make a prediction
curl -X POST http://localhost:8000/api/predict/churn \
  -H "Content-Type: application/json" \
  -d '{"features": {"tenure": 24, "monthly_charges": 65.5, "total_charges": 1572.0, "contract_type": 1, "payment_method": 2}}'
```

## Next Steps

1. **Replace placeholder content** with your actual information
2. **Add your real ML models** and projects
3. **Upload a professional photo** to `frontend/public/images/`
4. **Update contact information** and social links
5. **Deploy to production** following the deployment guide above
6. **Add custom domain** (optional) via Vercel settings

## Support

For issues or questions:
- Check the individual README files in `backend/` and `frontend/`
- Review API documentation at http://localhost:8000/api/docs
- Check deployment platform documentation

## License

This project is open source and available under the MIT License.
