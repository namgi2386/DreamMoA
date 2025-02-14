import { motion } from "framer-motion";
import { useMemo } from "react";
import defaultImage from "../../../assets/default/defaultChallengePicture.png";

const ChallengeCard = ({ challenge, onHover }) => {
  // 카드마다 다른 기울기 값을 생성 (-3도 ~ 3도 사이)
  const randomRotation = useMemo(() => {
    return Math.random() * 6 - 3;
  }, []);

  // 참여자 수 진행률 계산 유지
  const calculateProgress = () => {
    return (challenge.currentParticipants / challenge.maxParticipants) * 100;
  };

  // D-Day 표시 로직 수정
  const getDdayDisplay = (remainingDays) => {
    if (remainingDays === 0) {
      return { text: "D-DAY", isUrgent: true };
    }
    return {
      text: `D-${remainingDays}`,
      isUrgent: remainingDays <= 3,
    };
  };

  return (
    <motion.div
      className="w-full aspect-[5/7] bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform-gpu" // transform-gpu 추가
      initial={{ rotate: randomRotation }}
      whileHover={{
        scale: 1.02,
        rotate: 0,
        transition: {
          duration: 0.3,
          scale: {
            type: "spring",
            damping: 15,
          },
        },
      }}
      style={{
        willChange: "transform",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="p-4 h-full flex flex-col">
        {/* 챌린지 이름 - roomName에서 title로 변경 */}
        <h3 className="text-xl text-my-blue-1 font-bold mb-2 truncate">
          {challenge.title}
        </h3>
        {/* 챌린지 설명 - API에서 제공하지 않는 경우 제거 고려 */}
        {challenge.description && (
          <p
            className="text-gray-600 mb-4 truncate text-base"
            style={{ maxWidth: "48ch" }}
          >
            {challenge.description}
          </p>
        )}
        {/* 챌린지 이미지 - challengePicture에서 thumbnail로 변경 */}
        <div className="w-full aspect-square mb-4 overflow-hidden rounded-lg">
          <img
            src={challenge.thumbnail || defaultImage}
            alt={challenge.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 챌린지 정보 - 하단 */}
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-1.5">
            {/* 참여자 수 정보가 있는 경우에만 표시 */}
            {challenge.currentParticipants && challenge.maxParticipants && (
              <span className="text-xs text-gray-500">
                참여자 {challenge.currentParticipants}/
                {challenge.maxParticipants}
              </span>
            )}
            {/* D-Day 표시 수정 */}
            {(() => {
              const dday = getDdayDisplay(challenge.remainingDays);
              return (
                <span
                  className={`text-lg font-semibold ${
                    dday.isUrgent ? "text-red-500" : "text-my-blue-4"
                  }`}
                >
                  {dday.text}
                </span>
              );
            })()}
          </div>

          {/* 진행률 바 - 참여자 수 정보가 있는 경우에만 표시 */}
          {challenge.currentParticipants && challenge.maxParticipants && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 rounded-full h-2 transition-all duration-300"
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChallengeCard;
