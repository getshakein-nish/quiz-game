from fastapi import Depends, HTTPException, Request
from jose import JWTError, jwt
from app.config import settings
from app.utils import verify_access_token

async def get_current_user(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        token = token.split(" ")[1]  # Remove "Bearer" prefix
        payload = verify_access_token(token)
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return email
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")