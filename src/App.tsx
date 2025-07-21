import { useState } from "react";
import { toast } from "sonner";
import logoImageGray from "./assets/images/ci/ACG_CI-그레이1.png";
import logoImage from "./assets/images/ci/ACG_CI-화이트1 2.png";
import floatingIcon from "./assets/images/cover/icons/icon.png";
import floatingIcon2 from "./assets/images/cover/icons/icon2.png";
import studyIcon1 from "./assets/images/cover/icons/study1.png";
import studyIcon2 from "./assets/images/cover/icons/study2.png";
import studyIcon3 from "./assets/images/cover/icons/study3.png";
import teamWork1 from "./assets/images/cover/icons/teamwork.png";
import teamWork2 from "./assets/images/cover/icons/teamwork2.png";
import { ConsentDrawer } from "./components/ConsentDrawer";
import { FeatureCarouselItem } from "./components/FeatureCarouselItem";
import { SplashScreen } from "./components/SplashScreen";
import { TestQuestion } from "./components/TestQuestion";
import { TestResult } from "./components/TestResult";
import { TestLoading } from "./components/TestLoading";
import { Button } from "./components/ui/button";
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from "./components/ui/carousel";
import { Toaster } from "./components/ui/sonner";
import { questions } from "./data/questions";
import { useTest } from "./hooks/useTest";
import useKakao from "./hooks/useKakao";
import KakaoShareButton from "./components/share/Kakao";
import { TextAnimate } from "./components/magicui/text-animate";

function TestApp() {
  const [showSplash, setShowSplash] = useState(true);
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

  const isKakaoReady = useKakao();
  console.log("isKakaoReady: ", isKakaoReady);

  const handleKakaoShare = () => {
    if (!isKakaoReady || !window.Kakao) {
      alert("Kakao SDK가 준비되지 않았습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "ACG 직장인 유형 테스트",
        description: "나만의 워크 DNA를 발견해 보세요!",
        imageUrl: logoImageGray, // 'src/assets'에 이미지를 넣고 import하여 사용
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };

  // Splash screen
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  // Error state
  if (error) {
    return (
      <>
        <div className=" bg-[#efebde] bg-main h-dvh flex items-center justify-center">
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
        <div className="h-dvh flex flex-col justify-between max-w-xl mx-auto">
          {/* Fixed Header */}
          <div className="bg-transparent py-4 px-6 sticky top-0">
            <div className="flex justify-center">
              <img src={logoImage} alt="WorkDNA Logo" className="h-5 object-contain" />
            </div>
          </div>
          <div className="flex-1  ">
            {/* Header */}
            <div className="h-full relative">
              <TextAnimate animation="blurIn" as="h3" className="text-2xl font-bold text-white text-center absolute top-[8%]  left-0 right-0">
                나만의 워크 DNA 발견하기
              </TextAnimate>
              {/* Carouesel */}
              <div className="px-4 absolute top-[60%] -translate-y-1/2">
                <div className="absolute inset-0 -top-32 w-full flex bg-transparent items-center justify-center pointer-events-none top-6">
                  <div className="w-48 h-32 bg-[#D6B585]/50 rounded-full blur-2xl opacity-100"></div>
                </div>
                <Carousel>
                  <CarouselContent>
                    <CarouselItem>
                      <FeatureCarouselItem
                        imageSrc="/src/assets/images/cover/cover1-1.png"
                        imageAlt="정확한 분석"
                        title="정확한 분석"
                        description={`${questions.length}개의 간단한 질문으로 당신의 업무 스타일을 정확히 분석합니다`}
                        floatingIcon={{
                          src: floatingIcon,
                          alt: "플로팅 아이콘",
                          className: "-left-24 top-0 w-20 ",
                          delay: 0.5,
                        }}
                        floatingIcon2={{
                          src: floatingIcon2,
                          alt: "플로팅 아이콘 2",
                          className: "-right-24 top-5 w-20 ",
                          delay: 1,
                        }}
                      />
                    </CarouselItem>
                    <CarouselItem>
                      <FeatureCarouselItem
                        imageSrc="/src/assets/images/cover/cover-222.png"
                        imageAlt="팀워크 향상"
                        title="팀워크 향상"
                        description="동료들과 결과를 공유하여 더 나은 협업 방법을 찾아보세요"
                        floatingIcon={{
                          src: teamWork1,
                          alt: "치킨 아이콘 1",
                          className: "-left-24 bottom-0 w-20 ",
                          delay: 0.5,
                        }}
                        floatingIcon2={{
                          src: teamWork2,
                          alt: "치킨 아이콘 2",
                          className: "-right-24 bottom-8 w-20 ",
                          delay: 1.0,
                        }}
                      />
                    </CarouselItem>
                    <CarouselItem>
                      <FeatureCarouselItem
                        imageSrc="/src/assets/images/cover/cover3.png"
                        imageAlt="개인 성장"
                        title="개인 성장"
                        description="나의 강점과 개발 포인트를 파악하여 성장의 기회를 찾으세요"
                        floatingIcon={{
                          src: studyIcon1,
                          alt: "스터디 아이콘 1",
                          className: "top-4 -right-20 w-20",
                          delay: 0.3,
                        }}
                        floatingIcon2={{
                          src: studyIcon2,
                          alt: "스터디 아이콘 2",
                          className: "top-20 -left-20 w-20",
                          delay: 0.8,
                        }}
                        floatingIcon3={{
                          src: studyIcon3,
                          alt: "스터디 아이콘 3",
                          className: "top-28 -right-20 w-20",
                          delay: 1.3,
                        }}
                      />
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselDots />
                </Carousel>
              </div>
            </div>
          </div>
          {/* Fixed bottom CTA */}
          <div className="z-10 bg-white rounded-t-3xl shadow-none p-8 text-center h-auto flex flex-col justify-between">
            <div>
              <div className="flex justify-center items-center gap-6 mb-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-[#1c3163]">1,247</p>
                  <p className="text-xs text-gray-500">참여 인원</p>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="text-center">
                  <p className="text-lg font-bold text-[#d6b585]">리더형</p>
                  <p className="text-xs text-gray-500">최다 유형 (23%)</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3">소요 시간: 약 5분</p>
              <ConsentDrawer isLoading={isLoading} onSubmit={handleConsentSubmit} />
            </div>
            <div className="space-x-4 mt-4 ">
              <Button size="icon" className="size-5 cursor-pointer bg-[#d6b585] p-3" onClick={copyCurrentUrl}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-link-icon lucide-link"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </Button>

              {isKakaoReady ? <KakaoShareButton onClick={handleKakaoShare} /> : <div className="text-gray-500">공유 버튼을 불러오는 중입니다...</div>}
            </div>
          </div>

          {/* Consent Modal */}
          {/* <ConsentModal isOpen={showConsentModal} onClose={() => setShowConsentModal(false)} onSubmit={handleConsentSubmit} /> */}
        </div>
        <Toaster />
      </>
    );
  }

  // Loading state when completing test
  // if (isLoading && testState.currentQuestion >= questions.length - 1) {
  if (isLoading && testState.currentQuestion >= questions.length - 1) {
    return (
      <>
        <TestLoading />
        <Toaster />
      </>
    );
  }

  // Test in progress
  if (!testState.isComplete && currentQuestion) {
    return (
      <>
        <div className="bg-main h-dvh ">
          <div className="flex justify-center items-center h-full max-w-xl mx-auto ">
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
        <TestResult personalityType={personalityType} scores={testState.result.scores} onRestart={restartTest} onShare={shareResult} />
        <Toaster />
      </>
    );
  }

  // Loading state only when explicitly loading
  if (isLoading) {
    return (
      <>
        <div className=" bg-[#efebde] bg-main h-dvh flex items-center justify-center">
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
        <div className=" bg-[#efebde] bg-main h-dvh flex items-center justify-center">
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
      <div className=" bg-[#efebde] bg-main h-dvh flex items-center justify-center">
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
