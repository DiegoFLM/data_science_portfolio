# Data Science Portfolio - Diego Ledesma

Professional data science portfolio showcasing ML projects with interactive demos, powered by FastAPI and Next.js.

## 🎯 Overview

This repository contains a modern, production-ready data science portfolio featuring:
- **Interactive ML Demos**: Try live model predictions directly in your browser
- **Project Showcase**: Detailed case studies with metrics, methodology, and results
- **Modern Tech Stack**: FastAPI backend + Next.js frontend
- **Production ML**: Real scikit-learn models with REST API endpoints
- **Deployment Ready**: Configured for Railway/Render (backend) and Vercel (frontend)

## 🚀 Quick Start

**Backend (Terminal 1):**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python create_sample_models.py
uvicorn app.main:app --reload
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Visit http://localhost:3000 🎉

📖 **Full Setup Guide**: See [QUICKSTART.md](QUICKSTART.md) or [SETUP.md](SETUP.md)

## 🏗️ Architecture

```
├── backend/          # FastAPI + scikit-learn
│   ├── app/
│   │   ├── main.py           # FastAPI app
│   │   ├── routers/          # API endpoints
│   │   ├── models/           # ML models & schemas
│   │   └── data/             # Projects data
│   └── requirements.txt
│
├── frontend/         # Next.js 14 + TypeScript + Tailwind
│   ├── app/                  # Pages (App Router)
│   ├── components/           # React components
│   └── lib/                  # API client
│
└── src/              # Legacy static site (preserved)
```

## ✨ Features

### Backend (FastAPI)
- ✅ RESTful API for projects and predictions
- ✅ Three sample ML models (churn, image classification, time series)
- ✅ Automatic API documentation (Swagger/ReDoc)
- ✅ CORS configured for frontend
- ✅ Easy to deploy on Railway or Render

### Frontend (Next.js)
- ✅ Server-side rendering for fast page loads
- ✅ Responsive design (mobile-first)
- ✅ Interactive model demos with real-time predictions
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for modern styling
- ✅ Optimized for Vercel deployment

## 📊 Featured Projects

The portfolio includes 4 sample ML projects:
1. **Customer Churn Prediction** - 89% accuracy using ensemble methods
2. **Medical Image Classification** - 94% accuracy with CNNs
3. **Energy Demand Forecasting** - LSTM time series model
4. **Sentiment Analysis** - Real-time NLP pipeline

Each project includes:
- Problem statement and methodology
- Key metrics and results
- Interactive demo (where applicable)
- GitHub link

## 🌐 Live Demos

- **API Documentation**: http://localhost:8000/api/docs (when backend is running)
- **Current Static Site**: [data-science-portfolio-livid.vercel.app](https://data-science-portfolio-livid.vercel.app/)

## 📚 Documentation

### Getting Started
- **[QUICKSTART.md](QUICKSTART.md)** - Get running in 5 minutes
- **[SETUP.md](SETUP.md)** - Complete setup and deployment guide

### Customization & Production Guides
- **[Adding Your Projects](docs/ADDING_PROJECTS.md)** - Add real ML projects with images and descriptions
- **[Deploying ML Models](docs/ADDING_MODELS.md)** - Create interactive demos with your trained models
- **[Adding Visualizations](docs/ADDING_VISUALIZATIONS.md)** - Add Plotly charts and interactive plots
- **[Production Deployment](docs/DEPLOYMENT.md)** - Deploy to Railway/Render and Vercel

### API & Component Documentation
- [backend/README.md](backend/README.md) - Backend API documentation
- [frontend/README.md](frontend/README.md) - Frontend documentation
- [docs/README.md](docs/README.md) - Complete documentation index

## 🚢 Deployment

### Backend
- **Railway**: Auto-deploy from GitHub, set root to `backend`
- **Render**: Build cmd: `pip install -r requirements.txt && python create_sample_models.py`

### Frontend
- **Vercel**: Import from GitHub, set root to `frontend`
- Set `NEXT_PUBLIC_API_URL` to your deployed backend URL

See [SETUP.md](SETUP.md) for detailed deployment instructions.

## 🛠️ Tech Stack

**Backend:**
- FastAPI
- Python 3.9+
- scikit-learn
- Pydantic
- uvicorn

**Frontend:**
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

## 📝 Customization

Ready to make this portfolio your own? Start here:

1. **Add Your Projects**: See [docs/ADDING_PROJECTS.md](docs/ADDING_PROJECTS.md)
   - Edit `backend/app/data/projects.json` with your project details
   - Add project images to `frontend/public/images/`

2. **Deploy Your ML Models**: See [docs/ADDING_MODELS.md](docs/ADDING_MODELS.md)
   - Save trained models to `backend/app/models/saved/`
   - Create prediction endpoints for interactive demos

3. **Add Visualizations**: See [docs/ADDING_VISUALIZATIONS.md](docs/ADDING_VISUALIZATIONS.md)
   - Install Plotly or Recharts
   - Create interactive charts and dashboards

4. **Update Personal Info**: Edit `frontend/app/page.tsx`
   - Name, bio, tagline, contact information
   - Tech stack and featured skills

5. **Customize Styling**: Edit `frontend/tailwind.config.ts`
   - Color schemes and themes
   - Fonts and spacing

**Quick Reference**: See [docs/README.md](docs/README.md) for complete documentation

## 🤝 Contributing

This is a personal portfolio, but feel free to fork and adapt for your own use!

## 📄 License

MIT License - feel free to use this as a template for your own portfolio.

---

## 🗂️ Legacy Static Site

The original static HTML/CSS/JS portfolio is preserved in the root directory (`index.html`, `src/`, etc.). The new FastAPI + Next.js version is in `backend/` and `frontend/` directories. 