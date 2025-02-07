// src/components/home/SplashScreen.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getTotalStudyTime } from "../../services/api/studyTimeApi";

const SplashScreen = ({ onComplete, setFinalHours, forceComplete }) => {
  const [count, setCount] = useState(0);
  const [targetHours, setTargetHours] = useState(0);
  const [isCountingDone, setIsCountingDone] = useState(false);
  const [showFadeOut, setShowFadeOut] = useState(false);
  const animationDuration = 6;

  useEffect(() => {
    if (forceComplete && !isCountingDone) {
      setIsCountingDone(true);
    }
  }, [forceComplete, isCountingDone]);

  useEffect(() => {
    const fetchAndSetupAnimation = async () => {
      try {
        // 백 구현되면 이거 주석 해제!!!!!!!!!!!!
        // const totalMinutes = await getTotalStudyTime();
        const totalMinutes = 150000; // 임시 값
        const hours = Math.floor(totalMinutes / 60);
        setTargetHours(hours);
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

  useEffect(() => {
    if (isCountingDone) {
      // 카운팅 완료 후 1초 대기
      const holdTimer = setTimeout(() => {
        setShowFadeOut(true);
      }, 1000);

      // fadeOut 시작 후 2초 뒤에 완료
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 3000); // 1초 대기 + 2초 페이드아웃

      return () => {
        clearTimeout(holdTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isCountingDone, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-[#003458] flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={showFadeOut ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 2.0, ease: "easeOut" }}
    >
      <motion.div
        className="text-white text-8xl font-bold"
        initial={{ opacity: 1 }}
        animate={showFadeOut ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 2.0, ease: "easeOut" }}
      >
        {Math.floor(count).toLocaleString()}
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
