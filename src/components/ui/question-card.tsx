import React from "react";
import { motion } from "framer-motion";
import type { Question } from "../../data/questions";

interface QuestionCardProps {
  question: Question;
  currentAnswer: string | null;
  onAnswer: (questionId: number, value: string) => void;
  questionNumber: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  onNext: () => void;
  onPrevious: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentAnswer,
  onAnswer,
  questionNumber,
  canGoNext,
  canGoPrevious,
  onNext,
  onPrevious,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 mb-6 shadow-pink-200/50 h-94 flex flex-col justify-between">
      <div></div>
      <div>
        <h4 className="text-gray-500">{`Q${questionNumber}`}</h4>
        <h2 className="text-lg font-semibold text-gray-800 leading-relaxed">{question.text}</h2>
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(question.id, option.value)}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
              currentAnswer === option.value 
                ? "border-lime-400 bg-lime-50 text-lime-900" 
                : "border-gray-200 hover:border-lime-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 leading-relaxed">{option.text}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Navigation Buttons with Flip Animation */}
      <div className="flex justify-between items-center mt-8 gap-x-2">
        <motion.button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          whileHover={{ scale: canGoPrevious ? 1.05 : 1 }}
          whileTap={{ 
            scale: canGoPrevious ? 0.95 : 1,
            rotateY: canGoPrevious ? -15 : 0
          }}
          transition={{ duration: 0.2 }}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex-1/2 ${
            canGoPrevious 
              ? "bg-gray-200 text-gray-700 hover:bg-gray-300" 
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          이전
        </motion.button>

        <motion.button
          onClick={onNext}
          disabled={!canGoNext || !currentAnswer}
          whileHover={{ scale: canGoNext && currentAnswer ? 1.05 : 1 }}
          whileTap={{ 
            scale: canGoNext && currentAnswer ? 0.95 : 1,
            rotateY: canGoNext && currentAnswer ? 15 : 0
          }}
          transition={{ duration: 0.2 }}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex-1/2 ${
            canGoNext && currentAnswer 
              ? "bg-lime-400 text-white hover:bg-lime-500" 
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          다음
        </motion.button>
      </div>
    </div>
  );
};