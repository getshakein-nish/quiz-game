# filepath: /home/nishant2210/Documents/ai-quiz-game/backend/app/api/v1/endpoints/websockets.py
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, Cookie
from jose import JWTError, jwt
from app.config import settings
from typing import List

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

def verify_access_token(token: str):
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.websocket("/ws/{quiz_id}")
async def websocket_endpoint(websocket: WebSocket, quiz_id: str, access_token: str = Cookie(None)):
    if not access_token:
        await websocket.close(code=1008)
        return
    try:
        token = access_token.split(" ")[1]  # Remove "Bearer" prefix
        payload = verify_access_token(token)
        current_user = payload.get("sub")
        if current_user is None:
            await websocket.close(code=1008)
            return
    except HTTPException:
        await websocket.close(code=1008)
        return

    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(f"{current_user}: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"{current_user} left the quiz")