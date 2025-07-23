import { useState } from "react";
import { toast } from "sonner";
import { AnimatePresence } from "framer-motion";
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
import { useStats } from "./hooks/useStats";
import useKakao from "./hooks/useKakao";
import KakaoShareButton from "./components/share/Kakao";
import { TextAnimate } from "./components/magicui/text-animate";
import { useTranslation } from "react-i18next";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "./components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { PageTransition } from "./components/PageTransition";

function TestApp() {
  const { t, i18n, ready } = useTranslation();
  const [showSplash, setShowSplash] = useState(() => {
    // localStorage에서 스플래시 화면을 본 적이 있는지 확인
    const hasSeenSplash = localStorage.getItem("hasSeenSplash");
    return !hasSeenSplash; // 본 적이 없으면 true, 본 적이 있으면 false
  });
  const { testState, isLoading, error, submitConsent, submitAnswer, nextQuestion, previousQuestion, restartTest, shareResult, currentQuestion, personalityType } = useTest();
  const { stats, isLoading: isStatsLoading } = useStats();
  const isKakaoReady = useKakao();

  const [selectLanguage, setSelectLanguage] = useState("ko");

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setSelectLanguage(lng);
  };

  // i18n이 준비되지 않았다면 로딩 표시
  if (!ready) {
    return (
      <div className="h-dvh flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-300">{t("loading.languageSettings")}</p>
        </div>
      </div>
    );
  }

  // 현재 페이지 상태를 결정하는 함수
  const getCurrentPageKey = () => {
    if (showSplash) return "splash";
    if (error) return "error";
    if (!testState.userId) return "landing";
    if (isLoading && testState.currentQuestion >= questions.length) return "loading";
    if (!testState.isComplete && currentQuestion) return "question";
    if (testState.isComplete && testState.result && personalityType) return "result";
    return "fallback";
  };

  const pageKey = getCurrentPageKey();

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
      toast.success(t("toast.urlCopied"));
    } catch (err) {
      console.error("Failed to copy URL:", err);
      toast.error(t("toast.urlCopyFailed"));
    }
  };

  const handleKakaoShare = () => {
    if (!isKakaoReady || !window.Kakao) {
      alert(t("alerts.kakaoNotReady"));
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: t("kakaoShare.title"),
        description: t("kakaoShare.description"),
        imageUrl: logoImageGray, // 'src/assets'에 이미지를 넣고 import하여 사용
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: t("kakaoShare.buttonTitle"),
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };

  return (
    <AnimatePresence mode="wait">
      {pageKey === "splash" && (
        <PageTransition key="splash" direction="fade">
          <SplashScreen
            onComplete={() => {
              localStorage.setItem("hasSeenSplash", "true");
              setShowSplash(false);
            }}
          />
        </PageTransition>
      )}

      {pageKey === "error" && (
        <PageTransition key="error" direction="fade">
          <>
            <div className=" bg-[#efebde] bg-main h-dvh flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">{t("errors.errorOccurred")}</h2>
                <p className="text-gray-300 mb-4">{error}</p>
                <button onClick={restartTest} className="btn-primary">
                  {t("errors.tryAgain")}
                </button>
              </div>
            </div>
            <Toaster />
          </>
        </PageTransition>
      )}

      {pageKey === "landing" && (
        <PageTransition key="landing" direction="fade">
          <>
            <div className="h-dvh flex flex-col justify-between max-w-xl mx-auto">
              {/* Fixed Header */}
              <div className="bg-transparent py-4 px-6 sticky top-0">
                <div className="flex justify-between items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size={"icon"} className="size-8 p-2">
                        <Globe color="white" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-max-content">
                      <DropdownMenuRadioGroup value={selectLanguage} onValueChange={(value: string) => changeLanguage(value)}>
                        <DropdownMenuRadioItem className="text-xs" value="ko">
                          {t("buttons.korean")}
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem className="text-xs" value="en">
                          {t("buttons.english")}
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <img src={logoImage} alt="WorkDNA Logo" className="h-5 object-contain" />
                  <div className="w-[32px]"></div> {/* Spacer for center alignment */}
                </div>
              </div>
              <div className="flex-1  ">
                {/* Header */}
                <div className="h-full relative">
                  <TextAnimate animation="blurIn" as="h3" className="text-2xl font-bold text-white text-center absolute top-[8%]  left-0 right-0">
                    {t("greeting")}
                  </TextAnimate>
                  {/* Carouesel */}
                  <div className="px-4 absolute top-[60%] -translate-y-1/2">
                    <div className="absolute inset-0  w-full flex bg-transparent items-center justify-center pointer-events-none top-6">
                      <div className="w-48 h-32 bg-[#D6B585]/50 rounded-full blur-2xl opacity-100"></div>
                    </div>
                    <Carousel>
                      <CarouselContent>
                        <CarouselItem>
                          <FeatureCarouselItem
                            imageSrc="/src/assets/images/cover/cover1-1.png"
                            imageAlt={t("carousel.feature1.imageAlt")}
                            title={t("carousel.feature1.title")}
                            description={t("carousel.feature1.description", { count: questions.length })}
                            floatingIcon={{
                              src: floatingIcon,
                              alt: t("icons.floating"),
                              className: "-left-24 top-0 w-20 ",
                              delay: 0.5,
                            }}
                            floatingIcon2={{
                              src: floatingIcon2,
                              alt: t("icons.floating2"),
                              className: "-right-24 top-5 w-20 ",
                              delay: 1,
                            }}
                          />
                        </CarouselItem>
                        <CarouselItem>
                          <FeatureCarouselItem
                            imageSrc="/src/assets/images/cover/cover-222.png"
                            imageAlt={t("carousel.feature2.imageAlt")}
                            title={t("carousel.feature2.title")}
                            description={t("carousel.feature2.description")}
                            floatingIcon={{
                              src: teamWork1,
                              alt: t("icons.chicken1"),
                              className: "-left-24 bottom-0 w-20 ",
                              delay: 0.5,
                            }}
                            floatingIcon2={{
                              src: teamWork2,
                              alt: t("icons.chicken2"),
                              className: "-right-24 bottom-8 w-20 ",
                              delay: 1.0,
                            }}
                          />
                        </CarouselItem>
                        <CarouselItem>
                          <FeatureCarouselItem
                            imageSrc="/src/assets/images/cover/cover3.png"
                            imageAlt={t("carousel.feature3.imageAlt")}
                            title={t("carousel.feature3.title")}
                            description={t("carousel.feature3.description")}
                            floatingIcon={{
                              src: studyIcon1,
                              alt: t("icons.study1"),
                              className: "top-4 -right-20 w-20",
                              delay: 0.3,
                            }}
                            floatingIcon2={{
                              src: studyIcon2,
                              alt: t("icons.study2"),
                              className: "top-20 -left-20 w-20",
                              delay: 0.8,
                            }}
                            floatingIcon3={{
                              src: studyIcon3,
                              alt: t("icons.study3"),
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
                      <p className="text-lg font-bold text-[#1c3163]">{isStatsLoading ? "..." : stats?.totalParticipants.toLocaleString() || "1,247"}</p>
                      <p className="text-xs text-gray-500">{t("stats.participants")}</p>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-[#d6b585]">{isStatsLoading ? "..." : stats?.mostCommonType || t("stats.leaderType")}</p>
                      <p className="text-xs text-gray-500">{t("stats.mostCommonType")}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{t("stats.estimatedTime")}</p>
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

                  {isKakaoReady ? <KakaoShareButton onClick={handleKakaoShare} /> : <div className="text-gray-500">{t("sharing.loadingButton")}</div>}
                </div>
              </div>

              {/* Consent Modal */}
              {/* <ConsentModal isOpen={showConsentModal} onClose={() => setShowConsentModal(false)} onSubmit={handleConsentSubmit} /> */}
            </div>
            <Toaster />
          </>
        </PageTransition>
      )}

      {pageKey === "loading" && (
        <PageTransition key="loading" direction="up">
          <>
            <TestLoading />
            <Toaster />
          </>
        </PageTransition>
      )}

      {pageKey === "question" && (
        <PageTransition key="question" direction="left">
          <>
            <div className="bg-main h-dvh ">
              <div className="flex justify-center items-center h-full max-w-xl mx-auto ">
                <TestQuestion
                  question={currentQuestion!}
                  currentAnswer={testState.answers[currentQuestion!.id] || null}
                  onAnswer={handleAnswer}
                  onNext={nextQuestion}
                  onPrevious={previousQuestion}
                  questionNumber={testState.currentQuestion + 1}
                  totalQuestions={questions.length}
                  canGoNext={testState.currentQuestion < questions.length - 1 || (testState.currentQuestion === questions.length - 1 && !!testState.answers[currentQuestion!.id])}
                  canGoPrevious={testState.currentQuestion > 0}
                />
              </div>
            </div>
            <Toaster />
          </>
        </PageTransition>
      )}

      {pageKey === "result" && (
        <PageTransition key="result" direction="fade">
          <>
            <TestResult personalityType={personalityType!} scores={testState.result!.scores} onRestart={restartTest} onShare={shareResult} />
            <Toaster />
          </>
        </PageTransition>
      )}

      {pageKey === "fallback" && (
        <PageTransition key="fallback" direction="fade">
          <>
            <div className=" bg-[#efebde] bg-main h-dvh flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">{t("errors.unexpectedState")}</h2>
                <button onClick={restartTest} className="btn-primary">
                  {t("errors.startFromBeginning")}
                </button>
              </div>
            </div>
            <Toaster />
          </>
        </PageTransition>
      )}
    </AnimatePresence>
  );
}

export default TestApp;
