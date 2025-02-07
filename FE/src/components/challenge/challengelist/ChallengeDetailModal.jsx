import { motion } from 'framer-motion';
import { X } from 'lucide-react';

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
    endTime
  } = challenge;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white rounded-2xl w-full max-w-md overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-white z-10"
        >
          <X size={24} />
        </button>

        {/* Challenge Image */}
        <div className="relative h-48 w-full">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          {/* Tags */}
          <div className="absolute top-4 left-4 flex gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Challenge Info */}
        <div className="p-6">
          {/* Date and Progress */}
          <div className="text-gray-600 text-sm mb-2">
            12/16 참여중
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold mb-4">{title}</h2>

          {/* Host Info */}
          <div className="flex items-center gap-2 mb-4">
            <img
              src={hostProfileImage}
              alt={hostName}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm">{hostName}</span>
          </div>

          {/* Participants Count */}
          <div className="text-right text-sm text-rose-500">
            {currentParticipants}인차
          </div>

          {/* Join Button */}
          <button className="w-full bg-blue-500 text-white py-3 rounded-lg mt-4">
            챌린지 입장하기
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChallengeDetailModal;