import { useEffect, useRef } from 'react';
import OvVideo from './OvVideo';
import useVideoFrameCapture from '../../hooks/ai/useVideoFrameCapture'; // ✅ 프레임 캡처 훅 추가

const UserVideo = ({ streamManager, isMyVideo }) => {
  const videoRef = useRef();

  // ✅ WebSocket을 통한 프레임 캡처 실행 (isMyVideo가 true일 때만)
  useVideoFrameCapture(streamManager, isMyVideo);

  // ✅ 사용자 닉네임 가져오는 헬퍼 함수
  const getNicknameTag = () => {
    if (!streamManager) return '';
    const { clientData } = JSON.parse(streamManager.stream.connection.data);
    const userData = JSON.parse(clientData);
    return userData.originalName;
  };

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <div className="relative w-full h-full bg-blue-400 flex justify-center">
      {/* 기본 비디오 스트림 표시 */}
      <OvVideo streamManager={streamManager} />
      
      {/* 사용자 이름 오버레이 */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-2 py-1 rounded text-white">
        {getNicknameTag()}
      </div>
    </div>
  );
};

export default UserVideo;
