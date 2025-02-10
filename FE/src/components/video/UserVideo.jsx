import { useEffect, useRef } from 'react';

// 하나의 화면에 대한 컴포넌트 : VideoGrid.jsx 에서 사용함
// streamManager === 해당유저(나혹은친구들)의 비디오 스트림 설정값 hooks/useOpenVodu 88line 참고
export default function UserVideoComponent({ streamManager }) {
  const videoRef = useRef();

  useEffect(() => {
    // streamManager가 존재하고 video 요소가 마운트되었을 때
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current); // addVideoElement(내장함수) : openVidu가 관리하는 스트림에 추가해줌
    }
  }, [streamManager]);

  return (
    // autoPlay: 스트림 연결 시 자동 재생
    // ref: OpenVidu가 이 video 요소를 제어하기 위한 참조
    <video autoPlay={true} ref={videoRef} className="w-full h-full rounded" />
  );
};
