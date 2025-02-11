// components/video/VideoGrid.jsx
import { useState } from "react";
import GridMatrixLayout from "./layouts/GridMatrixLayout";
import SpotlightLayout from "./layouts/SpotlightLayout";

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
          <GridMatrixLayout
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
      // 다른 레이아웃들은 추후 추가
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
