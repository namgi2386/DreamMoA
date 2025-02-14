import { useRecoilValue } from "recoil";
import ChallengeListMyTagSorted from "../../components/challenge/test/ChallengeListMyTagSorted";
import { challengeModalState } from "../../recoil/atoms/challenge/challengeDetailState";
import ChallengeDetailModal from "../../components/challenge/challengelist/ChallengeDetailModal";

export default function ChallengeListPage() {
  const isModalOpen = useRecoilValue(challengeModalState);
  return (
    <div className="min-h-screen w-full bg-white py-12 pl-20 pr-6 ">
      {/* 제목 */}
      <ChallengeListMyTagSorted/>
      <div className="min-h-[140px] bg-white w-full">
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
      {isModalOpen && <ChallengeDetailModal />}
    </div>
  );
}