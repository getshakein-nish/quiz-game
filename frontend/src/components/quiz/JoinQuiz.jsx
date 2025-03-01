import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinQuiz = () => {
  const [quizId, setQuizId] = useState('');
  const navigate = useNavigate();

  const handleJoinQuizRoom = () => {
    if (quizId.trim() !== '') {
      navigate('/quiz/' + quizId);
    } else {
      alert('Please enter a valid Quiz ID');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Join Quiz</h2>
      <form>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quizId">
          Quiz ID
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="quizId"
          type="text"
          placeholder="Enter Quiz ID"
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 mt-4"
          type="button"
          onClick={handleJoinQuizRoom}
        >
          Join Quiz
        </button>
      </form>
    </div>
  );
};

export default JoinQuiz;