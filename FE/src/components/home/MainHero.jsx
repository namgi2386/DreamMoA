import { useEffect, useState } from "react";
import { homeApi } from "../../services/api/homeApi";

// 랜덤한 별 생성
const generateStars = (count) => {
  return Array.from({ length: count }, () => ({
    width: Math.random() * 3 + 1, // 1-4px 크기의 별
    left: Math.random() * 100, // 0-100% 위치
    top: Math.random() * 100, // 0-100% 위치
    delay: Math.random() * 3, // 0-3초 딜레이
  }));
};

// 밤하늘 별 생성 (200개의 별)
const stars = generateStars(200);

// 별 빛나는 배경 컴포넌트
const StarryBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {stars.map((star, i) => (
      <div
        key={i}
        className="absolute bg-white/70 rounded-full animate-twinkle"
        style={{
          width: `${star.width}px`,
          height: `${star.width}px`,
          left: `${star.left}%`,
          top: `${star.top}%`,
          animationDelay: `${star.delay}s`,
        }}
      />
    ))}
  </div>
);

const MainHero = () => {
  // 총 스크린 타임 관리할 상태
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    // 초기 데이터 로딩
    const fetchTotalScreenTime = async () => {
      try {
        const totalMinutes = await homeApi.getTotalScreenTime();
        // 분 단위를 시간 단위로 변환 (소수점 첫째자리까지 표시)
        const hoursValue = Number((totalMinutes / 60).toFixed(1));
        setTotalHours(hoursValue);
      } catch (error) {
        console.error("Error fetching total screen time:", error);
        // 에러 시 기본값도 시간 단위로 변환 (150000분 → 2500시간)
        setTotalHours(2500);
      }
    };

    fetchTotalScreenTime();
    const interval = setInterval(fetchTotalScreenTime, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen bg-gradient-to-b from-hmy-blue-1 to-my-blue-1 text-white overflow-hidden">
      <StarryBackground />

      <div className="container mx-auto h-full px-10 flex items-center justify-center">
        <div className="text-center space-y-8 z-10">
          <h1 className="font-bold text-my-yellow">
            <span className="text-[66px] block mb-0 tracking-wider">
              우리의 꿈이 모인지
            </span>
            <div className="whitespace-nowrap block -mt-5">
              <span className="text-[135px] tracking-wider inline-block animate-sparkle">
                {totalHours.toLocaleString()}
              </span>
              <span className="text-[98px] tracking-wider inline-block">
                시간째
              </span>
            </div>
          </h1>
          <div className="flex items-center justify-center whitespace-nowrap mt-12">
            <span className="text-[32px] text-my-blue-3 font-bold tracking-wider">
              dreammoa
            </span>
            <span className="text-[26px] text-my-blue-3 ml-2 tracking-wider">
              에서 당신의 꿈을 이뤄보세요
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MainHero;
