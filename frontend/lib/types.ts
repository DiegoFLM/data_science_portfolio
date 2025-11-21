export interface ProjectMetrics {
  [key: string]: string;
}

export interface ProjectSummary {
  id: string;
  title: string;
  shortDescription: string;
  icon: string;
  metrics: ProjectMetrics;
  techStack: string[];
  demoAvailable: boolean;
}

export interface ProjectDetail extends ProjectSummary {
  description: string;
  image: string;
  problemStatement: string;
  methodology: string;
  results: string[];
  githubUrl: string;
  modelEndpoint: string | null;
}

export interface PredictionInput {
  features: Record<string, number>;
}

export interface PredictionOutput {
  prediction: number;
  probability: number;
  model_name: string;
  confidence: string;
}
