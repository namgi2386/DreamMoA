// components/video/VideoGrid.jsx
import { useState } from 'react';
import GridMatrixLayout from './layouts/GridMatrixLayout';
import SpotlightLayout from './layouts/SpotlightLayout';
import LayoutController from './layouts/LayoutController';

const VideoGrid = ({ mainStreamManager, publisher, subscribers, onStreamClick }) => {
  // 기본 레이아웃은 그리드
  const [currentLayout, setCurrentLayout] = useState('grid');

  const renderLayout = () => {
    switch (currentLayout) {
      case 'grid':
        return (
          <GridMatrixLayout
            mainStreamManager={mainStreamManager}
            publisher={publisher}
            subscribers={subscribers}
            onStreamClick={onStreamClick}
          />
        );
      case 'spotlight':
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

  return (
    <div className="relative w-full h-[calc(100%-80px)]">
      <LayoutController
        currentLayout={currentLayout}
        onLayoutChange={setCurrentLayout}
      />
      {renderLayout()}
    </div>
  );
};

export default VideoGrid;