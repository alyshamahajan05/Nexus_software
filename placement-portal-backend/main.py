from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import (
    company_auth,
    company_jobs,
    company_applications,
    company_profile,
    student_auth,
)
from config.config import ALLOW_ORIGINS  

app = FastAPI(title="Placement Portal API 🚀")

# CORS setup
origins = ALLOW_ORIGINS if isinstance(ALLOW_ORIGINS, list) else [
    o.strip() for o in ALLOW_ORIGINS.split(",") if o.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(company_auth.router, tags=["Company Auth"])
app.include_router(company_jobs.router, tags=["Company Jobs"])
app.include_router(company_applications.router, tags=["Company Applications"])
app.include_router(company_profile.router, tags=["Company Profile"])
app.include_router(student_auth.router, tags=["Student Auth"])

# Root route
@app.get("/")
async def home():
    return {"message": "Placement Portal API running 🚀"}

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return Response(status_code=204)  # No Content