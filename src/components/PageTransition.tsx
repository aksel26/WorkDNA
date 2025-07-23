import { motion } from "framer-motion";
import React from "react";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "fade";
}

const getVariants = (direction: string) => {
  const variants = {
    up: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -50 }
    },
    down: {
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 50 }
    },
    left: {
      initial: { opacity: 0, x: 100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -100 }
    },
    right: {
      initial: { opacity: 0, x: -100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 100 }
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    }
  };

  return variants[direction as keyof typeof variants] || variants.fade;
};

export const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className = "", 
  direction = "fade" 
}) => {
  const variants = getVariants(direction);

  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1], // Custom easing for smooth feel
      }}
    >
      {children}
    </motion.div>
  );
};

// Higher-order component for wrapping page components
export const withPageTransition = (
  Component: React.ComponentType<any>,
  direction: "up" | "down" | "left" | "right" | "fade" = "fade"
) => {
  return (props: any) => (
    <PageTransition direction={direction}>
      <Component {...props} />
    </PageTransition>
  );
};