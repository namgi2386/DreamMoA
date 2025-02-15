import { useRecoilValue } from "recoil";
import ChallengeListMyTagSorted from "../../components/challenge/challengeMainList/ChallengeListMyTagSorted";
import { challengeModalState } from "../../recoil/atoms/challenge/challengeDetailState";
import ChallengeDetailModal from "../../components/challenge/challengelist/ChallengeDetailModal";
import ChallengeListSearchSection from "../../components/challenge/challengeMainList/ChallengeListSearchSection";
import ChallengeListSearchResultSection from "../../components/challenge/challengeMainList/ChallengeListSearchResultSection";

export default function ChallengeListPage() {
  const isModalOpen = useRecoilValue(challengeModalState);
  return (
    <div className="min-h-screen w-full bg-white py-12 pl-20 pr-6 ">
      {/* 내 태그기반 챌린지리스트 */}
      <ChallengeListMyTagSorted/>

      {/* 챌린지 검색창+태그창 */}
      <ChallengeListSearchSection/>
      {/* 챌린지리스트 결과전부 */}
      <ChallengeListSearchResultSection/> 

      {isModalOpen && <ChallengeDetailModal />}
    </div>
  );
}