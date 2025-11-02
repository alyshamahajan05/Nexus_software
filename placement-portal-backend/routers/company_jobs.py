from fastapi import APIRouter, Depends, HTTPException, status, Query
from bson import ObjectId
from datetime import datetime

from models.job_model import job_collection
from schemas.job_schema import JobCreate, JobUpdate
from utils.dependencies import get_current_company

router = APIRouter(prefix="/company/jobs", tags=["Company Jobs"])


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


# --- POST: Create a new job ---
@router.post("/post", status_code=status.HTTP_201_CREATED)
async def post_job(job: JobCreate, current_company: dict = Depends(get_current_company)):
    """Post a new job for the logged-in company."""
    company_email = current_company.get("email") if isinstance(current_company, dict) else current_company

    job_data = {
        "title": job.title,
        "description": job.description,
        "location": job.location,
        "salary": job.salary,
        "skills_required": job.skills_required,
        "experience_level": job.experience_level,
        "status": job.status or "active",
        "posted_by": company_email,
        "posted_on": datetime.utcnow(),
    }

    result = await job_collection.insert_one(job_data)
    job_data["_id"] = result.inserted_id

    return {
        "message": "Job posted successfully ✅",
        "job": serialize_doc(job_data),
    }


# --- GET: Fetch all jobs posted by the company ---
@router.get("/my-jobs")
async def get_my_jobs(current_company: dict = Depends(get_current_company)):
    """Fetch all jobs posted by the logged-in company."""
    company_email = current_company.get("email") if isinstance(current_company, dict) else current_company

    jobs = await job_collection.find({"posted_by": company_email}).to_list(length=100)
    return {"jobs": serialize_doc(jobs)}


# --- GET: Basic job stats for dashboard ---
@router.get("/stats")
async def get_job_stats(current_company: dict = Depends(get_current_company)):
    """Return total and active job counts for dashboard summary."""
    company_email = current_company.get("email") if isinstance(current_company, dict) else current_company

    total_jobs = await job_collection.count_documents({"posted_by": company_email})
    active_jobs = await job_collection.count_documents(
        {"posted_by": company_email, "status": "active"}
    )

    return {"total_jobs": total_jobs, "active_jobs": active_jobs}


# --- GET: Fetch a single job ---
@router.get("/{job_id}")
async def get_job(job_id: str, current_company: dict = Depends(get_current_company)):
    """Fetch one job by ID for editing/viewing."""
    company_email = current_company.get("email") if isinstance(current_company, dict) else current_company

    try:
        job = await job_collection.find_one({"_id": ObjectId(job_id), "posted_by": company_email})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid Job ID format")

    if not job:
        raise HTTPException(status_code=404, detail="Job not found or unauthorized")

    return serialize_doc(job)


# --- PUT: Update an existing job ---
@router.put("/update/{job_id}")
async def update_job(job_id: str, updated_data: JobUpdate, current_company: dict = Depends(get_current_company)):
    """Update job details for the logged-in company."""
    company_email = current_company.get("email") if isinstance(current_company, dict) else current_company

    job = await job_collection.find_one({"_id": ObjectId(job_id)})

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    if job["posted_by"] != company_email:
        raise HTTPException(status_code=403, detail="Unauthorized to update this job")

    update_data = {k: v for k, v in updated_data.dict().items() if v is not None}
    update_data["updated_on"] = datetime.utcnow()

    result = await job_collection.update_one({"_id": ObjectId(job_id)}, {"$set": update_data})

    if result.modified_count == 0:
        raise HTTPException(status_code=400, detail="No changes made")

    return {"message": "Job updated successfully ✅"}


# --- DELETE: Remove a job ---
@router.delete("/delete/{job_id}")
async def delete_job(job_id: str, current_company: dict = Depends(get_current_company)):
    """Delete a job posted by the logged-in company."""
    company_email = current_company.get("email") if isinstance(current_company, dict) else current_company

    job = await job_collection.find_one({"_id": ObjectId(job_id)})

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    if job["posted_by"] != company_email:
        raise HTTPException(status_code=403, detail="Unauthorized to delete this job")

    await job_collection.delete_one({"_id": ObjectId(job_id)})
    return {"message": "Job deleted successfully ✅", "deleted_job_id": job_id}


# --- PATCH: Change job status ---
@router.patch("/status/{job_id}")
async def change_job_status(
    job_id: str,
    status: str = Query(..., regex="^(active|closed|draft)$"),
    current_company: dict = Depends(get_current_company),
):
    """Change job status (active / closed / draft)."""
    company_email = current_company.get("email") if isinstance(current_company, dict) else current_company

    job = await job_collection.find_one({"_id": ObjectId(job_id)})

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    if job["posted_by"] != company_email:
        raise HTTPException(status_code=403, detail="Unauthorized")

    await job_collection.update_one(
        {"_id": ObjectId(job_id)},
        {"$set": {"status": status, "updated_on": datetime.utcnow()}},
    )

    return {"message": f"Job status changed to '{status}' ✅"}
