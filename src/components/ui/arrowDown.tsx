import { motion } from "motion/react";

interface ChevronDownProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
}

const ChevronDown = ({ width = 28, height = 28, strokeWidth = 2, stroke = "#ffffff", ...props }: ChevronDownProps) => {
  return (
    <div
      style={{
        userSelect: "none",
        padding: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <motion.path
          d="m6 9 6 6 6-6"
          stroke={"#c49653"}
          animate={{
            y: [0, 4, 0],
            opacity: [1, 0.3, 1],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      </svg>
    </div>
  );
};

export { ChevronDown };
