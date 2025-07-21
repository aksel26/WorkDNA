import { motion, useInView, useScroll, useTransform } from "framer-motion";
import html2canvas from "html2canvas-pro";
import { AlertTriangle, ChevronUp, Heart, RefreshCw, Share2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import logoImage from "@/assets/images/ci/ACG_CI-화이트1 2.png";
import type { PersonalityType } from "../data/personalityTypes";
import { typeDetails } from "../data/typeDetails";
import { Button } from "./ui/button";
import checkIcon from "@/assets/icons/check.png";
import bookmarkIcon from "@/assets/icons/bookmark.png";
import fireIcon from "@/assets/icons/fire.png";
import thumbsUpIcon from "@/assets/icons/thumbsUp.png";

// Import type images
import 분석왕Image from "@/assets/images/types/분석왕.webp";
import 사교왕Image from "@/assets/images/types/사교왕.webp";
import 평화주의자Image from "@/assets/images/types/평화주의자.webp";
import 행동대장Image from "@/assets/images/types/행동대장.webp";
import { ChevronDown } from "./ui/arrowDown";

interface TestResultProps {
  personalityType: PersonalityType;
  scores: Record<string, number>;
  onRestart: () => void;
  onShare: () => void;
}

export const TestResult: React.FC<TestResultProps> = ({ personalityType, onRestart, onShare }) => {
  const detail = typeDetails[personalityType.id];

  // ScrollToTop state
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Function to get the correct image based on personality type ID
  const getTypeImage = (typeId: string) => {
    switch (typeId) {
      case "AB":
        return 행동대장Image;
      case "AA":
        return 사교왕Image;
      case "BB":
        return 분석왕Image;
      case "BA":
        return 평화주의자Image;
      default:
        return 사교왕Image; // fallback
    }
  };

  // Scroll-based logo animation
  const { scrollY } = useScroll();
  const logoOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  // Refs for scroll-triggered animations
  const traitsRef = useRef(null);
  const needsRef = useRef(null);
  const negativeTraitsRef = useRef(null);
  const teamOptimizationRef = useRef(null);
  const evaluationRef = useRef(null);
  const buttonsRef = useRef(null);
  const footerRef = useRef(null);

  // InView hooks for each section
  const traitsInView = useInView(traitsRef, { once: true, margin: "-100px" });
  const needsInView = useInView(needsRef, { once: true, margin: "-100px" });
  const negativeTraitsInView = useInView(negativeTraitsRef, {
    once: true,
    margin: "-100px",
  });
  const teamOptimizationInView = useInView(teamOptimizationRef, {
    once: true,
    margin: "-100px",
  });
  const evaluationInView = useInView(evaluationRef, {
    once: true,
    margin: "-100px",
  });
  const buttonsInView = useInView(buttonsRef, { once: true, margin: "-100px" });
  const footerInView = useInView(footerRef, { once: true, margin: "-100px" });

  // ScrollToTop functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDownload = async () => {
    const element = document.querySelector(".result-header") as HTMLElement;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement("a");
      link.download = `workdna-result-${personalityType.name}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const moveDetailSection = () => {
    const detailSection = document.getElementById("detail-section");
    if (detailSection) {
      detailSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    } else {
      console.warn("Detail section not found");
    }
  };

  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: arrowDownIcon,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };
  return (
    <div className="min-h-screen bg-main">
      {/* Fixed Logo */}
      <motion.div className="fixed top-4 left-1/2 -translate-x-1/2 z-50" style={{ opacity: logoOpacity }}>
        <img src={logoImage} alt="WorkDNA Logo" className="h-5 object-contain" />
      </motion.div>

      {/* First Section: Centered Result Header */}
      <section className="min-h-screen flex items-center justify-center px-8 sm:px-8" style={{ perspective: "1000px" }}>
        <div className="w-full max-w-md sm:max-w-lg relative">
          <motion.div
            className="result-header rounded-xl sm:w-[70%] sm:mx-auto bg-cover bg-center bg-no-repeat relative "
            // style={{ backgroundImage: `url('/src/assets/images/bg/bg.jpg')` }}
            initial={{ opacity: 0, y: 30, rotateX: 45 }}
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
                delay: 2.5,
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
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateX(-5deg)",
            }}
          >
            <motion.img
              src={getTypeImage(personalityType.id)}
              alt="result"
              className="rounded-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />

            <motion.div
              id="wrap"
              className="absolute bottom-0 left-0 right-0 w-full p-5 px-5 sm:p-6 sm:pb-12 rounded-xl backdrop-blur-xs bg-white/60 space-y-2 mask-t-from-85%"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <div className="flex justify-end mt-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 2.2,
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <Button id="download" size={"icon"} variant={"ghost"} className="bg-transparent cursor-pointer" onClick={handleDownload}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-cloud-download-icon lucide-cloud-download"
                    >
                      <path d="M12 13v8l-4-4" />
                      <path d="m12 21 4-4" />
                      <path d="M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284" />
                    </svg>
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 2.4,
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <Button size={"icon"} variant={"ghost"} className="bg-transparent" onClick={onShare}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-share2-icon lucide-share-2"
                    >
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                    </svg>
                  </Button>
                </motion.div>
              </div>
              <motion.h1 className="text-lg sm:text-xl font-extrabold" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 1.4 }}>
                {detail?.summary || personalityType.name}
              </motion.h1>
              <motion.p className="text-gray-800 font-bold text-xs sm:text-lg" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 1.8 }}>
                {personalityType.description}
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div className="text-gold-500 flex-col font-bold text-sm text-center p-5 cursor-pointer flex items-center justify-center" onClick={moveDetailSection}>
            자세히보기
            <ChevronDown />
          </motion.div>
        </div>
      </section>

      {/* Second Section: Main Result Cards */}
      <section className="px-8 sm:px-8 py-8" id="detail-section">
        <div className="max-w-xl mx-auto space-y-6">
          {/* Traits Card */}
          <motion.div
            ref={traitsRef}
            className="bg-white rounded-xl p-6 shadow-sm relative overflow-hidden "
            initial={{ opacity: 0, y: 50 }}
            animate={traitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <img src={checkIcon} alt="iconBg" className="absolute -right-12 -top-12 w-54 opacity-10" />
            <motion.h3
              className="text-lg font-semibold mb-4 text-gray-800"
              initial={{ opacity: 0, x: -20 }}
              animate={traitsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              주요 특징
            </motion.h3>
            <div className="space-y-3">
              {detail?.characteristics.map((trait, index) => (
                <motion.div
                  key={index}
                  className="flex items-center text-sm sm:text-base text-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={traitsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0" />
                  {trait}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Needs Card */}
          <motion.div
            ref={needsRef}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={needsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <img src={bookmarkIcon} alt="iconBg" className="absolute -right-4 -top-8 w-46 opacity-5" />
            <motion.h3
              className="text-lg font-semibold mb-4 flex items-center text-gray-800"
              initial={{ opacity: 0, x: -20 }}
              animate={needsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Heart className="w-5 h-5 mr-2 text-red-400" />
              나에게 필요한 것은
            </motion.h3>
            <motion.p
              className="leading-relaxed text-sm sm:text-base text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={needsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {detail?.needs}
            </motion.p>
          </motion.div>

          {/* Negative Traits Card */}
          <motion.div
            ref={negativeTraitsRef}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={negativeTraitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <img src={fireIcon} alt="iconBg" className="absolute -right-4 -top-8 w-52 opacity-10" />
            <motion.h3
              className="text-lg font-semibold mb-4 flex items-center text-gray-800"
              initial={{ opacity: 0, x: -20 }}
              animate={negativeTraitsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
              내가 삐뚤어지면
            </motion.h3>
            <div className="space-y-3">
              {detail?.negativeTraits.map((trait, index) => (
                <motion.div
                  key={index}
                  className="flex items-start text-sm sm:text-base text-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={negativeTraitsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                  {trait}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Optimization Card */}
          <motion.div
            ref={teamOptimizationRef}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={teamOptimizationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <img src={thumbsUpIcon} alt="iconBg" className="absolute right-5 top-3 w-32 opacity-15" />
            <motion.h3
              className="text-lg font-semibold mb-1 flex items-center text-gray-800"
              initial={{ opacity: 0, x: -20 }}
              animate={teamOptimizationInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              💼 팀 구성 최적화 인사이트
            </motion.h3>
            <motion.p
              className="text-sm font-medium text-gray-400 mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={teamOptimizationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              "당신의 유형과 최고의 팀워크를 보이는 조합"
            </motion.p>
            <div className="space-y-3">
              {personalityType.id === "AB" && (
                <>
                  <motion.div
                    className="flex items-center text-sm sm:text-base text-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={teamOptimizationInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0" />
                    행동대장(당신) + 조언자 = 전략 실행력 120% 상승
                  </motion.div>
                  <motion.div
                    className="flex items-center text-sm sm:text-base text-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={teamOptimizationInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0" />
                    행동대장 + 평화주의자 = 팀 내 갈등 75% 감소
                  </motion.div>
                  <motion.div
                    className="flex items-center text-sm sm:text-base text-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={teamOptimizationInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0" />
                    추천 팀 구성비: 행동대장 30% + 사교왕 20% + 조언자 30% + 평화주의자 20%
                  </motion.div>
                </>
              )}
              {personalityType.id !== "AB" && (
                <motion.div
                  className="flex items-center text-sm sm:text-base text-gray-700 justify-between mt-5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={teamOptimizationInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <div className="text-center">
                    <p className="text-black font-medium text-md">행동대장</p>
                    <p className="text-black font-medium text-md">30%</p>
                  </div>
                  <div className="text-center">
                    <p>사교왕</p>
                    <p>30%</p>
                  </div>
                  <div className="text-center">
                    <p>조언자</p>
                    <p>30%</p>
                  </div>
                  <div className="text-center">
                    <p>평화주의자</p>
                    <p>30%</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-3 mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={buttonsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div initial={{ opacity: 0, x: -20 }} animate={buttonsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }} transition={{ duration: 0.4, delay: 0.3 }}>
              <Button onClick={onShare} className="btn-primary flex items-center justify-center space-x-2 w-full">
                <Share2 size={20} />
                <span>결과 공유하기</span>
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={buttonsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }} transition={{ duration: 0.4, delay: 0.4 }}>
              <Button onClick={onRestart} className="btn-secondary flex items-center justify-center space-x-2 w-full">
                <RefreshCw size={20} />
                <span>다시 테스트하기</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.div
            ref={footerRef}
            className="text-center text-sm text-gray-400 pt-8"
            initial={{ opacity: 0 }}
            animate={footerInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>이 결과는 당신의 업무 성향을 분석한 것입니다.</p>
            <p>더 정확한 결과를 위해 솔직하게 답변해주세요.</p>
          </motion.div>
        </div>
      </section>

      {/* ScrollToTop Button */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 bg-gold-300 hover:bg-gold-700 text-white p-2 rounded-sm shadow-lg transition-colors duration-200"
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showScrollToTop ? 1 : 0,
          scale: showScrollToTop ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ pointerEvents: showScrollToTop ? "auto" : "none" }}
      >
        <ChevronUp size={24} />
      </motion.button>
    </div>
  );
};
