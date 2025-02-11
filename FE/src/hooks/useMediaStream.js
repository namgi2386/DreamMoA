import { useState, useEffect, useCallback } from 'react';

const useMediaStream = (cameraOn, selectedCamera) => {
  // 비디오 스트림 상태 관리
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);

  // 미디어 스트림 가져오기
  const getStream = useCallback(async () => {
    // 이전 스트림이 있다면 트랙들을 중지
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    if (!cameraOn) {
      setStream(null);
      return;
    }

    try {
      // 미디어 스트림 요청
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: selectedCamera ? { exact: selectedCamera } : undefined
        }
      });
      setStream(mediaStream);
      setError(null);
    } catch (err) {
      console.error('Error accessing media devices:', err);
      setError(err.message);
      setStream(null);
    }
  }, [cameraOn, selectedCamera]);

  // 사용 가능한 미디어 디바이스 가져오기
  const [devices, setDevices] = useState({
    videoDevices: []
  });

  const getDevices = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      
      // 비디오 디바이스만 필터링
      const videoDevices = devices.filter(
        device => device.kind === 'videoinput'
      );

      setDevices({
        videoDevices: videoDevices.map(device => ({
          deviceId: device.deviceId,
          label: device.label || `Camera ${videoDevices.indexOf(device) + 1}`
        }))
      });
    } catch (err) {
      console.error('Error getting media devices:', err);
      setError(err.message);
    }
  }, []);

  // 컴포넌트 마운트 시 디바이스 목록 가져오기
  useEffect(() => {
    getDevices();
    // 디바이스 변경 이벤트 리스너 등록
    navigator.mediaDevices.addEventListener('devicechange', getDevices);
    
    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      navigator.mediaDevices.removeEventListener('devicechange', getDevices);
      // 스트림 정리
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [getDevices]);

  // 카메라 상태나 선택된 카메라가 변경될 때 스트림 업데이트
  useEffect(() => {
    getStream();
  }, [getStream]);

  return { stream, error, devices };
};

export default useMediaStream;