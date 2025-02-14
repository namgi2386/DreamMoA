import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import ChallengeCard from "./ChallengeCard";
import "../../../assets/styles/scrollbar-hide.css";
import { homeApi } from "../../../services/api/homeApi";
// import { mockApiResponse } from '../../../utils/mockData';

const ChallengeCarousel = () => {
  const [challenges, setChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const carouselRef = useRef(null);
  const controls = useAnimation();

  // 애니메이션 로직
  const startCarouselAnimation = useCallback(() => {
    if (!carouselRef.current) return;

    // 카드 하나의 너비 계산 (마진 포함)
    const cardWidth = carouselRef.current.children[0].offsetWidth - 20; // gap-3 = 12px
    // 전체 이동 거리 계산 (카드 개수 * 카드 너비)
    const totalWidth = cardWidth * challenges.length;

    controls.start({
      x: [0, -totalWidth],
      transition: {
        duration: 30, // 고정된 duration 값 (초 단위)
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
        type: "tween",
        restSpeed: 0.5,
        repeatDelay: 0,
      },
    });
  }, [controls, challenges.length]);

  // 챌린지 데이터가 로드되거나 화면 크기가 변경될 때 애니메이션 재시작
  useEffect(() => {
    if (challenges.length > 0) {
      startCarouselAnimation();
    }

    // 화면 크기 변경 시 애니메이션 재시작
    const handleResize = () => {
      startCarouselAnimation();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [startCarouselAnimation, challenges]);

  // fetchChallenges 함수는 동일
  const fetchChallenges = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await homeApi.getEndingSoonChallenges();
      if (Array.isArray(response)) {
        setChallenges(response);
      } else {
        console.error("Expected array of challenges, got:", response);
        setChallenges([]);
      }
    } catch (error) {
      console.error("Failed to fetch challenges:", error);
      setChallenges([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (challenges.length === 0) {
    return <div>No challenges available</div>;
  }

  return (
    <div className="w-full overflow-hidden">
      <motion.div
        ref={carouselRef}
        className="flex -ml-5"
        animate={controls}
        style={{
          willChange: "transform", // 성능 최적화
          WebkitBackfaceVisibility: "hidden", // Safari 성능 최적화
          backfaceVisibility: "hidden",
          WebkitPerspective: 1000,
          perspective: 1000,
          WebkitTransform: "translateZ(0)",
          transform: "translateZ(0)",
          pointerEvents: 'none',
        }}
      >
        {/* 더 부드러운 움직임을 위해 카드 개수 3배로 증가 */}
        {[...Array(3)].map((_, arrayIndex) =>
          challenges.map((challenge, index) => (
            <motion.div
              key={`${challenge.challengeId}-${index}-${arrayIndex}`}
              className="flex-none w-56 sm:w-60 md:w-64 -mr-5"
              style={{
                WebkitBackfaceVisibility: "hidden",
                backfaceVisibility: "hidden",
                pointerEvents: 'auto',
              }}
            >
              <ChallengeCard challenge={challenge} index={index} />
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default ChallengeCarousel;
