import { useState, useCallback } from 'react';

const useScreenShare = (session, publisher, OV) => {
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenPublisher, setScreenPublisher] = useState(undefined);

  const stopScreenShare = useCallback(async () => {
    if (screenPublisher) {
      try {
        // 새로운 스크린 공유 메시지 초기화
        await session.unpublish(screenPublisher);
        setScreenPublisher(undefined);
        setIsScreenSharing(false);
      } catch (error) {
        console.error('Screen sharing stop error:', error);
      }
    }
  }, [session, screenPublisher]); // 필요한 의존성 추가

  const startScreenShare = useCallback(async () => {
    try {
      const publisher = await OV.current.initPublisherAsync(undefined, {
        videoSource: "screen",
        publishAudio: false,
        mirror: false
      });

      // 화면 공유 중지 이벤트 리스너
      publisher.stream.getMediaStream().getVideoTracks()[0].addEventListener('ended', () => {
        stopScreenShare(); // 여기서 stopScreenShare를 참조하므로
      });

      await session.publish(publisher);
      setScreenPublisher(publisher);
      setIsScreenSharing(true);
    } catch (error) {
      console.error('Screen sharing error:', error);
      if (error.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
        console.error('Your browser does not support screen sharing');
      } else if (error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
        console.error('You need to install screen sharing extension');
      } else if (error.name === 'SCREEN_CAPTURE_DENIED') {
        console.error('You need to grant screen sharing permissions');
      }
    }
  }, [session, OV, stopScreenShare]); // stopScreenShare를 의존성에 추가

  return {
    isScreenSharing,
    startScreenShare,
    stopScreenShare,
    screenPublisher
  };
};

export default useScreenShare;