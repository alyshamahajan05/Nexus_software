from os import getenv
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware

from routers.company_auth import router as company_auth_router
from routers.company_jobs import router as company_jobs_router
from routers.company_applications import router as company_applications_router
from routers.company_profile import router as company_profile_router
from routers.student_auth import router as student_auth_router
from routers.student_profile import router as student_profile_router
from routers.student_jobs import router as student_jobs_router
from routers.student_applications import router as student_applications_router


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
app.include_router(company_auth_router, tags=["Company Auth"])
app.include_router(company_jobs_router, tags=["Company Jobs"])
app.include_router(company_applications_router, tags=["Company Applications"])
app.include_router(company_profile_router, tags=["Company Profile"])
app.include_router(student_auth_router, tags=["Student Auth"])
app.include_router(student_profile_router, tags=["Student Profile"])
app.include_router(student_jobs_router, tags=["Student Jobs"])
app.include_router(student_applications_router, tags=["Student Applications"])

# Root route
@app.get("/")
async def home():
    return {"message": "Placement Portal API running 🚀"}

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return Response(status_code=204)  # No Content