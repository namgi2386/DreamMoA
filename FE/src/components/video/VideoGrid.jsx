// components/video/VideoGrid.jsx
import VerticalGridLayout from "./layouts/VerticalGridLayout";
import GridMatrixLayout from "./layouts/GridMatrixLayout";
import SpotlightLayout from "./layouts/SpotlightLayout";
import DynamicGridLayout from "./layouts/DynamicGridLayout";

const VideoGrid = ({
  mainStreamManager,
  publisher,
  subscribers,
  onStreamClick,
  currentLayout,
}) => {

  const renderLayout = () => {
    switch (currentLayout) {
      case "grid":
        return (
          <DynamicGridLayout                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
            mainStreamManager={mainStreamManager}
            publisher={publisher}
            subscribers={subscribers}
            onStreamClick={onStreamClick}
          />
        );
        case "vertical-grid":
        return (
          <GridMatrixLayout  // 기존의 2분할 그리드 레이아웃
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
          <GridMatrixLayout  // 기존 GridMatrixLayout을 mosaic 용도로 활용
            mainStreamManager={mainStreamManager}
            publisher={publisher}
            subscribers={subscribers}
            onStreamClick={onStreamClick}
          />
        );

      default:
        return (
          <GridMatrixLayout
            mainStreamManager={mainStreamManager}
            publisher={publisher}
            subscribers={subscribers}
            onStreamClick={onStreamClick}
          />
        );
    }
  };

  return <div className="w-full h-[calc(100%-80px)]">{renderLayout()}</div>;
};

export default VideoGrid;
