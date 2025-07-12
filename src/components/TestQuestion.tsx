import React from 'react';
import type { Question } from '../data/questions';
import { Progress } from './ui/progress';
import logoImage from '../assets/images/ci/ACG_CI-그레이1.png';

interface TestQuestionProps {
  question: Question;
  currentAnswer: string | null;
  onAnswer: (questionId: number, value: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  questionNumber: number;
  totalQuestions: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export const TestQuestion: React.FC<TestQuestionProps> = ({
  question,
  currentAnswer,
  onAnswer,
  onNext,
  onPrevious,
  questionNumber,
  totalQuestions,
  canGoNext,
  canGoPrevious,
}) => {
  return (
    <>
      {/* Fixed Header */}
      <div className="fixed top-4 left-4 right-4 z-50">
        <div className="bg-white rounded-xl shadow-pink-500/50 py-3 px-6 max-w-4xl mx-auto">
          <div className="flex justify-center">
            <img
              src={logoImage}
              alt="WorkDNA Logo"
              className="h-5 object-contain"
            />
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-2xl mx-auto px-4 pt-20">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-300">
              {questionNumber} / {totalQuestions}
            </span>
          </div>
          <div className="relative">
            <Progress value={(questionNumber / totalQuestions) * 100} className="bg-[#6b6a6a]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-semibold text-gray-700">
                {Math.round((questionNumber / totalQuestions) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 leading-relaxed">
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
                    ? 'border-lime-400 bg-lime-50 text-lime-900'
                    : 'border-gray-200 hover:border-lime-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                      currentAnswer === option.value
                        ? 'border-lime-400 bg-lime-400 shadow-lg shadow-lime-200'
                        : 'border-gray-300'
                    }`}
                  >
                    {currentAnswer === option.value && (
                      <div className="w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    {option.value}
                  </span>
                  <span className="text-sm text-gray-600 leading-relaxed">
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              canGoPrevious
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            이전
          </button>
          
          <div className="text-center text-sm text-gray-400">
            답변을 선택하고 다음 버튼을 눌러주세요
          </div>
          
          <button
            onClick={onNext}
            disabled={!canGoNext || !currentAnswer}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              canGoNext && currentAnswer
                ? 'bg-lime-400 text-white hover:bg-lime-500'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
};