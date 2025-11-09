from fastapi import APIRouter, Depends, HTTPException, status
from models.application_model import application_collection
from models.job_model import job_collection 
from utils.dependencies import get_current_student
from datetime import datetime
from routers.student_jobs import serialize_doc 
from bson import ObjectId

router = APIRouter(prefix="/student/applications", tags=["Student Applications"])

# --- POST: Apply to a job ---
@router.post("/apply/{job_id}")
async def apply_for_job(job_id: str, current_student: dict = Depends(get_current_student)):
    """
    Creates an application for the current student for a specific job.
    Includes robust checks.
    """
    student_email = current_student.get("email") if isinstance(current_student, dict) else current_student

    # Check 1 : if the job is valid and 'active'.
    #    You can't apply to a 'closed' job.
    try:
        job_object_id = ObjectId(job_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid job ID")

    job = await job_collection.find_one({"_id": job_object_id, "status": "active"})
    if not job:
        raise HTTPException(status_code=404, detail="Job is not active or not found")
    
    # Check 2: if they already applied.
    existing_app = await application_collection.find_one({"candidate_email": student_email,"job_id": job_id}) # Using the string version of the ID
    if existing_app:
        raise HTTPException(status_code=400, detail="You have already applied")

    # Check if student is eligible for the job
    eligible_emails = job.get("eligible_emails")
    if eligible_emails and student_email not in eligible_emails:
        raise HTTPException(status_code=403, detail="You are not eligible to apply for this job")

    # Create application
    application_data = {
        "job_id": ObjectId(job_id),
        "student_email": student_email,
        "applied_at": datetime.now(datetime.timezone.utc),
        "status": "Applied"
    }
    result = await application_collection.insert_one(application_data)

    return {"message": "Application submitted successfully ✅", "application_id": str(result.inserted_id)}

# --- GET: Fetch all applications of current student ---
@router.get("/")
async def get_my_applications(current_student: dict = Depends(get_current_student)):
    """Fetch all applications made by the logged-in student."""
    student_email = current_student.get("email") if isinstance(current_student, dict) else current_student

    applications = await application_collection.find({"student_email": student_email}).to_list(length=None)

    return {"applications": serialize_doc(applications)}