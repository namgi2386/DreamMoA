// components/video/VideoGrid.jsx
import GridMatrixLayout from "./layouts/GridMatrixLayout";
import SpotlightLayout from "./layouts/SpotlightLayout";
import DynamicGridLayout from "./layouts/DynamicGridLayout";
import MosaicLayout from "./layouts/MosaicLayout";

const VideoGrid = ({
  mainStreamManager,
  publisher,
  subscribers,
  onStreamClick,
  currentLayout,
}) => {
  const renderLayout = () => {
    switch (currentLayout) {
      case "default":
        return (
          <GridMatrixLayout // 2분할 그리드 레이아웃
            mainStreamManager={mainStreamManager}
            publisher={publisher}
            subscribers={subscribers}
            onStreamClick={onStreamClick}
          />
        );
      case "Dynamic":
        return (
          <DynamicGridLayout
            mainStreamManager={mainStreamManager}
            publisher={publisher}
            subscribers={subscribers}
            onStreamClick={onStreamClick}
          />
        );
      case "spotlight":
        return (
          <SpotlightLayout
            mainStreamManager={mainStreamManager}
            publisher={publisher}
            subscribers={subscribers}
            onStreamClick={onStreamClick}
          />
        );
      // teaching 레이아웃은 화면 공유 기능 구현 후 추가 예정
      case "mosaic":
        return (
          <MosaicLayout
            mainStreamManager={mainStreamManager}
            publisher={publisher}
            subscribers={subscribers}
            onStreamClick={onStreamClick}
          />
        );

      default:
        return (
          <DynamicGridLayout
            mainStreamManager={mainStreamManager}
            publisher={publisher}
            subscribers={subscribers}
            onStreamClick={onStreamClick}
          />
        );
    }
  };

  // return <div className="w-full h-[calc(100%-80px)]">{renderLayout()}</div>;  // 부모 요소의 높이
  // return <div className="w-full h-[calc(100vh-200px]">{renderLayout()}</div>;  // viewport 높이 기준으로
  return <>{renderLayout()}</>; // 이렇게 하니까 비디오 밑부분 안 짤리고 스크롤은 되어버림(흰부분 보임)
};

export default VideoGrid;
