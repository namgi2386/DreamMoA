import { motion } from 'framer-motion';
import { useState } from 'react';

const itemVariants = {
  initial: { 
    opacity: 0,
    x: 0,
    y: 0,
    scale: 0.3  // 시작할 때 작은 크기로
  },
  animate: (initialPosition) => ({
    opacity: 1,
    scale: 1,   // 원래 크기로 돌아옴
    x: initialPosition.x + '%',
    y: initialPosition.y + '%',
    transition: {
      duration: 0.8,     // 애니메이션 시간 조정
      opacity: {         // opacity만 따로 설정
        duration: 0.4    // opacity는 좀 더 빠르게
      },
      scale: {          // scale만 따로 설정
        type: "spring",  // 스프링 효과 적용
        stiffness: 50    // 탄성 강도
      }
    }
  })
};

export default function HomeCommunityItem({ item, initialPosition, maxZ, setMaxZ }) {
  const [zIndex, setZIndex] = useState(1);
  const handleDragStart = () => {
    const newZ = maxZ + 1;
    setMaxZ(newZ);
    setZIndex(newZ);
  };
  return (
    <motion.div
      className={`absolute w-60 p-4 rounded-lg shadow-lg cursor-move ${item.bg} min-h-[200px]`}
      style={{ 
        left: '35%',
        top: '35%',
        transform: 'translate(-50%, -50%)',  // 이 부분 추가
        zIndex: zIndex
      }}
      variants={itemVariants}
      initial="initial"
      animate="animate"
      custom={initialPosition}
      drag
      dragConstraints={{
        left: -200,
        right: 200,
        top: -200,
        bottom: 200,
      }}
      onDragStart={handleDragStart}
      dragElastic={0.1}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`flex flex-col gap-3 `}>
        <p className={`${item.textsize} text-gray-600`}>{item.content}</p>
        <div className='flex  space-x-3 items-center'>
          <img 
            src={item.avatarUrl} 
            alt={item.author}
            className="w-8 h-8 rounded-full"
          />
          {/* <p>{item.avatarUrl}</p> */}
          <p className="font-medium text-sm ">{item.author}</p>
        </div>
      </div>
    </motion.div>
  );
}