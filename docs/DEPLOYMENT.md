# Production Deployment Guide

Complete guide for deploying your Data Science Portfolio to production.

## Overview

This guide covers deploying:
- **Backend** (FastAPI) to Railway or Render
- **Frontend** (Next.js) to Vercel
- **Database** (optional) for logging predictions
- **Monitoring** and performance optimization

---

## Pre-Deployment Checklist

### Backend
- [ ] All ML models trained and saved as `.pkl` files
- [ ] Environment variables configured
- [ ] API endpoints tested locally
- [ ] Error handling implemented
- [ ] CORS configured for production frontend URL
- [ ] Sensitive data removed from code

### Frontend
- [ ] All pages render correctly
- [ ] API integration tested
- [ ] Responsive design verified on mobile
- [ ] Images optimized
- [ ] Personal information updated
- [ ] Links verified (GitHub, LinkedIn, email)

---

## Part 1: Backend Deployment

### Option A: Railway (Recommended - Easiest)

#### Step 1: Prepare Your Code

1. Ensure `.gitignore` is properly configured:
```bash
# Should already be in backend/.gitignore
__pycache__/
*.pyc
.env
venv/
```

2. Verify `requirements.txt` is up to date:
```bash
cd backend
pip freeze > requirements.txt
```

3. Create `railway.json` (optional, for custom config):

Create `backend/railway.json`:
```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "pip install -r requirements.txt && python create_sample_models.py"
  },
  "deploy": {
    "startCommand": "uvicorn app.main:app --host 0.0.0.0 --port $PORT",
    "healthcheckPath": "/api/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 3
  }
}
```

#### Step 2: Deploy to Railway

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `data_science_portfolio` repository
   - Railway will detect it's a Python project

3. **Configure Settings**
   - Click on your service
   - Go to "Settings"
   - Set **Root Directory**: `backend`
   - Railway auto-detects the start command

4. **Add Environment Variables**
   - Go to "Variables" tab
   - Add these variables:
   ```
   CORS_ORIGINS=https://your-frontend-url.vercel.app,http://localhost:3000
   API_HOST=0.0.0.0
   API_PORT=$PORT
   PYTHON_VERSION=3.11
   ```

5. **Deploy**
   - Railway automatically deploys
   - Monitor the build logs
   - Once deployed, note your URL: `https://your-app.railway.app`

6. **Verify Deployment**
```bash
curl https://your-app.railway.app/
# Should return: {"status":"healthy","message":"..."}

curl https://your-app.railway.app/api/docs
# Should show Swagger UI
```

#### Step 3: Set Up Custom Domain (Optional)

1. Go to "Settings" > "Domains"
2. Click "Generate Domain" for Railway subdomain
3. Or add your custom domain

---

### Option B: Render

#### Step 1: Prepare Your Code

Create `backend/render.yaml`:
```yaml
services:
  - type: web
    name: ds-portfolio-api
    env: python
    region: oregon
    plan: free
    branch: main
    rootDir: backend
    buildCommand: pip install -r requirements.txt && python create_sample_models.py
    startCommand: uvicorn app.main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: PYTHON_VERSION
        value: 3.11.0
      - key: CORS_ORIGINS
        sync: false
```

#### Step 2: Deploy to Render

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository

3. **Configure Service**
   - **Name**: `ds-portfolio-api`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**:
     ```bash
     pip install -r requirements.txt && python create_sample_models.py
     ```
   - **Start Command**:
     ```bash
     uvicorn app.main:app --host 0.0.0.0 --port $PORT
     ```
   - **Plan**: Free (or paid for better performance)

4. **Add Environment Variables**
   - Click "Environment" tab
   - Add:
   ```
   CORS_ORIGINS=https://your-frontend.vercel.app,http://localhost:3000
   PYTHON_VERSION=3.11.0
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy
   - Note your URL: `https://ds-portfolio-api.onrender.com`

6. **Verify**
```bash
curl https://ds-portfolio-api.onrender.com/api/health
```

**Note**: Render's free tier spins down after inactivity. First request may take 30-60 seconds.

---

### Production Backend Optimizations

#### 1. Add Health Check Endpoint

Already implemented in `backend/app/main.py`:
```python
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "All systems operational"}
```

#### 2. Add Request Logging

Create `backend/app/middleware/logging.py`:
```python
import logging
import time
from fastapi import Request

logger = logging.getLogger(__name__)

async def log_requests(request: Request, call_next):
    start_time = time.time()

    response = await call_next(request)

    process_time = time.time() - start_time
    logger.info(
        f"{request.method} {request.url.path} "
        f"completed in {process_time:.2f}s "
        f"with status {response.status_code}"
    )

    return response
```

Add to `main.py`:
```python
from .middleware.logging import log_requests

app.middleware("http")(log_requests)
```

#### 3. Add Rate Limiting

```bash
pip install slowapi
```

```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@router.post("/predict/churn")
@limiter.limit("10/minute")
async def predict_churn(request: Request, input_data: PredictionInput):
    # ... existing code
```

#### 4. Enable Compression

Already enabled by FastAPI for responses > 500 bytes.

---

## Part 2: Frontend Deployment to Vercel

### Step 1: Prepare Your Code

1. **Update Environment Variables**

Edit `frontend/.env.example`:
```env
# Production
NEXT_PUBLIC_API_URL=https://your-backend.railway.app

# Local development
# NEXT_PUBLIC_API_URL=http://localhost:8000
```

2. **Optimize Images**

- Compress images in `frontend/public/images/`
- Use WebP format when possible
- Recommended: Use [squoosh.app](https://squoosh.app)

3. **Verify Build**
```bash
cd frontend
npm run build
npm start  # Test production build locally
```

### Step 2: Deploy to Vercel

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will detect Next.js

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add:
     ```
     Key: NEXT_PUBLIC_API_URL
     Value: https://your-backend.railway.app
     ```
   - Apply to: Production, Preview, Development

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy in ~2 minutes
   - Your site will be live at: `https://your-project.vercel.app`

6. **Verify Deployment**
   - Visit your Vercel URL
   - Check that projects load
   - Test interactive demos
   - Verify responsive design on mobile

### Step 3: Update Backend CORS

Now that you have your frontend URL, update backend:

**Railway:**
- Go to your service → Variables
- Update `CORS_ORIGINS`:
  ```
  CORS_ORIGINS=https://your-project.vercel.app,http://localhost:3000
  ```
- Redeploy

**Render:**
- Go to Environment → Edit
- Update `CORS_ORIGINS`
- Save (auto-redeploys)

### Step 4: Custom Domain (Optional)

1. **Add Domain in Vercel**
   - Go to Project Settings → Domains
   - Add your domain: `portfolio.yourdomain.com`
   - Follow DNS instructions

2. **Configure DNS**
   - Add CNAME record:
     ```
     Type: CNAME
     Name: portfolio (or @)
     Value: cname.vercel-dns.com
     ```

3. **Update Backend CORS Again**
   - Add custom domain to `CORS_ORIGINS`

---

## Part 3: Database (Optional - For Production Analytics)

If you want to log predictions for monitoring:

### Option A: PostgreSQL on Railway

1. **Add Database**
   - In Railway project, click "New"
   - Select "Database" → "PostgreSQL"
   - Railway creates database automatically

2. **Get Connection String**
   - Click on PostgreSQL service
   - Copy DATABASE_URL from Variables

3. **Update Backend**

Add to `backend/requirements.txt`:
```
sqlalchemy==2.0.25
psycopg2-binary==2.9.9
```

Create `backend/app/database.py`:
```python
from sqlalchemy import create_engine, Column, Integer, Float, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from datetime import datetime

DATABASE_URL = os.getenv("DATABASE_URL", "").replace("postgres://", "postgresql://")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    model_name = Column(String)
    input_features = Column(String)  # JSON string
    prediction = Column(Float)
    probability = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)
```

Log predictions in `predictions.py`:
```python
from .database import SessionLocal, Prediction
import json

# After making prediction:
db = SessionLocal()
log_entry = Prediction(
    model_name=model_name,
    input_features=json.dumps(input_data.features),
    prediction=float(prediction),
    probability=float(probability)
)
db.add(log_entry)
db.commit()
db.close()
```

4. **Add DATABASE_URL to Environment**
   - Railway: Auto-injected
   - Render: Add manually from PostgreSQL connection string

---

## Part 4: Monitoring & Analytics

### Add Vercel Analytics

1. **Install Vercel Analytics**
```bash
cd frontend
npm install @vercel/analytics
```

2. **Add to Layout**

Edit `frontend/app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

3. **View Analytics**
   - Go to Vercel Dashboard → Your Project → Analytics

### Backend Monitoring

#### Railway Logs
- Go to your service → "Deployments"
- Click on latest deployment → "View Logs"
- Monitor errors and requests

#### Add Sentry (Optional)

```bash
pip install sentry-sdk[fastapi]
```

```python
import sentry_sdk

sentry_sdk.init(
    dsn=os.getenv("SENTRY_DSN"),
    traces_sample_rate=1.0,
)
```

---

## Part 5: Performance Optimization

### Backend Optimizations

#### 1. Enable Caching

```bash
pip install redis
```

```python
import redis
import pickle

cache = redis.Redis(host='localhost', port=6379, decode_responses=False)

def get_cached_prediction(key):
    result = cache.get(key)
    return pickle.loads(result) if result else None

def cache_prediction(key, value, ttl=3600):
    cache.setex(key, ttl, pickle.dumps(value))
```

#### 2. Model Warming

Add to `main.py`:
```python
@app.on_event("startup")
async def load_models():
    """Pre-load models on startup"""
    from .routers.predictions import load_model
    models = ["churn", "image_classifier", "time_series"]
    for model_name in models:
        try:
            load_model(model_name)
            logger.info(f"Loaded model: {model_name}")
        except Exception as e:
            logger.error(f"Failed to load {model_name}: {e}")
```

### Frontend Optimizations

#### 1. Image Optimization

Use Next.js Image component:
```typescript
import Image from 'next/image';

<Image
  src="/images/project.jpg"
  alt="Project"
  width={800}
  height={600}
  quality={85}
  priority  // For above-the-fold images
/>
```

#### 2. Enable Caching

Already optimized by Vercel. Add headers in `next.config.mjs`:
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

---

## Part 6: Continuous Deployment

### GitHub Actions (Optional)

Both Railway and Vercel auto-deploy on push to main branch. For additional testing:

Create `.github/workflows/test.yml`:
```yaml
name: Test

on: [push, pull_request]

jobs:
  backend-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: |
          cd backend
          pip install -r requirements.txt
      - name: Test API
        run: |
          cd backend
          python create_sample_models.py
          # Add your tests here

  frontend-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install and build
        run: |
          cd frontend
          npm ci
          npm run build
```

---

## Troubleshooting

### Backend Issues

**Build fails on Railway/Render:**
- Check Python version matches local
- Verify all dependencies in requirements.txt
- Check build logs for specific errors

**Models not found:**
- Ensure `create_sample_models.py` runs in build command
- Check file paths are relative

**CORS errors:**
- Verify CORS_ORIGINS includes frontend URL
- Check both http:// and https://
- Ensure no trailing slashes

**Slow cold starts (Render free tier):**
- Expected on free tier
- Upgrade to paid plan for always-on service
- Or switch to Railway

### Frontend Issues

**API calls failing:**
- Check NEXT_PUBLIC_API_URL is correct
- Verify backend is running
- Check browser console for CORS errors

**Build fails:**
- Run `npm run build` locally first
- Check for TypeScript errors
- Verify all dependencies installed

**Images not loading:**
- Ensure images in `public/` directory
- Use absolute paths: `/images/photo.jpg`
- Check image file sizes (< 1MB recommended)

---

## Security Checklist

- [ ] No API keys in code (use environment variables)
- [ ] CORS properly configured (not using `*`)
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] HTTPS enabled (automatic on Vercel/Railway)
- [ ] Error messages don't leak sensitive info
- [ ] Dependencies up to date (`npm audit`, `pip-audit`)

---

## Cost Estimation

### Free Tier (Hobby Projects)

- **Railway**: $5/month free credit (enough for backend)
- **Vercel**: Unlimited for personal projects
- **Render**: Free (with cold starts)
- **Total**: $0-5/month

### Paid Tier (Production)

- **Railway**: ~$10-20/month (always-on backend)
- **Vercel Pro**: $20/month (team features)
- **PostgreSQL**: $7-15/month
- **Total**: ~$40-60/month

---

## Next Steps After Deployment

1. **Monitor Performance**
   - Check Vercel Analytics
   - Monitor Railway/Render logs
   - Track error rates

2. **Collect Feedback**
   - Share with friends/colleagues
   - Post on LinkedIn
   - Get user feedback

3. **Iterate**
   - Add more projects
   - Improve models
   - Add features based on feedback

4. **SEO Optimization**
   - Add meta tags
   - Submit to Google Search Console
   - Create sitemap

---

## Support Resources

- **Railway**: [docs.railway.app](https://docs.railway.app)
- **Render**: [render.com/docs](https://render.com/docs)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **FastAPI**: [fastapi.tiangolo.com](https://fastapi.tiangolo.com)
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
