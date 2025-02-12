import { useState, useEffect } from "react";
import TestChallengeList from "../challenge/challengelist/TestChallengeList";
// import mypagechallenge1 from "/src/assets/test/mypagechallenge1.png";
// import mypagechallenge2 from "/src/assets/test/mypagechallenge2.png";
// import mypagechallenge3 from "/src/assets/test/mypagechallenge3.png";
// import mypagechallenge4 from "/src/assets/test/mypagechallenge4.png";
import challengeApi from "../../services/api/challengeApi";

// 임시 이미지를 위한 import - 나중에 실제 이미지로 교체 필요
import defaultChallengeImage from "/src/assets/default/defaultChallengePicture.png";

export default function ChallengeImages() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 컴포넌트 마운트 시 챌린지 데이터 가져오기
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await challengeApi.getMyParticipatingChallenges();
        // 최대 7개까지만 표시
        setChallenges(
          data.slice(0, 7).map((challenge) => ({
            ...challenge,
            id: challenge.challengeId, // id 매핑
            src: defaultChallengeImage, // 기본 이미지 설정
            isOn: challenge.isActive, // 활성화 상태 매핑
          }))
        );
      } catch (error) {
        console.error("챌린지 로딩 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const handleImageClick = (item) => {
    console.log(`Clicked challenge no.${item.id}`);
    setSelectedChallenge(item);
    setIsModalOpen(true);
  };

  // 로딩 중일 때 표시할 스켈레톤 UI
  if (isLoading) {
    return <div className="animate-pulse">로딩 중...</div>;
  }

  // const challengeImages = [
  //   {
  //     id: 1,
  //     src: mypagechallenge1,
  //     isOn: true,
  //     title: "새벽 챌린지 5시까지 공부중",
  //   },
  //   { id: 2, src: mypagechallenge2, isOn: false, title: "알고리즘 스터디방" },
  //   { id: 3, src: mypagechallenge4, isOn: true, title: "독서 챌린지" },
  //   {
  //     id: 4,
  //     src: mypagechallenge3,
  //     isOn: false,
  //     title: "4시 미라클모닝! 해보쟈구",
  //   },
  // ];

  return (
    <>
      <div
        className={`rounded-3xl bg-white border-2 border-gray-300
                py-12 grid duration-500
                grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                gap-6 md:gap-8 lg:gap-12
                px-6 sm:px-12 md:px-16 lg:px-24`}
      >
        {/* {challengeImages?.map((item) => (
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
                onClick={() => handleImageClick(item)}
                className="w-full h-full border rounded-xl object-cover
                transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>
        ))}
      </div> */}
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
      <TestChallengeList
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedChallenge={selectedChallenge}
      />
    </>
  );
}
