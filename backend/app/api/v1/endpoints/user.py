# filepath: /home/nishant2210/Documents/ai-quiz-game/backend/app/api/v1/endpoints/user.py
from fastapi import APIRouter, HTTPException, Depends, Response
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from app.models.user import User, UserInDB
from app.database import database
from app.utils import create_access_token
from app.dependencies import get_current_user
from datetime import timedelta
from app.config import settings

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

@router.post("/signup", response_model=User)
async def create_user(user: UserCreate):
    user_in_db = await database["users"].find_one({"email": user.email})
    if user_in_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = pwd_context.hash(user.password)
    user_in_db = UserInDB(email=user.email, username=user.username, hashed_password=hashed_password)
    await database["users"].insert_one(user_in_db.dict())
    return {"email": user.email, "username": user.username}

@router.post("/login", response_model=Token)
async def login_user(response: Response, user: UserLogin):
    user_in_db = await database["users"].find_one({"email": user.email})
    if not user_in_db or not pwd_context.verify(user.password, user_in_db["hashed_password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    access_token_expires = timedelta(minutes=settings.jwt_expiration_minutes)
    access_token = create_access_token(data={"sub": user.email}, expires_delta=access_token_expires)
    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        secure=True,  # Set to True if using HTTPS
        samesite="lax"
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/users/me", response_model=User)
async def read_users_me(current_user: str = Depends(get_current_user)):
    user_in_db = await database["users"].find_one({"email": current_user})
    if user_in_db is None:
        raise HTTPException(status_code=404, detail="User not found")
    return User(**user_in_db)

@router.post("/logout")
async def logout_user(response: Response):
    response.delete_cookie(key="access_token")
    return {"message": "Successfully logged out"}