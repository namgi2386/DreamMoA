// conponents/video/layouts/GridMatrixLayout.jsx
import UserVideo from "../UserVideo";

// mainStreamManager : 메인 스트림
// publisher         : 자신의 스트림
// subscribers       : 다른 참가자들의 스트림
// onStreamClick     : 스트림 클릭 핸들러

const GridMatrixLayout = ({
  mainStreamManager, // 메인 화면에 표시될 스트림
  publisher, // 자신의 비디오 스트림
  subscribers, // 다른 참가자들의 스트림 배열
  onStreamClick, // 스트림 클릭 시 메인 화면 전환 핸들러
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full p-4">
      {/* 메인 스트림 영역 */}
      <div className="md:col-span-2 bg-gray-800 rounded-lg overflow-hidden h-[calc(100vh-200px)]">
        {mainStreamManager && <UserVideo streamManager={mainStreamManager} />}
      </div>

      {/* 참가자 목록 영역 */}
      <div className="space-y-4 overflow-y-auto h-[calc(100vh-200px)]">
        {/* 자신의 스트림 */}
        {publisher && (
          <div
            onClick={() => onStreamClick(publisher)}
            className="h-48 bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
          >
            <UserVideo streamManager={publisher} />
          </div>
        )}

        {/* 다른 참가자들의 스트림 */}
        {subscribers.map((subscriber) => (
          <div
            key={subscriber.stream.connection.connectionId}
            onClick={() => onStreamClick(subscriber)}
            className="h-48 bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
          >
            <UserVideo streamManager={subscriber} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridMatrixLayout;
