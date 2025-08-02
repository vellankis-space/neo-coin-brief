import CryptoTicker from '@/components/CryptoTicker';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';

const Index = () => {
  return (
    <>
      {/* Fixed crypto price ticker */}
      <CryptoTicker />
      
      {/* Hero section with subscription form */}
      <HeroSection />
      
      {/* How it works process */}
      <HowItWorks />
      
      {/* Features overview */}
      <Features />
    </>
  );
};

export default Index;
