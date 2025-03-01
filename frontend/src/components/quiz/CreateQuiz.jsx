import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateQuiz = () => {
  const [quizId, setQuizId] = useState("123456"); // Replace with actual quiz ID logic
  const [timer, setTimer] = useState(180);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Start timer
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);


  const navigate = useNavigate();
    
  const handleJoinQuizRoom = () => {
        // Add join quiz logic here
        navigate('/quiz/' + quizId);
    }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Quiz Created!</h2>
      <p className="mb-4">Share this Quiz ID with your friends to join: <strong>{quizId}</strong></p>
      <p className="mb-4">Time remaining: {timer} seconds</p>
      <button
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-700" onClick={handleJoinQuizRoom}>
        Join Quiz
      </button>
    </div>
  );
};

export default CreateQuiz;