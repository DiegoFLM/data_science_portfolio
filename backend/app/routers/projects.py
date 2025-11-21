from fastapi import APIRouter, HTTPException
from typing import List
import json
import os
from ..models.schemas import ProjectSummary, ProjectDetail

router = APIRouter(prefix="/api/projects", tags=["projects"])

# Load projects data
DATA_FILE = os.path.join(os.path.dirname(__file__), "../data/projects.json")


def load_projects():
    """Load projects from JSON file"""
    try:
        with open(DATA_FILE, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []


@router.get("/", response_model=List[ProjectSummary])
async def get_all_projects():
    """
    Get all projects (summary view for projects page)
    """
    projects = load_projects()
    return [
        ProjectSummary(
            id=p["id"],
            title=p["title"],
            shortDescription=p["shortDescription"],
            icon=p["icon"],
            metrics=p["metrics"],
            techStack=p["techStack"],
            demoAvailable=p["demoAvailable"]
        )
        for p in projects
    ]


@router.get("/featured", response_model=List[ProjectSummary])
async def get_featured_projects(limit: int = 3):
    """
    Get featured projects for home page
    """
    projects = load_projects()
    featured = projects[:limit]  # Take first N projects as featured
    return [
        ProjectSummary(
            id=p["id"],
            title=p["title"],
            shortDescription=p["shortDescription"],
            icon=p["icon"],
            metrics=p["metrics"],
            techStack=p["techStack"],
            demoAvailable=p["demoAvailable"]
        )
        for p in featured
    ]


@router.get("/{project_id}", response_model=ProjectDetail)
async def get_project_by_id(project_id: str):
    """
    Get detailed information about a specific project
    """
    projects = load_projects()
    project = next((p for p in projects if p["id"] == project_id), None)

    if not project:
        raise HTTPException(status_code=404, detail=f"Project '{project_id}' not found")

    return ProjectDetail(**project)
