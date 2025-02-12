import OvVideo from './OvVideo';

const UserVideo = ({ streamManager }) => {
  // streamManager로부터 사용자 이름 추출하는 헬퍼 함수
  const getNicknameTag = () => {
    // 연결된 클라이언트 데이터에서 사용자 이름을 가져옴
    if (!streamManager) return '';
    const { clientData } = JSON.parse(streamManager.stream.connection.data);
      // clientData를 파싱하여 originalName만 추출
  const userData = JSON.parse(clientData);
  return userData.originalName;
  };
 
  return (
    <div className="relative w-full h-full">
      {/* 기본 비디오 스트림 표시 */}
      <OvVideo streamManager={streamManager} />
      
      {/* 사용자 이름 오버레이 */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-2 py-1 rounded text-white">
        {getNicknameTag()}
      </div>
    </div>
  );
};

export default UserVideo;