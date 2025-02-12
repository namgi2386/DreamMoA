import { useState, useEffect } from 'react';

import VideoControls from '/src/components/video/VideoControls';
import VideoGrid from '/src/components/video/VideoGrid';
import TestErrorAlert from '/src/components/video/TestErrorAlert';
import TestLoadingSpinner from '/src/components/video/TestLoadingSpinner';
import useOpenVidu from '../../hooks/useOpenVidu';
import ChatPanel from '../../components/video/chat/ChatPanel';
// import VideoJoinForm from '../../components/video/VideoJoinForm'; // VideoJoinForm 버전
import VideoSettingForm from '../../components/video/VideoSettingForm';

const VideoRoom = () => {
  // 사용자 입력 상태
  // const [myUserName, setMyUserName] = useState('');// 유저이름  VideoJoinForm 버전
  // const [mySessionRoomName, setMySessionRoomName] = useState('');// 방이름 VideoJoinForm 버전
  const [isChatOpen, setIsChatOpen] = useState(false); // 채팅창 on off 
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const dummySessionRoomName = "12" // 이거 챌린지 선택했을때 가져와야됨.
  const dummyUserName = userInfo?.nickname || "testUser"
  // const dummyUserName = "namhui"
  const [currentLayout, setCurrentLayout] = useState("grid"); // 레이아웃 상태

  // OpenVidu hook에서 정의한 함수 전부 가져와서 사용
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

  // 세션 참가 핸들러
  const handleJoinSession = async () => {
    try {
      // await connectSession(mySessionRoomName, myUserName); // VideoJoinForm 버전
      await connectSession(dummySessionRoomName, dummyUserName); // (VideoSettingForm) 내이름 방이름 가져가서 입장시켜줌
    } catch (error) {
      // 에러는 useOpenVidu에서 처리됨
      console.error("세션 참가 실패:", error);
    }
  };

  // 언마운트시 세션 정리 (강제종료(크롬창닫음)시 세션 종료)
  useEffect(() => {
    return () => {
      disconnectSession();
    };
  }, [disconnectSession]);

  return (
    // <div className="w-full h-full bg-gray-900 text-white p-4">
    // <div className="w-full h-screen bg-gray-900 text-white p-4">
    <div className="w-full h-screen bg-gray-900 text-white">
    {" "}
      {/* h-full -> h-screen으로 변경 */}
      {/* 로딩페이지 */}
      {isLoading && <TestLoadingSpinner />}
      {/* 에러페이지 */}
      {error && <TestErrorAlert message={error} onClose={clearError} />}
      {!session ? (
        <>
          {/* <VideoJoinForm  // 입장화면 
            myUserName={myUserName} // 내가 입력한 이름
            mySessionRoomName={mySessionRoomName} // 세션(방)이름
            onUserNameChange={setMyUserName} // 이름 변경시켜주는 함수
            onSessionNameChange={setMySessionRoomName} // 방이름 변경시켜주는 함수
            onJoin={handleJoinSession} // 참가하기위해 세션요청하고 토큰요청하는 함수
            isLoading={isLoading} // 로딩화면
          /> */}
          <VideoSettingForm
            onJoin={handleJoinSession} // 참가하기위해 세션요청하고 토큰요청하는 함수
            isLoading={isLoading} // 로딩화면
          />
        </>
      ) : (
        // ☆★☆★☆★ 전체영역 ☆★☆★☆★
        <div className="h-screen w-full flex flex-col bg-green-100 overflow-auto">
          {/* ☆★ 상단10% 영역 ☆★ */}
          <div className='w-full h-[10%] bg-red-100'>
            
          </div>
          {/* ☆★ 중앙 화면 영역 ☆★ */}
          <div className="w-full flex-grow bg-yellow-200 overflow-auto">
            <VideoGrid // 너와나의 비디오 위치 크기 등등
              mainStreamManager={mainStreamManager}
              publisher={publisher} // 내 화면
              subscribers={subscribers} // 친구들 화면
              onStreamClick={updateMainStreamManager} // 친구화면 클릭시 크게만드는 그런함수
              currentLayout={currentLayout}
            />
          </div>
          {/* ☆★ 하단10% 영역 ☆★ */}
          <div className='w-full h-[10%] bg-red-200 overflow-auto '>
            <VideoControls // 컨트롤러 (지금은 카메라전환 + 나가기버튼밖에 없음)
              publisher={publisher} // 내 화면
              subscribers={subscribers} // 친구들 화면
              onLeaveSession={disconnectSession} // 나가기 함수 매개변수로 넘겨줌
              currentLayout={currentLayout}
              onLayoutChange={setCurrentLayout}
            />
          </div>
          {/* ☆★ z-index걸린 모달 영역 ☆★ */}
          <ChatPanel // 채팅창모달 (테스트하려고 입장화면에 넣어둠)
            session={session} // 세션상태
            sessionTitle={dummySessionRoomName} //방이름
            isChatOpen={isChatOpen} // 채팅창 on off
            setIsChatOpen={setIsChatOpen} // 채팅창 on off
          />
        </div>
      )}
    </div>
  );
};

export default VideoRoom;
