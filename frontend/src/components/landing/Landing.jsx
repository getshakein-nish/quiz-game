import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();

    const handleStartQuiz = () => {
        navigate('/login');
    }
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 p-8">
        <div className="bg-white flex flex-col justify-center p-8 rounded-lg shadow-lg max-w-lg w-full">
          <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Welcome to the AI Quiz Game!</h1>
          <p className="text-lg mb-6 text-center text-gray-600">Test your knowledge and challenge yourself with our AI-powered quizzes.</p>
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            onClick={handleStartQuiz}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;