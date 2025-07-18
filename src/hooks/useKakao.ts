import { useEffect, useState } from "react";

const useKakao = () => {
  const [isKakaoReady, setIsKakaoReady] = useState(false);

  useEffect(() => {
    // Kakao SDK가 로드되었는지 확인
    if (window.Kakao) {
      const kakaoAppKey = import.meta.env.VITE_KAKAO_APP_KEY;
      if (!kakaoAppKey) {
        console.error("Kakao App Key가 .env 파일에 설정되지 않았습니다.");
        return;
      }

      // Kakao SDK가 이미 초기화되었는지 확인
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(kakaoAppKey);
        console.log("Kakao SDK가 성공적으로 초기화되었습니다.");
      }
      setIsKakaoReady(true);
    }
  }, []);

  return isKakaoReady;
};

export default useKakao;
