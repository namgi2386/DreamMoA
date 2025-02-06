// src/components/home/SplashScreen.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getTotalStudyTime } from "../../services/api/studyTimeApi";

const SplashScreen = ({ onComplete, setFinalHours, forceComplete }) => {
  const [count, setCount] = useState(0);
  const [targetHours, setTargetHours] = useState(0);
  const [isCountingDone, setIsCountingDone] = useState(false);
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
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isCountingDone, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-[#003458] flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={isCountingDone ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.div
        className="text-white text-8xl font-bold"
        initial={{ opacity: 1 }}
        animate={isCountingDone ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {Math.floor(count).toLocaleString()}
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
