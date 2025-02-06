import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTotalStudyTime } from '../../services/api/studyTimeApi';

const SplashScreen = ({ onComplete, setFinalHours }) => {
  const [count, setCount] = useState(0);
  const [targetHours, setTargetHours] = useState(0);
  const [showFinalText, setShowFinalText] = useState(false);
  const [isCountingDone, setIsCountingDone] = useState(false);
  const animationDuration = 8; // 카운터 애니메이션 시간(초)

  useEffect(() => {
    const fetchAndSetupAnimation = async () => {
      try {
        /////////////////
        // 백 구현되면 이거 주석 해제!!!!!!!!!!!!
        // const totalMinutes = await getTotalStudyTime();
        const totalMinutes = 150000; // 임시 값
        const hours = Math.floor(totalMinutes / 60); // 분을 시간으로
        setTargetHours(hours);
        
        // 카운터 애니메이션
        const step = (hours / (animationDuration * 60));
        const interval = setInterval(() => {
          setCount(prev => {
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
        console.error('Failed to setup animation:', error);
        onComplete(); // 에러 시 메인 페이지로 이동
      }
    };

    fetchAndSetupAnimation();
  }, [onComplete, setTargetHours]);

  useEffect(() => {
    if (isCountingDone) {
      setFinalHours(targetHours); // 최종 시간 -> 상위 컴포넌트
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isCountingDone, onComplete, setFinalHours, targetHours]);

  return (
    <motion.div
      className="fixed inset-0 bg-[#003458] flex items-center justify-center z-50"
      animate={isCountingDone ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="text-white text-8xl font-bold"
        animate={
          isCountingDone
            ? {
                scale: [1, 0.5],
                y: [0, 20], // MainHero의 텍스트 위치로 이동
                x: [0, -50], // MainHero의 텍스트 위치로 이동
                color: '#F9F871'
              }
            : {
                scale: 1,
                y: 0,
                x: 0
              }
        }
        transition={{
          duration: 1,
          ease: "easeInOut"
        }}
      >
        {Math.floor(count).toLocaleString()}
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;