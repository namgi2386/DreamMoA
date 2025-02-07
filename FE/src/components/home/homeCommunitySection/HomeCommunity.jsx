import { useState, useEffect } from 'react'; // useEffect 추가
import { motion } from 'framer-motion';
import { communityItems } from './HomeCommunityItemDummyData';  
import HomeCommunityItem from './HomeCommunityItems';

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

export default function HomeCommunity() {
  // 보여줄 아이템 배열 상태
  const [displayedItems, setDisplayedItems] = useState([]);
  const [maxZ, setMaxZ] = useState(0);
  const [myNumber, setCount] = useState(0);
  const targetNumber = 10;
  
  useEffect(() => {
    const duration = 3000; // 3초
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = duration / frameDuration;
    const increment = targetNumber / totalFrames;
    // const increment = 100;

    let currentFrame = 0;
    
    const timer = setInterval(() => {
      currentFrame++;
      setCount(prev => {
        if (currentFrame === totalFrames) {
          clearInterval(timer);
          return targetNumber;
        }
        return Math.min(Math.round(increment * currentFrame), targetNumber);
      });
    }, frameDuration);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // 각 아이템을 0.5초 간격으로 추가
    communityItems.forEach((item, index) => {
      setTimeout(() => {
        setDisplayedItems(prev => [...prev, item]);
      }, 300 * index); // 각 카드는 0.5초 간격으로 나타남
    });
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  return (
    <div className="flex justify-center my-6">
      <div className="relative w-full max-w-[1400px] min-h-[600px] bg-emerald-500 rounded-lg p-8 overflow-hidden">
        <h2 className="text-white text-4xl font-bold mb-8 cursor-default select-none">
          Trusted by {myNumber.toLocaleString()}+ creatives
        </h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {displayedItems.map((item) => ( // items 대신 displayedItems 사용
            <HomeCommunityItem 
              key={item.id}
              item={item}
              initialPosition={item.initialPosition}
              maxZ={maxZ}
              setMaxZ={setMaxZ}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}