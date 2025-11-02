from pydantic import BaseModel, EmailStr
from typing import Optional

class StudentRegister(BaseModel):
	name: str
	email: EmailStr
	password: str

class StudentLogin(BaseModel):
	email: EmailStr
	password: str

class StudentProfile(BaseModel):
	name: Optional[str] = None
	email: Optional[EmailStr] = None
	department: Optional[str] = None
	year: Optional[str] = None
	cgpa: Optional[str] = None


