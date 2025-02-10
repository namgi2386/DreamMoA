import useOpenViduSetting from '../../hooks/useOpenViduSetting';

export default function VideoControls({ 
  sessionName,
  publisher,
  subscribers,  // subscribers 추가
  onSwitchCamera,
  onLeaveSession
}) {
  // OpenVidu 설정 hook 사용
  const {
    speakerVolume,
    micVolume,
    isVideoEnabled,
    handleSpeakerVolume,
    handleMicVolume,
    toggleVideo
  } = useOpenViduSetting(publisher, subscribers);

  return (
    <div className="flex justify-between items-center mb-4 p-4 bg-gray-800 rounded-lg">
      <h1 className="text-xl">세션: {sessionName}</h1>
      
      <div className="flex items-center space-x-6">
        {/* 스피커 볼륨 조절 */}
        <div className="flex items-center">
          <span className="mr-2">🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={speakerVolume}
            onChange={(e) => handleSpeakerVolume(parseFloat(e.target.value))}
            className="w-24"
          />
        </div>

        {/* 마이크 음량 조절 */}
        <div className="flex items-center">
          <span className="mr-2">🎤</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={micVolume}
            onChange={(e) => handleMicVolume(parseFloat(e.target.value))}
            className="w-24"
          />
        </div>

        {/* 카메라 ON/OFF 버튼 */}
        <button
          onClick={toggleVideo}
          className={`px-4 py-2 rounded ${
            isVideoEnabled ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {isVideoEnabled ? '카메라 ON' : '카메라 OFF'}
        </button>

        {/* 기존 버튼들 */}
        <button
          onClick={onSwitchCamera}
          className="bg-green-600 px-4 py-2 rounded"
        >
          카메라 전환
        </button>
        <button
          onClick={onLeaveSession}
          className="bg-red-600 px-4 py-2 rounded"
        >
          나가기
        </button>
      </div>
    </div>
  );
}