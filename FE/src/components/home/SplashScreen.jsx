import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dreammoaLogo from "../../assets/logo/dreammoa.png";

const SplashScreen = ({ onComplete, setFinalHours, forceComplete }) => {
  // 애니메이션 상태 관리
  const [count, setCount] = useState(0);
  const [animationStep, setAnimationStep] = useState(1); // 1: 숫자, 2: 텍스트, 3: 로고
  const [isCountingDone, setIsCountingDone] = useState(false);
  const animationDuration = 6;

  // body scroll 제어
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // forceComplete 처리
  useEffect(() => {
    if (forceComplete && !isCountingDone) {
      setIsCountingDone(true);
    }
  }, [forceComplete, isCountingDone]);

  // 메인 애니메이션 로직
  useEffect(() => {
    const fetchAndSetupAnimation = async () => {
      try {
        // 백엔드 구현 후 실제 데이터로 변경
        const totalMinutes = 150000; // 임시 값
        const hours = Math.floor(totalMinutes / 60);
        setFinalHours(hours);

        // 카운터 애니메이션
        const step = hours / (animationDuration * 60);
        const interval = setInterval(() => {
          setCount((prev) => {
            if (prev >= hours || forceComplete) {
              clearInterval(interval);
              setIsCountingDone(true);
              return hours;
            }
            return prev + step;
          });
        }, 1000 / 60);
        return () => clearInterval(interval);
      } catch (error) {
        console.error("Failed to setup animation:", error);
        onComplete();
      }
    };

    fetchAndSetupAnimation();
  }, [onComplete, setFinalHours, forceComplete]);

  // 단계별 애니메이션 전환
  useEffect(() => {
    if (isCountingDone) {
      // 숫자 -> 텍스트 전환
      const textTimer = setTimeout(() => {
        setAnimationStep(2);
      }, 2000);

      // 텍스트 -> 로고 전환
      const logoTimer = setTimeout(() => {
        setAnimationStep(3);
      }, 3000);

      // 전체 완료
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 6000);

      return () => {
        clearTimeout(textTimer);
        clearTimeout(logoTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isCountingDone, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-[#003458] flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: animationStep === 3 ? 0 : 1 }}
      transition={{ duration: 2.0, ease: "easeOut", delay: animationStep === 3 ? 2 : 0 }}
    >
      <AnimatePresence mode="wait">
        {/* 숫자 카운트 애니메이션 */}
        {animationStep === 1 && (
          <motion.div
            key="counter"
            className="text-white text-9xl font-bold" // 크기 증가
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            {Math.floor(count).toLocaleString()}
          </motion.div>
        )}

        {/* DREAMMOA 텍스트 애니메이션 */}
        {animationStep === 2 && (
          <motion.div
            key="text"
            className="text-white text-9xl font-extrabold tracking-wider" // 크기 및 폰트 굵기 증가
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            DREAMMOA
          </motion.div>
        )}

        {/* 로고 애니메이션 */}
        {animationStep === 3 && (
          <motion.img
            key="logo"
            src={dreammoaLogo}
            alt="DreamMoa Logo"
            className="w-96 h-auto" // 로고 크기 조정
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SplashScreen;