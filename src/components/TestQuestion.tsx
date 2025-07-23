import React, { useEffect, useState } from "react";
import logoImageGray from "../assets/images/ci/ACG_CI_GRAY.webp";

import type { Question } from "../data/questions";
import { Progress } from "./ui/progress";
import { useTranslation } from "react-i18next";

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

export const TestQuestion: React.FC<TestQuestionProps> = ({ question, currentAnswer, onAnswer, onNext, onPrevious, questionNumber, totalQuestions, canGoNext, canGoPrevious }) => {
  const { t } = useTranslation();
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
      <div className="flex flex-col justify-center items-center px-6 w-[95%]">
        {/* Progress Bar */}
        <div className="w-full">
          <div className="flex gap-3 items-center w-full">
            <Progress value={(questionNumber / totalQuestions) * 100} className="bg-white flex-1" />
            {/* <div className="bg-white rounded-3xl px-3 py-1 shadow-sm border border-gray-100 min-w-[78.62px] text-center">
              <p className="text-base  text-gold-600">
                <div className="flex gap-x-1 justify-evenly">
                  <span className="font-bold ease-out duration-300">
                    {questionNumber}
                  </span>
                  /<span>{totalQuestions}</span>
                </div>
              </p>
            </div> */}
          </div>
        </div>

        {/* Question */}
        <div className="relative mt-6 mb-10 w-full">
          <div className="bg-white shadow-2xl rounded-3xl p-5 sm:h-94 h-94 flex flex-col justify-between relative z-20 ">
            <img src={logoImageGray} alt="WorkDNA Logo White" className="h-5 object-contain absolute right-6 top-6 opacity-30" />
            <div className={`transition-all duration-300 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <h2 className="text-gray-300 sm:text-6xl text-7xl font-semibold opacity-30 ">{`Q${questionNumber}`}</h2>
              <div className="w-[90%] px-2">
                <p className="sm:text-lg text-base font-semibold text-gray-800 leading-relaxed mt-4">{t(currentQuestion.textKey)}</p>
              </div>
            </div>

            {/* Answer Options */}
            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={option.value}
                  onClick={() => onAnswer(currentQuestion.id, option.value)}
                  disabled={isAnimating}
                  className={`w-full p-4 text-left rounded-lg border transition-all duration-200 cursor-pointer ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${
                    currentAnswer === option.value ? "border-gold-100 bg-gold-50 font-bold" : "border-gray-200 hover:border-gold-300 hover:bg-gray-50"
                  }`}
                  style={{
                    transitionDelay: showContent ? `${index * 50}ms` : "0ms",
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xs sm:text-sm text-gray-600 leading-relaxed">{t(option.textKey)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center gap-x-3">
          <button
            onClick={handlePrevious}
            disabled={!canGoPrevious || isAnimating}
            className={`px-6 py-3  rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex-1/2 ${
              canGoPrevious && !isAnimating ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {t("navigation.previous")}
          </button>

          <button
            onClick={handleNext}
            disabled={!canGoNext || !currentAnswer || isAnimating}
            className={`px-6 py-3 rounded-lg cursor-pointer text-xs sm:text-sm font-medium transition-all duration-200 flex-1/2 ${
              canGoNext && currentAnswer && !isAnimating ? "bg-gold-400 text-white hover:bg-gold-500" : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {t("navigation.next")}
          </button>
        </div>
      </div>
    </>
  );
};
