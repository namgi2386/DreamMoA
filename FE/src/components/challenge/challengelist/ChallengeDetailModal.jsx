import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const ProgressRing = ({ progress }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-20 h-20">
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
        <circle
          className="text-blue-500 transition-all duration-1000 ease-in-out"
          strokeWidth="4"
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold">{progress}%</span>
      </div>
    </div>
  );
};

const ChallengeDetailModal = ({ isOpen, onClose, challenge }) => {
  if (!isOpen) return null;

  const {
    imageUrl,
    tags,
    currentParticipants,
    maxParticipants,
    title,
    hostProfileImage,
    hostName,
    currentDay,
    startDate,
    endDate,
    progressRate,
    description,
  } = challenge;

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
        className="bg-white rounded-2xl w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Challenge Image with Gradient Overlay */}
        <div className="relative h-[240px] w-full overflow-hidden ">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-white z-10 hover:rotate-90 transition-transform duration-300"
          >
            <X size={24} />
          </button>

          {/* Tags */}
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
          

          {/* Title and Host Info - Overlaid on image */}
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
              {/* Participants Count with Animation */}
              <div className=''>
                <motion.div 
                  className="text-center"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <span className="inline-block bg-rose-500 text-white px-4 py-2 rounded-full text-sm">
                    {currentParticipants} / {maxParticipants}
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        


        {/* Challenge Info */}
        <div className="px-6 pt-6 space-y-4">
          {/* Progress Section */}
          <div className="flex items-center justify-between">
            <ProgressRing progress={progressRate} />
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-500">{currentDay}일차</div>
              <div className="text-sm text-gray-500">총 {maxParticipants}일</div>
            </div>
          </div>

          {/* Date Info with Custom Design */}
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

          {/* Description with Custom Border */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-10"></div>
            <div className="relative bg-white rounded-xl p-4 border border-blue-200">
              <h3 className="font-semibold mb-2 text-blue-700">챌린지 설명</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>


          {/* Join Button with Gradient */}
          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-medium transform hover:scale-105 transition-transform duration-300 shadow-lg">
            챌린지 입장하기
          </button>
          <div/>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChallengeDetailModal;