import { useState, useEffect, useCallback } from "react";
import { FaClock, FaBrain } from "react-icons/fa";
import { useParams } from "react-router-dom";
import {
  enterChallenge,
  exitChallenge,
  formatDate,
} from "../../../services/api/studyTimeApi";

const TimerModal = ({ aiResult, onTimerUpdate }) => {
  // 백엔드 확인요청!!!!!!!!!!! chellengeId가 null값..?
  const { challengeId } = useParams();
  const id = challengeId || "1"; // 기본값 설정

  // 스크린타임과 순공시간 상태 관리
  const [screenTime, setScreenTime] = useState(0); // 초 단위
  const [pureStudyTime, setPureStudyTime] = useState(0); // 초 단위
  const [challengeLogId, setChallengeLogId] = useState(null);

  // 입장 시 API 호출
  useEffect(() => {
    const initializeChallenge = async () => {
      try {
        const response = await enterChallenge(id, formatDate(new Date()));
        if (response.challengeLogId) {
          setChallengeLogId(response.challengeLogId);
          // 기존 공부시간이 있따면 설정
          setPureStudyTime(response.pureStudyTime || 0);
          setScreenTime(response.screenTime || 0);
        }
      } catch (error) {
        console.error("챌린지 입장 실패:", error);
      }
    };
    
    if (id) initializeChallenge();
  }, [id]);

  // 스크린타임 타이머
  useEffect(() => {
    const timer = setInterval(() => {
      setScreenTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // AI에 따른 순공시간 갱신
  useEffect(() => {
    if (
      aiResult?.face?.attention >= 70 ||
      aiResult?.posture?.status === "GOOD"
    ) {
      setPureStudyTime((prev) => prev + 1);
    }
  }, [aiResult]);

  // 퇴장 시 API 호출
  const handleExit = useCallback(async () => {
    try {
      await exitChallenge(challengeId, {
        recordAt: formatDate(new Date()),
        pureStudyTime,
        screenTime,
        isSuccess: true, // 이 값은 나중에 별도로 처리!!!!!!!!!!!!!!!!!!!
      });
    } catch (error) {
      console.error("챌린지 퇴장 실패:", error);
    }
  }, [challengeId, pureStudyTime, screenTime]);

  // 컴포넌트 언마운트 시 퇴장 처리
  useEffect(() => {
    return () => {
      handleExit();
    };
  }, [handleExit]);

  // 시간 포맷팅 함수 (초 -> HH:MM:SS)
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="absolute top-4 left-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700 backdrop-blur-sm bg-opacity-90">
      {/* 컨테이너 */}
      <div className="flex items-center space-x-6 p-3">
        {/* 스크린타임 */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <FaClock className="text-white text-lg" />
          </div>
          <div>
            <p className="text-sm text-gray-400">스크린타임</p>
            <p className="text-2xl font-mono text-blue-400 font-semibold tracking-wider">
              {formatTime(screenTime)}
            </p>
          </div>
        </div>

        {/* 구분선 */}
        <div className="h-12 w-px bg-gray-700"></div>

        {/* 순공시간 */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
            <FaBrain className="text-white text-lg" />
          </div>
          <div>
            <p className="text-sm text-gray-400">순공시간</p>
            <p className="text-2xl font-mono text-green-400 font-semibold tracking-wider">
              {formatTime(pureStudyTime)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerModal;
