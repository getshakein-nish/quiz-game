import React from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const username = "Username"; // Replace with actual username logic
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
  };

  const handleCreateQuiz = () => {
    navigate('/create-quiz');
  };

  const handleJoinQuiz = () => {
    navigate('/join-quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col items-center justify-center p-4">
      {/* Navbar */}
      <nav className="bg-white shadow-md w-full fixed top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0">
                <img className="h-8 w-8" src="/path/to/logo.png" alt="Logo" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/profile" className="text-gray-700 hover:text-gray-900">Profile</a>
              <a href="/leaderboard" className="text-gray-700 hover:text-gray-900">Leaderboard</a>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Body */}
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-5xl font-bold text-white mb-10 animate-fade-in">Welcome, {username}!</h1>
        <div className="flex w-full max-w-4xl space-x-4">
          <div className="flex-1 flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <p className="text-lg mb-4 text-gray-700">Create your own quiz and challenge your friends!</p>
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              onClick={handleCreateQuiz}
            >
              Create Quiz
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <p className="text-lg mb-4 text-gray-700">Join a quiz and test your knowledge!</p>
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
              onClick={handleJoinQuiz}
            >
              Join Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;