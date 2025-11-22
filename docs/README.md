# Documentation

Complete documentation for building, customizing, and deploying your Data Science Portfolio.

## 📖 Table of Contents

### Getting Started
- [QUICKSTART.md](../QUICKSTART.md) - Get running in 5 minutes
- [SETUP.md](../SETUP.md) - Complete setup guide

### Customization Guides
1. **[ADDING_PROJECTS.md](ADDING_PROJECTS.md)** - Add your ML projects
   - Writing project descriptions
   - Adding project metadata
   - Creating project images
   - Best practices for showcasing your work

2. **[ADDING_MODELS.md](ADDING_MODELS.md)** - Deploy your ML models
   - Saving trained models
   - Creating prediction endpoints
   - Building interactive demos
   - Model preprocessing and pipelines

3. **[ADDING_VISUALIZATIONS.md](ADDING_VISUALIZATIONS.md)** - Add interactive plots
   - Plotly integration
   - Common visualization types
   - Performance metrics dashboards
   - Alternative visualization libraries

### Production Deployment
4. **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deploy to production
   - Backend deployment (Railway/Render)
   - Frontend deployment (Vercel)
   - Database setup (optional)
   - Monitoring and analytics
   - Performance optimization

### Component Documentation
- [backend/README.md](../backend/README.md) - Backend API documentation
- [frontend/README.md](../frontend/README.md) - Frontend documentation

---

## Quick Reference

### Adding a New Project

1. **Add metadata** to `backend/app/data/projects.json`
2. **Add image** to `frontend/public/images/`
3. **(Optional)** Add model for interactive demo
4. **Test locally** then deploy

See: [ADDING_PROJECTS.md](ADDING_PROJECTS.md)

### Adding an Interactive ML Demo

1. **Save model** as `.pkl` file to `backend/app/models/saved/`
2. **Create endpoint** in `backend/app/routers/predictions.py`
3. **Configure UI** in `frontend/components/ModelDemo.tsx`
4. **Update project** metadata with `modelEndpoint`

See: [ADDING_MODELS.md](ADDING_MODELS.md)

### Adding Visualizations

1. **Install Plotly**: `npm install plotly.js-dist-min react-plotly.js`
2. **Create component** in `frontend/components/`
3. **Add to project page** in `app/projects/[id]/page.tsx`
4. **(Optional)** Create backend endpoint for dynamic data

See: [ADDING_VISUALIZATIONS.md](ADDING_VISUALIZATIONS.md)

### Deploying to Production

**Backend (Railway):**
```bash
1. Push to GitHub
2. Connect Railway to your repo
3. Set root directory to "backend"
4. Add environment variables
5. Deploy automatically
```

**Frontend (Vercel):**
```bash
1. Push to GitHub
2. Import project to Vercel
3. Set root directory to "frontend"
4. Add NEXT_PUBLIC_API_URL
5. Deploy automatically
```

See: [DEPLOYMENT.md](DEPLOYMENT.md)

---

## Directory Structure

```
data_science_portfolio/
├── docs/                           # This directory
│   ├── README.md                   # This file
│   ├── ADDING_PROJECTS.md          # Project customization guide
│   ├── ADDING_MODELS.md            # ML model deployment guide
│   ├── ADDING_VISUALIZATIONS.md    # Visualization guide
│   └── DEPLOYMENT.md               # Production deployment guide
│
├── backend/                        # FastAPI backend
│   ├── app/
│   │   ├── data/projects.json      # ← Edit to add projects
│   │   ├── models/saved/           # ← Add .pkl files here
│   │   ├── routers/
│   │   │   └── predictions.py      # ← Add prediction endpoints
│   │   └── main.py
│   └── README.md
│
├── frontend/                       # Next.js frontend
│   ├── app/
│   │   ├── page.tsx                # ← Edit for personal info
│   │   └── projects/[id]/page.tsx  # ← Add visualization sections
│   ├── components/
│   │   └── ModelDemo.tsx           # ← Configure model features
│   ├── public/images/              # ← Add project images
│   └── README.md
│
├── QUICKSTART.md                   # Quick start guide
├── SETUP.md                        # Complete setup guide
└── README.md                       # Main README
```

---

## Common Tasks

### Update Personal Information

**Files to edit:**
- `frontend/app/page.tsx` - Name, bio, tagline, contact info
- `frontend/components/Navbar.tsx` - Navigation links
- `frontend/components/Footer.tsx` - Footer links

### Add Tech Stack Item

Edit `frontend/app/page.tsx`:
```typescript
const techStack = [
  'Python',
  'PyTorch',
  'Your New Tech',  // ← Add here
  // ...
];
```

### Change Color Scheme

Edit `frontend/tailwind.config.ts`:
```typescript
colors: {
  primary: {
    500: '#your-color',  // ← Change primary color
    // ...
  }
}
```

### Add a New Page

Create `frontend/app/your-page/page.tsx`:
```typescript
export default function YourPage() {
  return <div>Your content</div>;
}
```

Add link in `Navbar.tsx`:
```typescript
<Link href="/your-page">Your Page</Link>
```

---

## Workflow

### Local Development

```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate
uvicorn app.main:app --reload

# Terminal 2 - Frontend
cd frontend
npm run dev

# Open http://localhost:3000
```

### Making Changes

1. **Edit files** (projects, models, components)
2. **Test locally** at http://localhost:3000
3. **Commit changes**:
   ```bash
   git add .
   git commit -m "Add new project: Fraud Detection"
   git push
   ```
4. **Auto-deploys** to production (if configured)

### Deployment Workflow

1. **Test locally** first
2. **Push to GitHub**
3. **Railway/Render** auto-deploys backend
4. **Vercel** auto-deploys frontend
5. **Verify** production deployment
6. **Monitor** logs for errors

---

## Best Practices

### Projects
- Write clear, concise descriptions
- Include quantitative results
- Show business impact when possible
- Use high-quality images
- Keep GitHub repos up to date

### Models
- Include preprocessing in model pipeline
- Validate inputs thoroughly
- Handle errors gracefully
- Log predictions for monitoring
- Document expected input ranges

### Visualizations
- Make responsive (mobile-friendly)
- Support dark mode
- Add loading states
- Handle errors
- Keep charts simple and clear

### Deployment
- Test thoroughly before deploying
- Monitor logs after deployment
- Set up alerts for errors
- Keep dependencies updated
- Use environment variables for config

---

## Troubleshooting

### Can't find documentation?
- Check [docs/](.) for detailed guides
- See individual README files in backend/ and frontend/
- Review SETUP.md for complete instructions

### Project not loading?
- Verify backend is running
- Check console for API errors
- Confirm project exists in projects.json
- Verify project ID matches in URL and JSON

### Model predictions failing?
- Check model file exists in models/saved/
- Verify endpoint name matches in all 3 places
- Test endpoint with curl
- Check backend logs for errors

### Deployment failing?
- Review deployment logs
- Verify environment variables set
- Check build commands are correct
- Ensure dependencies are listed
- See DEPLOYMENT.md troubleshooting section

---

## Getting Help

1. **Check documentation** in this folder
2. **Review error messages** in logs
3. **Search issues** in platform docs:
   - [Railway Docs](https://docs.railway.app)
   - [Vercel Docs](https://vercel.com/docs)
   - [FastAPI Docs](https://fastapi.tiangolo.com)
   - [Next.js Docs](https://nextjs.org/docs)

---

## Contributing

Found an issue with the documentation? Want to improve it?

1. Fork the repository
2. Make your changes
3. Submit a pull request

---

## Additional Resources

### Learning Resources
- **FastAPI**: [fastapi.tiangolo.com/tutorial](https://fastapi.tiangolo.com/tutorial)
- **Next.js**: [nextjs.org/learn](https://nextjs.org/learn)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Plotly**: [plotly.com/python](https://plotly.com/python)

### Tools
- **Squoosh**: Image compression - [squoosh.app](https://squoosh.app)
- **Excalidraw**: Diagrams - [excalidraw.com](https://excalidraw.com)
- **Canva**: Design - [canva.com](https://canva.com)
- **Color Picker**: [coolors.co](https://coolors.co)

### Inspiration
- [brittanychiang.com](https://brittanychiang.com)
- [joshwcomeau.com](https://joshwcomeau.com)
- [leerob.io](https://leerob.io)

---

**Last Updated**: 2024

**Version**: 1.0
