# filepath: /home/nishant2210/Documents/ai-quiz-game/backend/app/models/quiz.py
from pydantic import BaseModel
from typing import List

class QuizQuestion(BaseModel):
    question: str
    options: List[str]
    answer: str

class Quiz(BaseModel):
    id: str
    creator: str
    questions: List[QuizQuestion]
    participants: List[str]