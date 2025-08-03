import { useState } from 'react';
import CryptoTicker from '@/components/CryptoTicker';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import SocialProof from '@/components/SocialProof';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/ui/AnimatedSection';

const Index = () => {
  const [customerEmail, setCustomerEmail] = useState('');

  return (
    <div className="pt-12"> {/* Added padding for fixed CryptoTicker */}
      {/* Fixed crypto price ticker */}
      <CryptoTicker />
      
      {/* Hero section with subscription form */}
      <HeroSection setCustomerEmail={setCustomerEmail} />
      
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
        <Pricing customerEmail={customerEmail} />
      </AnimatedSection>

      {/* Social proof section */}
      <AnimatedSection>
        <SocialProof />
      </AnimatedSection>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
