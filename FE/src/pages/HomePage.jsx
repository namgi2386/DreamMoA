import { useState } from 'react';
import MainHero from '../components/home/MainHero';
import ServiceHighlight from '../components/home/ServiceHighlight';
import AIFeatureSection from '../components/home/AIFeatureSection';
import ChallengeCarousel from '../components/home/challengeSection/ChallengeCarousel';
// import '../assets/styles/scrollbar-hide.css';
import { useSocialLogin } from '../hooks/useSocialLogin';
import HomeCommunity from '../components/home/homeCommunitySection/HomeCommunity';
// import TopLine from '../components/home/topLineSection/TopLine';
import SplashScreen from '../components/home/SplashScreen';


export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  const [totalHours, setTotalHours] = useState(0);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  useSocialLogin();

  return (
    <>
      {showSplash && (
        <SplashScreen
          onComplete={handleSplashComplete}
          setFinalHours={setTotalHours}
        />
      )}
      <div className={` ${showSplash ? 'invisible' : 'visible'}`}>
        <MainHero totalHours={totalHours} />
        <div className="snap-start">
          <HomeCommunity/>
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
    </>
  );
}