from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId
from models.student_model import student_collection
from utils.dependencies import get_current_student
from schemas.student_schema import StudentProfile
from routers.company_jobs import serialize_doc

router = APIRouter(prefix="/student", tags=["Student Profile"])


# --- GET: Student Profile ---
@router.get("/profile")
async def get_student_profile(current_student: dict = Depends(get_current_student)):
    """Fetch the logged-in student's profile (excluding password)."""
    student_email = current_student.get("email") if isinstance(current_student, dict) else current_student

    student = await student_collection.find_one({"email": student_email}, {"password": 0})
    if not student:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")

    return serialize_doc(student)


# --- PUT: Update Student Profile ---
@router.put("/profile")
async def update_profile(
    data: StudentProfile,
    current_student: dict = Depends(get_current_student)
):
    """Update the student's profile details."""
    student_email = current_student.get("email") if isinstance(current_student, dict) else current_student

    update_data = data.dict(exclude_none=True, exclude_unset=True)
    if not update_data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No fields to update")

    result = await student_collection.update_one({"email": student_email}, {"$set": update_data})
    if result.modified_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")

    return {"message": "Profile updated successfully ✅"}


# # --- DELETE: Delete Student Profile ---
# @router.delete("/profile")
# async def delete_profile(current_student: dict = Depends(get_current_student)):
#     """Delete the student profile from the database."""
#     student_email = current_student.get("email") if isinstance(current_student, dict) else current_student

#     result = await student_collection.delete_one({"email": student_email})
#     if result.deleted_count == 0:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")

#     return {"message": "Student profile deleted successfully ✅"}
