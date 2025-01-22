import { useState } from 'react';

const ToggleButton = ({onToggle}) => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
    onToggle(!isOn); // 토글 상태 변경 시 전달받은 함수 실행
  };

  return (
    <button
      onClick={handleToggle}
      className={`
        w-16 h-8 flex items-center rounded-full p-1 cursor-pointer
        ${isOn ? 'bg-blue-600' : 'bg-gray-300'}
        transition-colors duration-300 ease-in-out
      `}
    >
      <div
        className={`
          bg-white w-6 h-6 rounded-full shadow-md transform
          ${isOn ? 'translate-x-8' : 'translate-x-0'}
          transition-transform duration-300 ease-in-out
        `}
      />
    </button>
  );
};

export default ToggleButton;