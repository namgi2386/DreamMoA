import { useState, useEffect } from 'react';

import VideoControls from '/src/components/video/VideoControls';
import VideoGrid from '/src/components/video/VideoGrid';
import TestErrorAlert from '/src/components/video/TestErrorAlert';
import TestLoadingSpinner from '/src/components/video/TestLoadingSpinner';
import useOpenVidu from '../../hooks/useOpenVidu';
import ChatPanel from '../../components/video/chat/ChatPanel';
import VideoSettingForm from '../../components/video/VideoSettingForm';
import FocusAnalysis from '../../components/video/analysis/FocusAnalyzer'; // ✅ 웹소켓 테스트용

const SERVER_URL = "ws://localhost:8000/focus"; // ✅ WebSocket 서버 주소

const VideoRoom = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const dummySessionRoomName = "13";
    const dummyUserName = userInfo?.nickname || "testUser";
    const [currentLayout, setCurrentLayout] = useState("grid");

    // ✅ OpenVidu WebRTC 상태 관리
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

    // ✅ 웹소켓에서 받은 데이터 처리
    const handleWebSocketData = (data) => {
        console.log("📡 WebSocket에서 받은 데이터:", data);
    };

    // ✅ 세션 참가 핸들러
    const handleJoinSession = async () => {
        try {
            await connectSession(dummySessionRoomName, dummyUserName);
        } catch (error) {
            console.error("세션 참가 실패:", error);
        }
    };

    // ✅ 언마운트 시 WebRTC 세션 종료
    useEffect(() => {
        return () => {
            disconnectSession();
        };
    }, [disconnectSession]);

    return (
        <div className="w-full h-screen bg-gray-900 text-white">
            {isLoading && <TestLoadingSpinner />}
            {error && <TestErrorAlert message={error} onClose={clearError} />}
            {!session ? (
                <VideoSettingForm onJoin={handleJoinSession} isLoading={isLoading} />
            ) : (
                <div className="h-screen w-full flex flex-col bg-green-100 overflow-auto">
                    <div className="w-full h-[10%] bg-red-100"></div>

                    <div className="w-full h-[80%] flex-grow bg-yellow-200 overflow-auto">
                        <VideoGrid
                            mainStreamManager={mainStreamManager}
                            publisher={publisher}
                            subscribers={subscribers}
                            onStreamClick={updateMainStreamManager}
                            currentLayout={currentLayout}
                        />
                    </div>

                    <div className="w-full h-[10%] bg-red-200 overflow-auto">
                        <VideoControls
                            publisher={publisher}
                            subscribers={subscribers}
                            onLeaveSession={disconnectSession}
                            currentLayout={currentLayout}
                            onLayoutChange={setCurrentLayout}
                        />
                    </div>

                    <ChatPanel
                        session={session}
                        sessionTitle={dummySessionRoomName}
                        isChatOpen={isChatOpen}
                        setIsChatOpen={setIsChatOpen}
                    />

                    {/* ✅ UI에 영향 없이 WebSocket 테스트 실행 */}
                    <FocusAnalysis serverUrl={SERVER_URL} onDataReceived={handleWebSocketData} />
                </div>
            )}
        </div>
    );
};

export default VideoRoom;
