import { useRef, useEffect, useState, useCallback } from "react"; // useState 추가
import { useRecoilState } from "recoil";
import { challengeSelectedTagsState } from "/src/recoil/atoms/tags/selectedTagsState";

export default function TagSelector() {
  const [selectedTags, setSelectedTags] = useRecoilState(challengeSelectedTagsState);
  const containerRef = useRef(null);
  // 직접 입력을 위한 상태 추가
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [customTag, setCustomTag] = useState("");
  const inputRef = useRef(null);

  const tags = [
    { id: 1, name: "공무원" },
    { id: 2, name: "토익" },
    { id: 3, name: "자격증" },
    { id: 4, name: "공시생" },
    { id: 5, name: "NCS" },
    { id: 6, name: "9to6" },
    { id: 7, name: "직장인" },
    { id: 8, name: "학생" },
    { id: 9, name: "30일챌린지" },
    { id: 10, name: "면접준비" },
    { id: 11, name: "독서모임" },
    { id: 12, name: "습관" },
    { id: 13, name: "개발자" },
    { id: 14, name: "미라클모닝" },
    { id: 15, name: "취준생" },
    { id: 17, name: "이직준비" },     // 커리어 전환 준비자
    { id: 18, name: "스터디그룹" },   // 함께 공부하는 그룹 활동
    { id: 19, name: "알고리즘" },     // 개발자 전공 학습
    { id: 20, name: "자소서" },       // 취업 준비 필수 요소
    { id: 21, name: "경력직" },       // 현직자 타겟
    { id: 22, name: "건강" }, // 본업 외 부가적인 프로젝트
    { id: 23, name: "포트폴리오" },   // 경력 관리
    { id: 24, name: "취업" },       // 개발 분야 구체화
    { id: 25, name: "멘토링" },       // 지식/경험 공유
    { id: 26, name: "영어회화" },     // 어학 능력 향상
    { id: 27, name: "식단관리" },     // 건강한 생활습관
    { id: 28, name: "공인중계사" },       // 지식 공유 및 기록
    { id: 29, name: "재테크" },       // 자기계발의 재무적 측면
    { id: 30, name: "자기계발" },         // 글쓰기 능력 향상
    { id: 31, name: "학업" },   // IT 직무 관련
    { id: 32, name: "동기부여" },      // 자기계발 동기 부여
    { id: 16, name: "직접 입력" }, // 마지막 태그는 직접 입력 필드
  ];

  // 가로 스크롤
  const handleWheel = useCallback((e) => {
    if (!containerRef.current) return;

    const scrollableElement = containerRef.current.querySelector(
      '[class*="flex flex-nowrap"]'
    );
    if (!scrollableElement) return;

    const isScrollable =
      scrollableElement.scrollWidth > scrollableElement.clientWidth;

    if (isScrollable && e.deltaY !== 0) {
      const scrollAmount = e.deltaY;
      const currentScroll = scrollableElement.scrollLeft;
      const maxScroll =
        scrollableElement.scrollWidth - scrollableElement.clientWidth;

      if (
        (currentScroll <= 0 && scrollAmount < 0) ||
        (currentScroll >= maxScroll && scrollAmount > 0)
      ) {
        return;
      }

      scrollableElement.scrollLeft += scrollAmount;
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preventScroll = (e) => {
      if (e.target === container || container.contains(e.target)) {
        e.preventDefault();
      }
    };

    container.addEventListener("wheel", preventScroll, { passive: false });

    return () => {
      container.removeEventListener("wheel", preventScroll);
    };
  }, []);

  // 직접 입력 모드 시작
  const startCustomInput = () => {
    setIsCustomInput(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // 태그 직접 입력 처리
  const handleCustomTagSubmit = (e) => {
    if (e.key === "Enter" && customTag.trim()) {
      // 띄어쓰기 제거
      const formattedTag = customTag.trim().replace(/\s+/g, "");

      if (selectedTags.length < 3) {
        setSelectedTags([...selectedTags, formattedTag]);
        setCustomTag("");
        setIsCustomInput(false);
      }
    } else if (e.key === "Escape") {
      setIsCustomInput(false);
      setCustomTag("");
    }
  };

  // 태그 클릭시!!!!
  const handleTagClick = (tag) => {
    if (tag.name === "직접 입력") {
      startCustomInput();
      return;
    }

    if (selectedTags.includes(tag.name)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag.name));
    } else {
      // 3개 이상 선택 방지
      if (selectedTags.length >= 3) return;
      setSelectedTags([...selectedTags, tag.name]);
    }
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      className="w-full bg-yellow-50 rounded-lg p-8"
    >
      {/* 태그 목록을 map으로 순회하며 버튼 생성 */}
      <div
        className={`
          flex flex-nowrap overflow-x-auto overflow-y-hidden gap-2 py-4
          lg:grid lg:grid-cols-8 lg:auto-rows-auto lg:gap-2 lg:overflow-x-auto lg:overflow-y-hidden lg:gap-y-4
          scroll-smooth touch-pan-x
        `}
      >
        {tags.map((tag) => {
          if (tag.name === "직접 입력" && isCustomInput) {
            return (
              <div
                key={tag.id}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-sm bg-yellow-50 has-[input:focus]:bg-my-blue-4 "
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value)}
                  onKeyDown={handleCustomTagSubmit}
                  placeholder="# 직접 입력"
                  className="w-full  bg-transparent outline-none text-my-blue-1 placeholder-gray-400 focus:placeholder-white focus:text-white "
                  maxLength={10}
                />
              </div>
            );
          }

          return (
            <button
              key={tag.id}
              onClick={() => handleTagClick(tag)}
              className={`
                flex-shrink-0
                px-3 py-1.5 rounded-full text-sm
                transition-all duration-200 ease-in-out
                 whitespace-nowrap
                ${
                  selectedTags.includes(tag.name)
                    ? "bg-my-blue-4 text-white"
                    : "bg-yellow-50 text-my-blue-1 hover:bg-blue-300"
                }
              `}
            ><div className="transition-all duration-200 ease-in-out hover:scale-105">
              # {tag.name}
            </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
