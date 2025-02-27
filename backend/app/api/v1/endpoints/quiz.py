from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List
from app.database import database
from app.dependencies import get_current_user
from app.models.quiz import Quiz, QuizQuestion
from bson import ObjectId
from app.config import settings
import requests
import json
import re
import logging

router = APIRouter()

logging.basicConfig(level=logging.INFO)

@router.post("/create")
async def create_quiz(current_user: str = Depends(get_current_user)):
    quiz_id = str(ObjectId())
    headers = {
        "Content-Type": "application/json"
    }
    api_key = settings.gemini_api_key
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"

    response = requests.post(
        url,
        headers=headers,
        json={
            "contents": [{
                "parts": [{"text": "Generate exactly 10 multiple-choice questions in valid JSON format. Example: [{'question': '...', 'options': ['A', 'B', 'C', 'D'], 'answer': '...'}]. Do NOT include Markdown formatting like ```json."}]
            }]
        }
    )

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Failed to fetch questions from Google Gemini API")

    response_data = response.json()
    raw_text = response_data["candidates"][0]["content"]["parts"][0]["text"]

    # 🔥 Remove markdown formatting (if present)
    clean_text = re.sub(r"```json\n(.*?)\n```", r"\1", raw_text, flags=re.DOTALL).strip()

    logging.info("Cleaned JSON text: %s", clean_text)

    try:
        questions_list = json.loads(clean_text)  # Parse cleaned JSON text
        quiz_questions = [QuizQuestion(**q) for q in questions_list]
    except json.JSONDecodeError as e:
        logging.error("Error parsing response: %s", str(e))
        raise HTTPException(status_code=500, detail="Invalid response format from Gemini API")

    quiz = Quiz(
        id=quiz_id,
        creator=current_user,
        questions=quiz_questions,
        participants=[current_user]
    )
    await database["quizzes"].insert_one(quiz.dict())

    # Return WebSocket connection details
    return {
        "quiz_id": quiz_id,
        "message": "Quiz created. Connect to WebSocket to start.",
        "websocket_url": f"ws://127.0.0.1:8000/ws/{quiz_id}"
    }

@router.post("/join/{quiz_id}")
async def join_quiz(quiz_id: str, current_user: str = Depends(get_current_user)):
    quiz = await database["quizzes"].find_one({"id": quiz_id})
    
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    if current_user in quiz["participants"]:
        raise HTTPException(status_code=400, detail="User already joined the quiz")

    # Use `$push` to add the user to the list of participants
    await database["quizzes"].update_one({"id": quiz_id}, {"$push": {"participants": current_user}})
    
    # ✅ Return WebSocket URL for real-time updates
    return {
        "quiz_id": quiz_id,
        "message": "Joined successfully. Connect to WebSocket for live updates.",
        "websocket_url": f"ws://127.0.0.1:8000/ws/{quiz_id}"
    }

