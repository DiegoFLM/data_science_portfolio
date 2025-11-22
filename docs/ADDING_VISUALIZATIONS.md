# Adding Interactive Visualizations

This guide shows you how to add interactive plots and visualizations to your portfolio projects.

## Overview

Interactive visualizations make your projects more engaging and help visitors understand your results better. You can add:
- Interactive Plotly charts
- Model performance visualizations
- Data exploration dashboards
- Real-time prediction visualizations

---

## Option 1: Plotly (Recommended)

Plotly provides beautiful, interactive charts that work seamlessly with React.

### Step 1: Install Dependencies

```bash
cd frontend
npm install plotly.js-dist-min react-plotly.js
npm install --save-dev @types/plotly.js
```

### Step 2: Create Visualization Component

Create `frontend/components/PlotlyChart.tsx`:

```typescript
'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Dynamically import to avoid SSR issues
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface PlotlyChartProps {
  projectId: string;
}

export default function PlotlyChart({ projectId }: PlotlyChartProps) {
  const [data, setData] = useState<any[]>([]);
  const [layout, setLayout] = useState<any>({});

  useEffect(() => {
    // Fetch visualization data from your API
    fetchVisualizationData(projectId);
  }, [projectId]);

  const fetchVisualizationData = async (id: string) => {
    // This would call your backend API
    // For now, we'll use mock data
    const mockData = getChartData(id);
    setData(mockData.data);
    setLayout(mockData.layout);
  };

  if (!data.length) {
    return <div>Loading visualization...</div>;
  }

  return (
    <div className="w-full">
      <Plot
        data={data}
        layout={layout}
        config={{ responsive: true }}
        className="w-full"
      />
    </div>
  );
}

// Example chart configurations
function getChartData(projectId: string) {
  switch (projectId) {
    case 'customer-churn-prediction':
      return {
        data: [
          {
            x: ['Precision', 'Recall', 'F1-Score', 'Accuracy'],
            y: [0.91, 0.84, 0.87, 0.89],
            type: 'bar',
            marker: { color: '#0ea5e9' },
            name: 'Model Performance'
          }
        ],
        layout: {
          title: 'Model Performance Metrics',
          xaxis: { title: 'Metric' },
          yaxis: { title: 'Score', range: [0, 1] },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
        }
      };

    case 'time-series-forecasting':
      return {
        data: [
          {
            x: Array.from({ length: 24 }, (_, i) => i),
            y: Array.from({ length: 24 }, (_, i) =>
              50 + 20 * Math.sin(i * Math.PI / 12) + Math.random() * 5
            ),
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Actual',
            line: { color: '#0ea5e9' }
          },
          {
            x: Array.from({ length: 24 }, (_, i) => i),
            y: Array.from({ length: 24 }, (_, i) =>
              50 + 20 * Math.sin(i * Math.PI / 12)
            ),
            type: 'scatter',
            mode: 'lines',
            name: 'Predicted',
            line: { color: '#f97316', dash: 'dash' }
          }
        ],
        layout: {
          title: '24-Hour Energy Demand Forecast',
          xaxis: { title: 'Hour of Day' },
          yaxis: { title: 'Energy Demand (MW)' },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
        }
      };

    default:
      return { data: [], layout: {} };
  }
}
```

### Step 3: Add to Project Page

Edit `frontend/app/projects/[id]/page.tsx`:

```typescript
import PlotlyChart from '@/components/PlotlyChart';

// In your component, add a visualization section:
<section className="section">
  <div className="container-custom max-w-4xl">
    <h2 className="text-3xl font-bold mb-6">Visualizations</h2>
    <PlotlyChart projectId={project.id} />
  </div>
</section>
```

---

## Option 2: Backend-Generated Visualizations

Generate static or dynamic visualizations from your backend using Matplotlib/Seaborn and serve as images or JSON.

### Backend: Generate Visualization Data

Add to `backend/app/routers/visualizations.py`:

```python
from fastapi import APIRouter
import json
import numpy as np

router = APIRouter(prefix="/api/visualizations", tags=["visualizations"])

@router.get("/{project_id}/metrics")
async def get_project_metrics(project_id: str):
    """
    Return visualization data for a project
    """
    # In production, load from database or compute from saved results
    if project_id == "customer-churn-prediction":
        return {
            "confusion_matrix": {
                "true_positive": 840,
                "false_positive": 95,
                "false_negative": 160,
                "true_negative": 1905
            },
            "feature_importance": {
                "tenure": 0.28,
                "monthly_charges": 0.24,
                "total_charges": 0.19,
                "contract_type": 0.16,
                "payment_method": 0.13
            },
            "roc_curve": {
                "fpr": [0, 0.05, 0.1, 0.2, 0.4, 1.0],
                "tpr": [0, 0.6, 0.75, 0.84, 0.92, 1.0],
                "auc": 0.91
            }
        }

    return {}
```

Register in `backend/app/main.py`:

```python
from .routers import projects, predictions, visualizations

app.include_router(visualizations.router)
```

### Frontend: Fetch and Display

```typescript
'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export default function ConfusionMatrix({ projectId }: { projectId: string }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/visualizations/${projectId}/metrics`)
      .then(res => res.json())
      .then(data => setData(data));
  }, [projectId]);

  if (!data?.confusion_matrix) return null;

  const cm = data.confusion_matrix;
  const matrix = [
    [cm.true_positive, cm.false_positive],
    [cm.false_negative, cm.true_negative]
  ];

  return (
    <Plot
      data={[{
        z: matrix,
        x: ['Predicted Positive', 'Predicted Negative'],
        y: ['Actual Positive', 'Actual Negative'],
        type: 'heatmap',
        colorscale: 'Blues'
      }]}
      layout={{
        title: 'Confusion Matrix',
        xaxis: { title: 'Predicted' },
        yaxis: { title: 'Actual' }
      }}
    />
  );
}
```

---

## Common Visualization Types

### 1. Feature Importance

```typescript
function FeatureImportance({ features }: { features: Record<string, number> }) {
  const data = [{
    x: Object.values(features),
    y: Object.keys(features),
    type: 'bar',
    orientation: 'h',
    marker: { color: '#0ea5e9' }
  }];

  const layout = {
    title: 'Feature Importance',
    xaxis: { title: 'Importance Score' },
    yaxis: { title: 'Features' },
    height: 400
  };

  return <Plot data={data} layout={layout} config={{ responsive: true }} />;
}
```

### 2. ROC Curve

```typescript
function ROCCurve({ fpr, tpr, auc }: { fpr: number[], tpr: number[], auc: number }) {
  const data = [
    {
      x: fpr,
      y: tpr,
      type: 'scatter',
      mode: 'lines',
      name: `ROC Curve (AUC = ${auc.toFixed(2)})`,
      line: { color: '#0ea5e9', width: 3 }
    },
    {
      x: [0, 1],
      y: [0, 1],
      type: 'scatter',
      mode: 'lines',
      name: 'Random Classifier',
      line: { color: '#94a3b8', dash: 'dash' }
    }
  ];

  const layout = {
    title: 'ROC Curve',
    xaxis: { title: 'False Positive Rate' },
    yaxis: { title: 'True Positive Rate' },
    showlegend: true
  };

  return <Plot data={data} layout={layout} config={{ responsive: true }} />;
}
```

### 3. Learning Curve

```typescript
function LearningCurve() {
  const epochs = Array.from({ length: 50 }, (_, i) => i + 1);
  const trainLoss = epochs.map(e => 2 / e + 0.1 + Math.random() * 0.05);
  const valLoss = epochs.map(e => 2 / e + 0.2 + Math.random() * 0.05);

  const data = [
    {
      x: epochs,
      y: trainLoss,
      type: 'scatter',
      mode: 'lines',
      name: 'Training Loss',
      line: { color: '#0ea5e9' }
    },
    {
      x: epochs,
      y: valLoss,
      type: 'scatter',
      mode: 'lines',
      name: 'Validation Loss',
      line: { color: '#f97316' }
    }
  ];

  const layout = {
    title: 'Learning Curve',
    xaxis: { title: 'Epoch' },
    yaxis: { title: 'Loss' }
  };

  return <Plot data={data} layout={layout} config={{ responsive: true }} />;
}
```

### 4. Confusion Matrix Heatmap

```typescript
function ConfusionMatrixHeatmap({ matrix, labels }: {
  matrix: number[][],
  labels: string[]
}) {
  const data = [{
    z: matrix,
    x: labels,
    y: labels,
    type: 'heatmap',
    colorscale: 'Blues',
    showscale: true
  }];

  const layout = {
    title: 'Confusion Matrix',
    xaxis: { title: 'Predicted Label' },
    yaxis: { title: 'True Label' },
    annotations: matrix.flatMap((row, i) =>
      row.map((val, j) => ({
        x: labels[j],
        y: labels[i],
        text: val.toString(),
        showarrow: false,
        font: { color: val > matrix.flat().reduce((a,b) => Math.max(a,b)) / 2 ? 'white' : 'black' }
      }))
    )
  };

  return <Plot data={data} layout={layout} config={{ responsive: true }} />;
}
```

### 5. Time Series with Confidence Intervals

```typescript
function TimeSeriesForecast() {
  const x = Array.from({ length: 100 }, (_, i) => i);
  const y = x.map(i => Math.sin(i * 0.1) + Math.random() * 0.2);
  const yUpper = y.map(v => v + 0.3);
  const yLower = y.map(v => v - 0.3);

  const data = [
    {
      x: x,
      y: y,
      type: 'scatter',
      mode: 'lines',
      name: 'Forecast',
      line: { color: '#0ea5e9' }
    },
    {
      x: [...x, ...x.reverse()],
      y: [...yUpper, ...yLower.reverse()],
      fill: 'toself',
      fillcolor: 'rgba(14, 165, 233, 0.2)',
      line: { color: 'transparent' },
      name: '95% Confidence Interval',
      showlegend: true
    }
  ];

  return <Plot data={data} layout={{ title: 'Forecast with Confidence Interval' }} />;
}
```

---

## Option 3: Recharts (Alternative to Plotly)

Recharts is a React-native charting library that's lighter than Plotly.

### Install

```bash
npm install recharts
```

### Example: Bar Chart

```typescript
'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Precision', value: 0.91 },
  { name: 'Recall', value: 0.84 },
  { name: 'F1-Score', value: 0.87 },
  { name: 'Accuracy', value: 0.89 },
];

export default function MetricsChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 1]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#0ea5e9" />
      </BarChart>
    </ResponsiveContainer>
  );
}
```

---

## Option 4: Static Images with Matplotlib

For simpler needs, generate static images with Python and serve them.

### Backend: Generate Image

```python
import matplotlib.pyplot as plt
import io
import base64
from fastapi.responses import StreamingResponse

@router.get("/{project_id}/confusion_matrix")
async def get_confusion_matrix_image(project_id: str):
    # Create matplotlib figure
    fig, ax = plt.subplots(figsize=(8, 6))

    # Example data
    cm = [[840, 95], [160, 1905]]

    # Create heatmap
    im = ax.imshow(cm, cmap='Blues')

    # Add labels
    ax.set_xticks([0, 1])
    ax.set_yticks([0, 1])
    ax.set_xticklabels(['Predicted Negative', 'Predicted Positive'])
    ax.set_yticklabels(['Actual Negative', 'Actual Positive'])

    # Add values
    for i in range(2):
        for j in range(2):
            ax.text(j, i, cm[i][j], ha="center", va="center", color="white")

    ax.set_title('Confusion Matrix')
    fig.colorbar(im, ax=ax)

    # Save to bytes
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    plt.close()

    return StreamingResponse(buf, media_type="image/png")
```

### Frontend: Display Image

```typescript
<img
  src="http://localhost:8000/api/visualizations/customer-churn-prediction/confusion_matrix"
  alt="Confusion Matrix"
  className="w-full rounded-lg shadow-lg"
/>
```

---

## Best Practices

### 1. Responsive Design

```typescript
// Always use ResponsiveContainer or responsive config
<Plot
  data={data}
  layout={layout}
  config={{ responsive: true }}
  useResizeHandler={true}
  className="w-full"
/>
```

### 2. Dark Mode Support

```typescript
const layout = {
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(0,0,0,0)',
  font: { color: '#6b7280' },  // Use CSS variable or dynamic color
};
```

### 3. Loading States

```typescript
const [loading, setLoading] = useState(true);

if (loading) {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  );
}
```

### 4. Error Handling

```typescript
const [error, setError] = useState<string | null>(null);

if (error) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <p className="text-red-800">Failed to load visualization: {error}</p>
    </div>
  );
}
```

---

## Complete Example: Adding Visualizations to a Project

### 1. Create Visualization Component

`frontend/components/ProjectVisualizations.tsx`:

```typescript
'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export default function ProjectVisualizations({ projectId }: { projectId: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/visualizations/${projectId}/metrics`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [projectId]);

  if (loading) {
    return <div>Loading visualizations...</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-8">
      {data.feature_importance && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <Plot
            data={[{
              x: Object.values(data.feature_importance),
              y: Object.keys(data.feature_importance),
              type: 'bar',
              orientation: 'h',
              marker: { color: '#0ea5e9' }
            }]}
            layout={{
              title: 'Feature Importance',
              xaxis: { title: 'Importance' },
              height: 400,
              paper_bgcolor: 'rgba(0,0,0,0)',
            }}
            config={{ responsive: true }}
            className="w-full"
          />
        </div>
      )}

      {data.roc_curve && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <Plot
            data={[{
              x: data.roc_curve.fpr,
              y: data.roc_curve.tpr,
              type: 'scatter',
              mode: 'lines',
              name: `AUC = ${data.roc_curve.auc}`,
              line: { color: '#0ea5e9', width: 3 }
            }]}
            layout={{
              title: 'ROC Curve',
              xaxis: { title: 'False Positive Rate' },
              yaxis: { title: 'True Positive Rate' },
              height: 400,
            }}
            config={{ responsive: true }}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}
```

### 2. Add to Project Page

```typescript
import ProjectVisualizations from '@/components/ProjectVisualizations';

// Add after results section
<section className="section bg-gray-50 dark:bg-gray-800">
  <div className="container-custom max-w-4xl">
    <h2 className="text-3xl font-bold mb-6">Performance Metrics</h2>
    <ProjectVisualizations projectId={project.id} />
  </div>
</section>
```

---

## Next Steps

- [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy with visualizations
- [PERFORMANCE.md](PERFORMANCE.md) - Optimize visualization performance
