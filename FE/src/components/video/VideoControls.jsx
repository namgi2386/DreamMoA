import { IoIosSquareOutline } from "react-icons/io";
import { CiGrid41, CiGrid2H, CiGrid42, CiGrid2V } from "react-icons/ci";
import { BsGrid1X2 } from "react-icons/bs";
import { LuScreenShare, LuScreenShareOff } from "react-icons/lu";
import useOpenViduSetting from "../../hooks/useOpenViduSetting";

export default function VideoControls({
  // sessionName,
  publisher,
  subscribers,
  onLeaveSession,
  currentLayout,
  onLayoutChange,
  isScreenSharing, // 화면공유 여부
  onToggleScreenShare, // 화면공유 토글
}) {
  // 레이아웃 설정
  const layouts = [
    { id: "default", icon: BsGrid1X2, label: "기본" },
    { id: "Dynamic", icon: CiGrid41, label: "Dynamic" },
    { id: "spotlight", icon: IoIosSquareOutline, label: "스포트라이트" },
    { id: "teaching", icon: CiGrid2H, label: "티칭" },
    { id: "mosaic", icon: CiGrid42, label: "모자이크" },
  ];

  // 오디오/비디오 설정 커스텀 훅 사용
  const {
    micVolume,
    speakerVolume,
    isMicMuted,
    isCameraOff,
    adjustMicVolume,
    adjustSpeakerVolume,
    toggleMicMute,
    toggleCamera,
  } = useOpenViduSetting(publisher, subscribers);

  return (
    <div className="flex flex-col gap-4">
      {/* 상단 섹션: 세션명과 레이아웃 컨트롤 */}
      <div className="flex justify-between items-center mb-4">
        {/* 하단 섹션: 오디오/비디오 컨트롤 */}
        <div className="flex gap-4 p-4">
          {/* 마이크 컨트롤 섹션 */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleMicMute}
              className={`p-2 rounded ${
                isMicMuted ? "bg-red-500" : "bg-blue-500"
              } text-white`}
            >
              {isMicMuted ? "마이크 켜기" : "마이크 끄기"}
            </button>
            <div className="flex-1">
              <label className="block mb-1">
                마이크 볼륨: {Math.round(micVolume * 100)}%
              </label>
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
              <label className="block mb-1">
                스피커 볼륨: {Math.round(speakerVolume * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={speakerVolume}
                onChange={(e) =>
                  adjustSpeakerVolume(parseFloat(e.target.value))
                }
                className="w-full"
              />
            </div>
          </div>

          {/* 카메라 컨트롤 섹션 추가 */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleCamera}
              className={`p-2 rounded ${
                isCameraOff ? "bg-red-500" : "bg-blue-500"
              } text-white`}
            >
              {isCameraOff ? "카메라 켜기" : "카메라 끄기"}
            </button>
          </div>

          <button
            onClick={onLeaveSession}
            className="bg-red-600 px-4 py-2 rounded"
          >
            나가기
          </button>
        </div>
        {/* 레이아웃 컨트롤 버튼들 */}
        <div className="flex gap-2 bg-gray-800 p-2 rounded-lg">
          {layouts.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onLayoutChange(id)}
              className={`p-2 rounded-lg transition-all ${
                currentLayout === id
                  ? "bg-my-blue-2 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
              title={label}
            >
              <Icon className="w-6 h-6" />
            </button>
          ))}
        </div>
        {/* 화면 공유 버튼 추가 */}
        <button
          onClick={onToggleScreenShare}
          className={`px-4 py-2 rounded ${
            isScreenSharing ? "bg-red-600" : "bg-blue-600"
          }`}
        >
          {isScreenSharing ? (
            <LuScreenShareOff className="w-6 h-6" />
          ) : (
            <LuScreenShare className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
}
