from motor.motor_asyncio import AsyncIOMotorClient
from config.config import MONGO_URI, DB_NAME

try:
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[DB_NAME]
    print(f"✅ Connected to MongoDB: {DB_NAME}")
except Exception as e:
    print("❌ MongoDB connection failed:", e)

