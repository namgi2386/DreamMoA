import { useState, useCallback } from "react";

const useScreenShare = (session, publisher, OV) => {
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenPublisher, setScreenPublisher] = useState(undefined);
  const [savedPublisher, setSavedPublisher] = useState(undefined);

  const stopScreenShare = useCallback(async () => {
    if (screenPublisher && savedPublisher) {
      try {
        await session.unpublish(screenPublisher);
        await session.publish(savedPublisher);
        setScreenPublisher(undefined);
        setSavedPublisher(undefined);
        setIsScreenSharing(false);
      } catch (error) {
        console.error("Screen sharing stop error:", error);
      }
    }
  }, [session, screenPublisher, savedPublisher]);

  const startScreenShare = useCallback(async () => {
    if (!session || !publisher) {
      console.error("No session or publisher exists");
      return;
    }

    try {
      // 1. 현재 publisher 저장
      setSavedPublisher(publisher);

      // 2. 현재 스트림 unpublish
      await session.unpublish(publisher);

      // 3. 화면 공유 스트림 생성
      const screenPublisher = await OV.current.initPublisherAsync(undefined, {
        videoSource: "screen", // 화면 공유 소스
        publishAudio: false, // 화면 공유 시 오디오는 비활성화
        publishVideo: true, // 비디오는 활성화
        mirror: false, // 미러링 비활성화
        resolution: "1280x720", // 해상도 설정
        frameRate: 30, // 프레임레이트
        insertMode: "APPEND", // DOM에 추가 모드
      });

      // 4. 화면 공유 중지 이벤트 리스너
      screenPublisher.stream
        .getMediaStream()
        .getVideoTracks()[0]
        .addEventListener("ended", () => {
          console.log("User stopped sharing");
          stopScreenShare();
        });

      // 5. 화면 공유 스트림 publish
      await session.publish(screenPublisher);
      setScreenPublisher(screenPublisher);
      setIsScreenSharing(true);
    } catch (error) {
      console.error("Screen sharing error:", error);
      // 에러 발생 시 원래 스트림 복구
      if (savedPublisher) {
        try {
          await session.publish(savedPublisher);
          setSavedPublisher(undefined);
        } catch (restoreError) {
          console.error("Failed to restore original stream:", restoreError);
        }
      }
    }
  }, [session, publisher, OV, stopScreenShare, savedPublisher]);

  return {
    isScreenSharing,
    startScreenShare,
    stopScreenShare,
    screenPublisher,
  };
};

export default useScreenShare;
