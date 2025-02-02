import MainHero from '../components/home/MainHero';
import ServiceHighlight from '../components/home/ServiceHighlight';
import AIFeatureSection from '../components/home/AIFeatureSection';
import { useSocialLogin } from '../hooks/useSocialLogin';
import HomeCommunity from '../components/home/homeCommunitySection/HomeCommunity';
import TestComponent from '../components/home/homeTestSection/TestComponent';

export default function HomePage() {
  useSocialLogin();
  return (
    <div className="min-h-screen w-full">
      <HomeCommunity/>
      <MainHero />
      <ServiceHighlight />
      <AIFeatureSection />
      <TestComponent/>
    </div>
  );
}