import { useEffect, useState } from "react";
import challengeApi from "/src/services/api/challengeApi";
import ChallengeCard from "/src/components/challenge/test/ChallengeCard";

export default function ChallengeListPage() {
  // 챌린지 목록 상태 관리
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 챌린지 데이터 가져오기
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await challengeApi.getRunningChallengeList();
        console.log(response);
        
        setChallenges(response.data.challenges);
      } catch (err) {
        setError('챌린지 목록을 불러오는데 실패했습니다.');
        console.log("챌린지목록 불러오기실패:",err);
        
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-rose-200 flex items-center justify-center">
        <p className="text-lg">로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-rose-200 flex items-center justify-center">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen w-full bg-rose-200 p-6 md:p-8 lg:p-10">
      {/* 제목 */}
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
        진행 중인 챌린지
      </h1>

      {/* 챌린지 카드 그리드 */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <ChallengeCard 
            key={challenge.challengeId} 
            challenge={challenge}
          />
        ))}
      </div>
    </div>
  );
}