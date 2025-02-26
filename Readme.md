# AI Quiz Game

This is a multiplayer quiz game built with FastAPI and MongoDB.

## Setup Instructions

1. **Clone the repository:**

```
   git clone https://github.com/getshakein-nish/quiz-game.git
   cd ai-quiz-game/backend
```

2. **Create and activate virtual environment:**
```
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```


3. **Install the dependencies:**
```
pip install -r requirements.txt
```

4. **Create .env file**

```
MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
```


5. **Run the FastAPI Server**
```
uvicorn app.main:app --reload
```
