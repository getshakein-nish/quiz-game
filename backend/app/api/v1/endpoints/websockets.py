from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, Cookie, HTTPException
from jose import JWTError, jwt
from app.config import settings
from app.database import database
from typing import List, Dict
import asyncio
import json

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, quiz_id: str, websocket: WebSocket):
        await websocket.accept()
        if quiz_id not in self.active_connections:
            self.active_connections[quiz_id] = []
        self.active_connections[quiz_id].append(websocket)

    def disconnect(self, quiz_id: str, websocket: WebSocket):
        if quiz_id in self.active_connections:
            self.active_connections[quiz_id].remove(websocket)
            if not self.active_connections[quiz_id]:
                del self.active_connections[quiz_id]

    async def broadcast(self, quiz_id: str, message: str):
        for connection in self.active_connections.get(quiz_id, []):
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

    await manager.connect(quiz_id, websocket)
    
    try:
        quiz = await database["quizzes"].find_one({"id": quiz_id})
        if not quiz:
            await websocket.close(code=1008)
            return
        
        # Check if quiz already has 2 players
        if len(quiz["participants"]) >= 2:
            await websocket.send_text(json.dumps({"type": "error", "message": "Quiz is already full"}))
            await websocket.close(code=1008)
            return

        # Wait for the second player
        if len(quiz["participants"]) == 1:
            await manager.broadcast(quiz_id, json.dumps({"type": "waiting", "message": "Waiting for another player to join..."}))
            for _ in range(120):  # Wait up to 2 minutes
                await asyncio.sleep(1)
                quiz = await database["quizzes"].find_one({"id": quiz_id})
                if len(quiz["participants"]) == 2:
                    break

            # If no second player joined within 2 minutes, cancel the quiz
            if len(quiz["participants"]) < 2:
                await manager.broadcast(quiz_id, json.dumps({"type": "timeout", "message": "No other player joined. Quiz canceled."}))
                await websocket.close(code=1008)
                return

        # "Get Ready" Timer for 5 Seconds
        for i in range(5, 0, -1):
            await manager.broadcast(quiz_id, json.dumps({"type": "get_ready", "message": f"Get Ready! Starting in {i}..."}))
            await asyncio.sleep(1)

        # Start the game when 2 players are in
        await manager.broadcast(quiz_id, json.dumps({"type": "start", "message": "Quiz starting now!"}))

        # Game Logic - Sending questions
        correct_answers = {participant: 0 for participant in quiz["participants"]}

        for question in quiz["questions"]:
            await manager.broadcast(quiz_id, json.dumps({"type": "question", "question": question}))
            await asyncio.sleep(6)  # 6 seconds per question

        # Calculate results
        results = sorted(correct_answers.items(), key=lambda x: x[1], reverse=True)
        winner = results[0][0]
        await manager.broadcast(quiz_id, json.dumps({"type": "result", "result": f"{winner} wins!"}))

    except WebSocketDisconnect:
        manager.disconnect(quiz_id, websocket)
        await manager.broadcast(quiz_id, json.dumps({"type": "disconnect", "message": f"{current_user} left the quiz"}))
