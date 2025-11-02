from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId
from models.company_model import company_collection
from utils.dependencies import get_current_company
from schemas.company_schema import CompanyProfileUpdate

router = APIRouter(prefix="/company", tags=["Company Profile"])


# --- GET: Company Profile ---
@router.get("/profile")
async def get_profile(current_company: dict = Depends(get_current_company)):
    """Fetch the logged-in company's profile (excluding password)."""
    company_email = current_company.get("email") if isinstance(current_company, dict) else current_company

    company = await company_collection.find_one({"email": company_email}, {"password": 0})
    if not company:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Company not found")

    company["_id"] = str(company["_id"])
    return company


# --- PUT: Update Company Profile ---
@router.put("/profile")
async def update_profile(
    data: CompanyProfileUpdate,
    current_company: dict = Depends(get_current_company)
):
    """Update the company's profile details."""
    company_email = current_company.get("email") if isinstance(current_company, dict) else current_company

    update_data = data.dict(exclude_none=True)
    if not update_data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No fields to update")

    result = await company_collection.update_one({"email": company_email}, {"$set": update_data})
    if result.modified_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Company not found")

    return {"message": "Profile updated successfully ✅"}


# --- DELETE: Delete Company Profile ---
@router.delete("/profile")
async def delete_profile(current_company: dict = Depends(get_current_company)):
    """Delete the company profile from the database."""
    company_email = current_company.get("email") if isinstance(current_company, dict) else current_company

    result = await company_collection.delete_one({"email": company_email})
    if result.deleted_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Company not found")

    return {"message": "Company profile deleted successfully ✅"}
