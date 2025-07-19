import React from "react";
import { Share2, RefreshCw, Heart, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import type { PersonalityType } from "../data/personalityTypes";
import { typeDetails } from "../data/typeDetails";
import logoImage from "@/assets/images/ci/ACG_CI-화이트1 2.png";
import { Button } from "./ui/button";

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
  // const maxScore = Math.max(...Object.values(scores));
  const detail = typeDetails[personalityType.id];
  console.log("detail: ", detail);

  return (
    <div className="w-full max-w-xl mx-auto p-8">
      <div className="fixed top-4 left-4 right-4 z-50">
        <div className="bg-transparent rounded-xl py-2 px-6 max-w-xl mx-auto">
          <div className="flex justify-center">
            <img
              src={logoImage}
              alt="WorkDNA Logo"
              className="h-5 object-contain"
            />
          </div>
        </div>
      </div>
      {/* Result Header */}
      <motion.div
        className="rounded-xl w-auto h-full p-2 mb-4 bg-cover bg-center bg-no-repeat relative border border-lime-400 "
        style={{ backgroundImage: `url('/src/assets/images/bg/bg.jpg')` }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.img
          src="/src/assets/images/types/사교왕.png"
          alt="result"
          className="h-auto pb-14"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />

        <motion.div
          id="wrap"
          className="absolute bottom-0 left-0 right-0 bg-white w-full p-6 px-6  sm:p-10 sm:pb-12 rounded-xl backdrop-blur-xs bg-white/60 space-y-2 mask-t-from-85%"
          initial={{ opacity: 0, y: 20 }}
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
                size={"icon"}
                variant={"ghost"}
                className="bg-transparent"
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
            className="text-xl sm:text-2xl font-extrabold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            {detail?.summary || personalityType.name}
          </motion.h1>
          <motion.p
            className="text-black font-bold text-sm sm:text:lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            {personalityType.description}
          </motion.p>
        </motion.div>
      </motion.div>
      {/* Main Result Card */}
      <div className="mb-6 bg-white rounded-xl p-6">
        <div className="space-y-6">
          {/* Traits */}
          <div>
            <h3 className="sm:text-lg text-base font-semibold mb-3">
              주요 특징
            </h3>
            <div className="space-y-2">
              {detail?.characteristics.map((trait, index) => (
                <div
                  key={index}
                  className="flex items-center text-sm sm:text-base"
                >
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                  {trait}
                </div>
              ))}
            </div>
          </div>

          {/* Needs */}
          <div>
            <h3 className="sm:text-lg text-base font-semibold  mb-1 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-400" />
              나에게 필요한 것은
            </h3>
            <p className="leading-relaxed p-3 rounded-lg text-sm sm:text-base">
              {detail?.needs}
            </p>
          </div>

          {/* Negative Traits */}
          <div>
            <h3 className="sm:text-lg text-base font-semibold  mb-1 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
              내가 삐뚤어지면
            </h3>
            <div className="space-y-2 p-3 rounded-lg">
              {detail?.negativeTraits.map((trait, index) => (
                <div
                  key={index}
                  className="flex items-start text-sm sm:text-base"
                >
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                  {trait}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <button
          onClick={onShare}
          className="btn-primary flex items-center justify-center space-x-2"
        >
          <Share2 size={20} />
          <span>결과 공유하기</span>
        </button>
        <button
          onClick={onRestart}
          className="btn-secondary flex items-center justify-center space-x-2"
        >
          <RefreshCw size={20} />
          <span>다시 테스트하기</span>
        </button>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-400 pb-8">
        <p>이 결과는 당신의 업무 성향을 분석한 것입니다.</p>
        <p>더 정확한 결과를 위해 솔직하게 답변해주세요.</p>
      </div>
    </div>
  );
};
