// hooks/useOpenViduSetting.js
import { useState, useCallback } from 'react';

const useOpenViduSetting = (publisher, subscribers) => {
  const [speakerVolume, setSpeakerVolume] = useState(1);
  const [micVolume, setMicVolume] = useState(1);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  // 스피커 볼륨 조절
  const handleSpeakerVolume = useCallback((volume) => {
    try { 
      if (subscribers && subscribers.length > 0) {
        subscribers.forEach(subscriber => {
          // RTCPeerConnection의 볼륨 조절
          const audioTrack = subscriber.stream.getMediaStream().getAudioTracks()[0];
          if (audioTrack) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const source = audioContext.createMediaStreamSource(subscriber.stream.getMediaStream());
            const gainNode = audioContext.createGain();
            
            source.connect(gainNode);
            gainNode.connect(audioContext.destination);
            gainNode.gain.value = volume;
          }
        });
        setSpeakerVolume(volume);
      }
    } catch (error) {
      console.error('스피커 볼륨 조절 오류:', error);
    }
  }, [subscribers]);

  // 마이크 음량 조절
  const handleMicVolume = useCallback((volume) => {
    try {
      if (publisher && publisher.stream) {
        // WebRTC 네이티브 API 사용
        const audioTrack = publisher.stream.getMediaStream().getAudioTracks()[0];
        if (audioTrack) {
          // AudioContext 사용
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const source = audioContext.createMediaStreamSource(publisher.stream.getMediaStream());
          const gainNode = audioContext.createGain();
          
          source.connect(gainNode);
          gainNode.connect(audioContext.destination);
          gainNode.gain.value = volume;
        }
        setMicVolume(volume);
      }
    } catch (error) {
      console.error('마이크 음량 조절 오류:', error);
    }
  }, [publisher]);

  // 카메라 ON/OFF 토글 (이 부분은 잘 작동하므로 유지)
  const toggleVideo = useCallback(async () => {
    try {
      if (publisher) {
        const newVideoState = !isVideoEnabled;
        await publisher.publishVideo(newVideoState);
        setIsVideoEnabled(newVideoState);
      }
    } catch (error) {
      console.error('카메라 상태 변경 오류:', error);
    }
  }, [publisher, isVideoEnabled]);

  return {
    speakerVolume,
    micVolume,
    isVideoEnabled,
    handleSpeakerVolume,
    handleMicVolume,
    toggleVideo
  };
};

export default useOpenViduSetting;