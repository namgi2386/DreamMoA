import useOpenViduSetting from '../../hooks/useOpenViduSetting';

const VideoControls = ({ publisher, subscribers,onLeaveSession }) => {
  // 오디오 설정 커스텀 훅 사용
  const {
    micVolume,
    speakerVolume,
    isMicMuted,
    isCameraOff,
    adjustMicVolume,
    adjustSpeakerVolume,
    toggleMicMute,
    toggleCamera   
  } = useOpenViduSetting(publisher, subscribers);

  return (
    <div className="flex  gap-4 p-4">
      {/* 마이크 컨트롤 섹션 */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleMicMute}
          className={`p-2 rounded ${
            isMicMuted ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          {isMicMuted ? '마이크 켜기' : '마이크 끄기'}
        </button>
        <div className="flex-1">
          <label className="block mb-1">마이크 볼륨: {Math.round(micVolume * 100)}%</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={micVolume}
            onChange={(e) => adjustMicVolume(parseFloat(e.target.value))}
            className="w-full"
            disabled={isMicMuted}
          />
        </div>
      </div>

      {/* 스피커 컨트롤 섹션 */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block mb-1">스피커 볼륨: {Math.round(speakerVolume * 100)}%</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={speakerVolume}
            onChange={(e) => adjustSpeakerVolume(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* 카메라 컨트롤 섹션 추가 */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleCamera}
          className={`p-2 rounded ${
            isCameraOff ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          {isCameraOff ? '카메라 켜기' : '카메라 끄기'}
        </button>
      </div>

      <button
          onClick={onLeaveSession}
          className="bg-red-600 px-4 py-2 rounded"
        >
          나가기
      </button>
    </div>
  );
};

export default VideoControls;