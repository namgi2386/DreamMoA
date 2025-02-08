// components/video/VideoRoom.jsx

import { useState, useEffect } from 'react';
import VideoJoinForm from '/src/components/video/VideoJoinForm';
import VideoControls from '/src/components/video/VideoControls';
import VideoGrid from '/src/components/video/VideoGrid';
import TestErrorAlert from '/src/components/video/TestErrorAlert';
import TestLoadingSpinner from '/src/components/video/TestLoadingSpinner';
import useOpenVidu from '../../hooks/useOpenVidu';

const VideoRoom = () => {
  // 사용자 입력 상태
  const [myUserName, setMyUserName] = useState('');// 방 이름
  const [mySessionRoomName, setMySessionRoomName] = useState('');// 사용자 이름

  // OpenVidu hook에서 정의한 함수 전부 가져와서 사용
  const {
    session,
    mainStreamManager,
    publisher,
    subscribers,
    connectSession,
    disconnectSession,
    switchCamera,
    updateMainStreamManager,
    isLoading,
    error,
    clearError
  } = useOpenVidu();

  // 세션 참가 핸들러
  const handleJoinSession = async () => {
    try {
      await connectSession(mySessionRoomName, myUserName);
    } catch (error) {
      // 에러는 useOpenVidu에서 처리됨
      console.error('세션 참가 실패:', error);
    }
  };

  // 언마운트시 세션 정리
  useEffect(() => {
    return () => {
      disconnectSession();
    };
  }, [disconnectSession]);

  return (
    <div className="w-full h-screen bg-gray-900 text-white p-4">
      {isLoading && <TestLoadingSpinner />}
      {error && (
        <TestErrorAlert 
          message={error}
          onClose={clearError}
        />
      )}
      {!session ? (
        <VideoJoinForm 
          myUserName={myUserName}
          mySessionRoomName={mySessionRoomName}
          onUserNameChange={setMyUserName}
          onSessionNameChange={setMySessionRoomName}
          onJoin={handleJoinSession}
          isLoading={isLoading}
        />
      ) : (
        <div className="h-full">
          <VideoControls 
            sessionName={mySessionRoomName}
            onSwitchCamera={switchCamera}
            onLeaveSession={disconnectSession}
          />
          <VideoGrid 
            mainStreamManager={mainStreamManager}
            publisher={publisher}
            subscribers={subscribers}
            onStreamClick={updateMainStreamManager}
          />
        </div>
      )}
    </div>
  );
};

export default VideoRoom;