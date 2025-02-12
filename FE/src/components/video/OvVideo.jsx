// 기본 비디오 스트림 컴포넌트
import { useEffect, useRef } from "react";

const OvVideo = ({ streamManager }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // streamManager가 존재하고 video 요소가 준비되었을 때
    if (streamManager && videoRef.current) {
      // OpenVidu의 streamManager를 HTML video 요소에 연결
      // 이를 통해 실제 비디오 스트림이 화면에 표시됨
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <video
      autoPlay={true}
      ref={videoRef}
      className="w-full h-full object-cover"
      // className="w-full h-full object-contain bg-black"
      // className="w-full h-full object-contain bg-black aspect-video"
    />
  );
};

export default OvVideo;
