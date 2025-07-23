import React from "react";
import { motion } from "framer-motion";
import loadingVideo from "../assets/video/loading.mp4";

export const TestLoading: React.FC = () => {
  return (
    <div className="bg-main h-dvh flex items-center justify-center">
      <div className="text-center space-y-8">
        <motion.h2 className="text-xl font-bold text-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          결과를 분석하고 있어요.
        </motion.h2>
        <div className=" w-[200px]  overflow-hidden rounded-[190px] ">
          <video src={loadingVideo} autoPlay loop muted playsInline preload="auto" className=" mx-auto object-contain " />
        </div>
        <motion.p className="text-gold-300" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
          잠시만 기다려주세요.
        </motion.p>
      </div>
    </div>
  );
};
