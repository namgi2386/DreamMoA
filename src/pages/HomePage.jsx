import MainHero from '../components/home/MainHero';
import ServiceHighlight from '../components/home/ServiceHighlight';
import AIFeatureSection from '../components/home/AIFeatureSection';
import { useSocialLogin } from '../hooks/useSocialLogin';

export default function HomePage() {
  useSocialLogin();
  return (
    <div className="min-h-screen w-full">
      <MainHero />
      <ServiceHighlight />
      <AIFeatureSection />
    </div>
  );
}