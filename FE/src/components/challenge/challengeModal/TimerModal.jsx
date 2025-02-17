import { FaClock, FaBrain } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { aiFocusState } from "../../../recoil/atoms/ai/aiState";
import { useEffect, useState } from "react";

const TimerModal = ({ screenTime, pureStudyTime  }) => {
  const aiFocusValue = useRecoilState(aiFocusState);
  console.log("@@@@@@@@@@@@1" , screenTime);
  console.log("@@@@@@@@@@@@2" , pureStudyTime);
  const [currentScreenTime, setCurrentScreenTime] = useState(screenTime);
  const [currentPureTime, setCurrentPureTime] = useState(pureStudyTime);

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
  
  // 타이머 로직 추가
  useEffect(() => {
    // 타이머 로직
    const timer = setInterval(() => {
      // 스크린타임은 항상 증가
      setCurrentScreenTime(prev => prev + 1);  
      
      // aiFocusValue가 1일 때만 순공시간 증가, 0일 때는 일시정지
      if (aiFocusValue[0] === 1) {  // aiFocusValue가 1일 때
        setCurrentPureTime(prev => prev + 1);
      }
      // aiFocusValue가 0일 때는 setCurrentPureTime이 호출되지 않으므로 시간이 멈춤
    }, 1000);
  
    // 클린업 함수
    return () => clearInterval(timer);
  }, [aiFocusValue]); // aiFocusValue 의존성 유지

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
            <p className="text-sm text-gray-400">스크린타임{aiFocusValue}</p>
            <p className="text-2xl font-mono text-blue-400 font-semibold tracking-wider">
              {formatTime(currentScreenTime)}
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
              {formatTime(currentPureTime)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerModal;
