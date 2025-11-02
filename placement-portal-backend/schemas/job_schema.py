from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class JobCreate(BaseModel):
    title: str
    description: str
    location: str
    salary: Optional[str] = None
    skills_required: Optional[List[str]] = None
    experience_level: Optional[str] = None
    status: Optional[str] = "active"


class JobUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    salary: Optional[str] = None
    skills_required: Optional[List[str]] = None
    experience_level: Optional[str] = None
    status: Optional[str] = None


class JobResponse(BaseModel):
    id: str
    title: str
    description: str
    location: str
    salary: Optional[str]
    skills_required: Optional[List[str]]
    experience_level: Optional[str]
    status: str
    posted_by: str
    posted_on: Optional[datetime] = None

    class Config:
        from_attributes = True


class JobDeleteResponse(BaseModel):
    message: str
    deleted_job_id: str