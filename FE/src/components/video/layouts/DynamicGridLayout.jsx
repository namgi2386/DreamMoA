import UserVideo from "../UserVideo";

const DynamicGridLayou = ({
  mainStreamManager,
  publisher,
  subscribers,
  onStreamClick,
}) => {
  // 모든 스트림을 하나의 배열로 결합
  const allStreams = publisher ? [publisher, ...subscribers] : subscribers;
  
  // 참가자 수에 따른 그리드 열 수 계산
  const getGridColumns = (count) => {
    if (count <= 1) return 1;
    if (1 < count <= 2) return 2;
    if (count <= 9) return 3;
    return 4; // 10-12명
  };

  // 참가자 수에 기반한 동적 그리드 스타일 계산
  const gridColumns = getGridColumns(allStreams.length);
  
  // 그리드 아이템의 높이 계산 (참가자 수에 따라 조정)
  const getGridItemHeight = (count) => {
    if (count <= 1) return 'h-full';
    if (count <= 4) return 'h-[45vh]';
    if (count <= 9) return 'h-[30vh]';
    return 'h-[22vh]'; // 10-12명
  };

  return (
    <div className="h-full p-4 overflow-hidden">
      <div 
        className={`grid gap-4 h-full
          ${gridColumns === 1 ? 'grid-cols-1' : ''}
          ${gridColumns === 2 ? 'grid-cols-2' : ''}
          ${gridColumns === 3 ? 'grid-cols-3' : ''}
          ${gridColumns === 4 ? 'grid-cols-4' : ''}
        `}
      >
        {allStreams.map((stream) => (
          <div
            key={stream.stream?.connection?.connectionId || 'publisher'}
            onClick={() => onStreamClick(stream)}
            className={`
              ${getGridItemHeight(allStreams.length)}
              bg-gray-800 
              rounded-lg 
              overflow-hidden 
              cursor-pointer 
              hover:ring-2 
              hover:ring-my-blue-2 
              transition-all
              relative
            `}
          >
            <UserVideo streamManager={stream} />
            {/* 사용자 이름 오버레이 */}
            {/* <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
              {stream.stream?.connection?.data
                ? JSON.parse(stream.stream.connection.data).clientData
                : '나'}
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicGridLayou;