import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

export interface CardStackItem {
  id: number;
  content: React.ReactNode;
}

interface CardStackProps {
  items: CardStackItem[];
  currentIndex: number;
  className?: string;
}

export const CardStack: React.FC<CardStackProps> = ({ items, currentIndex, className }) => {
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const prevIndexRef = useRef(currentIndex);

  useEffect(() => {
    if (prevIndexRef.current !== currentIndex) {
      setDirection(currentIndex > prevIndexRef.current ? "next" : "previous");
      prevIndexRef.current = currentIndex;
    }
  }, [currentIndex]);

  const variants = {
    enter: (direction: "next" | "previous") => ({
      x: direction === "next" ? 300 : -300,
      opacity: 0,
      rotateY: direction === "next" ? 90 : -90,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
    },
    exit: (direction: "next" | "previous") => ({
      zIndex: 0,
      x: direction === "next" ? -300 : 300,
      opacity: 0,
      rotateY: direction === "next" ? -90 : 90,
      scale: 0.8,
    }),
  };

  const currentItem = items[currentIndex];

  return (
    <div className={cn("relative w-full h-full", className)}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentItem.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
            rotateY: { duration: 0.4, ease: "easeInOut" },
            scale: { duration: 0.3 },
          }}
          onAnimationStart={() => {}}
          onAnimationComplete={() => {}}
          className="absolute inset-0 w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          <div className="w-full h-full">{currentItem.content}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
