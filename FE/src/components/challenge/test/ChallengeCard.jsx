// components/common/ChallengeCard.jsx
export default function ChallengeCard({ challenge }) {
  const { title, thumbnail, tags, participants } = challenge;

  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* 썸네일 영역 */}
      <div className="relative w-full pt-[75%]"> {/* 4:3 비율 유지 */}
        <img 
          src={thumbnail} 
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

      {/* 콘텐츠 영역 */}
      <div className="p-4">
        {/* 제목 */}
        <h3 className="text-lg font-bold mb-2 truncate">{title}</h3>
        
        {/* 참여자 수 */}
        <p className="text-gray-600 text-sm mb-3">
          현재 {participants}명 참여중
        </p>

        {/* 태그 목록 */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 text-xs rounded-full bg-rose-100 text-rose-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}