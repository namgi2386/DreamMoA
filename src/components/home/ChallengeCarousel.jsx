import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import ChallengeCard from './ChallengeCard';
import '../../assets/styles/scrollbar-hide.css';
import { mockApiResponse } from '../../utils/mockData';
import axios from 'axios';

const ChallengeCarousel = () => {
  const [challenges, setChallenges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentX, setCurrentX] = useState(0);  // 현재 x 위치 추적
  const carouselRef = useRef(null);
  const controls = useAnimation();

  const startCarouselAnimation = useCallback(() => {
    controls.start({
      x: [currentX, currentX - 1000],  // 현재 위치에서 시작
      transition: {
        duration: 20, // 애니메이션 시간
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop"
      }
    });
  }, [controls, currentX]);

  useEffect(() => {
    if (!isHovered) {
      startCarouselAnimation();
    } else {
      // 호버 시 현재 위치 저장!
      controls.stop();
      // 현재 위치를 가져오기 위해 DOM 요소의 transform 값을 사용
      if (carouselRef.current) {
        const transform = window.getComputedStyle(carouselRef.current).transform;
        const matrix = new DOMMatrix(transform);
        setCurrentX(matrix.m41); // transform matrix의 x 위치 값
      }
    }
  }, [isHovered, startCarouselAnimation, controls]);

  const handleHover = useCallback((hovering) => {
    setIsHovered(hovering);
  }, []);

  const fetchChallenges = useCallback(async (page) => {
    try {
      setIsLoading(true);

      // 백에서 API 구현되면 주석 풀기!!!!!
      // const response = await axios.get(`/api/rooms?page=${page}`);
      const response = { data: mockApiResponse(page, 10)};

      // 마감임박(참여자 60%이상 찼거나 D-3 이하) 챌린지 필터링
      const filteredChallenges = response.data.data.filter(challenge => {
        const participationRate = challenge.currentParticipants / challenge.maxParticipants;
        const daysUntilStart = calculateDday(challenge.startDate);
        return participationRate >= 0.6 || daysUntilStart <= 3;
      });

      setChallenges(prev => [...prev, ...filteredChallenges]);
      setCurrentPage(page);
    } catch (error) {
      console.error('Failed to fetch challenges:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);  // 의존성 없는 경우 빈 배열로 전달

  const calculateDday = (startDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const diffTime = start.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      
      // 스크롤이 끝에 도달했는지 확인
      if (scrollLeft + clientWidth >= scrollWidth - 100 && !isLoading) {
        fetchChallenges(currentPage + 1);
      }
    }
  };

  useEffect(() => {
    fetchChallenges(1);
  }, [fetchChallenges]);  // 의존성 있는 경우 해당 변수(fetchChallenges) 전달


  return (
    <div className="w-full overflow-hidden">
      <motion.div 
        ref={carouselRef}
        className="flex gap-4 py-4"
        animate={controls}
      >
        {challenges.map((challenge, index) => (
          <motion.div 
            key={`${challenge.challengeId}-${index}`}
            className="flex-none w-72 sm:w-80 md:w-96"
          >
            <ChallengeCard 
              challenge={challenge} 
              index={index}
              onHover={handleHover}
            />
          </motion.div>
        ))}
        
        {/* 무한 스크롤을 위해 처음 요소들을 복제 */}
        {challenges.map((challenge, index) => (
          <motion.div 
            key={`clone-${challenge.challengeId}-${index}`}
            className="flex-none w-72 sm:w-80 md:w-96"
          >
            <ChallengeCard 
              challenge={challenge} 
              index={index}
              onHover={handleHover}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ChallengeCarousel;