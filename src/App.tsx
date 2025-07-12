import { useState } from "react";
import { ConsentDrawer } from "./components/ConsentDrawer";
import { SplashScreen } from "./components/SplashScreen";
import { TestQuestion } from "./components/TestQuestion";
import { TestResult } from "./components/TestResult";
import { FeatureCarouselItem } from "./components/FeatureCarouselItem";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "./components/ui/carousel";
import { Toaster } from "./components/ui/sonner";
import { questions } from "./data/questions";
import { useTest } from "./hooks/useTest";
import floatingIcon from "./assets/images/cover/icons/icon.png";
import floatingIcon2 from "./assets/images/cover/icons/icon2.png";
import logoImage from "./assets/images/ci/ACG_CI-그레이1.png";

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
        <div className="min-h-screen bg-[#efebde] bg-main flex items-center justify-center">
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
        <div className="min-h-screen bg-main flex flex-col">
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

          <div className="container mx-auto px-4 py-8 flex-1 pt-20">
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
                  <div className="w-full h-[500px] bg-white rounded-full blur-xl opacity-100"></div>
                </div>
                <Carousel className="mb-5 relative z-10 h-[500px]">
                  <CarouselContent>
                    <CarouselItem>
                      <FeatureCarouselItem
                        imageSrc="/src/assets/images/cover/cover1-1.png"
                        imageAlt="정확한 분석"
                        title="정확한 분석"
                        description={`${questions.length}개의 간단한 질문으로 당신의 업무 스타일을 정확히 분석합니다`}
                        titleColor="font-extrabold"
                        imageHeight="h-[340px]"
                        floatingIcon={{
                          src: floatingIcon,
                          alt: "플로팅 아이콘",
                        }}
                        floatingIcon2={{
                          src: floatingIcon2,
                          alt: "플로팅 아이콘 2",
                        }}
                      />
                    </CarouselItem>
                    <CarouselItem>
                      <FeatureCarouselItem
                        imageSrc="/src/assets/images/cover/cover2-2.png"
                        imageAlt="팀워크 향상"
                        title="팀워크 향상"
                        description="동료들과 결과를 공유하여 더 나은 협업 방법을 찾아보세요"
                        imageWidth="w-auto"
                        floatingIcon={{
                          src: floatingIcon,
                          alt: "플로팅 아이콘",
                        }}
                        floatingIcon2={{
                          src: floatingIcon2,
                          alt: "플로팅 아이콘 2",
                        }}
                      />
                    </CarouselItem>
                    <CarouselItem>
                      <FeatureCarouselItem
                        imageSrc="/src/assets/images/cover/cover3.png"
                        imageAlt="개인 성장"
                        title="개인 성장"
                        description="나의 강점과 개발 포인트를 파악하여 성장의 기회를 찾으세요"
                        imageHeight="h-[340px]"
                      />
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselDots />
                </Carousel>
              </div>

              {/* <div className="grid md:grid-cols-3 gap-8 mb-12">
                
                
               
              </div> */}
            </div>
          </div>

          {/* Fixed bottom CTA */}
          <div className="fixed bottom-6 left-4 right-4 z-50">
            <div className="bg-white rounded-3xl shadow-none border border-gray-100 p-6 max-w-4xl mx-auto h-[250px]">
              <div className="text-center flex flex-col items-center justify-around h-full">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    나만의 워크 DNA 발견하기
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    간단한 질문으로 당신의 업무 스타일을 알아보세요
                  </p>
                </div>
                <div className="w-full">
                  <ConsentDrawer
                    isLoading={isLoading}
                    onSubmit={handleConsentSubmit}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    소요 시간: 약 5분 | 완전 무료
                  </p>
                </div>
              </div>
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
        <div className="min-h-screen bg-[#efebde] bg-main py-8">
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
        <div className="min-h-screen bg-gradient-to-br from-background-primary to-background-secondary bg-main py-8">
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
        <div className="min-h-screen bg-[#efebde] bg-main flex items-center justify-center">
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
        <div className="min-h-screen bg-[#efebde] bg-main flex items-center justify-center">
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
      <div className="min-h-screen bg-[#efebde] bg-main flex items-center justify-center">
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
