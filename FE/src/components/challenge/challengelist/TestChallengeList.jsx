// 더미 데이터 예시
const dummyChallenge = {
  imageUrl: "/path/to/image.jpg",
  tags: ["#SSAFY", "#미라클모닝"],
  currentParticipants: 24,
  maxParticipants: 30,
  title: "새벽 챌린지 5시까지",
  hostProfileImage: "/path/to/profile.jpg",
  hostName: "김싸피",
  currentDay: 1,
  endTime: "05:00"
};

// 사용 예시
export const function Test() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <ChallengeDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        challenge={dummyChallenge}
      />
    </>
  );
}