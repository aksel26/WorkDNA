import { useState } from "react";
import logoImage from "./assets/images/ci/ACG_CI-화이트1 2.png";
import floatingIcon from "./assets/images/cover/icons/icon.png";
import floatingIcon2 from "./assets/images/cover/icons/icon2.png";
import studyIcon1 from "./assets/images/cover/icons/study1.png";
import studyIcon2 from "./assets/images/cover/icons/study2.png";
import studyIcon3 from "./assets/images/cover/icons/study3.png";
import { ConsentDrawer } from "./components/ConsentDrawer";
import { FeatureCarouselItem } from "./components/FeatureCarouselItem";
import { SplashScreen } from "./components/SplashScreen";
import { TestQuestion } from "./components/TestQuestion";
import { TestResult } from "./components/TestResult";
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from "./components/ui/carousel";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import { questions } from "./data/questions";
import { useTest } from "./hooks/useTest";

function TestApp() {
  const [showSplash, setShowSplash] = useState(false);
  const { testState, isLoading, error, submitConsent, submitAnswer, nextQuestion, previousQuestion, restartTest, shareResult, currentQuestion, personalityType } = useTest();

  const handleConsentSubmit = async (userData: { name: string; gender: string; ageRange: string; consent: boolean }) => {
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

  const copyCurrentUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("URL이 복사되었습니다!");
    } catch (err) {
      console.error("Failed to copy URL:", err);
      toast.error("URL 복사에 실패했습니다.");
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
        <div className=" bg-[#efebde] bg-main flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">오류가 발생했습니다</h2>
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
        <div className=" bg-main flex flex-col">
          {/* Fixed Header */}
          <div className="fixed top-4 left-4 right-4 z-50">
            <div className="bg-transparent rounded-xl py-2 px-6 max-w-xl mx-auto">
              <div className="flex justify-center">
                <img src={logoImage} alt="WorkDNA Logo" className="h-5 object-contain" />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8 flex-1 pt-14">
            <div className="max-w-xl mx-auto text-center">
              {/* Header */}
              <h3 className="text-lg sm:text-xl font-extrabold mb-4 text-white mt-10 ">나만의 워크 DNA 발견하기</h3>

              {/* Features */}

              {/* <div className="grid md:grid-cols-3 gap-8 mb-12">
                
                
               
              </div> */}
            </div>
          </div>

          {/* Fixed bottom CTA */}
          <div className="fixed bottom-0 left-0 right-0 z-10 h-84 md:h-84">
            <div className="bg-white rounded-t-3xl shadow-none border border-gray-100 p-6 max-w-xl mx-auto h-full relative">
              <div className="absolute -top-54 left-0 right-0 text-center">
                {/* <div className="absolute inset-0 w-full flex bg-transparent items-center justify-center pointer-events-none top-6">
                  <div className="w-full h-64 bg-white rounded-full blur-xs opacity-100"></div>
                </div> */}
                <Carousel className="mb-5 relative z-50 mt-8">
                  <CarouselContent>
                    <CarouselItem>
                      <FeatureCarouselItem
                        imageSrc="/src/assets/images/cover/cover1-1.png"
                        imageAlt="정확한 분석"
                        title="정확한 분석"
                        description={`${questions.length}개의 간단한 질문으로 당신의 업무 스타일을 정확히 분석합니다`}
                        titleColor="font-extrabold"
                        imageWidth="w-full md:w-[280px]"
                        imageHeight="h-[240px]"
                        floatingIcon={{
                          src: floatingIcon,
                          alt: "플로팅 아이콘",
                          className: "top-8 right-4 w-20 h-20",
                          delay: 0.5,
                        }}
                        floatingIcon2={{
                          src: floatingIcon2,
                          alt: "플로팅 아이콘 2",
                          className: "top-16 left-6 w-16 h-16",
                          delay: 1.5,
                        }}
                      />
                    </CarouselItem>
                    <CarouselItem>
                      <FeatureCarouselItem
                        imageSrc="/src/assets/images/cover/test.png"
                        imageAlt="팀워크 향상"
                        title="팀워크 향상"
                        description="동료들과 결과를 공유하여 더 나은 협업 방법을 찾아보세요"
                        imageWidth="w-full md:w-[280px]"
                        imageHeight="h-[250px]"
                        // floatingIcon={{
                        //   src: chickenIcon,
                        //   alt: "치킨 아이콘 1",
                        //   className: "top-10 right-8 w-20 h-20",
                        //   delay: 0.5,
                        // }}
                        // floatingIcon2={{
                        //   src: chickenIcon,
                        //   alt: "치킨 아이콘 2",
                        //   className: "top-10 left-4 w-20 h-20",
                        //   delay: 1.0,
                        // }}
                        // floatingIcon3={{
                        //   src: chickenIcon,
                        //   alt: "치킨 아이콘 3",
                        //   className: "top-10 left-32 w-20 h-20",
                        //   delay: 1.5,
                        // }}
                      />
                    </CarouselItem>
                    <CarouselItem>
                      <FeatureCarouselItem
                        imageSrc="/src/assets/images/cover/cover3.png"
                        imageAlt="개인 성장"
                        title="개인 성장"
                        description="나의 강점과 개발 포인트를 파악하여 성장의 기회를 찾으세요"
                        imageWidth="w-full md:w-[280px]"
                        imageHeight="h-[240px]"
                        floatingIcon={{
                          src: studyIcon1,
                          alt: "스터디 아이콘 1",
                          className: "top-4 right-2 w-24 h-24",
                          delay: 0.3,
                        }}
                        floatingIcon2={{
                          src: studyIcon2,
                          alt: "스터디 아이콘 2",
                          className: "top-20 left-8 w-16 h-16",
                          delay: 0.8,
                        }}
                        floatingIcon3={{
                          src: studyIcon3,
                          alt: "스터디 아이콘 3",
                          className: "top-32 right-4 w-20 h-20",
                          delay: 1.3,
                        }}
                      />
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselDots />
                </Carousel>
              </div>

              <div className="w-full text-center absolute bottom-12 left-0 right-0 px-4">
                <ConsentDrawer isLoading={isLoading} onSubmit={handleConsentSubmit} />
                <p className="text-xs text-gray-500 mt-2">소요 시간: 약 5분</p>
                <button
                  onClick={copyCurrentUrl}
                  className="flex items-center justify-center space-x-2 mx-auto mt-3 px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>URL 복사</span>
                </button>
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
        <div className=" bg-[#efebde] bg-main py-8">
          <div className="container mx-auto">
            <TestQuestion
              question={currentQuestion}
              currentAnswer={testState.answers[currentQuestion.id] || null}
              onAnswer={handleAnswer}
              onNext={nextQuestion}
              onPrevious={previousQuestion}
              questionNumber={testState.currentQuestion + 1}
              totalQuestions={questions.length}
              canGoNext={testState.currentQuestion < questions.length - 1 || (testState.currentQuestion === questions.length - 1 && !!testState.answers[currentQuestion.id])}
              canGoPrevious={testState.currentQuestion > 0}
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
        <div className=" bg-main py-8">
          <div className="container mx-auto">
            <TestResult personalityType={personalityType} scores={testState.result.scores} onRestart={restartTest} onShare={shareResult} />
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
        <div className=" bg-[#efebde] bg-main flex items-center justify-center">
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
        <div className=" bg-[#efebde] bg-main flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">오류가 발생했습니다</h2>
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
      <div className=" bg-[#efebde] bg-main flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">예상치 못한 상태입니다</h2>
          <button onClick={restartTest} className="btn-primary">
            처음부터 시작하기
          </button>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default TestApp;
