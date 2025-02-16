import { useState } from "react";
import MainHero from "../components/home/MainHero";
import ServiceHighlight from "../components/home/ServiceHighlight";
import ChallengeCarousel from "../components/home/challengeSection/ChallengeCarousel";
import { useSocialLogin } from "../hooks/useSocialLogin";
import HomeCommunity from "../components/home/homeCommunitySection/HomeCommunity";
import SplashScreen from "../components/home/SplashScreen";
import ReviewGradation from "../components/home/ReviewSection/ReviewGradation";
// import AIFeatureSection from "../components/home/AIFeatureSection";
// import TopLine from "../components/home/topLineSection/TopLine";
// import VideoSection from "../components/home/videoSection/VideoSection";


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
      <div>
        <MainHero totalHours={totalHours} />
        <div className="snap-start">
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
            </div>
            <ChallengeCarousel />
          </div>
        </section>
        <div>
          <ReviewGradation/>
        </div>
      </div>
    </>
  );
}
