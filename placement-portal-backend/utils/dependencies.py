from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from config.config import SECRET_KEY, ALGORITHM
from models.company_model import company_collection

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/company/login")

async def get_current_company(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid authentication token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    company = await company_collection.find_one({"email": email})
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")

    return company
