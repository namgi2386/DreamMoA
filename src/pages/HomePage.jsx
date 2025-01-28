import MainHero from '../components/home/MainHero';
import ServiceHighlight from '../components/home/ServiceHighlight';
import AIFeatureSection from '../components/home/AIFeatureSection';

export default function HomePage() {
  return (
    <div className="min-h-screen w-full">
      <MainHero />
      <ServiceHighlight />
      <AIFeatureSection />
    </div>
  );
}