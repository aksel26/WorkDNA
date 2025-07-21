import { useEffect, useRef } from "react";
import splashVideo from "../assets/video/bgg.mp4";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      onComplete();
    };

    const handleVideoError = () => {
      console.error("Video failed to load, skipping splash screen");
      onComplete();
    };

    video.addEventListener("ended", handleVideoEnd);
    video.addEventListener("error", handleVideoError);

    video.play().catch((error) => {
      console.error("Video playback failed:", error);
      onComplete();
    });

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
      video.removeEventListener("error", handleVideoError);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <video ref={videoRef} className="w-1/2  object-cover" muted playsInline autoPlay src={splashVideo} />
    </div>
  );
}
