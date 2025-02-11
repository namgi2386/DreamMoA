// sessionName : 현재 세션(방) 이름
// onSwitchCamera : 카메라 전환 함수
// onLeaveSession : 세션 나가기 함수

import { IoIosSquareOutline } from "react-icons/io";
import { CiGrid41, CiGrid2H, CiGrid42, CiGrid2V } from "react-icons/ci";
import { BsGrid1X2 } from "react-icons/bs";

export default function VideoControls({
  sessionName,
  onSwitchCamera,
  onLeaveSession,
  currentLayout,
  onLayoutChange
}) {
  const layouts = [
    { id: 'vertical-grid', icon: BsGrid1X2, label: '기본' },
    { id: 'grid', icon: CiGrid41, label: '그리드' },
    { id: 'spotlight', icon: IoIosSquareOutline, label: '스포트라이트' },
    { id: 'teaching', icon: CiGrid2H, label: '티칭' },
    { id: 'mosaic', icon: CiGrid42, label: '모자이크' }
  ];

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl">세션: {sessionName}</h1>
      <div className="flex items-center gap-4">
        {/* 레이아웃 컨트롤 버튼들 */}
        <div className="flex gap-2 bg-gray-800 p-2 rounded-lg">
          {layouts.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onLayoutChange(id)}
              className={`p-2 rounded-lg transition-all ${
                currentLayout === id 
                  ? 'bg-my-blue-2 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              title={label}
            >
              <Icon className="w-6 h-6" />
            </button>
          ))}
        </div>
        
        {/* 기존 컨트롤 버튼들 */}
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