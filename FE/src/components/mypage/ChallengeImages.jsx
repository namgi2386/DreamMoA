import { useState, useEffect } from "react";
// import TestChallengeList from "../challenge/challengelist/TestChallengeList";
import challengeApi from "../../services/api/challengeApi";
// 기본 이미지
import defaultChallengeImage from "/src/assets/default/defaultChallengePicture.png";
import ChallengeDetailModal from "../challenge/challengelist/ChallengeDetailModal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { challengeModalState, selectedChallengeState } from "../../recoil/atoms/challenge/challengeDetailState";

export default function ChallengeImages() {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isModalOpen = useRecoilValue(challengeModalState);
  const setModalOpen = useSetRecoilState(challengeModalState);
  const setSelectedChallenge = useSetRecoilState(selectedChallengeState);


  // 컴포넌트 마운트 시 챌린지 데이터 가져오기
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await challengeApi.getMyParticipatingChallenges();
        // 최대 7개까지만 표시, 이미지 URL 있으면 사용, 없으면 기본 이미지
        setChallenges(data.slice(0, 7).map(challenge => ({
          ...challenge,
          id: challenge.challengeId,
          // thumbnailUrl이 있으면 해당 URL 사용, 없으면 기본 이미지 사용
          src: challenge.thumbnailUrl 
            ? `${import.meta.env.VITE_APP_API_URL}${challenge.thumbnailUrl}`
            : defaultChallengeImage,
          isOn: challenge.isActive
        })));
      } catch (error) {
        console.error('챌린지 로딩 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const handleImageClick = async (item) => {
    console.log(`Clicked challenge no.${item.id}`);
    try {
      // 챌린지 상세 정보 불러오기
      const response = await challengeApi.getChallengeDetailInfo(item.id);
      
      // 상세 정보를 Recoil 상태에 저장
      setSelectedChallenge(response.data);
      
      // 모달 열기
      console.log(response.data);
      
      setModalOpen(true);
      
    } catch (error) {
      console.error('챌린지 상세 정보 로딩 실패:', error);
    }
  };

  // 로딩 중일 때 표시할 스켈레톤 UI
  if (isLoading) {
    return <div className="animate-pulse">로딩 중...</div>;
  }

  return (
    <>
      <div
        className={`rounded-3xl bg-white border-2 border-gray-300
                py-12 grid duration-500
                grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                gap-6 md:gap-8 lg:gap-12
                px-6 sm:px-12 md:px-16 lg:px-24`}
      >
        {challenges?.map((item) => (
          <div key={item.id} className="cursor-pointer relative">
            <h3 className="text-xl truncate">{item.title}</h3>
            <div
              id="onoff"
              className={`w-6 h-6 rounded-full ring-2 ring-white
                absolute top-5 -right-2 z-10 duration-300
                ${
                  item.isOn
                    ? "bg-green-400 hover:bg-green-500"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
            />
            <div className="aspect-video overflow-hidden rounded-xl">
              <img
                src={item.src}
                alt={item.title}
                onClick={() => handleImageClick(item)}
                className="w-full h-full border rounded-xl object-cover
                transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>
        ))}
      </div>
      {/* 챌린지 상세모달 */}
      {/* <TestChallengeList
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedChallenge={selectedChallenge}
      /> */}
      {isModalOpen && <ChallengeDetailModal />}
    </>
  );
}
