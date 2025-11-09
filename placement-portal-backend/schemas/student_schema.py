from pydantic import BaseModel, EmailStr
from typing import Optional, List

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
	phone: Optional[str] = None
	college: Optional[str] = None
	tenth_percentage: Optional[str] = None
	twelfth_percentage: Optional[str] = None
	graduation_year: Optional[str] = None
	linkedin_profile: Optional[str] = None
	github_profile: Optional[str] = None
	skills: Optional[List[str]] = [] # We will save skills as a list of strings
	about_me: Optional[str] = None


