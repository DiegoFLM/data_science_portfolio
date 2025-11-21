# Quick Start Guide

Get your Data Science Portfolio running in 5 minutes!

## Prerequisites

- Python 3.9+
- Node.js 18+

## Setup Steps

### 1. Backend (Terminal 1)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python create_sample_models.py
uvicorn app.main:app --reload
```

✅ Backend running at http://localhost:8000

### 2. Frontend (Terminal 2)

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

✅ Frontend running at http://localhost:3000

## Test It

1. Open http://localhost:3000
2. Click on a featured project
3. Try the interactive ML demo
4. Check the API docs at http://localhost:8000/api/docs

## What's Next?

1. **Customize**: Edit `frontend/app/page.tsx` with your information
2. **Add Projects**: Modify `backend/app/data/projects.json`
3. **Deploy**: See `SETUP.md` for deployment instructions

## Need Help?

- **Detailed Setup**: See `SETUP.md`
- **Backend Docs**: See `backend/README.md`
- **Frontend Docs**: See `frontend/README.md`
- **API Docs**: http://localhost:8000/api/docs (when backend is running)

## Common Issues

**"No projects loading"**
- Make sure backend is running first
- Check http://localhost:8000/ returns `{"status":"healthy"}`

**"Port already in use"**
- Backend: Use `--port 8001` flag
- Frontend: Will auto-select next available port

**"Module not found"**
- Backend: Activate virtual environment
- Frontend: Run `npm install` again
