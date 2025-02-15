import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dreammoaLogo from "../../assets/logo/dreammoa.png";

const StarryBackground = () => (
  // 빛나는 밤하늘 배경 - footer에서 가져옴
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(100)].map((_, i) => (
      <div
        key={i}
        className="absolute bg-white/70 rounded-full animate-pulse"
        style={{
          width: `${Math.random() * 3}px`,
          height: `${Math.random() * 3}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      />
    ))}
  </div>
);

const SplashScreen = ({ onComplete, setFinalHours, forceComplete }) => {
  // 애니메이션 상태 관리
  const [count, setCount] = useState(0);
  const [animationStep, setAnimationStep] = useState(1); // 1: 숫자, 2: 텍스트, 3: 로고
  const [isCountingDone, setIsCountingDone] = useState(false);
  const animationDuration = 4;

  // body scroll 제어
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);


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
      }, 1500);

      // 텍스트 -> 로고 전환
      const logoTimer = setTimeout(() => {
        setAnimationStep(3);
      }, 3000);

      // 전체 완료
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 5000);

      return () => {
        clearTimeout(textTimer);
        clearTimeout(logoTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isCountingDone, onComplete]);

  // 로고 깜빡임 효과
  const logoAnimation = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: [0, 1, 0.5, 1, 0.5, 1, 0],  // 여러 번 깜빡이는 효과
      scale: [0.8, 1, 0.95, 1, 0.95, 1, 1.1]
    },
    transition: { 
      duration: 2,
      times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],  // 각 단계별 타이밍
      ease: "easeInOut"
    }
  };

  return (
    <motion.div
    // 베경 덜 어두우면 bg-[#001524]로 바꾸기
      className="fixed inset-0 bg-my-blue-1 flex items-center justify-center z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0, ease: "easeInOut" }}  //easeOut -> easeInOut (더 부드러움)
    >
      <StarryBackground />
      
      <AnimatePresence mode="wait">
        {animationStep === 1 && (
          <motion.div
            key="counter"
            className="text-white text-9xl font-bold"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            {Math.floor(count).toLocaleString()}
          </motion.div>
        )}

        {animationStep === 2 && (
          <motion.div
            key="text"
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-white text-4xl mb-2 font-medium">꿈을 모으다</div>
            <div className="text-white text-7xl font-extrabold tracking-wider">DREAMMOA</div>
          </motion.div>
        )}

        {animationStep === 3 && (
          <motion.img
            key="logo"
            src={dreammoaLogo}
            alt="DreamMoa Logo"
            className="w-96 h-auto"
            {...logoAnimation}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SplashScreen;