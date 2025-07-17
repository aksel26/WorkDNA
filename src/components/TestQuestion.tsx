import React, { useState, useEffect } from "react";
import logoImage from "../assets/images/ci/ACG_CI-그레이1.png";
import type { Question } from "../data/questions";
import { Progress } from "./ui/progress";

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
  const [isAnimating, setIsAnimating] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(question);

  useEffect(() => {
    if (currentQuestion.id !== question.id) {
      setShowContent(false);
      setTimeout(() => {
        setCurrentQuestion(question);
        setShowContent(true);
      }, 200);
    }
  }, [question, currentQuestion.id]);

  const handleNext = () => {
    setIsAnimating(true);
    setShowContent(false);
    setTimeout(() => {
      onNext();
      setIsAnimating(false);
    }, 200);
  };

  const handlePrevious = () => {
    setIsAnimating(true);
    setShowContent(false);
    setTimeout(() => {
      onPrevious();
      setIsAnimating(false);
    }, 200);
  };
  return (
    <>
      {/* Fixed Header */}
      <div className="fixed top-4 left-4 right-4 z-50">
        <div className="bg-white rounded-xl shadow-pink-500/50 py-3 px-6 max-w-xl mx-auto">
          <div className="flex justify-center">
            <img
              src={logoImage}
              alt="WorkDNA Logo"
              className="h-5 object-contain"
            />
          </div>
        </div>
      </div>

      <div className="w-full max-w-xl mx-auto px-4 pt-20">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              {questionNumber} / {totalQuestions}
            </span>
          </div>
          <div className="relative">
            <Progress
              value={(questionNumber / totalQuestions) * 100}
              className="bg-white"
            />
            {/* <Progress value={(questionNumber / totalQuestions) * 100} className="bg-white" /> */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-gray-700">
                {Math.round((questionNumber / totalQuestions) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Question */}

        <div className="bg-white rounded-3xl shadow-sm p-8 mb-6 shadow-pink-200/50 h-94 flex flex-col justify-between">
          <div></div>
          <div
            className={`transition-all duration-300 ${
              showContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <h4 className="text-gray-500">{`Q${questionNumber}`}</h4>
            <h2 className="text-lg font-semibold text-gray-800 leading-relaxed">
              {currentQuestion.text}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={option.value}
                onClick={() => onAnswer(currentQuestion.id, option.value)}
                disabled={isAnimating}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  showContent
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                } ${
                  currentAnswer === option.value
                    ? "border-lime-400 bg-lime-50 text-lime-900"
                    : "border-gray-200 hover:border-lime-300 hover:bg-gray-50"
                }`}
                style={{
                  transitionDelay: showContent ? `${index * 50}ms` : "0ms",
                }}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                      currentAnswer === option.value
                        ? "border-lime-400 bg-lime-400 shadow-lg shadow-lime-200"
                        : "border-gray-300"
                    }`}
                  >
                    {currentAnswer === option.value && (
                      <div className="w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </div>
                  {/* <span className="text-sm font-medium text-gray-800">
                    {option.value}
                  </span> */}
                  <span className="text-sm text-gray-600 leading-relaxed">
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 gap-x-2">
          <button
            onClick={handlePrevious}
            disabled={!canGoPrevious || isAnimating}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex-1/2 ${
              canGoPrevious && !isAnimating
                ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            이전
          </button>
          {/*           
          <div className="text-center text-sm text-gray-400">
            답변을 선택하고 다음 버튼을 눌러주세요
          </div> */}

          <button
            onClick={handleNext}
            disabled={!canGoNext || !currentAnswer || isAnimating}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex-1/2 ${
              canGoNext && currentAnswer && !isAnimating
                ? "bg-lime-400 text-white hover:bg-lime-500"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
};
