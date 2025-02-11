import { useState, useRef, useEffect } from "react";

export default function PostTags({ tags = [], setTags }) {
  const [tagInput, setTagInput] = useState(""); // 태그 입력 필드 상태
  const [isTooltipVisible, setIsTooltipVisible] = useState(false); // 🟢 입력창 클릭 시 메모지 표시
  const inputRef = useRef(null); // 태그 입력창을 감지하기 위한 ref

  // 🟢 태그 추가 함수
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const newTag = tagInput.trim();

      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]); // 태그 리스트에 추가
      }

      setTagInput(""); // 입력창 초기화
    }

    if (e.key === "Backspace" && tagInput === "") {
      setTags(tags.slice(0, -1)); // 마지막 태그 삭제
    }
  };

  // 🟢 태그 삭제 함수
  const handleTagClick = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // 🟢 입력창 외부 클릭 시 메모지 숨김
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsTooltipVisible(false); // 입력창 외부 클릭 시 툴팁 숨김
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative bg-gray-100 p-3 rounded-lg shadow-md">
      {/* 태그 목록 */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm cursor-pointer hover:bg-red-300 transition"
            onClick={() => handleTagClick(tag)} // 🟢 클릭 시 삭제
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 태그 입력 필드 */}
      <input
        ref={inputRef}
        type="text"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsTooltipVisible(true)} // 🟢 클릭 시 메모지 표시
        placeholder="태그를 추가하세요"
        className="mt-2 w-full p-2 border border-gray-300 rounded"
      />

      {/* 🟢 태그 입력 필드 클릭 시 나타나는 메모지 (위치 조정) */}
      {isTooltipVisible && (
        <div className="absolute bottom-[-40px] left-0 w-48 bg-gray-800 text-white text-xs p-2 rounded shadow-lg transition-opacity duration-200 opacity-100">
          💡 태그 입력 후 Enter 또는 Space 키를 누르세요!
        </div>
      )}
    </div>
  );
}
