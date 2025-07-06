import React from 'react';
import type { Question } from '../data/questions';

interface TestQuestionProps {
  question: Question;
  currentAnswer: string | null;
  onAnswer: (questionId: number, value: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export const TestQuestion: React.FC<TestQuestionProps> = ({
  question,
  currentAnswer,
  onAnswer,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-300">
            {questionNumber} / {totalQuestions}
          </span>
          <span className="text-sm font-medium text-gray-300">
            {Math.round((questionNumber / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="w-full bg-[#6b6a6a] rounded-full h-2">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="card mb-6">
        <h2 className="text-lg font-semibold text-white mb-6 leading-relaxed">
          {question.text}
        </h2>

        {/* Answer Options */}
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => onAnswer(question.id, option.value)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                currentAnswer === option.value
                  ? 'border-primary-500 bg-primary-100 text-primary-900'
                  : 'border-[#7e7d7d] hover:border-primary-300 hover:bg-[#7e7d7d]'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                    currentAnswer === option.value
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-[#7e7d7d]'
                  }`}
                >
                  {currentAnswer === option.value && (
                    <div className="w-full h-full rounded-full bg-white scale-50" />
                  )}
                </div>
                <span className="text-sm font-medium">
                  {option.value}
                </span>
                <span className="text-sm text-gray-300 leading-relaxed">
                  {option.text}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Hint */}
      <div className="text-center text-sm text-gray-400">
        답변을 선택하면 자동으로 다음 문제로 넘어갑니다
      </div>
    </div>
  );
};