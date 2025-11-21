from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import projects, predictions
from .models.schemas import HealthCheck
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Data Science Portfolio API",
    description="FastAPI backend for Diego's Data Science Portfolio",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS configuration
origins = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(projects.router)
app.include_router(predictions.router)


@app.get("/", response_model=HealthCheck)
async def root():
    """Root endpoint - health check"""
    return HealthCheck(
        status="healthy",
        message="Data Science Portfolio API is running"
    )


@app.get("/api/health", response_model=HealthCheck)
async def health_check():
    """Health check endpoint"""
    return HealthCheck(
        status="healthy",
        message="All systems operational"
    )
