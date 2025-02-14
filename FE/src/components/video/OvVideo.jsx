// 기본 비디오 스트림 컴포넌트
import { useEffect, useRef} from "react";
import { useRecoilState } from "recoil";
import { scriptOnOffState } from "../../recoil/atoms/challenge/ai/scriptState";

const OvVideo = ({ streamManager,isMainStream }) => {
  const videoRef = useRef(null);
  const [scriptOnOff , setScriptOnOff] = useRecoilState(scriptOnOffState);

  const getNicknameTag = () => {
    if (!streamManager) return '';
    const { clientData } = JSON.parse(streamManager.stream.connection.data);
    const userData = JSON.parse(clientData);
    console.log(streamManager);
    
    return userData.originalName;
  };

  useEffect(() => {
    // streamManager가 존재하고 video 요소가 준비되었을 때
    if (streamManager && videoRef.current) {
      // OpenVidu의 streamManager를 HTML video 요소에 연결
      // 이를 통해 실제 비디오 스트림이 화면에 표시됨
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <>
    <div className="relative h-full"> {/* video를 감싸는 컨테이너 추가 */}
      <video
        autoPlay={true}
        ref={videoRef}
        className="h-full object-cover rounded-xl"
      />
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-2 py-1 rounded text-white">
        {getNicknameTag()}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-2 py-1 rounded text-white">
        {scriptOnOff && isMainStream &&<>
          여기안에 자막넣기 
        </>}
      </div>
    </div>
    </>
  );
};

export default OvVideo;
