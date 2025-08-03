import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle, Users, Loader2 } from 'lucide-react';
import NewsletterPreviewCard from './NewsletterPreviewCard';

interface HeroSectionProps {
  setCustomerEmail: (email: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ setCustomerEmail }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email address is required.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setCustomerEmail(email);
    console.log('Email submitted:', email);

    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-12 overflow-hidden">
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
            <h1 className="font-montserrat font-bold text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-6">
              Stop Wasting Time on{' '}
              <span className="bg-gradient-text bg-clip-text text-transparent">
                Crypto News
              </span>
            </h1>
            
            {/* Subheading */}
            <h2 className="font-inter text-light-gray text-lg sm:text-xl lg:text-2xl leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
              Get the top 20 crypto insights delivered straight to your inbox—three times a day—so you stay informed without burning the midnight oil.
            </h2>
            
            {/* Subscription Form */}
            <div className="mb-6">
              {!isSubmitted ? (
                <div className="backdrop-blur-glass bg-glass-bg border border-glass-border rounded-2xl p-6 shadow-glass max-w-lg mx-auto lg:mx-0">
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={`pl-10 h-12 bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:border-secondary rounded-xl backdrop-blur-sm ${error ? 'border-2 border-red-500' : ''}`}
                      />
                      {error && <p className="text-red-300 text-sm mt-1">{error}</p>}
                    </div>
                    <Button 
                      type="submit"
                      className="h-12 px-8 bg-secondary text-white font-inter font-semibold rounded-xl shadow-elevation transition-all duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader2 className="animate-spin" /> : 'Subscribe Now'}
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="backdrop-blur-glass bg-glass-bg border border-glass-border rounded-2xl p-6 shadow-glass max-w-md mx-auto lg:mx-0">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-white font-inter">Thank you! Check your email for confirmation.</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Trust Indicators */}
            <div className="space-y-3">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-light-gray">
                <Users className="h-4 w-4 text-secondary" />
                <span className="font-inter font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                  Join 1,000+ crypto enthusiasts
                </span>
              </div>
              <p className="text-sm text-white/70 font-inter opacity-80">
                3 emails daily • Unsubscribe anytime
              </p>
            </div>
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
                    description="Bitcoin breaks $45K resistance level with unprecedented trading volume..."
                  />
                  <NewsletterPreviewCard
                    emoji="📊"
                    title="Market Analysis"
                    description="AI-curated insights from top crypto analysts and market makers..."
                  />
                  <NewsletterPreviewCard
                    emoji="💡"
                    title="Altcoin Spotlight"
                    description="Discover the next big altcoin with our in-depth analysis and price predictions."
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