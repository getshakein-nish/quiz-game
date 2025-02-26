from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import user, quiz, websockets

app = FastAPI()

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(user.router, prefix="/api/v1")
app.include_router(quiz.router, prefix="/api/v1/quiz")
app.include_router(websockets.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Multiplayer Quiz Game"}