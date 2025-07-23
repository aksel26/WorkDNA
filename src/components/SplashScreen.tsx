import { useEffect, useRef } from "react";
import splashGif from "../assets/video/splash2.gif";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleImageLoad = () => {
      // GIF duration is approximately 3 seconds
      setTimeout(() => {
        onComplete();
      }, 3000);
    };

    const handleImageError = () => {
      console.error("GIF failed to load, skipping splash screen");
      onComplete();
    };

    if (img.complete) {
      handleImageLoad();
    } else {
      img.addEventListener("load", handleImageLoad);
      img.addEventListener("error", handleImageError);
    }

    return () => {
      img.removeEventListener("load", handleImageLoad);
      img.removeEventListener("error", handleImageError);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-[90%] sm:max-w-xl mx-auto">
      <div className="overflow-hidden w-full">
        <img src={splashGif} alt="splash" className="object-contain scale-150" ref={imgRef} />
      </div>
    </div>
  );
}
