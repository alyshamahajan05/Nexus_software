from fastapi import APIRouter, HTTPException, status, Form
from models.student_model import student_collection
from schemas.student_schema import StudentRegister
from utils.auth import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/student", tags=["Student Authentication"])


# --- POST: Register a new student ---
@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_student(student: StudentRegister):
    """Register a new student account."""
    existing = await student_collection.find_one({"email": student.email})
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    # Password length validation (bcrypt limit = 72 bytes)
    if len(student.password.encode("utf-8")) > 72:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password too long — please use 72 characters or fewer.",
        )

    hashed_pwd = hash_password(student.password)
    new_student = {
        "name": student.name,
        "email": student.email,
        "password": hashed_pwd,
    }

    await student_collection.insert_one(new_student)
    return {"message": "Student registered successfully ✅"}


# --- POST: Login student ---
@router.post("/login")
async def login_student(username: str = Form(...), 
    password: str = Form(...)):
    """Authenticate a student and return a JWT access token."""
    existing = await student_collection.find_one({"email": username})
    if not existing:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")

    if not verify_password(password, existing["password"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid password")

    # Generate JWT token with student role
    token = create_access_token({"sub": existing["email"], "role": "student"})

    return {"access_token": token, "token_type": "bearer"}

