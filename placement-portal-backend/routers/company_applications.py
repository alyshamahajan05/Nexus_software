from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId
from models.application_model import application_collection
from models.job_model import job_collection
from utils.dependencies import get_current_company

router = APIRouter(prefix="/company/applications", tags=["Company Applications"])


# --- Helper: Serialize MongoDB documents ---
def serialize_doc(doc):
    """Recursively convert ObjectIds in MongoDB documents into serializable dicts."""
    if isinstance(doc, list):
        return [serialize_doc(d) for d in doc]
    if isinstance(doc, dict):
        return {k: serialize_doc(v) for k, v in doc.items()}
    if isinstance(doc, ObjectId):
        return str(doc)
    return doc


# --- GET: Recent applications (limit 5) ---
@router.get("/recent")
async def get_recent_applications(current_company: dict = Depends(get_current_company)):
    """Get the 5 most recent applications for jobs posted by the logged-in company."""
    company_email = current_company.get("email") if isinstance(current_company, dict) else current_company

    jobs = await job_collection.find({"posted_by": company_email}).to_list(None)
    job_ids = [str(job["_id"]) for job in jobs]

    if not job_ids:
        return {"applications": []}

    apps = (
        await application_collection.find({"job_id": {"$in": job_ids}})
        .sort("applied_on", -1)
        .to_list(5)
    )

    return {"applications": serialize_doc(apps)}


# --- GET: Pipeline summary (counts per stage) ---
@router.get("/pipeline")
async def get_pipeline(current_company: dict = Depends(get_current_company)):
    """Get the count of applications in each recruitment stage."""
    company_email = current_company.get("email") if isinstance(current_company, dict) else current_company

    stages = ["Applied", "Shortlisted", "Interview", "Hired"]
    jobs = await job_collection.find({"posted_by": company_email}).to_list(None)
    job_ids = [str(job["_id"]) for job in jobs]

    if not job_ids:
        return {stage: 0 for stage in stages}

    pipeline_counts = {}
    for stage in stages:
        count = await application_collection.count_documents(
            {"job_id": {"$in": job_ids}, "status": stage}
        )
        pipeline_counts[stage] = count

    return pipeline_counts


# --- GET: Application statistics summary ---
@router.get("/statistics")
async def get_application_statistics(current_company: dict = Depends(get_current_company)):
    """Get total, hired, and average score statistics for the company's job applications."""
    company_email = current_company.get("email") if isinstance(current_company, dict) else current_company

    jobs = await job_collection.find({"posted_by": company_email}).to_list(None)
    job_ids = [str(job["_id"]) for job in jobs]

    if not job_ids:
        return {
            "total_applications": 0,
            "hired_applications": 0,
            "average_scores_by_stage": [],
        }

    total_apps = await application_collection.count_documents({"job_id": {"$in": job_ids}})
    hired_apps = await application_collection.count_documents(
        {"job_id": {"$in": job_ids}, "status": "Hired"}
    )

    stages = ["Applied", "Shortlisted", "Interview", "Hired"]
    avg_score_pipeline = []

    for stage in stages:
        pipeline = [
            {"$match": {"job_id": {"$in": job_ids}, "status": stage, "score": {"$ne": None}}},
            {"$group": {"_id": None, "avgScore": {"$avg": "$score"}}},
        ]
        result = await application_collection.aggregate(pipeline).to_list(1)
        avg_score = result[0]["avgScore"] if result else 0
        avg_score_pipeline.append({"stage": stage, "average_score": avg_score})

    return {
        "total_applications": total_apps,
        "hired_applications": hired_apps,
        "average_scores_by_stage": avg_score_pipeline,
    }


# --- GET: Applications for a specific job ---
@router.get("/by-job/{job_id}")
async def get_applications_by_job(job_id: str, current_company: dict = Depends(get_current_company)):
    """Fetch all applications for a specific job (only if it belongs to this company)."""
    company_email = current_company.get("email") if isinstance(current_company, dict) else current_company

    try:
        job = await job_collection.find_one({"_id": ObjectId(job_id), "posted_by": company_email})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid job ID format")

    if not job:
        raise HTTPException(status_code=404, detail="Job not found or unauthorized access")

    applications = await application_collection.find({"job_id": str(job["_id"])}).to_list(None)
    return {"applications": serialize_doc(applications)}


# --- GET: Application details ---
@router.get("/{application_id}")
async def get_application_details(application_id: str, current_company: dict = Depends(get_current_company)):
    """Fetch detailed information about a specific application."""
    company_email = current_company.get("email") if isinstance(current_company, dict) else current_company

    try:
        application = await application_collection.find_one({"_id": ObjectId(application_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid application ID format")

    if not application:
        raise HTTPException(status_code=404, detail="Application not found")

    # Validate that this application belongs to a job posted by this company
    job = await job_collection.find_one({"_id": ObjectId(application["job_id"])})

    if not job or job["posted_by"] != company_email:
        raise HTTPException(status_code=403, detail="Unauthorized to view this application")

    return {"application": serialize_doc(application)}
