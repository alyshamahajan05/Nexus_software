# utils/auth.py
from datetime import datetime, timedelta
from typing import Optional, Tuple

from jose import jwt, JWTError
from passlib.context import CryptContext

from config.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_HOURS

# -------------------------
# Password hashing settings
# -------------------------
# Default scheme first -> used when creating new hashes.
# Keep bcrypt_sha256 and bcrypt afterwards so existing hashes verify.
pwd_context = CryptContext(
    schemes=["argon2", "bcrypt_sha256", "bcrypt"],
    default="argon2",
    deprecated=["bcrypt"],  # mark legacy bcrypt as deprecated
)

def hash_password(password: str) -> str:
    """Hash a plaintext password using the current default scheme."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plaintext password against a stored hash.
    Returns True/False. If the stored hash uses an older scheme, it will verify
    correctly (because the context supports multiple schemes).
    """
    try:
        return pwd_context.verify(plain_password, hashed_password)
    except Exception:
        # any verification error should be treated as a failed check
        return False


def verify_and_update_password(plain_password: str, hashed_password: str) -> Tuple[bool, Optional[str]]:
    """
    Verify a plaintext password and return (ok, new_hash_or_None).

    - ok = True/False whether the password matched.
    - new_hash_or_None = a newly-generated hash (using the DEFAULT scheme) if
      the stored hash should be upgraded (pwd_context.needs_update is True).
      If None, no DB update is required.

    Callers should, when `ok` is True and `new_hash_or_None` is not None,
    save the new hash to the user's record.
    """
    try:
        ok = pwd_context.verify(plain_password, hashed_password)
        if not ok:
            return False, None

        # If the current stored hash uses an older/weak scheme, generate a new hash
        if pwd_context.needs_update(hashed_password):
            new_hash = pwd_context.hash(plain_password)
            return True, new_hash

        return True, None
    except Exception:
        return False, None


# =========================
# JWT Token Utilities
# =========================
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a signed JWT access token."""
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS))
    to_encode.update({"exp": expire, "iat": datetime.utcnow()})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_access_token(token: str) -> Optional[dict]:
    """
    Verify and decode a JWT access token.
    Returns the payload dict if valid, otherwise None (expired/invalid).
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
