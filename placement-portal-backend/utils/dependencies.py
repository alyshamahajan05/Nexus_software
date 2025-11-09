from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from config.config import STUDENT_SECRET_KEY, COMPANY_SECRET_KEY, ALGORITHM
from models.company_model import company_collection
from models.student_model import student_collection

company_oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/company/login")
student_oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/student/login")

# ... logic to decode token and get company from company_collection
async def get_current_company(token: str = Depends(company_oauth2_scheme)):
    try:
        payload = jwt.decode(token, COMPANY_SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid authentication token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    company = await company_collection.find_one({"email": email})
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")

    return company

async def get_current_student(token: str = Depends(student_oauth2_scheme)):
    try:
        payload = jwt.decode(token, STUDENT_SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid authentication token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    student = await student_collection.find_one({"email": email})
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    return student

