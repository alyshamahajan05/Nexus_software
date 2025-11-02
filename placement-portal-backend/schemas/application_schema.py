from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ApplicationCreate(BaseModel):
    job_id: str
    candidate_email: str
    score: Optional[float] = None
    status: Optional[str] = "Applied"

class ApplicationResponse(BaseModel):
    job_title: str
    candidate_name: str
    score: Optional[float]
    status: str
    applied_on: datetime
    class Config:
        from_attributes = True