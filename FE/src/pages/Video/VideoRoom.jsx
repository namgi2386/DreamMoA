import { useState, useEffect, useRef } from "react";

import VideoControls from "/src/components/video/VideoControls";
import VideoGrid from "/src/components/video/VideoGrid";
import TestErrorAlert from "/src/components/video/TestErrorAlert";
import TestLoadingSpinner from "/src/components/video/TestLoadingSpinner";
import useOpenVidu from "../../hooks/useOpenVidu";
import ChatPanel from "../../components/video/chat/ChatPanel";
import VideoSettingForm from "../../components/video/VideoSettingForm";

// ✅ 추가된 WebSocket 훅
import { useFocusSocket } from "../../hooks/useFocusSocket"; // 🔥 FastAPI WebSocket 통신 훅
import DataCollector from "../../components/video/analysis/DataCollector"; // 🔥 Mediapipe & YOLO 데이터 수집

const SERVER_URL = "ws://localhost:8000/focus"; // ✅ FastAPI WebSocket 서버 주소

const VideoRoom = () => {
  // ✅ 채팅창 on/off 상태
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // ✅ 유저 정보 (localStorage에서 가져오기)
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const dummySessionRoomName = "12"; // 🔥 챌린지 선택했을 때 가져와야 함
  const dummyUserName = userInfo?.nickname || "testUser";

  // ✅ 레이아웃 상태 (그리드 또는 다른 레이아웃)
  const [currentLayout, setCurrentLayout] = useState("grid");

  // ✅ OpenVidu (WebRTC 관련 로직)
  const {
    session,
    mainStreamManager,
    publisher,
    subscribers,
    connectSession,
    disconnectSession,
    updateMainStreamManager,
    isLoading,
    error,
    clearError,
  } = useOpenVidu();

  // ✅ FastAPI WebSocket 연결 (집중 분석 결과 수신)
  const { focusData, socket } = useFocusSocket(SERVER_URL);

  // ✅ WebRTC 영상 (Mediapipe & YOLO에서 사용)
  const videoRef = useRef(null);

  // ✅ 세션 참가 핸들러 (WebRTC 접속)
  const handleJoinSession = async () => {
    try {
      await connectSession(dummySessionRoomName, dummyUserName);
    } catch (error) {
      console.error("세션 참가 실패:", error);
    }
  };

  // ✅ 집중 분석 결과를 브라우저 콘솔에 출력 
  useEffect(() => {
    if (focusData !== null) {
      console.log(`📡 집중 분석 결과: ${focusData === 1 ? "✅ 집중" : "❌ 산만"}`);
    }
  }, [focusData]);

  // ✅ 컴포넌트 언마운트 시 WebRTC 세션 정리 (강제 종료 대비)
  useEffect(() => {
    return () => {
      disconnectSession();
    };
  }, [disconnectSession]);

  return (
    <div className="w-full h-screen bg-gray-900 text-white">
      {/* ✅ 로딩 중 화면 */}
      {isLoading && <TestLoadingSpinner />}

      {/* ✅ 에러 발생 시 알림 */}
      {error && <TestErrorAlert message={error} onClose={clearError} />}

      {/* ✅ 세션이 없는 경우 → 입장 화면 */}
      {!session ? (
        <VideoSettingForm onJoin={handleJoinSession} isLoading={isLoading} />
      ) : (
        // ☆★☆★☆★ 전체영역 ☆★☆★☆★
        <div className="h-screen w-full flex flex-col bg-green-100 overflow-auto">
          {/* ☆★ 상단 10% 영역 ☆★ */}
          <div className="w-full h-[10%] bg-red-100 flex items-center justify-center">
            <h2 className="text-xl font-bold">🔥 WebRTC 집중 분석 활성화</h2>
          </div>
          
          {/* ☆★ 중앙 화면 영역 ☆★ */}
          <div className="w-full flex-grow bg-yellow-200 overflow-auto">
            <VideoGrid 
              mainStreamManager={mainStreamManager}
              publisher={publisher} 
              subscribers={subscribers} 
              onStreamClick={updateMainStreamManager} 
              currentLayout={currentLayout}
            />
          </div>

          {/* ☆★ 하단 10% 영역 ☆★ */}
          <div className="w-full h-[10%] bg-red-200 overflow-auto">
            <VideoControls 
              publisher={publisher} 
              subscribers={subscribers} 
              onLeaveSession={disconnectSession} 
              currentLayout={currentLayout}
              onLayoutChange={setCurrentLayout}
            />
          </div>

          {/* ✅ WebSocket 데이터 수집기 (Mediapipe + YOLO) */}
          <DataCollector videoRef={videoRef} socket={socket} />

          {/* ☆★ z-index 걸린 모달 영역 ☆★ */}
          <ChatPanel 
            session={session} 
            sessionTitle={dummySessionRoomName} 
            isChatOpen={isChatOpen} 
            setIsChatOpen={setIsChatOpen} 
          />
        </div>
      )}
    </div>
  );
};

export default VideoRoom;
