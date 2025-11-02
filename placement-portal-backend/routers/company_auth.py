from fastapi import APIRouter, HTTPException, status, Depends
from models.company_model import company_collection
from schemas.company_schema import CompanyRegister, CompanyLogin
from utils.auth import hash_password, verify_password, create_access_token
from utils.dependencies import get_current_company

router = APIRouter(prefix="/company", tags=["Company Authentication"])


# --- REGISTER: Company ---
@router.post("/register")
async def register_company(company: CompanyRegister):
    """Register a new company account."""
    # Check if email already exists
    existing = await company_collection.find_one({"email": company.email})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered."
        )

    # Validate password length (bcrypt has a 72-byte limit)
    if len(company.password.encode("utf-8")) > 72:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password too long — please use 72 characters or fewer."
        )

    # Hash password
    hashed_pwd = hash_password(company.password)

    # Insert new company record
    new_company = {
        "name": company.name,
        "email": company.email,
        "password": hashed_pwd,
    }
    await company_collection.insert_one(new_company)

    return {"message": "Company registered successfully."}


# --- LOGIN: Company ---
@router.post("/login")
async def login_company(company: CompanyLogin):
    """Authenticate company and return JWT token."""
    # Find company by email
    existing = await company_collection.find_one({"email": company.email})
    if not existing:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Company not found."
        )

    # Verify password
    if not verify_password(company.password, existing["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid password."
        )

    # Create JWT token
    token = create_access_token({"sub": existing["email"]})
    return {"access_token": token, "token_type": "bearer"}


# --- DASHBOARD (Protected Route) ---
@router.get("/dashboard")
async def company_dashboard(current_company: dict = Depends(get_current_company)):
    """Return company dashboard info (JWT required)."""
    return {
        "message": f"Welcome, {current_company['name']}!",
        "email": current_company["email"],
    }
