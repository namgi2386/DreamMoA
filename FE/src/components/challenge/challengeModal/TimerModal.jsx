import { useState, useEffect } from "react";
import { FaClock, FaBrain } from "react-icons/fa";

const TimerModal = () => {
  // 스크린타임과 순공시간 상태 관리
  const [screenTime, setScreenTime] = useState(0); // 초 단위
  const [pureStudyTime, setPureStudyTime] = useState(0); // 초 단위

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

  // 스크린타임 타이머
  useEffect(() => {
    const timer = setInterval(() => {
      setScreenTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
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
