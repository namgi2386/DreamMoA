// hooks/useScreenShare.js
import { useState, useCallback } from 'react';

const useScreenShare = (session, publisher, OV) => {
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenPublisher, setScreenPublisher] = useState(null);
  const [savedVideoState, setSavedVideoState] = useState(null);
  
  const startScreenShare = useCallback(async () => {
    if (!session || isScreenSharing) return;

    try {
      // 현재 비디오 상태 저장
      const currentVideoState = publisher.stream.videoActive;
      setSavedVideoState(currentVideoState);

      // 기존 비디오 스트림 중지
      await publisher.publishVideo(false);

      // 화면 공유 스트림 가져오기
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false
      });

      // 화면 공유 트랙으로 교체
      await publisher.replaceTrack(mediaStream.getVideoTracks()[0]);
      await publisher.publishVideo(true);

      // 화면 공유 중단 감지
      mediaStream.getVideoTracks()[0].addEventListener('ended', () => {
        stopScreenShare();
      });

      setIsScreenSharing(true);
      setScreenPublisher(publisher);

    } catch (error) {
      console.error('화면 공유 시작 중 오류:', error);
      // 오류 발생 시 원래 상태로 복구
      if (publisher && savedVideoState !== null) {
        await publisher.publishVideo(savedVideoState);
      }
      await stopScreenShare();
    }
  }, [session, publisher, isScreenSharing]);

  const stopScreenShare = useCallback(async () => {
    try {
      if (publisher) {
        // 현재 트랙 중지
        const currentTrack = publisher.stream.getMediaStream().getVideoTracks()[0];
        if (currentTrack) {
          currentTrack.stop();
        }

        // 원래 카메라 스트림으로 복구
        const devices = await OV.current.getDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        if (videoDevices.length > 0) {
          const newMediaStream = await navigator.mediaDevices.getUserMedia({
            video: {
              deviceId: videoDevices[0].deviceId
            }
          });
          
          await publisher.replaceTrack(newMediaStream.getVideoTracks()[0]);
          
          // 이전 비디오 상태로 복구
          if (savedVideoState !== null) {
            await publisher.publishVideo(savedVideoState);
          }
        }
      }
    } catch (error) {
      console.error('화면 공유 중지 중 오류:', error);
    } finally {
      setIsScreenSharing(false);
      setScreenPublisher(null);
      setSavedVideoState(null);
    }
  }, [publisher, OV, savedVideoState]);

  return {
    isScreenSharing,
    startScreenShare,
    stopScreenShare,
    screenPublisher
  };
};

export default useScreenShare;