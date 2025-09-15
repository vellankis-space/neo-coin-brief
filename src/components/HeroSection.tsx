import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle, Users, Loader2, Twitter } from 'lucide-react';
import NewsletterPreviewCard from './NewsletterPreviewCard';

const HeroSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setError('');

    if (!email) {
      setError('Email address is required.');
      return;
    }

    if (!/^(([^<>()[\]\\.,;:\s@\"]+(\\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      // Save email to Supabase
      const saveEmailResponse = await fetch('/api/save-email-to-supabase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!saveEmailResponse.ok) {
        const errorData = await saveEmailResponse.json();
        throw new Error(errorData.error || 'Failed to save email.');
      }

      // Show success message
      alert('Thank you for subscribing to our newsletter!');
      setEmail('');

    } catch (error: any) {
      console.error('Subscription error:', error);
      setError(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-4 pb-12 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-glow rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-glow rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
          {/* Left Column - Content (60%) */}
          <div className="md:col-span-3 text-center md:text-left">
            {/* Main Headline */}
            <h1 className="font-montserrat font-bold text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6">
              Never Miss Another <span className="bg-gradient-bitcoin bg-clip-text text-transparent relative">Crypto Opportunity<Twitter className="inline-block ml-2 w-6 h-6 sm:w-8 sm:h-8 text-blue-400 animate-pulse" /></span>
            </h1>
            
            {/* Subheading */}
            <h2 className="font-inter text-light-gray text-base sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
              <span className="bg-gradient-bitcoin bg-clip-text text-transparent">AI</span> scans Twitter 24/7 to deliver the hottest crypto insights 3x daily — straight from the source.
            </h2>
            
            {/* Value Proposition */}
            <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-white font-inter text-sm sm:text-base">Live Twitter monitoring of crypto influencers & whales</span>
                </div>
                <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-white font-inter text-sm sm:text-base">Top 1% insights from 50K+ daily Twitter posts</span>
                </div>
                
                <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-white font-inter text-sm sm:text-base">Join 1,247+ traders getting Twitter's best signals</span>
                </div>
            </div>

            {/* Email Signup Form */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`w-full sm:w-auto flex-grow pl-4 h-12 bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:border-secondary rounded-xl backdrop-blur-sm ${error ? 'border-2 border-red-500' : ''}`}
                />
                <Button 
                  onClick={handleSubscribe}
                  disabled={isLoading}
                  className="w-full sm:w-auto h-12 px-8 bg-secondary text-white font-inter font-semibold rounded-xl shadow-elevation transition-all duration-300"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : 'Subscribe Now'}
                </Button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
          
          {/* Right Column - Newsletter Preview */}
          <div className="md:col-span-2">
            <div className="backdrop-blur-glass bg-glass-bg border border-glass-border rounded-2xl p-6 text-white shadow-glass transition-all duration-500 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold">📧 Newsletter Preview</h4>
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <NewsletterPreviewCard
                    emoji="🔥"
                    title="Top Tweet Alert"
                    description="Bitcoin whale moved $2.1B — price impact analysis"
                  />
                  <NewsletterPreviewCard
                    emoji="📊"
                    title="Market Analysis"
                    description="3 altcoins showing breakout signals"
                  />
                  <NewsletterPreviewCard
                    emoji="🚀"
                    title="Altcoin Spotlight"
                    description="New DeFi protocol raised $50M — entry opportunity"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;