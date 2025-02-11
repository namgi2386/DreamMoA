// hooks/ai/useVideoFrameCapture.js

import { useEffect, useRef } from 'react';

const useVideoFrameCapture = (streamManager, isEnabled = true) => {
  // 캔버스 요소 참조
  const canvasRef = useRef(null);
  // 비디오 요소 참조
  const videoRef = useRef(null);

  useEffect(() => {
    // isEnabled가 false거나 streamManager가 없으면 실행하지 않음
    if (!isEnabled || !streamManager) return;

    // 캔버스 및 비디오 엘리먼트 생성
    canvasRef.current = document.createElement('canvas');
    videoRef.current = document.createElement('video');
    const context = canvasRef.current.getContext('2d');

    try {
      // streamManager로부터 미디어 스트림 가져오기
      const mediaStream = streamManager.stream.getMediaStream();
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play();

      // 비디오 메타데이터 로드 완료 시 캔버스 크기 설정
      videoRef.current.onloadedmetadata = () => {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
      };
    } catch (error) {
      console.error('Error setting up video capture:', error);
    }

    // 클린업 함수
    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      canvasRef.current = null;
      videoRef.current = null;
    };
  }, [streamManager, isEnabled]);

  // 현재 프레임 캡처 함수
  const captureFrame = () => {
    if (!isEnabled || !canvasRef.current || !videoRef.current) return null;

    try {
      const context = canvasRef.current.getContext('2d');
      
      // 현재 프레임을 캔버스에 그리기
      context.drawImage(
        videoRef.current, 
        0, 
        0, 
        canvasRef.current.width, 
        canvasRef.current.height
      );

      // 캔버스의 내용을 Base64 이미지로 변환
      // 압축률 0.8로 설정하여 네트워크 부하 감소
      return canvasRef.current.toDataURL('image/jpeg', 0.8);
    } catch (error) {
      console.error('Error capturing frame:', error);
      return null;
    }
  };

  return {
    captureFrame: isEnabled ? captureFrame : () => null
  };
};

export default useVideoFrameCapture;