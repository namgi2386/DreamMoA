import { useState, useEffect, useRef } from "react";

import VideoControls from "/src/components/video/VideoControls";
import VideoGrid from "/src/components/video/VideoGrid";
import TestErrorAlert from "/src/components/video/TestErrorAlert";
import TestLoadingSpinner from "/src/components/video/TestLoadingSpinner";
import useOpenVidu from "../../hooks/useOpenVidu";
import ChatPanel from "../../components/video/chat/ChatPanel";
// import VideoJoinForm from "../../components/video/VideoJoinForm"; // VideoJoinForm 버전
import VideoSettingForm from "../../components/video/VideoSettingForm";

// ✅ 추가된 파일
import { useFocusSocket } from "../../hooks/useFocusSocket"; // 🔥 FastAPI WebSocket 통신 훅
import DataCollector from "../../components/video/analysis/DataCollector"; // 🔥 Mediapipe & YOLO 데이터 수집

const SERVER_URL = "ws://localhost:8000/focus"; // ✅ FastAPI WebSocket 서버 주소

const VideoRoom = () => {
  // ✅ 채팅창 on/off 상태
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // ✅ 유저 정보 (localStorage에서 가져오기)
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const dummySessionRoomName = "12"; // 🔥 챌린지 선택했을 때 가져와야 함
  const dummyUserName = userInfo.nickname;

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
      // await connectSession(mySessionRoomName, myUserName); // VideoJoinForm 버전
      await connectSession(dummySessionRoomName, dummyUserName); // (VideoSettingForm) 내이름 방이름 가져가서 입장시켜줌
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
        <>
          {/* 🔹 VideoJoinForm 버전 (사용 가능) */}
          {/* <VideoJoinForm
            myUserName={myUserName}
            mySessionRoomName={mySessionRoomName}
            onUserNameChange={setMyUserName}
            onSessionNameChange={setMySessionRoomName}
            onJoin={handleJoinSession}
            isLoading={isLoading}
          /> */}
          
          {/* 🔹 현재 적용 중: VideoSettingForm */}
          <VideoSettingForm onJoin={handleJoinSession} isLoading={isLoading} />
        </>
      ) : (
        <div className="h-[calc(100vh-32px)]">
          {/* ✅ WebRTC 컨트롤러 (카메라 전환, 나가기 버튼) */}
          <VideoControls
            publisher={publisher}
            subscribers={subscribers}
            onLeaveSession={disconnectSession}
            currentLayout={currentLayout}
            onLayoutChange={setCurrentLayout}
          />

          {/* ✅ WebRTC 비디오 그리드 (참가자 화면 표시) */}
          <VideoGrid
            mainStreamManager={mainStreamManager}
            publisher={publisher}
            subscribers={subscribers}
            onStreamClick={updateMainStreamManager}
            currentLayout={currentLayout}
          />

          {/* ✅ 채팅 패널 (채팅 on/off 가능) */}
          <ChatPanel
            session={session}
            sessionTitle={dummySessionRoomName}
            isChatOpen={isChatOpen}
            setIsChatOpen={setIsChatOpen}
          />

          {/* ✅ Mediapipe + YOLO 데이터 수집 (WebSocket으로 전송) */}
          <DataCollector videoRef={videoRef} socket={socket} />
        </div>
      )}
    </div>
  );
};

export default VideoRoom;
