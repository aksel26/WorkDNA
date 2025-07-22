import { supabase } from "@/lib/supabase";
import React, { Suspense } from "react";
import { useCareProgress } from "@/hooks/useCareProgress";

// Code splitting with React.lazy()
const CareIntro = React.lazy(() => import("./CareIntro"));
const CareTest = React.lazy(() => import("./CareTest"));
const CareResult = React.lazy(() => import("./CareResult"));

// Loading component for suspense fallback
const LoadingSpinner = () => (
  <div className="min-h-screen bg-main-care flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
      <p className="text-white">로딩 중...</p>
    </div>
  </div>
);

export const Care: React.FC = () => {
  const {
    isLoaded,
    currentScreen,
    testAnswers,
    questionIndex,
    hasOngoingTest,
    updateProgress,
    startNewTest,
    continueTest,
    completeTest,
    clearProgress,
    getProgressInfo,
  } = useCareProgress();

  const handleTestComplete = async (answers: Record<string, number>) => {
    // Save to Supabase
    try {
      const sessionId = crypto.randomUUID();
      const deviceType = /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop";

      // Calculate high risk areas and detailed results
      const highRiskAreas = Object.entries(answers)
        .filter(([, score]) => score >= 4)
        .map(([questionId, score]) => ({ questionId, score }));

      const detailedResults = Object.entries(answers).map(([questionId, score]) => ({
        questionId,
        score,
        level: score <= 2 ? "normal" : score <= 3 ? "caution" : "danger",
      }));

      const { error } = await supabase.from("care_responses").insert({
        session_id: sessionId,
        answer_paranoid: answers.paranoid,
        answer_schizoid: answers.schizoid,
        answer_schizotypal: answers.schizotypal,
        answer_antisocial: answers.antisocial,
        answer_borderline: answers.borderline,
        answer_histrionic: answers.histrionic,
        answer_narcissistic: answers.narcissistic,
        answer_avoidant: answers.avoidant,
        answer_dependent: answers.dependent,
        answer_obsessive: answers.obsessive,
        high_risk_areas: highRiskAreas,
        detailed_results: detailedResults,
        device_type: deviceType,
        browser: navigator.userAgent,
        completed_at: new Date().toISOString(),
      });

      if (error) {
        console.error("Error saving care response:", error);
      }
    } catch (error) {
      console.error("Error saving care response:", error);
    }

    // Complete test and navigate to result screen
    completeTest(answers);
  };

  // Show loading spinner until localStorage is loaded
  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  // Render different screens with code splitting
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {currentScreen === "intro" && (
        <CareIntro
          onStartTest={startNewTest}
          onContinueTest={continueTest}
          hasOngoingTest={hasOngoingTest}
          testProgress={getProgressInfo() ?? undefined}
        />
      )}

      {currentScreen === "test" && (
        <CareTest
          onComplete={handleTestComplete}
          onBack={clearProgress}
          initialQuestionIndex={questionIndex}
          initialAnswers={testAnswers}
          onProgress={(newQuestionIndex: number, newAnswers: Record<string, number>) => {
            updateProgress({
              questionIndex: newQuestionIndex,
              testAnswers: newAnswers,
            });
          }}
        />
      )}

      {currentScreen === "result" && (
        <CareResult
          answers={testAnswers}
          onRestart={() => {
            clearProgress();
            startNewTest();
          }}
          onBack={clearProgress}
        />
      )}
    </Suspense>
  );
};
