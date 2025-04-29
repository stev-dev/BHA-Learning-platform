"use client";

import { useState } from 'react';

interface QuizProps {
  quiz: {
    question: string;
    options: { id: string; text: string }[];
    correctAnswer: string;
  };
  isAnswered: boolean;
  onComplete: () => void;
}

export default function QuizSection({ quiz, isAnswered, onComplete }: QuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === quiz.correctAnswer) {
      onComplete();
      setShowFeedback(true);
    } else {
      setShowFeedback(true);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Quiz</h2>
      <p className="mb-4">{quiz.question}</p>
      
      <div className="space-y-2">
        {quiz.options.map((option) => (
          <button
            key={option.id}
            onClick={() => !isAnswered && setSelectedAnswer(option.id)}
            className={`w-full p-3 text-left rounded-md border ${
              selectedAnswer === option.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-300'
            }`}
            disabled={isAnswered}
          >
            {option.text}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className={`mt-4 p-3 rounded-md ${
          selectedAnswer === quiz.correctAnswer
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        }`}>
          {selectedAnswer === quiz.correctAnswer
            ? 'Correct! Well done!'
            : 'Not quite right. Try again!'}
        </div>
      )}

      {!isAnswered && (
        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300"
        >
          Submit Answer
        </button>
      )}
    </div>
  );
}