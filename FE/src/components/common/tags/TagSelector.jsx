// components/common/TagSelector.jsx
import { useRecoilState } from "recoil";
import { selectedTagsState } from "/src/recoil/atoms/tags/selectedTagsState";

// export default function TagSelector({bgcolor , tagcolor , hovercolor , clickcolor }) {
// 이런식으로 변경하여 공통컴포넌트로 사용가능

export default function TagSelector() {
  // recoil 상태관리
  const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);

  const tags = [
    { id: 1, name: "공무원" },
    { id: 2, name: "토익" },
    { id: 3, name: "자격증" },
    { id: 4, name: "공시생" },
    { id: 5, name: "NCS" },
    { id: 6, name: "9 to 6" },
    { id: 7, name: "이직준비" },
    { id: 8, name: "직장인" },
    { id: 9, name: "학생" },
    { id: 10, name: "30일챌린지" },
    { id: 11, name: "면접준비" },
    { id: 12, name: "독서모임" },
    { id: 13, name: "습관" },
    { id: 14, name: "개발자" },
    { id: 15, name: "미라클모닝" },
    { id: 16, name: "취준생" },
  ];

  // 태그 클릭시!!!!
  const handleTagClick = (tag) => {
    //selectedTags == 선택한 태그들 저장 중
    if (selectedTags.includes(tag.name)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag.name)); // 선택했던거 제거 (이름기준->id변경가능)
    } else {
      setSelectedTags([...selectedTags, tag.name]); // 안한거면 추가
    }
  };

  return (
    <div className="w-full bg-yellow-50 rounded-lg p-4">
      {/* 태그 목록을 map으로 순회하며 버튼 생성 */}
      <div
        className={`
      flex flex-nowrap overflow-x-auto overflow-y-hidden gap-2
      lg:grid lg:grid-cols-8 lg:auto-rows-auto lg:gap-2 lg:overflow-x-auto lg:overflow-y-hidden lg:gap-y-4          `}
      >
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => handleTagClick(tag)}
            className={`
                  flex-shrink-0
                  px-3 py-1.5 rounded-full text-sm
                  transition-all duration-200 ease-in-out
                  hover:scale-105 whitespace-nowrap
                  ${
                    selectedTags.includes(tag.name)
                      ? "bg-my-blue-4 text-white"
                      : "bg-yellow-50 text-my-blue-1 hover:bg-blue-200"
                  }
                `}
          >
            # {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
}
