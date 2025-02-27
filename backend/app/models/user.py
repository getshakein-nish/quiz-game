# filepath: /home/nishant2210/Documents/ai-quiz-game/backend/app/models/user.py
from pydantic import BaseModel, EmailStr

class User(BaseModel):
    email: EmailStr
    username: str

class UserInDB(User):
    hashed_password: str

class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str