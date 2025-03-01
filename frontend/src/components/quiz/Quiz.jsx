import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Question from './Question';

const Quiz = () => {
  const { quizId } = useParams();
  const questions = [
    { text: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris', 'Rome'] },
    { text: 'What is 2 + 2?', options: ['3', '4', '5', '6'] },
    { text: 'What is the capital of Spain?', options: ['Berlin', 'Madrid', 'Paris', 'Rome'] },
    { text: 'What is 3 + 3?', options: ['5', '6', '7', '8'] },
    { text: 'What is the capital of Germany?', options: ['Berlin', 'Madrid', 'Paris', 'Rome'] },
    { text: 'What is 4 + 4?', options: ['7', '8', '9', '10'] },
    { text: 'What is the capital of Italy?', options: ['Berlin', 'Madrid', 'Paris', 'Rome'] },
    { text: 'What is 5 + 5?', options: ['9', '10', '11', '12'] },
    { text: 'What is the capital of Portugal?', options: ['Lisbon', 'Madrid', 'Paris', 'Rome'] },
    { text: 'What is 6 + 6?', options: ['11', '12', '13', '14'] },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));

  const handleAnswerSelected = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (answers[currentQuestionIndex] === '') {
      handleAnswerSelected('');
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log('Quiz completed!', answers);
      // Handle quiz completion (e.g., show results, submit answers, etc.)
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Quiz ID: {quizId}</h1>
        <Question
          questionNumber={currentQuestionIndex + 1}
          questionText={questions[currentQuestionIndex].text}
          options={questions[currentQuestionIndex].options}
          onAnswerSelected={handleAnswerSelected}
        />
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            onClick={handleNextQuestion}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;