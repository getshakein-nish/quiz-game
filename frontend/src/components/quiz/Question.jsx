import React, { useState } from 'react';

const Question = ({ questionNumber, questionText, options, onAnswerSelected }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    onAnswerSelected(event.target.value);
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg max-w-2xl w-full border-4 border-blue-500">
      <h2 className="text-3xl font-bold mb-6">Q {questionNumber}: {questionText}</h2>
      <form>
        {options.map((option, index) => (
          <div key={index} className="mb-4">
            <label className={`block text-gray-700 text-lg font-bold mb-2 p-2 rounded-lg cursor-pointer ${selectedOption === option ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100 border-2 border-transparent'}`}>
              <input
                type="radio"
                name="option"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
                className="mr-2 leading-tight hidden"
              />
              {option}
            </label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default Question;