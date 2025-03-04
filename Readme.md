# AI Quiz Game

This is a multiplayer quiz game built with FastAPI and MongoDB.

## Setup Instructions

**After forking the repository:**

1. **Clone the repository:**

```
   git clone https://github.com/{your-username}/quiz-game.git
   cd quiz-game/backend
```

2. **Create and activate virtual environment inside /backend:**
```
python -m venv venv
source venv/bin/activate for Linux or  # On Windows use `venv\Scripts\activate`
```


3. **Install the dependencies:**
```
pip install -r requirements.txt
```

4. **Create .env file inside /app**

```
MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
```


5. **Run the FastAPI Server**
```
uvicorn app.main:app --reload
```
