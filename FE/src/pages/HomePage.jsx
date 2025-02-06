import MainHero from '../components/home/MainHero';
import ServiceHighlight from '../components/home/ServiceHighlight';
import AIFeatureSection from '../components/home/AIFeatureSection';
import ChallengeCarousel from '../components/home/ChallengeCarousel';
// import '../assets/styles/scrollbar-hide.css';
import { useSocialLogin } from '../hooks/useSocialLogin';
import HomeCommunity from '../components/home/homeCommunitySection/HomeCommunity';
import TopLine from '../components/home/topLineSection/TopLine';
import { useState } from 'react';

export default function HomePage() {
  useSocialLogin();
  // localStorage 확인은 초기값으로 한 번만 실행
  const [showBanner, setShowBanner] = useState(() => {
    const stored = localStorage.getItem('topLineBanner');
    if (!stored) return true;
    
    const { timestamp } = JSON.parse(stored);
    const now = new Date().getTime();
    // const oneDay = 24 * 60 * 60 * 1000; // 24시간을 밀리초로
    const oneDay = 1 * 60 * 60 * 1000; // 24시간을 밀리초로
    
    return now - timestamp > oneDay;
  });

  const topLineView = () => {
    const bannerData = {
      timestamp: new Date().getTime(),
      hidden: true
    };
    localStorage.setItem('topLineBanner', JSON.stringify(bannerData));
    setShowBanner(false);
  };
  return (
    <div className="min-h-screen w-full">
      {showBanner && <TopLine isVisible={true} onClose={topLineView} />}
      <HomeCommunity/>
      <MainHero />
      <ServiceHighlight />

      {/* 마감 임박 챌린지  */}
      <section className="w-full py-16">
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

      <AIFeatureSection />
    </div>
  );
}