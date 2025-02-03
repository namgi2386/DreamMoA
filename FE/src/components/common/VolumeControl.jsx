import { useState } from 'react';

const VolumeControl = ({ onChange }) => {
  const [volume, setVolume] = useState(50);
  
  const handleChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    onChange?.(newVolume);
  };

  return (
    <div className="w-64 flex items-center gap-2 p-4">
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleChange}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer
        bg-gradient-to-r from-my-blue-4 from-[length:var(--volume-percent)] to-gray-200 to-[length:var(--volume-percent)]
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:w-4
        [&::-webkit-slider-thumb]:h-4
        [&::-webkit-slider-thumb]:bg-white
        [&::-webkit-slider-thumb]:border-2
        [&::-webkit-slider-thumb]:border-solid
        [&::-webkit-slider-thumb]:border-my-blue-4
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:hover:bg-my-blue-3"
        style={{ '--volume-percent': `${volume}%` }}
      />
      <span className="text-sm font-medium w-8">{volume}%</span>
    </div>
  );
};

export default VolumeControl;