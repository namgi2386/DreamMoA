import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import ChallengeCard from './ChallengeCard';
import '../../../assets/styles/scrollbar-hide.css';
import { mockApiResponse } from '../../../utils/mockData';

const ChallengeCarousel = () => {
  const [challenges, setChallenges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // const [currentX, setCurrentX] = useState(0);  // 현재 x 위치 추적
  const carouselRef = useRef(null);
  const controls = useAnimation();

  const startCarouselAnimation = useCallback(() => {
    controls.start({
      // x: [currentX, currentX - 1000],  // 현재 위치에서 시작
      x: [0, -1000],
      transition: {
        duration: 20, // 애니메이션 시간
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop"
      }
    });
  }, [controls]);

  useEffect(() => {
    startCarouselAnimation();
  }, [startCarouselAnimation]);

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

  useEffect(() => {
    fetchChallenges(1);
  }, [fetchChallenges]);  // 의존성 있는 경우 해당 변수(fetchChallenges) 전달


  return (
    <div className="w-full overflow-hidden">
      <motion.div 
        ref={carouselRef}
        className="flex gap-3 py-4"  // 카드 간격
        animate={controls}
      >
        {challenges.map((challenge, index) => (
          <motion.div 
            key={`${challenge.challengeId}-${index}`}
            // className="flex-none w-72 sm:w-80 md:w-96"
            className="flex-none w-56 sm:w-60 md:w-64"  // 카드 축소
          >
            <ChallengeCard 
              challenge={challenge} 
              index={index}
            />
          </motion.div>
        ))}
        
        {/* 무한 스크롤을 위해 처음 요소들을 복제 */}
        {challenges.map((challenge, index) => (
          <motion.div 
            key={`clone-${challenge.challengeId}-${index}`}
            // className="flex-none w-72 sm:w-80 md:w-96"
            className="flex-none w-56 sm:w-60 md:w-64" // 카드 축소
          >
            <ChallengeCard 
              challenge={challenge} 
              index={index}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ChallengeCarousel;