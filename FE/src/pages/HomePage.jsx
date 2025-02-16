import { useState } from "react";
import MainHero from "../components/home/MainHero";
import ServiceHighlight from "../components/home/ServiceHighlight";
// import AIFeatureSection from "../components/home/AIFeatureSection";
import ChallengeCarousel from "../components/home/challengeSection/ChallengeCarousel";
import { useSocialLogin } from "../hooks/useSocialLogin";
import HomeCommunity from "../components/home/homeCommunitySection/HomeCommunity";
import SplashScreen from "../components/home/SplashScreen";
// import TopLine from "../components/home/topLineSection/TopLine";
// import VideoSection from "../components/home/videoSection/VideoSection";
import ReviewGradation from "../components/home/ReviewSection/ReviewGradation";

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


export default function HomePage() {
  const [showSplash, setShowSplash] = useState(() => {
    // 오늘 날짜를 'YYYY-MM-DD' 형식으로 가져옵니다
    const today = new Date().toISOString().split('T')[0];
    // localStorage에서 마지막으로 스플래시 스크린을 본 날짜를 가져옵니다
    const lastSplashDate = localStorage.getItem('lastSplashDate');
    
    // 오늘 처음 방문했다면 스플래시 스크린을 보여줍니다
    return lastSplashDate !== today;
  });

  const [totalHours, setTotalHours] = useState(0);

  useSocialLogin();

  const handleSplashComplete = () => {
    // 스플래시 스크린이 끝나면 오늘 날짜를 저장합니다
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('lastSplashDate', today);
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && (
        <SplashScreen
          onComplete={handleSplashComplete}
          setFinalHours={setTotalHours}
        />
      )}
      {/* <SplashScreen
        onComplete={handleSplashComplete}
        setFinalHours={setTotalHours}
      /> */}
      <div>
        
        {/* <TopLine /> */}
        <MainHero totalHours={totalHours} />
        <div className="snap-start">
          {/* <StarryBackground /> */}
          <HomeCommunity />
        </div>
        <div className="snap-start">
          <ServiceHighlight />
        </div>
        <section className="w-full py-16 snap-start bg-my-blue-3">
          <div className="container mx-auto px-4 bg-my-blue-3">
            <div className="mb-8">
              <h2 className="text-3xl tracking-wider font-bold text-gray-900">
                시작일이 다가오는 챌린지에 참여해보세요!
              </h2>
              {/* <p className="mt-2 text-gray-600">
                시작일이 다가오는 챌린지에 참여해보세요!
              </p> */}
            </div>
            <ChallengeCarousel />
          </div>
        </section>
        {/* <div className="snap-start">
          <AIFeatureSection />
        </div> */}
        <div>
          {/* <VideoSection/> */}
          <ReviewGradation/>
        </div>
      </div>
    </>
  );
}
