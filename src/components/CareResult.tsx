import careResult from "@/assets/images/care/careResult.webp";
import logoImage from "@/assets/images/ci/ACG_CI_GRAY.webp";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Share2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { careResults, getCareLevel } from "../data/careQuestions";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { ChevronDown } from "./ui/arrowDown";
import { Button } from "./ui/button";
interface CareResultProps {
  answers: Record<string, number>;
  onRestart: () => void;
  onBack: () => void;
}

interface ResultItem {
  id: string;
  type: string;
  score: number;
  level: "normal" | "caution" | "danger";
  diagnosis: string;
  cause: string;
  solution: string;
}

export default function CareResult({ answers, onRestart, onBack }: CareResultProps) {
  const [results, setResults] = useState<ResultItem[]>([]);
  const [highRiskResults, setHighRiskResults] = useState<ResultItem[]>([]);
  const innerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll({
    container: innerRef,
  });
  const logoOpacity = useTransform(scrollY, [0, 150], [1, 0]);

  useEffect(() => {
    const calculatedResults: ResultItem[] = [];
    const highRisk: ResultItem[] = [];

    Object.entries(answers).forEach(([questionId, score]) => {
      const level = getCareLevel(score);
      const resultData = careResults[questionId]?.[level];

      if (resultData) {
        const resultItem: ResultItem = {
          id: questionId,
          type: resultData.type,
          score,
          level,
          diagnosis: resultData.diagnosis,
          cause: resultData.cause,
          solution: resultData.solution,
        };

        calculatedResults.push(resultItem);

        if (score >= 4) {
          highRisk.push(resultItem);
        }
      }
    });

    // 4점 이상인 목록만 노출
    setResults(highRisk);

    // 전체
    // setResults(calculatedResults);
    setHighRiskResults(highRisk);
  }, [answers]);

  const handleShare = async () => {
    const shareText = `마음 진단 테스트를 완료했습니다.\n${highRiskResults.length > 0 ? `${highRiskResults.length}개 영역에서 관심이 필요합니다.` : "전반적으로 건강한 상태입니다."}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "마음 진단 테스트 결과",
          text: shareText,
          url: window.location.href,
        });
      } catch {
        console.log("Sharing cancelled");
      }
    } else {
      await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
      alert("결과가 클립보드에 복사되었습니다.");
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
  return (
    <div className="h-dvh bg-main-care flex items-center justify-center">
      <div id="inner" ref={innerRef} className="max-w-md mx-auto overflow-y-scroll h-full py-8">
        {/* Header */}

        <motion.div className="fixed top-4 left-1/2 -translate-x-1/2 z-50" style={{ opacity: logoOpacity }}>
          <img src={logoImage} alt="WorkDNA Logo" className="h-5 object-contain" />
        </motion.div>
        <div id="header" className="text-center flex justify-center items-center flex-col h-screen">
          {/* <img src={careBg} alt="cardBg" className="absolute inset-0 h-64 rounded-full backdrop-blur-lg blur-sm" /> */}
          <motion.img
            src={careResult}
            alt="careResultHeader"
            className="w-56 mx-auto"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, 6, 0, 6, 0, 6, 0],
            }}
            transition={{
              opacity: { duration: 0.8, ease: "easeOut" },
              scale: { duration: 0.8, ease: "easeOut" },
              y: {
                delay: 0.8,
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            style={{
              filter: "drop-shadow(0 8px 25px rgba(196, 150, 83, 0.2))",
            }}
          />
          <motion.h2 className="text-2xl font-bold text-[#007368] my-4 z-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}>
            마음 진단 결과
          </motion.h2>

          <motion.div className="text-[#007368] flex-col font-bold text-sm text-center p-5 flex items-center justify-center" onClick={moveDetailSection}>
            결과 보기
            <ChevronDown stroke={"#007368"} />
          </motion.div>
        </div>

        {/* Detailed Results */}
        <motion.div
          className="px-6 max-w-sm min-h-screen py-8 flex flex-col justify-between"
          id="detail-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div>
            <p className="text-[#007368] font-medium text-lg mb-5">{highRiskResults.length > 0 ? `${highRiskResults.length}가지 진단 결과를 확인해 보세요.` : "전반적으로 건강한 상태입니다"}</p>
            <Accordion type="multiple" className=" space-y-4">
              {results.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 * (index + 1),
                    duration: 0.5,
                    ease: "easeOut",
                    scale: { duration: 0.15, ease: "easeOut" },
                  }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2, ease: "easeOut" },
                  }}
                  whileTap={{
                    scale: 0.98,
                    transition: { duration: 0.1, ease: "easeInOut" },
                  }}
                >
                  <AccordionItem value={result.id} className="rounded-lg px-4 py-1 bg-white/80 backdrop-blur-xs hover:shadow-md transition-shadow duration-300">
                    <AccordionTrigger className="hover:no-underline cursor-pointer py-3">
                      {/* <div className="flex items-center gap-3"> */}
                      <span className="font-medium text-[#007368] text-sm">{result.type}</span>
                      {/* </div> */}
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <h4 className="font-medium"> 지금 당신의 마음 상태</h4>
                          <p className="text-gray-700 leading-relaxed">{result.diagnosis}</p>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-medium">마음 깊은 곳의 이야기</h4>
                          <p className="text-gray-700 leading-relaxed">{result.cause}</p>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-medium">함께 찾아갈 길</h4>
                          <p className="text-gray-700 leading-relaxed">{result.solution}</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col gap-4 justify-center items-center mt-12 w-full">
            <Button variant="outline" onClick={onBack} className="flex items-center gap-2 w-full border-none">
              <ArrowLeft className="w-4 h-4" />
              메인으로 돌아가기
            </Button>

            <Button onClick={onRestart} className="bg-[#007368] hover:bg-[#007368]/50 w-full border-none">
              다시 테스트하기
            </Button>

            <Button variant="outline" onClick={handleShare} className="flex items-center gap-2 w-full border-none">
              <Share2 className="w-4 h-4" />
              결과 공유하기
            </Button>
            <p className="mt-8 p-4 bg-lime-50 rounded-lg border border-lime-400 px-3 text-xs text-lime-800 text-center">
              이 테스트는 전문적인 진단을 대체할 수 없습니다. <br />
              심각한 증상이 지속되면 정신건강 전문가와 상담하시기 바랍니다.
            </p>
          </motion.div>
        </motion.div>

        {/* Actions */}

        {/* Disclaimer */}
      </div>
    </div>
  );
}
