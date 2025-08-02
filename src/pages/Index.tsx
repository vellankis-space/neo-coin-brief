import CryptoTicker from '@/components/CryptoTicker';
import HeroSection from '@/components/HeroSection';

const Index = () => {
  return (
    <>
      {/* Fixed crypto price ticker */}
      <CryptoTicker />
      
      {/* Hero section with subscription form */}
      <HeroSection />
    </>
  );
};

export default Index;
