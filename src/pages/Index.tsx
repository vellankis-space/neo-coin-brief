import CryptoTicker from '@/components/CryptoTicker';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import SocialProof from '@/components/SocialProof';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/ui/AnimatedSection';

const Index = () => {
  return (
    <>
      {/* Fixed crypto price ticker */}
      <CryptoTicker />
      
      {/* Hero section with subscription form */}
      <HeroSection />
      
      {/* How it works process */}
      <AnimatedSection>
        <HowItWorks />
      </AnimatedSection>
      
      {/* Features overview */}
      <AnimatedSection>
        <Features />
      </AnimatedSection>

      {/* Pricing Section */}
      <AnimatedSection>
        <Pricing />
      </AnimatedSection>

      {/* Social proof section */}
      <AnimatedSection>
        <SocialProof />
      </AnimatedSection>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Index;
