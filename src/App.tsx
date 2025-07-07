import { BarChart3, Brain, Users } from "lucide-react";
import { useState } from "react";
import { ConsentModal } from "./components/ConsentModal";
import { TestQuestion } from "./components/TestQuestion";
import { TestResult } from "./components/TestResult";
import { Carousel, CarouselContent, CarouselItem } from "./components/ui/carousel";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./components/ui/dialog";
import { questions } from "./data/questions";
import { useTest } from "./hooks/useTest";
import { Toaster } from "./components/ui/sonner";

function App() {
  const [showConsentModal, setShowConsentModal] = useState(false);
  const { testState, isLoading, error, submitConsent, submitAnswer, restartTest, shareResult, currentQuestion, personalityType } = useTest();

  const handleStart = () => {
    setShowConsentModal(true);
  };

  const handleConsentSubmit = async (userData: { name: string; gender: string; ageRange: string; consent: boolean }) => {
    try {
      console.log("userData:", userData);
      await submitConsent(userData);
      setShowConsentModal(false);
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

  // Error state
  if (error) {
    return (
      <>
        <div className="min-h-screen bg-[#efebde] flex items-center justify-center">
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
        <div className="min-h-screen bg-gradient-to-br from-background-primary to-background-secondary">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto text-center">
              {/* Header */}
              <div className="mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-500 rounded-full text-white text-2xl font-bold mb-6">
                  <Brain size={32} />
                </div>
                <h1 className="text-3xl font-bold mb-4">
                  직장인 성격 테스트
                  <br />
                  나는 누구?
                </h1>
                <p className="text-xl text-gray-300 mb-8">오피스 마을에서 나는 어떤 동물 주민일까요?</p>
              </div>

              {/* Features */}

              <Carousel className="mb-5">
                <CarouselContent>
                  <CarouselItem>
                    <div className="card text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-500 rounded-full text-white mb-4">
                        <Brain size={24} />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">정확한 분석</h3>
                      <p className="text-gray-300">{questions.length}개의 간단한 질문으로 당신의 업무 스타일을 정확히 분석합니다</p>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="card text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-500 rounded-full text-white mb-4">
                        <Users size={24} />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">팀워크 향상</h3>
                      <p className="text-gray-300">동료들과 결과를 공유하여 더 나은 협업 방법을 찾아보세요</p>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    {" "}
                    <div className="card text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-500 rounded-full text-white mb-4">
                        <BarChart3 size={24} />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">개인 성장</h3>
                      <p className="text-gray-300">나의 강점과 개발 포인트를 파악하여 성장의 기회를 찾으세요</p>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                {/* <CarouselPrevious />
                <CarouselNext /> */}
              </Carousel>

              {/* <div className="grid md:grid-cols-3 gap-8 mb-12">
                
                
               
              </div> */}

              {/* CTA */}

              <Dialog open={showConsentModal} onOpenChange={setShowConsentModal}>
                <DialogTrigger onClick={handleStart} disabled={isLoading} className="btn-primary text-lg px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? "준비 중..." : "테스트 시작하기"}
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle className="text-xl font-bold text-black">개인정보 수집 및 이용 동의</DialogTitle>
                  <ConsentModal onClose={() => setShowConsentModal(false)} onSubmit={handleConsentSubmit} />

                  {/* <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</DialogDescription>
                  </DialogHeader> */}
                </DialogContent>
              </Dialog>

              <p className="text-sm text-gray-400 mt-5">소요 시간: 약 5분 | 완전 무료</p>
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
      <div className="min-h-screen bg-[#efebde] flex items-center justify-center">
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

export default App;
