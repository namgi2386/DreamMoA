import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import ChallengeCard from './ChallengeCard';
import axios from 'axios';

const ChallengeCarousel = () => {
  const [challenges, setChallenges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const carouselRef = useRef(null);

  const fetchChallenges = useCallback(async (page) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/rooms?page=${page}`);
      
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
    <div className="w-full">
      <div 
        ref={carouselRef}
        className="flex overflow-x-auto scrollbar-hide gap-4 py-4"
        onScroll={handleScroll}
        style={{ scrollBehavior: 'smooth' }}
      >
        {challenges.map((challenge, index) => (
          <motion.div 
            key={`${challenge.challengeId}-${index}`}
            className="flex-none w-72 sm:w-80 md:w-96"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ChallengeCard challenge={challenge} />
          </motion.div>
        ))}
        
        {isLoading && (
          <div className="flex-none w-72 sm:w-80 md:w-96 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeCarousel;