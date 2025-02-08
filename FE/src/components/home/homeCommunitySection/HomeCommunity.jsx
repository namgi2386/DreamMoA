import { useState, useEffect, useRef  } from 'react'; // useEffect 추가
import { motion, useInView  } from 'framer-motion';
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
  const targetNumber = 1000;
  // 30% 뷰포트 상태일때 모션 시작
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true, // 여러번 트리거 허용
    amount: 0.3  // 30% 이상 보일 때 트리거
  });
  
  useEffect(() => {
    if (isInView) {
      // 애니메이션 설정값
      const duration = 3000;      // 총 애니메이션 시간 (3초)
      const frameDuration = 1000 / 60;  // 60fps 기준 프레임당 시간
      const totalFrames = duration / frameDuration;  // 총 프레임 수 계산
      const increment = targetNumber / totalFrames;  // 프레임당 증가값
      
      let currentFrame = 0;
      
      // 숫자 증가 애니메이션 시작
      const timer = setInterval(() => {
        currentFrame++;
        setCount(prev => {
          // 마지막 프레임에서 타이머 정지
          if (currentFrame === totalFrames) {
            clearInterval(timer);
            return targetNumber;
          }
          // 현재 프레임에 해당하는 숫자 계산
          return Math.min(Math.round(increment * currentFrame), targetNumber);
        });
      }, frameDuration);
      // 컴포넌트 언마운트 시 타이머 정리
      return () => clearInterval(timer);
    } else {
      // 뷰포트 밖으로 나가면 카운트 초기화
      setCount(0);
    }
   }, [isInView]); // isInView 상태 변경 시 재실행

  useEffect(() => {
    // isInView : 뷰포트 30% 상태일때 실행
    if (isInView) {
      // 각 아이템을 0.5초 간격으로 추가
      communityItems.forEach((item, index) => {
        setTimeout(() => {
          setDisplayedItems(prev => [...prev, item]);
        }, 300 * index); // 각 카드는 0.5초 간격으로 나타남
      });
    } else {
      setDisplayedItems([]);
    }
  }, [isInView]);

  return (
    <div className="flex justify-center my-6">
      <div className="relative w-full max-w-[1400px] min-h-[600px] bg-emerald-500 rounded-lg p-8 overflow-hidden">
        <h2 className="text-white text-4xl font-bold mb-8 cursor-default select-none">
          Trusted by {myNumber.toLocaleString()}+ creatives
        </h2>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
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