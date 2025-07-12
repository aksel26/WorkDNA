import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FloatingIcon } from "./FloatingIcon";

interface FeatureCarouselItemProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  titleColor?: string;
  imageWidth?: string;
  imageHeight?: string;
  floatingIcon?: {
    src: string;
    alt: string;
    className?: string;
    delay?: number;
  };
  floatingIcon2?: {
    src: string;
    alt: string;
    className?: string;
    delay?: number;
  };
  floatingIcon3?: {
    src: string;
    alt: string;
    className?: string;
    delay?: number;
  };
}

export function FeatureCarouselItem({
  imageSrc,
  imageAlt,
  title,
  description,
  titleColor = "text-gray-800",
  imageWidth = "w-[240px]",
  imageHeight = "h-[340px]",
  floatingIcon,
  floatingIcon2,
  floatingIcon3,
}: FeatureCarouselItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref} className="bg-transparent flex flex-col h-full">
      <div className="h-[400px] flex items-center justify-center mb-4 relative">
        <img
          src={imageSrc}
          alt={imageAlt}
          className={`${imageWidth} ${imageHeight} object-contain`}
        />
        {floatingIcon && isVisible && (
          <FloatingIcon
            src={floatingIcon.src}
            alt={floatingIcon.alt}
            className={floatingIcon.className || "top-12 right-6 w-16 h-16"}
            delay={floatingIcon.delay || 0.5}
          />
        )}
        {floatingIcon2 && isVisible && (
          <FloatingIcon
            src={floatingIcon2.src}
            alt={floatingIcon2.alt}
            className={floatingIcon2.className || "top-12 left-6 w-16 h-16"}
            delay={floatingIcon2.delay || 1.0}
          />
        )}
        {floatingIcon3 && isVisible && (
          <FloatingIcon
            src={floatingIcon3.src}
            alt={floatingIcon3.alt}
            className={floatingIcon3.className || "top-12 left-32 w-16 h-16"}
            delay={floatingIcon3.delay || 1.5}
          />
        )}
      </div>
      <div className="flex-1 flex flex-col justify-center text-center">
        <motion.h3
          className={`text-xl font-bold ${titleColor} mb-2`}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-gray-600 text-sm leading-relaxed"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
}
