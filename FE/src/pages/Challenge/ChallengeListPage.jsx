import ChallengeListMyTagSorted from "../../components/challenge/test/ChallengeListMyTagSorted";

export default function ChallengeListPage() {
  
  return (
    <div className="min-h-screen w-full bg-white py-12 pl-20 pr-6 ">
      {/* 제목 */}
      <ChallengeListMyTagSorted/>
      <div className="min-h-[140px] bg-red-200 w-full">
        랭킹
      </div>
      <div className="min-h-[210px] bg-red-300 w-full">
        태그검색
      </div>
      <div className="min-h-[480px] bg-red-400 w-full">
        진행중
      </div>
      <div className="min-h-[480px] bg-red-500 w-full">
        모집중
      </div>
      <div className="min-h-[480px] bg-red-600 w-full">
        전체보기
      </div>
    </div>
  );
}