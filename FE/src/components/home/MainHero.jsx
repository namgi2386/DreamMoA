// 랜덤한 별을 생성하는 유틸리티 함수
const generateStars = (count) => {
  return Array.from({ length: count }, () => ({
    width: Math.random() * 3 + 1, // 1-4px 크기의 별
    left: Math.random() * 100, // 0-100% 위치
    top: Math.random() * 100, // 0-100% 위치
    delay: Math.random() * 3, // 0-3초 딜레이
  }));
};

// 밤하늘의 별 생성 (200개의 별)
const stars = generateStars(200);

// 별이 빛나는 배경 컴포넌트
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

const MainHero = ({ totalHours }) => {
  return (
    <section className="relative h-screen bg-gradient-to-b from-hmy-blue-1 to-my-blue-1 text-white overflow-hidden">
      <StarryBackground />

      <div className="container mx-auto h-full px-10 flex items-center justify-center">
        <div className="text-center space-y-8 z-10">
          <h1 className="font-bold text-my-yellow">
            {/* tracking-wider로 자간 증가, mb-1에서 mb-0.5로 간격 감소 */}
            <span className="text-[66px] block mb-0.5 whitespace-nowrap tracking-wider">
              우리의 꿈이 모인지
            </span>
            <span className="text-[106px] block whitespace-nowrap tracking-wider">
              {totalHours.toLocaleString()}시간째
            </span>
          </h1>
          <div className="flex items-center justify-center whitespace-nowrap mt-12">
            {/* tracking-wider로 자간 증가 */}
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
