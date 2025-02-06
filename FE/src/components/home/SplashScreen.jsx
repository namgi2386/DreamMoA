import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTotalStudyTime } from '../../services/api/studyTimeApi';

const SplashScreen = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [targetHours, setTargetHours] = useState(0);
  const [showFinalText, setShowFinalText] = useState(false);
  const animationDuration = 2; // 카운터 애니메이션 시간(초)

  useEffect(() => {
    const fetchAndSetupAnimation = async () => {
      try {
        /////////////////
        // 백 구현되면 이거 주석 해제!!!!!!!!!!!!
        // const totalMinutes = await getTotalStudyTime();
        const totalMinutes = 1500; // 임시 값
        const hours = Math.floor(totalMinutes / 60); // 분을 시간으로 변환
        setTargetHours(hours);
        
        // 카운터 애니메이션
        const step = (hours / (animationDuration * 60));
        const interval = setInterval(() => {
          setCount(prev => {
            if (prev >= hours) {
              clearInterval(interval);
              setTimeout(() => setShowFinalText(true), 500);
              return hours;
            }
            return prev + step;
          });
        }, 1000 / 60);

        return () => clearInterval(interval);
      } catch (error) {
        console.error('Failed to setup animation:', error);
        onComplete?.(); // 에러 시 메인 페이지로 이동
      }
    };

    fetchAndSetupAnimation();
  }, [onComplete]);

  useEffect(() => {
    if (showFinalText) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showFinalText, onComplete]);

  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <AnimatePresence>
        {!showFinalText ? (
          <motion.div
            key="counter"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, y: -100, opacity: 0 }}
            className="text-white text-8xl font-bold"
          >
            {Math.floor(count).toLocaleString()}
          </motion.div>
        ) : (
          <motion.div
            key="final-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white text-2xl text-center"
          >
            <p>dreammoa가 꿈꿔온 시간</p>
            <p className="text-4xl font-bold mt-2">
              {targetHours.toLocaleString()}시간
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SplashScreen;