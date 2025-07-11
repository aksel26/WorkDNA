import { useState } from "react";
import { ConsentDrawer } from "./components/ConsentDrawer";
import { SplashScreen } from "./components/SplashScreen";
import { TestQuestion } from "./components/TestQuestion";
import { TestResult } from "./components/TestResult";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "./components/ui/carousel";
import { Toaster } from "./components/ui/sonner";
import { questions } from "./data/questions";
import { useTest } from "./hooks/useTest";

function App() {
  const [showSplash, setShowSplash] = useState(false);
  const {
    testState,
    isLoading,
    error,
    submitConsent,
    submitAnswer,
    restartTest,
    shareResult,
    currentQuestion,
    personalityType,
  } = useTest();

  const handleConsentSubmit = async (userData: {
    name: string;
    gender: string;
    ageRange: string;
    consent: boolean;
  }) => {
    try {
      console.log("userData:", userData);
      await submitConsent(userData);
    } catch (err) {
      console.error("Failed to submit consent:", err);
    }
  };

  const handleAnswer = async (questionId: number, value: string) => {
    try {
      await submitAnswer(questionId, value);
    } catch (err) {
      console.error("Failed to submit answer:", err);
    }
  };

  // Splash screen
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  // Error state
  if (error) {
    return (
      <>
        <div className="min-h-screen bg-[#efebde] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              오류가 발생했습니다
            </h2>
            <p className="text-gray-300 mb-4">{error}</p>
            <button onClick={restartTest} className="btn-primary">
              다시 시도하기
            </button>
          </div>
        </div>
        <Toaster />
      </>
    );
  }

  // Landing page
  if (!testState.userId) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-background-primary to-background-secondary">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto text-center">
              {/* Header */}
              {/* <div className="mb-8 mt-10">
                <h3 className="text-2xl font-extrabold mb-4 text-gray-800">
                  직장인 성격 테스트
                </h3>
                <h1 className="text-3xl font-extrabold mb-4 text-gray-800">
                  나는 누구?
                </h1>
              </div> */}

              {/* Features */}

              <div className="relative">
                <div className="absolute inset-0 w-full flex bg-transparent items-center justify-center pointer-events-none">
                  <div className="w-full h-[400px] bg-white rounded-full blur-xl opacity-100"></div>
                </div>
                <Carousel className="mb-5 relative z-10 h-[400px]">
                  <CarouselContent>
                    <CarouselItem>
                      <div className="bg-transparent backdrop-blur-sm text-center rounded-2xl p-6">
                        <img
                          src="/src/assets/images/cover/cover1.webp"
                          alt="정확한 분석"
                          // className="h-[2500px] w-full object-fill"
                        />

                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          정확한 분석
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {questions.length}개의 간단한 질문으로 당신의 업무
                          스타일을 정확히 분석합니다
                        </p>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="bg-transparent backdrop-blur-sm text-center rounded-2xl p-6">
                        <img
                          src="/src/assets/images/cover/cover2.webp"
                          alt="팀워크 향상"
                        />

                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          팀워크 향상
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          동료들과 결과를 공유하여 더 나은 협업 방법을
                          찾아보세요
                        </p>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="bg-transparent backdrop-blur-sm text-center rounded-2xl p-6">
                        <img
                          src="/src/assets/images/cover/cover3.webp"
                          alt="개인 성장"
                        />

                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          개인 성장
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          나의 강점과 개발 포인트를 파악하여 성장의 기회를
                          찾으세요
                        </p>
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselDots />
                </Carousel>
              </div>

              {/* <div className="grid md:grid-cols-3 gap-8 mb-12">
                
                
               
              </div> */}

              {/* CTA */}
              <ConsentDrawer
                isLoading={isLoading}
                onSubmit={handleConsentSubmit}
              />

              <p className="text-sm text-gray-500 mt-5">
                소요 시간: 약 5분 | 완전 무료
              </p>
            </div>
          </div>

          {/* Consent Modal */}
          {/* <ConsentModal isOpen={showConsentModal} onClose={() => setShowConsentModal(false)} onSubmit={handleConsentSubmit} /> */}
        </div>
        <Toaster />
      </>
    );
  }

  // Test in progress
  if (!testState.isComplete && currentQuestion) {
    return (
      <>
        <div className="min-h-screen bg-[#efebde] py-8">
          <div className="container mx-auto">
            <TestQuestion
              question={currentQuestion}
              currentAnswer={testState.answers[currentQuestion.id] || null}
              onAnswer={handleAnswer}
              questionNumber={testState.currentQuestion + 1}
              totalQuestions={questions.length}
            />
          </div>
        </div>
        <Toaster />
      </>
    );
  }

  // Test complete - show results
  if (testState.isComplete && testState.result && personalityType) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-background-primary to-background-secondary py-8">
          <div className="container mx-auto">
            <TestResult
              personalityType={personalityType}
              scores={testState.result.scores}
              onRestart={restartTest}
              onShare={shareResult}
            />
          </div>
        </div>
        <Toaster />
      </>
    );
  }

  // Loading state only when explicitly loading
  if (isLoading) {
    return (
      <>
        <div className="min-h-screen bg-[#efebde] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-300">로딩 중...</p>
          </div>
        </div>
        <Toaster />
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <div className="min-h-screen bg-[#efebde] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              오류가 발생했습니다
            </h2>
            <p className="text-gray-300 mb-4">{error}</p>
            <button onClick={restartTest} className="btn-primary">
              다시 시도하기
            </button>
          </div>
        </div>
        <Toaster />
      </>
    );
  }

  // Fallback - should not reach here
  return (
    <>
      <div className="min-h-screen bg-[#efebde] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            예상치 못한 상태입니다
          </h2>
          <button onClick={restartTest} className="btn-primary">
            처음부터 시작하기
          </button>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
