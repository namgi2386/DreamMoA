// sessionName : 현재 세션(방) 이름
// onSwitchCamera : 카메라 전환 함수
// onLeaveSession : 세션 나가기 함수
export default function VideoControls({ sessionName,onSwitchCamera,onLeaveSession}) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl">세션: {sessionName}</h1>
      <div className="space-x-4">
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
};