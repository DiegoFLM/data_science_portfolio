import { ProjectSummary, ProjectDetail, PredictionInput, PredictionOutput } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchProjects(): Promise<ProjectSummary[]> {
  const response = await fetch(`${API_BASE_URL}/api/projects/`);
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
}

export async function fetchFeaturedProjects(limit: number = 3): Promise<ProjectSummary[]> {
  const response = await fetch(`${API_BASE_URL}/api/projects/featured?limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch featured projects');
  }
  return response.json();
}

export async function fetchProjectById(id: string): Promise<ProjectDetail> {
  const response = await fetch(`${API_BASE_URL}/api/projects/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch project: ${id}`);
  }
  return response.json();
}

export async function makePrediction(
  modelEndpoint: string,
  input: PredictionInput
): Promise<PredictionOutput> {
  const response = await fetch(`${API_BASE_URL}/api/predict/${modelEndpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(`Prediction failed for model: ${modelEndpoint}`);
  }

  return response.json();
}
