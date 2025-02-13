// components/common/ChallengeCard.jsx
export default function ChallengeCard({ challenge }) {
  const { title, thumbnail, tags } = challenge;

  const cardDetail = () => {
    console.log(title);
    console.log(challenge);
    
    
  }

  return (
    <div className="w-[300px] flex-shrink-0 "
    onClick={cardDetail}> {/* 카드 너비 고정 및 축소 방지 */}
      <div className="w-full h-[200px] rounded-lg overflow-hidden hover:scale-105 transition duration-200 ease-in"> {/* 고정 높이 설정 */}
        {/* 태그 영역 */}
        <div className="pb-1 pl-2 flex flex-wrap gap-1.5">
          {tags.slice(0, 2).map((tag, index) => (
            <span 
            key={index}
            className="px-2 py-0.5 text-md font-medium rounded-md bg-my-blue-1 text-white"
            >
              #{tag}
            </span>
          ))}
        </div>
        {/* 썸네일 이미지 */}
        <div className="h-[150px] flex  flex-col bg-cover bg-center bg-no-repeat rounded-xl "
          style={{ backgroundImage: `url(${thumbnail})` }}>
          {/* 제목 영역 - 맨 아래로 밀어내기 위해 margin-top: auto 사용 */}
          <div className="mt-auto pl-2 py-1 bg-black bg-black/70">
            <h3 className="text-white text-xl font-medium line-clamp-2 ">
              {title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}