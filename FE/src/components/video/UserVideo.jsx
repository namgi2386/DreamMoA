// components/video/UserVideo.jsx

import { useEffect, useRef } from 'react';
import AIAnalysisOverlay from './ai/AIAnalysisOverlay';
import useVideoFrameCapture from '../../hooks/ai/useVideoFrameCapture';
import useAIDetectionSocket from '../../hooks/ai/useAIDetectionSocket';

export default function UserVideoComponent({ 
  streamManager, // OpenVidu 스트림 관리자
  isMyVideo,    // 현재 비디오가 사용자 본인의 것인지 여부
  myUserName,   // 사용자 이름
  mySessionRoomName // 세션(회의실) 이름
}) {
  // 비디오 엘리먼트에 대한 참조
  const videoRef = useRef();

  // AI 분석을 위한 웹소켓 훅
  // 조건부 렌더링이 아닌 항상 호출하되, isMyVideo가 false일 때는 내부 로직을 실행하지 않도록 설정
  const { isConnected, sendFrame, aiResult } = useAIDetectionSocket(
    mySessionRoomName, 
    myUserName,
    isMyVideo // isMyVideo를 파라미터로 전달하여 훅 내부에서 처리
  );

  // 비디오 프레임 캡처 훅
  // 마찬가지로 항상 호출하되, isMyVideo로 내부 동작을 제어
  const { captureFrame } = useVideoFrameCapture(
    streamManager,
    isMyVideo
  );

  // OpenVidu 스트림을 비디오 엘리먼트에 연결
  useEffect(() => {
    // streamManager와 비디오 엘리먼트가 존재할 때만 실행
    if (streamManager && videoRef.current) {
      // OpenVidu의 비디오 엘리먼트 추가 메서드 호출
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]); // streamManager가 변경될 때마다 실행

  // AI 분석을 위한 프레임 캡처 및 전송 로직
  useEffect(() => {
    // 본인 영상이 아니거나, 웹소켓이 연결되지 않았거나, 스트림이 없으면 실행하지 않음
    if (!isMyVideo || !isConnected || !streamManager) return;

    // 주기적으로 프레임을 캡처하고 전송하는 인터벌 설정
    const intervalId = setInterval(() => {
      // 현재 프레임 캡처
      const frame = captureFrame();
      // 캡처된 프레임이 있으면 서버로 전송
      if (frame) {
        sendFrame(frame);
      }
    }, 100); // 100ms 간격으로 실행 (초당 10프레임)

    // 컴포넌트 언마운트 또는 의존성 변경 시 인터벌 정리
    return () => clearInterval(intervalId);
  }, [isMyVideo, isConnected, streamManager, captureFrame, sendFrame]);

  return (
    // 비디오 컨테이너. 상대적 위치 지정으로 오버레이 가능하게 설정
    <div className="relative w-full h-full">
      {/* 실제 비디오 스트림을 표시할 비디오 엘리먼트 */}
      <video 
        autoPlay={true} 
        ref={videoRef} 
        className="w-full h-full rounded" 
      />
      
      {/* AI 분석 결과 오버레이 - 본인 영상일 때만 표시 */}
      {isMyVideo && <AIAnalysisOverlay aiResult={aiResult} />}
    </div>
  );
}