import { motion } from 'framer-motion';

const ChallengeCard = ({ challenge }) => {
  const calculateProgress = () => {
    // 참여자 수 진행률 계산
    return (challenge.currentParticipants / challenge.maxParticipants) * 100;
  };

  const calculateDday = (startDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const diffTime = start.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <motion.div 
      className="w-full aspect-[4/3] bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-4 h-full flex flex-col">
        <h3 className="text-xl font-bold mb-2 truncate">{challenge.roomName}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{challenge.description}</p>
        
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