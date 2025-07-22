import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { careQuestions } from "../data/careQuestions";

interface CareTestProps {
  onComplete: (answers: Record<string, number>) => void;
  onBack: () => void;
  initialQuestionIndex?: number;
  initialAnswers?: Record<string, number>;
  onProgress?: (questionIndex: number, answers: Record<string, number>) => void;
}

export default function CareTest({ onComplete, onBack, initialQuestionIndex = 0, initialAnswers = {}, onProgress }: CareTestProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialQuestionIndex);
  const [answers, setAnswers] = useState<Record<string, number>>(initialAnswers);
  const [selectedScore, setSelectedScore] = useState<number | null>(null);

  const currentQuestion = careQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / careQuestions.length) * 100;
  const isLastQuestion = currentQuestionIndex === careQuestions.length - 1;
  const canProceed = selectedScore !== null;

  useEffect(() => {
    // Reset selected score when question changes
    setSelectedScore(answers[currentQuestion.id] || null);
  }, [currentQuestionIndex, currentQuestion.id, answers]);

  const handleScoreSelect = (score: number) => {
    setSelectedScore(score);
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: score,
    };
    setAnswers(newAnswers);

    // Call onProgress callback to save progress
    if (onProgress) {
      onProgress(currentQuestionIndex, newAnswers);
    }
  };

  const handleNext = () => {
    if (!canProceed) return;

    if (isLastQuestion) {
      onComplete(answers);
    } else {
      const newQuestionIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newQuestionIndex);

      // Save progress when moving to next question
      if (onProgress) {
        onProgress(newQuestionIndex, answers);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const newQuestionIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newQuestionIndex);

      // Save progress when moving to previous question
      if (onProgress) {
        onProgress(newQuestionIndex, answers);
      }
    } else {
      onBack();
    }
  };

  // const scoreLabels = ["전혀 그렇지 않다", "별로 그렇지 않다", "보통이다", "어느 정도 그렇다", "매우 그렇다"];

  return (
    <div className="min-h-screen bg-main-care p-8 flex items-center justify-center">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Progress value={progress} className="h-2 [&>[data-slot=progress-indicator]]:bg-[#007368] bg-[#007368]/10" />
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div key={currentQuestionIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <Card className="mb-8 shadow-lg border-0 py-0">
              <CardContent className="p-6">
                <p className="text-gray-300 sm:text-6xl text-7xl font-semibold opacity-30">Q{currentQuestionIndex + 1}. </p>

                <div className="space-y-3 mt-8">
                  <h2 className="text-lg font-semibold text-gray-500 leading-relaxed">{currentQuestion.question}</h2>
                  {/* Score Selection */}
                  <div className="text-xs sm:text:sm font-medium text-gray-400">다음 중 자신에게 가장 가까운 정도를 선택해주세요:</div>
                </div>
                <div className="space-y-3 mt-16">
                  <div className="flex flex-wrap gap-4 justify-between nowrap">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <motion.button
                        key={score}
                        onClick={() => handleScoreSelect(score)}
                        className={`p-2 flex-1 rounded-lg border text-center transition-all duration-200 cursor-pointer ${
                          selectedScore === score ? "border-lime-500 bg-lime-50 text-lime-700" : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        animate={
                          selectedScore === score
                            ? {
                                y: [0, -8, 0, -6, 0, -4, 0],
                                transition: {
                                  duration: 2.5,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  times: [0, 0.15, 0.3, 0.5, 0.65, 0.85, 1],
                                },
                              }
                            : {}
                        }
                        style={{
                          boxShadow: selectedScore === score ? "0 8px 25px -5px rgba(34, 197, 94, 0.3), 0 10px 10px -5px rgba(34, 197, 94, 0.04)" : "none",
                        }}
                      >
                        {score}
                      </motion.button>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-x-1 text-xs items-center">
                      <ChevronLeft size={15} strokeWidth={1.8} />
                      <p className="text-xs text-gray-500">전혀 그렇지 않다</p>
                    </div>
                    <div className="flex gap-x-1 text-xs items-center">
                      <p className="text-xs text-gray-500">매우 그렇다</p>
                      <ChevronRight size={15} strokeWidth={1.8} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center gap-x-3">
          <Button variant="secondary" onClick={handlePrevious} className="flex items-center gap-2 cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
            이전
          </Button>

          <Button onClick={handleNext} disabled={!canProceed} className="flex items-center gap-2 bg-[#007368] hover:bg-[#007368]/80 cursor-pointer">
            {isLastQuestion ? "결과 보기" : "다음"}
            {!isLastQuestion && <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
