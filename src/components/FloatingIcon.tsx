import { motion } from "framer-motion";

interface FloatingIconProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}

export function FloatingIcon({ src, alt, className = "", delay = 0.5 }: FloatingIconProps) {
  const floatingDelay = delay + 0.3;
  
  return (
    <motion.img
      key={`${src}-${delay}-${Date.now()}`} // 컴포넌트가 다시 마운트될 때마다 애니메이션 재시작
      src={src}
      alt={alt}
      className={`absolute ${className}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        scale: { duration: 0.3, delay, ease: "backOut" },
        opacity: { duration: 0.2, delay },
        y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: floatingDelay },
        rotate: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: floatingDelay },
      }}
    />
  );
}