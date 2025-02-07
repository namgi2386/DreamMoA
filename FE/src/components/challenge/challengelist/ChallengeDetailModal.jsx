import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { FaUser } from "react-icons/fa6";

///////////////////////////// 이건 메인함수 아니고 성공률 모션 분리한거거
const ProgressRing = ({ progress }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-20 h-20"
    >
      <svg className="transform -rotate-90 w-20 h-20">
        <circle
          className="text-gray-200"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
        />
        <motion.circle
          className="text-blue-500"
          strokeWidth="4"
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 2 }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold">{progress}%</span>
      </div>
    </motion.div>
  );
};


//////////////////////// 이게 메인 함수
const ChallengeDetailModal = ({ isOpen, onClose, challenge }) => {
  if (!isOpen) return null;

  // 매게변수 분리 
  const {
    imageUrl,
    tags,
    currentParticipants,
    maxParticipants,
    goalParticipants,
    title,
    hostProfileImage,
    hostName,
    currentDay,
    startDate,
    endDate,
    progressRate,
    description,
  } = challenge;

  const StartChallenge = () => {
    console.log("입장성공");
    onClose();
  }
  const QuitChallenge = () => {
    console.log("탈퇴성공");
    onClose();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white rounded-2xl w-full max-w-md overflow-hidden max-h-[90vh] "
        onClick={e => e.stopPropagation()}
      >
        {/* 상단 이미지 section */}
        <div className="relative h-[200px] w-full overflow-hidden ">
          {/* 이미지 */}
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
          
          {/* 종료버튼 */}
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-white z-10 hover:rotate-90 transition-transform duration-300"
          >
            <X size={24} />
          </button>

          {/* 태그 */}
          <div className="absolute top-4 left-4 flex gap-2">
            {tags.map((tag, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm border border-white/30"
              >
                {tag}
              </motion.span>
            ))}
          </div>
          

          {/* 이미지section좌하단 제목 및 방장프사 닉네임  */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                  <img
                    src={hostProfileImage}
                    alt={hostName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm">{hostName}</span>
              </div>
              {/* 이미지section우하단 참여중인원 */}
              <div className=''>
                <motion.div 
                  className="text-center"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <span className="inline-block bg-rose-500 text-white px-4 py-2 rounded-full text-sm flex gap-1">
                    <FaUser /> {currentParticipants} / {maxParticipants} <span>참여중</span>
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        


        {/* 나머지 이미지 아랫부분 info section */}
        <div className="px-6 pt-6 space-y-4">
          {/* 상단 성공률 및 목표 등 */}
          <div className="flex items-center justify-between">
            {/* 성공률 */}
            <ProgressRing progress={progressRate} />
            {/* 목표일수 */}
            <div className="text-2xl font-bold text-my-blue-1">목표 {goalParticipants}일</div>
            {/* 오늘일수 총일수 */}
            <div className="text-right">
              <div className="text-2xl font-bold text-my-blue-1">{currentDay}일차</div>
              <div className="text-sm text-gray-500">총 {maxParticipants}일</div>
            </div>
          </div>

          {/* 시작일 종료일 */}
          <div className="bg-gray-50 rounded-xl px-4">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <div className="text-sm text-gray-500">시작일</div>
                <div className="font-medium">{startDate}</div>
              </div>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">종료일</div>
                <div className="font-medium">{endDate}</div>
              </div>
            </div>
          </div>

          {/* 설명 */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-hmy-blue-1 to-hmy-blue-2 rounded-xl opacity-10"></div>
            <div className="relative bg-white rounded-xl p-4 border border-blue-200">
              <h3 className="font-semibold mb-2 text-my-blue-2">챌린지 설명</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>


          {/* 버튼 */}
          <button 
          onClick={() => {StartChallenge()}}
          className="w-full bg-gradient-to-b from-hmy-blue-1 to-hmy-blue-2 text-white py-4 rounded-xl font-medium transform hover:scale-105 transition-transform duration-300 shadow-lg">
            챌린지 입장하기
          </button>
          {/* 탈퇴 */}
          <button 
          onClick={() => {QuitChallenge()}}
          className="text-gray-400 hover:text-gray-600 duration-300">탈퇴하기</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChallengeDetailModal;