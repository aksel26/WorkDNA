import { motion } from "framer-motion";
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
  };
  floatingIcon2?: {
    src: string;
    alt: string;
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
}: FeatureCarouselItemProps) {
  return (
    <div className="bg-transparent flex flex-col h-full">
      <div className="h-[400px] flex items-center justify-center mb-4 relative">
        <img
          src={imageSrc}
          alt={imageAlt}
          className={`${imageWidth} ${imageHeight} object-contain`}
        />
        {floatingIcon && (
          <FloatingIcon
            src={floatingIcon.src}
            alt={floatingIcon.alt}
            className="top-8 right-3 w-24 h-24"
            delay={0.5}
          />
        )}
        {floatingIcon2 && (
          <FloatingIcon
            src={floatingIcon2.src}
            alt={floatingIcon2.alt}
            className="top-8 left-12 w-14 h-14"
            delay={1}
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
