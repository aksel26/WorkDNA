import React, { useRef } from "react";
import { Share2, RefreshCw, Heart, AlertTriangle } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import html2canvas from "html2canvas-pro";

import type { PersonalityType } from "../data/personalityTypes";
import { typeDetails } from "../data/typeDetails";
import logoImage from "@/assets/images/ci/ACG_CI-화이트1 2.png";
import { Button } from "./ui/button";

// Import type images
import 행동대장Image from "@/assets/images/types/행동대장.webp";
import 사교왕Image from "@/assets/images/types/사교왕.webp";
import 분석왕Image from "@/assets/images/types/분석왕.webp";
import 평화주의자Image from "@/assets/images/types/평화주의자.webp";

interface TestResultProps {
  personalityType: PersonalityType;
  scores: Record<string, number>;
  onRestart: () => void;
  onShare: () => void;
}

export const TestResult: React.FC<TestResultProps> = ({
  personalityType,
  onRestart,
  onShare,
}) => {
  const detail = typeDetails[personalityType.id];

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
  const buttonsRef = useRef(null);
  const footerRef = useRef(null);

  // InView hooks for each section
  const traitsInView = useInView(traitsRef, { once: true, margin: "-100px" });
  const needsInView = useInView(needsRef, { once: true, margin: "-100px" });
  const negativeTraitsInView = useInView(negativeTraitsRef, {
    once: true,
    margin: "-100px",
  });
  const buttonsInView = useInView(buttonsRef, { once: true, margin: "-100px" });
  const footerInView = useInView(footerRef, { once: true, margin: "-100px" });

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

  return (
    <div className="min-h-screen bg-main">
      {/* Fixed Logo */}
      <motion.div
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        style={{ opacity: logoOpacity }}
      >
        <img
          src={logoImage}
          alt="WorkDNA Logo"
          className="h-5 object-contain"
        />
      </motion.div>

      {/* First Section: Centered Result Header */}
      <section className="min-h-screen flex items-center justify-center px-8 sm:px-8">
        <div className="w-full max-w-md sm:max-w-lg">
          <motion.div
            className="result-header rounded-xl w-full bg-cover bg-center bg-no-repeat relative "
            // style={{ backgroundImage: `url('/src/assets/images/bg/bg.jpg')` }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
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
              className="absolute bottom-0 left-0 right-0 bg-white w-full p-5 px-5 sm:p-6 sm:pb-12 rounded-xl backdrop-blur-xs bg-white/60 space-y-2 mask-t-from-85%"
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
                  <Button
                    id="download"
                    size={"icon"}
                    variant={"ghost"}
                    className="bg-transparent cursor-pointer"
                    onClick={handleDownload}
                  >
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
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="bg-transparent"
                    onClick={onShare}
                  >
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
              <motion.h1
                className="text-lg sm:text-xl font-extrabold"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                {detail?.summary || personalityType.name}
              </motion.h1>
              <motion.p
                className="text-gray-800 font-bold text-xs sm:text-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
              >
                {personalityType.description}
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Second Section: Main Result Cards */}
      <section className="px-8 sm:px-8 pb-8">
        <div className="max-w-xl mx-auto space-y-6">
          {/* Traits Card */}
          <motion.div
            ref={traitsRef}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 50 }}
            animate={
              traitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.h3
              className="text-lg font-semibold mb-4 text-gray-800"
              initial={{ opacity: 0, x: -20 }}
              animate={
                traitsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
              }
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
                  animate={
                    traitsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
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
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 50 }}
            animate={needsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.h3
              className="text-lg font-semibold mb-4 flex items-center text-gray-800"
              initial={{ opacity: 0, x: -20 }}
              animate={
                needsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
              }
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Heart className="w-5 h-5 mr-2 text-red-400" />
              나에게 필요한 것은
            </motion.h3>
            <motion.p
              className="leading-relaxed text-sm sm:text-base text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={
                needsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {detail?.needs}
            </motion.p>
          </motion.div>

          {/* Negative Traits Card */}
          <motion.div
            ref={negativeTraitsRef}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 50 }}
            animate={
              negativeTraitsInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.h3
              className="text-lg font-semibold mb-4 flex items-center text-gray-800"
              initial={{ opacity: 0, x: -20 }}
              animate={
                negativeTraitsInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -20 }
              }
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
                  animate={
                    negativeTraitsInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                  {trait}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-3 mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={
              buttonsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={
                buttonsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
              }
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Button
                onClick={onShare}
                className="btn-primary flex items-center justify-center space-x-2 w-full"
              >
                <Share2 size={20} />
                <span>결과 공유하기</span>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={
                buttonsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
              }
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Button
                onClick={onRestart}
                className="btn-secondary flex items-center justify-center space-x-2 w-full"
              >
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
    </div>
  );
};
