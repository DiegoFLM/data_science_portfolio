# Adding Your Own Projects

This guide walks you through adding your real ML projects to the portfolio.

## Quick Steps

1. Add project metadata to `backend/app/data/projects.json`
2. (Optional) Add your trained model files
3. (Optional) Create prediction endpoint for interactive demos
4. Add project images to `frontend/public/images/`

---

## 1. Adding Project Metadata

Edit `backend/app/data/projects.json` and add your project:

```json
{
  "id": "your-project-slug",
  "title": "Your Project Title",
  "shortDescription": "One-line description for project cards (max 100 chars)",
  "description": "Full description explaining what the project does and its impact (2-3 sentences)",
  "image": "/images/your-project-image.jpg",
  "icon": "🎯",
  "metrics": {
    "accuracy": "92%",
    "f1_score": "0.89",
    "dataset_size": "50K samples"
  },
  "techStack": ["Python", "PyTorch", "FastAPI", "Docker", "AWS"],
  "problemStatement": "Describe the business problem or research question. Why does this matter? What challenge are you solving?",
  "methodology": "Explain your approach. What models did you try? How did you preprocess data? What techniques did you use? Keep it accessible to non-technical readers while showing your expertise.",
  "results": [
    "First key result with specific metric",
    "Second result showing business impact",
    "Third result about deployment or scalability",
    "Fourth result about performance improvements"
  ],
  "githubUrl": "https://github.com/yourusername/your-project",
  "demoAvailable": true,
  "modelEndpoint": "your_model_name"
}
```

### Field Explanations

- **id**: URL-friendly slug (lowercase, hyphens, no spaces)
- **title**: Project name as it appears everywhere
- **shortDescription**: Shown on project cards (keep concise)
- **description**: Full description for project detail page
- **image**: Path to project image (relative to `frontend/public/`)
- **icon**: Emoji representing the project (optional but recommended)
- **metrics**: Key performance indicators (customize to your project)
- **techStack**: Technologies used (shown as badges)
- **problemStatement**: The "why" - what problem does this solve?
- **methodology**: The "how" - your approach and techniques
- **results**: Bullet points of achievements and outcomes
- **githubUrl**: Link to your GitHub repository
- **demoAvailable**: `true` if you have an interactive demo
- **modelEndpoint**: API endpoint name (only if demo available)

### Tips for Writing Good Project Descriptions

**Problem Statement:**
- Start with the business/research context
- Explain why this matters
- Include the impact if the problem isn't solved

**Methodology:**
- Explain your approach at a high level
- Mention specific techniques/algorithms
- Include any novel approaches or optimizations
- Make it accessible - avoid excessive jargon

**Results:**
- Start with quantitative metrics
- Include business impact when possible
- Mention deployment/production results
- Show scalability or efficiency gains

---

## 2. Adding Project Images

Create high-quality images for your projects:

1. **Create image** (recommended: 1200x630px for good quality)
2. **Save to** `frontend/public/images/your-project-name.jpg`
3. **Reference in JSON**: `"image": "/images/your-project-name.jpg"`

### Image Ideas

- Architecture diagram of your ML pipeline
- Visualization of your results (confusion matrix, ROC curve)
- Screenshot of your model in action
- Infographic showing key metrics
- Before/after comparison

### Creating Images

You can use:
- **Matplotlib/Seaborn** for charts and visualizations
- **Draw.io** or **Excalidraw** for architecture diagrams
- **Canva** for infographics
- **Figma** for polished designs

---

## 3. Example: Adding a Real Project

Let's say you have a "Fraud Detection" project:

### Step 1: Prepare Your Information

```
Title: Credit Card Fraud Detection
Problem: Credit card fraud costs billions annually
Approach: XGBoost classifier with SMOTE for imbalanced data
Results: 96% accuracy, 88% recall, deployed to production
Tech: Python, XGBoost, FastAPI, PostgreSQL, Docker
```

### Step 2: Create the JSON Entry

```json
{
  "id": "credit-card-fraud-detection",
  "title": "Credit Card Fraud Detection",
  "shortDescription": "Real-time fraud detection system with 96% accuracy using XGBoost",
  "description": "Built an end-to-end fraud detection system that analyzes transaction patterns in real-time to identify fraudulent credit card transactions. The model processes millions of transactions daily and flags suspicious activity for review.",
  "image": "/images/fraud-detection.jpg",
  "icon": "🛡️",
  "metrics": {
    "accuracy": "96%",
    "recall": "88%",
    "precision": "94%",
    "transactions_daily": "2M+"
  },
  "techStack": ["Python", "XGBoost", "FastAPI", "PostgreSQL", "Docker", "Redis"],
  "problemStatement": "Credit card fraud results in billions of dollars in losses annually. Traditional rule-based systems have high false positive rates, frustrating legitimate customers. A machine learning approach can identify complex fraud patterns while minimizing false alarms.",
  "methodology": "Developed an XGBoost classifier trained on historical transaction data with 30+ engineered features including transaction velocity, location patterns, and spending behavior. Used SMOTE to handle the highly imbalanced dataset (0.2% fraud rate). Implemented a two-stage system: ML model for initial flagging and rules engine for final decision. Deployed with Redis caching for sub-100ms inference times.",
  "results": [
    "Achieved 96% accuracy with 88% recall on held-out test set",
    "Reduced false positive rate by 65% compared to rule-based system",
    "Processing 2M+ transactions per day with <100ms latency",
    "Prevented $2.4M in fraudulent transactions in first 6 months",
    "Deployed to production serving 500K active users"
  ],
  "githubUrl": "https://github.com/yourusername/fraud-detection",
  "demoAvailable": false,
  "modelEndpoint": null
}
```

### Step 3: Add to projects.json

Add this object to the array in `backend/app/data/projects.json`

### Step 4: Add Image

Create `frontend/public/images/fraud-detection.jpg`

### Step 5: Test

```bash
# Backend running on port 8000
curl http://localhost:8000/api/projects/credit-card-fraud-detection | json_pp
```

Visit `http://localhost:3000/projects/credit-card-fraud-detection`

---

## 4. Projects Without Interactive Demos

Not all projects need interactive demos. For these:

```json
{
  "id": "your-project",
  ...
  "demoAvailable": false,
  "modelEndpoint": null
}
```

The project page will display all information except the demo section.

---

## 5. Organizing Multiple Projects

### Recommended Order

1. **Most impressive project first** (becomes featured on homepage)
2. **Production deployed projects** next
3. **Research/academic projects**
4. **Side projects/experiments** last

### Project Mix

Aim for variety:
- **Different domains**: NLP, Computer Vision, Time Series, etc.
- **Different scales**: Big data, real-time, batch processing
- **Different impacts**: Business value, research contribution, social good

### Featured Projects

The first 3 projects in `projects.json` appear on the homepage as "Featured Projects"

---

## 6. Best Practices

### Metrics
- Use realistic, verifiable metrics
- Include business metrics when possible ($ saved, users impacted)
- Show both model performance AND system performance

### Tech Stack
- List 4-8 technologies per project
- Include the most recognizable/impressive tools
- Group related tools (e.g., "PyTorch + Transformers" vs listing separately)

### GitHub Links
- Make sure repos are public
- Include a good README in the repo
- Add project documentation
- Consider adding a demo or screenshots

### Icons
Choose relevant emojis:
- 📊 Data Analysis
- 🧠 ML/AI
- 🏥 Healthcare
- 💰 Finance
- 🎯 Targeting/Prediction
- 📈 Forecasting
- 🛡️ Security
- 💬 NLP/Chat
- 👁️ Computer Vision

---

## 7. Template for Your Projects

Copy this template for quick project additions:

```json
{
  "id": "project-slug",
  "title": "Project Title",
  "shortDescription": "Brief one-liner",
  "description": "Full description in 2-3 sentences",
  "image": "/images/project.jpg",
  "icon": "🎯",
  "metrics": {
    "metric1": "value",
    "metric2": "value",
    "metric3": "value"
  },
  "techStack": ["Tech1", "Tech2", "Tech3", "Tech4"],
  "problemStatement": "What problem does this solve and why does it matter?",
  "methodology": "Your approach, techniques, and any novel contributions",
  "results": [
    "Key result 1 with metrics",
    "Key result 2 with impact",
    "Key result 3 with deployment info"
  ],
  "githubUrl": "https://github.com/yourusername/project",
  "demoAvailable": false,
  "modelEndpoint": null
}
```

---

## Next Steps

- See [ADDING_MODELS.md](ADDING_MODELS.md) for adding interactive ML demos
- See [ADDING_VISUALIZATIONS.md](ADDING_VISUALIZATIONS.md) for adding plots
- See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
