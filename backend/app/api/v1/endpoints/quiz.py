# filepath: /home/nishant2210/Documents/ai-quiz-game/backend/app/api/v1/endpoints/quiz.py
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List
from app.models.quiz import Quiz, QuizQuestion
from app.database import database
from app.dependencies import get_current_user
from bson import ObjectId

router = APIRouter()

class CreateQuizRequest(BaseModel):
    questions: List[QuizQuestion]

@router.post("/create", response_model=Quiz)
async def create_quiz(request: CreateQuizRequest, current_user: str = Depends(get_current_user)):
    quiz_id = str(ObjectId())
    quiz = Quiz(
        id=quiz_id,
        creator=current_user,
        questions=request.questions,
        participants=[current_user]
    )
    await database["quizzes"].insert_one(quiz.dict())
    return quiz

@router.post("/join/{quiz_id}", response_model=Quiz)
async def join_quiz(quiz_id: str, current_user: str = Depends(get_current_user)):
    quiz = await database["quizzes"].find_one({"id": quiz_id})
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    if current_user in quiz["participants"]:
        raise HTTPException(status_code=400, detail="User already joined the quiz")
    quiz["participants"].append(current_user)
    await database["quizzes"].update_one({"id": quiz_id}, {"$set": {"participants": quiz["participants"]}})
    return Quiz(**quiz)