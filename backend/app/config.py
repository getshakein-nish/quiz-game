from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

class Settings(BaseSettings):
    mongodb_url: str = os.getenv("MONGODB_URL")
    database_name: str = "quiz_game"
    jwt_secret: str = os.getenv("JWT_SECRET")
    jwt_algorithm: str = "HS256"
    jwt_expiration_minutes: int = 30

    class Config:
        env_file = ".env"

settings = Settings()