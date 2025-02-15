import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dreammoaLogo from "../../assets/logo/dreammoa.png";

const stars = [...Array(100)].map(() => ({
  width: 1 + Math.random() * 2,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 5,
}));

const StarryBackground = () => (
  // 별이 빛나는 밤하늘 배경 (완전 고정)
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {stars.map((star, i) => (
      <div
        key={i}
        className="absolute bg-white/70 rounded-full animate-twinkle"
        style={{
          width: `${star.width}px`,
          height: `${star.width}px`,
          left: `${star.left}%`,
          top: `${star.top}%`,
          animationDelay: `${star.delay}s`,
        }}
      />
    ))}
  </div>
);

const SplashScreen = ({ onComplete, setFinalHours, forceComplete }) => {
  const [count, setCount] = useState(0);
  const [animationStep, setAnimationStep] = useState(1); // 1: 숫자, 2: 텍스트, 3: 로고
  const [isCountingDone, setIsCountingDone] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
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
      }, 2000);

      // 텍스트 -> 로고 전환
      const logoTimer = setTimeout(() => {
        setAnimationStep(3);
      }, 3500);

      // 전체 완료 전에 페이드아웃 시작
      const startExitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 5000);

      // 페이드아웃 완료 후 onComplete 호출
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 6000);

      return () => {
        clearTimeout(textTimer);
        clearTimeout(logoTimer);
        clearTimeout(startExitTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isCountingDone, onComplete]);

  // 로고 깜빡임 효과
  const logoAnimation = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 1, 0.3, 1, 0.3, 1],
    },
    exit: { opacity: 0 },
    transition: {
      duration: 1.2,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
      ease: "easeInOut",
    },
  };

  return (
    <motion.div
      // 밤하늘 베경 더 어둡게 하려면 bg-[#001524]로 바꾸기
      className="fixed inset-0 bg-my-blue-1 flex items-center justify-center z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0, ease: "easeInOut" }} //easeOut -> easeInOut (더 부드러움)
    >
      <StarryBackground />

      <AnimatePresence mode="wait">
        {animationStep === 1 && (
          <motion.div
            key="counter"
            className="text-white text-9xl font-bold z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {Math.floor(count).toLocaleString()}
          </motion.div>
        )}

        {animationStep === 2 && (
          <motion.div
            key="text"
            className="text-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-white text-4xl mb-2 font-medium">
              꿈을 모으다
            </div>
            <div className="text-white text-7xl font-extrabold tracking-wider">
              DREAMMOA
            </div>
          </motion.div>
        )}

        {animationStep === 3 && (
          <motion.img
            key="logo"
            src={dreammoaLogo}
            alt="DreamMoa Logo"
            className="w-96 h-auto z-10"
            {...logoAnimation}
            style={{ opacity: isExiting ? 0 : undefined }}
            transition={{
              ...logoAnimation.transition,
              opacity: { duration: 1.0, ease: "easeInOut" },
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// 별 반짝임을 위한 커스텀 애니메이션
const styles = `
  @keyframes twinkle {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  .animate-twinkle {
    animation: twinkle 3s infinite;
  }
`;

// 스타일 태그 추가
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default SplashScreen;
