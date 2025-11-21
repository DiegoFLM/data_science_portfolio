from pydantic import BaseModel, Field
from typing import List, Dict, Optional


class ProjectMetrics(BaseModel):
    """Metrics for a project (accuracy, precision, etc.)"""
    pass  # Will be dynamic based on project


class ProjectSummary(BaseModel):
    """Summary of a project for listing pages"""
    id: str
    title: str
    shortDescription: str
    icon: str
    metrics: Dict[str, str]
    techStack: List[str]
    demoAvailable: bool


class ProjectDetail(BaseModel):
    """Full project details including methodology and results"""
    id: str
    title: str
    shortDescription: str
    description: str
    image: str
    icon: str
    metrics: Dict[str, str]
    techStack: List[str]
    problemStatement: str
    methodology: str
    results: List[str]
    githubUrl: str
    demoAvailable: bool
    modelEndpoint: Optional[str] = None


class PredictionInput(BaseModel):
    """Input features for model prediction"""
    features: Dict[str, float] = Field(
        ...,
        example={
            "tenure": 24,
            "monthly_charges": 65.5,
            "total_charges": 1572.0,
            "contract_type": 1,
            "payment_method": 2
        }
    )


class PredictionOutput(BaseModel):
    """Model prediction output"""
    prediction: int
    probability: float
    model_name: str
    confidence: str = Field(
        ...,
        description="Human-readable confidence level (Low/Medium/High)"
    )


class HealthCheck(BaseModel):
    """Health check response"""
    status: str
    message: str
