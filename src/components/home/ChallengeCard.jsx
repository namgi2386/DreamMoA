import { motion } from 'framer-motion';
import { useMemo } from 'react';
import defaultImage from '../../assets/default/defaultChallengePicture.png';

const ChallengeCard = ({ challenge, index, onHover }) => {
  // 카드마다 다른 기울기 값을 생성 (-3도 ~ 3도 사이)
  const randomRotation = useMemo(() => {
    return Math.random() * 6 - 3;
    }, []);

  // 참여자 수 진행률 계산
  const calculateProgress = () => {
    return (challenge.currentParticipants / challenge.maxParticipants) * 100;
  };

  // 챌린지 시작일까지 남은 D-Day 계산
  const calculateDday = (startDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const diffTime = start.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <motion.div 
      className="w-full aspect-[5/7] bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      initial={{ rotate: randomRotation }}
      whileHover={{ 
        scale: 1.02,
        rotate: 0,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => onHover && onHover(true)}
      onHoverEnd={() => onHover && onHover(false)}
    >
      <div className="p-4 h-full flex flex-col">
        {/* 챌린지 이름 */}
        <h3 className="text-xl font-bold mb-2 truncate">{challenge.roomName}</h3>
        {/* 챌린지 설명 - 48바이트 제한 */}
        <p className="text-gray-600 mb-4 truncate text-base" style={{ maxWidth: '48ch'}}>{challenge.description}</p>
        {/* 챌린지 이미지 - 1:1 비율 */}
        <div className='w-full aspect-square mb-4 overflow-hidden rounded-lg'>
          <img
            src={challenge.challengePicture || defaultImage}
            alt={challenge.roomName}
            className="w-full h-full object-cover"  // object-cover->이미지 비율 유지하면서 영역 채움
          />
        </div>
        {/* 챌린지 정보 - 하단 */}
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">
              참여자 {challenge.currentParticipants}/{challenge.maxParticipants}
            </span>
            {calculateDday(challenge.startDate) <= 3 && (
              <span className="text-sm text-red-500 font-semibold">
                D-{calculateDday(challenge.startDate)}
              </span>
            )}
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 rounded-full h-2 transition-all duration-300"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChallengeCard;