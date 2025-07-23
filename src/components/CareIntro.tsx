import heartIcon from "@/assets/images/care/icon.png";
import sproutIcon from "@/assets/images/care/sprout.png";
import logoImage from "@/assets/images/ci/ACG_CI-그레이1.png";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TextAnimate } from "./magicui/text-animate";
import { TextReveal } from "./magicui/text-reveal";
import { ChevronDown } from "./ui/arrowDown";
import { Button } from "./ui/button";

interface CareIntroProps {
  onStartTest: () => void;
  onContinueTest: () => void;
  hasOngoingTest: boolean;
  testProgress?: {
    questionIndex: number;
    totalQuestions: number;
    lastSaved: string;
  };
}

export default function CareIntro({ onStartTest, onContinueTest, hasOngoingTest, testProgress }: CareIntroProps) {
  const [scrollY, setScrollY] = useState(0);

  // Refs for scroll-triggered animations
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const startButtonRef = useRef(null);
  const subscriptionRef = useRef(null);

  // InView hooks for each section
  const contentInView = useInView(contentRef, { once: true, margin: "-50px" });
  const startButtonInView = useInView(startButtonRef, { once: true, margin: "-50px" });
  const subscriptionInView = useInView(subscriptionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goWorkTest = () => {
    window.location.href = "/";
  };

  const { scrollY: headerY } = useScroll();
  const logoOpacity = useTransform(headerY, [0, 200], [1, 0]);

  return (
    <div className="min-h-screen bg-main-care">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-main/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-center">
          <motion.img src={logoImage} alt="WorkDNA Logo" className="h-5 object-contain" style={{ opacity: logoOpacity }} />
          {/* <img src={logoImage} alt="WorkDNA Logo" className="h-5 object-contain" /> */}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Title Section */}
        <div className="mt-27">
          <TextAnimate animation="blurIn" as="h1" className="text-3xl font-bold text-[#08301C] text-center">
            내 마음 진단
          </TextAnimate>
          <p className="text-center text-[#0E4A2C] mt-4">
            바쁜 일상 속에서 스스로를 더 깊이 이해하고,
            <br /> 자신에게 한 걸음 더 다가가는 시간을 선물해요.
          </p>

          <motion.div
            ref={titleRef}
            className="text-center sticky top-24"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: scrollY > 100 ? 0 : 1,
              y: scrollY > 100 ? -30 : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-72"
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: [0, 6, 0, 6, 0, 6, 0],
                rotateX: [0, -2, 0, -2, 0],
                rotateY: [0, 1, 0, -1, 0],
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.2 },
                rotateX: { duration: 0.8, delay: 0.2 },
                y: {
                  duration: 4.5,
                  delay: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotateY: {
                  duration: 6,
                  delay: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <motion.img
                src={heartIcon}
                alt="heartIcon"
                className="w-full h-full object-contain"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </motion.div>
          </motion.div>
          <ChevronDown stroke={"green"} />
        </div>

        {/* Content Section */}
        <motion.div
          ref={contentRef}
          className="space-y-8 mt-32"
          initial={{ opacity: 0, y: 50 }}
          animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Intro */}
          <div className="space-y-6">
            <TextReveal>치열한 하루 속에서 문득 내 마음이 낯설게 느껴진 적 있으신가요?</TextReveal>
            <motion.div
              ref={subscriptionRef}
              id="subscription"
              className="bg-white/30 backdrop-blur-xs rounded-lg p-6 overflow-hidden relative space-y-8"
              initial={{ opacity: 0, y: 80 }}
              animate={subscriptionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <motion.img
                src={sproutIcon}
                alt="sprout"
                className="absolute right-5 bottom-0 w-42 h-42 opacity-15"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={subscriptionInView ? { opacity: 0.15, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -10 }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              {/* Simple Guidelines with staggered animation */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={subscriptionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.6, delay: 0.6 }}>
                <h4 className="font-medium mb-2">정답은 없어요</h4>
                <p className="text-sm">지금 당신에게 가장 가깝다고 느껴지는 답을 솔직하게 선택해 주세요.</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} animate={subscriptionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.6, delay: 0.8 }}>
                <h4 className="font-medium mb-2">안전한 공간</h4>
                <p className="text-sm">모든 답변은 안전하게 보호되며, 오직 당신만 확인할 수 있어요.</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} animate={subscriptionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.6, delay: 1.0 }}>
                <h4 className="font-medium mb-2">준비되셨나요?</h4>
                <p className="text-sm">복잡한 생각은 잠시 내려놓고, 당신의 마음에만 집중해보세요.</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Progress Info for Ongoing Test */}
        {hasOngoingTest && testProgress && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-blue-500/20 backdrop-blur-sm rounded-lg border border-blue-400/30">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-blue-100">진행중인 테스트</h4>
              <span className="text-sm text-blue-200">
                {testProgress.questionIndex + 1}/{testProgress.totalQuestions}
              </span>
            </div>
            <div className="w-full bg-blue-400/20 rounded-full h-2 mb-3">
              <div className="bg-blue-400 h-2 rounded-full transition-all duration-300" style={{ width: `${((testProgress.questionIndex + 1) / testProgress.totalQuestions) * 100}%` }} />
            </div>
            <p className="text-xs text-blue-200">마지막 저장: {new Date(testProgress.lastSaved).toLocaleString()}</p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          ref={startButtonRef}
          className="pt-8 space-y-3"
          initial={{ opacity: 0, y: 30 }}
          animate={startButtonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {hasOngoingTest ? (
            <>
              <Button
                onClick={onContinueTest}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 text-sm font-medium shadow-lg transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
              >
                진행중인 테스트 계속하기
              </Button>
              <Button
                onClick={onStartTest}
                variant="outline"
                className="w-full border-green-500 text-green-600 hover:bg-green-50 py-4 text-sm font-medium shadow-lg transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
              >
                새로 시작하기
              </Button>
            </>
          ) : (
            <div className="flex flex-col gap-y-4">
              <Button onClick={goWorkTest} variant={"outline"} className="w-full flex justify-between transition-all duration-300 transform hover:scale-[1.02] cursor-pointer">
                <ChevronLeft className="inline mr-2" color="gray" strokeWidth={1.8} />
                직장인 유형 테스트
                <div className="w-[20px] h-[16px] ml-2" />
              </Button>
              <Button
                onClick={onStartTest}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 text-sm font-medium shadow-lg transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
              >
                마음 진단 시작하기
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
