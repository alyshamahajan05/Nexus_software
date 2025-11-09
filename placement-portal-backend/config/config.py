import os
from pathlib import Path


def _load_dotenv_if_present():
    """
    Lightweight .env loader without external dependencies.

    - Reads key=value pairs from a .env file.
    - Ignores empty lines and comments (#).
    - Does NOT overwrite existing environment variables.
    """
    # Look for .env in backend root and project root
    candidate_paths = [
        Path(__file__).resolve().parent.parent / ".env",
        Path(__file__).resolve().parents[2] / ".env",
    ]

    for env_path in candidate_paths:
        try:
            if env_path.exists():
                with env_path.open("r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if not line or line.startswith("#") or "=" not in line:
                            continue
                        key, value = line.split("=", 1)
                        key = key.strip()
                        value = value.strip().strip('"').strip("'")
                        os.environ.setdefault(key, value)
                break
        except Exception as e:
            # Silently ignore errors but print in dev mode for debugging
            if os.getenv("DEBUG", "false").lower() == "true":
                print(f"Warning: failed to load {env_path}: {e}")


# Load .env values
_load_dotenv_if_present()


# ==============================
# 🔐 SECURITY & AUTHENTICATION
# ==============================
SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")  # ⚠️ Change in production
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_HOURS = int(os.getenv("ACCESS_TOKEN_EXPIRE_HOURS", "24"))


# ==============================
# 🗄️ DATABASE CONFIGURATION
# ==============================
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME", "placement_portal")


# ==============================
# 🌐 CORS CONFIGURATION
# ==============================
# Supports multiple origins via comma-separated values
raw_origins = os.getenv("ALLOW_ORIGINS", "*")
if raw_origins == "*":
    ALLOW_ORIGINS = ["*"]
else:
    ALLOW_ORIGINS = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]
