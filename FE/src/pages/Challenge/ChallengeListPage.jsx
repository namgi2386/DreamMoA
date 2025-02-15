import { useRecoilValue } from "recoil";
import ChallengeListMyTagSorted from "../../components/challenge/challengeMainList/ChallengeListMyTagSorted";
import { challengeModalState } from "../../recoil/atoms/challenge/challengeDetailState";
import ChallengeDetailModal from "../../components/challenge/challengelist/ChallengeDetailModal";
import ChallengeListSearchSection from "../../components/challenge/challengeMainList/ChallengeListSearchSection";
import ChallengeListSearchResultSection from "../../components/challenge/challengeMainList/ChallengeListSearchResultSection";
import { isHideSideState } from "../../recoil/atoms/SidebarState";

export default function ChallengeListPage() {
  const isModalOpen = useRecoilValue(challengeModalState);
  const isHideSidebar = useRecoilValue(isHideSideState);
  return (
    <div className={`min-h-screen w-full bg-white py-12 ${isHideSidebar ? 'pl-6':'pl-20'}  pr-6 transition-[padding] ease-in-out duration-300`}>
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