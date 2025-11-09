from fastapi import APIRouter, Depends, HTTPException, status, Query
from bson import ObjectId # For get-by-id
from datetime import datetime

from models.job_model import job_collection
from utils.dependencies import get_current_student

router = APIRouter(prefix="/student/jobs", tags=["Student Jobs"])

# --- Helper: Convert MongoDB documents to JSON-safe format ---
def serialize_doc(doc):
    """Recursively convert ObjectIds and nested MongoDB docs into serializable dicts."""
    if isinstance(doc, list):
        return [serialize_doc(d) for d in doc]
    if isinstance(doc, dict):
        return {k: serialize_doc(v) for k, v in doc.items()}
    if isinstance(doc, ObjectId):
        return str(doc)
    return doc

# --- HELPER FUNCTION (To avoid repeating security logic) ---
async def build_student_job_query(student_email: str) -> dict:
    """
    Builds the base MongoDB query for all student-visible jobs.
    This is Layer 1 (Access) filter to only show jobs meant forcurrent student by validating with student email.
    """
    public_statuses = ["active", "closed"]

    query = {
           "$and": [
               { "status": {"$in": public_statuses} },
               { 
                 "$or": [
                   { "eligible_emails": {"$exists": False} }, 
                   { "eligible_emails": None }, 
                   { "eligible_emails": student_email }
                 ]
               }
           ]
       }
    return query

# --- GET: Fetch all jobs open for current student---
@router.get("/")
async def get_eligible_jobs(current_student: dict = Depends(get_current_student)):
    """Fetch all jobs open for the logged-in student."""
    student_email = current_student.get("email") if isinstance(current_student, dict) else current_student

    mongo_query = await build_student_job_query(student_email)

    jobs = await job_collection.find(mongo_query).to_list(length=None)

    return {"jobs": serialize_doc(jobs)}

# --- GET: Fetch a single job ---
@router.get("/{job_id}")
async def get_eligible_job_details(job_id: str, current_student: dict = Depends(get_current_student)):
    """Fetch one job by ID for editing/viewing."""
    student_email = current_student.get("email") if isinstance(current_student, dict) else current_student

    mongo_query = await build_student_job_query(student_email)

    try:
        mongo_query["$and"].append({"_id": ObjectId(job_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid job ID")
    
    job = await job_collection.find_one(mongo_query)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found or unauthorised")

    return serialize_doc(job)
