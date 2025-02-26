from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings
import asyncio

client = AsyncIOMotorClient(settings.mongodb_url)
database = client[settings.database_name]

async def test_connection():
    try:
        # Run a simple command to check the connection
        await database.command("ping")
        print("MongoDB connection successful")
    except Exception as e:
        print(f"MongoDB connection failed: {e}")

# Run the connection test when the module is imported
asyncio.create_task(test_connection())