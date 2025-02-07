import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getTotalStudyTime } from "../../services/api/studyTimeApi";

const SplashScreen = ({ onComplete, setFinalHours }) => {
  // 애니메이션 상태 관리
  const [count, setCount] = useState(0);
  const [targetHours, setTargetHours] = useState(0);
  const [isCountingDone, setIsCountingDone] = useState(false);
  const [startFadeOut, setStartFadeOut] = useState(false);
  const animationDuration = 6;

  // 카운터 애니메이션 설정 및 실행
  useEffect(() => {
    const fetchAndSetupAnimation = async () => {
      try {
              // 백 구현되면 이거 주석 해제!!!!!!!!!!!!
      // const totalMinutes = await getTotalStudyTime();
        const totalMinutes = 150000;
        const hours = Math.floor(totalMinutes / 60);
        setTargetHours(hours);
        setFinalHours(hours);

        // 부드러운 카운터 애니메이션을 위한 스텝 계산
        const step = hours / (animationDuration * 60);
        const interval = setInterval(() => {
          setCount((prev) => {
            if (prev >= hours) {
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
  }, [onComplete, setFinalHours]);

  useEffect(() => {
    if (isCountingDone) {
      // 숫자가 최종값 된 후 1.5초 동안 유지
      const holdTimer = setTimeout(() => {
        setStartFadeOut(true);
      }, 1500);

      const completeTimer = setTimeout(() => {
        onComplete();
      }, 3500); // 1.5초 유지 + 2초 페이드아웃

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
      animate={startFadeOut ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 2.0, ease: "easeOut" }} // 페이드아웃 시간 2초
    >
      <motion.div
        className="text-white text-8xl font-bold"
        initial={{ opacity: 1 }}
        animate={startFadeOut ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 2.0, ease: "easeOut" }} // 페이드아웃 시간 2초
      >
        {Math.floor(count).toLocaleString()}
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
