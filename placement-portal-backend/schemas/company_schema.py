from pydantic import BaseModel, EmailStr
from typing import Optional

class CompanyRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    description: Optional[str] = None
    location: Optional[str] = None

class CompanyLogin(BaseModel):
    email: EmailStr
    password: str

class CompanyProfileUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    website: Optional[str] = None
    industry: Optional[str] = None 
    size: Optional[str] = None
    