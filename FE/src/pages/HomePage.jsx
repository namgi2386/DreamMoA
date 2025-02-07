import { useState, useEffect } from "react";
import MainHero from "../components/home/MainHero";
import ServiceHighlight from "../components/home/ServiceHighlight";
import AIFeatureSection from "../components/home/AIFeatureSection";
import ChallengeCarousel from "../components/home/challengeSection/ChallengeCarousel";
import { useSocialLogin } from "../hooks/useSocialLogin";
import HomeCommunity from "../components/home/homeCommunitySection/HomeCommunity";
import SplashScreen from "../components/home/SplashScreen";

export default function HomePage() {
  // 상태 관리
  const [showSplash, setShowSplash] = useState(true);
  const [totalHours, setTotalHours] = useState(0);
  const [isMainLoaded, setIsMainLoaded] = useState(false);
  // 메인 컨텐츠의 실제 준비 상태를 추적하는 새로운 상태
  const [isMainReady, setIsMainReady] = useState(false);

  useSocialLogin();

  // 메인 컨텐츠를 미리 렌더링하고 준비하는 로직
  useEffect(() => {
    const loadMainContent = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsMainLoaded(true);
      } catch (error) {
        console.error("Failed to load main content:", error);
        setIsMainLoaded(true);
      }
    };

    loadMainContent();
  }, []);

  return (
    <div className="relative">
      {/* 메인 컨텐츠 - 항상 렌더링되지만 opacity로 숨김/표시 제어 */}
      <div 
        className={`transition-opacity duration-1000 ${
          !showSplash && isMainLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <MainHero totalHours={totalHours} />
        <div className="snap-start">
          <HomeCommunity />
        </div>
        <div className="snap-start">
          <ServiceHighlight />
        </div>
        <section className="w-full py-16 snap-start">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                인기 있는 챌린지
              </h2>
              <p className="mt-2 text-gray-600">
                곧 시작하거나 많은 사람들이 참여하고 있는 챌린지를 확인해보세요
              </p>
            </div>
            <ChallengeCarousel />
          </div>
        </section>
        <div className="snap-start">
          <AIFeatureSection />
        </div>
      </div>

      {/* SplashScreen을 absolute 포지셔닝으로 오버레이 */}
      {showSplash && (
        <div className="absolute inset-0 z-50">
          <SplashScreen
            onComplete={() => {
              // 메인 컨텐츠가 로드된 상태에서만 스플래시 화면을 제거
              if (isMainLoaded) {
                setShowSplash(false);
              }
            }}
            setFinalHours={setTotalHours}
          />
        </div>
      )}
    </div>
  );
}