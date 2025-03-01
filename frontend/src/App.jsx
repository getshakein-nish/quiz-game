import Homepage from "./components/home/Homepage"
import Landing from "./components/landing/Landing"
import Login from "./components/login/Login"
import Signup from "./components/signup/Signup"
import CreateQuiz from "./components/quiz/CreateQuiz"
import JoinQuiz from "./components/quiz/JoinQuiz"
import Profile from "./components/home/Profile"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Leaderboard from "./components/home/Leaderboard"
import Quiz from "./components/quiz/Quiz"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/join-quiz" element={<JoinQuiz />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/quiz/:quizId" element={<Quiz />} />
      </Routes>
    </Router>
  )
}

export default App
