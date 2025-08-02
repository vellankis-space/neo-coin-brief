import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle, Users } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // TODO: Integrate with Stripe and email service
      setIsSubmitted(true);
      console.log('Email submitted:', email);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-hero flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-12">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content (60%) */}
          <div className="lg:col-span-3 text-center lg:text-left">
            {/* Main Headline */}
            <h1 className="font-montserrat font-bold text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-6">
              Stop Wasting Time on Crypto News
            </h1>
            
            {/* Subheading */}
            <h3 className="font-inter text-light-gray text-lg sm:text-xl lg:text-2xl leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
              Get the top 20 crypto insights delivered straight to your inbox—three times a day—so you stay informed without burning the midnight oil.
            </h3>
            
            {/* Subscription Form */}
            <div className="mb-6">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 h-12 bg-white/95 border-0 focus:bg-white text-primary placeholder:text-gray-500 font-inter"
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="h-12 px-8 bg-secondary hover:bg-secondary/90 text-white font-inter font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
                  >
                    Subscribe Now
                  </Button>
                </form>
              ) : (
                <div className="flex items-center justify-center lg:justify-start gap-3 p-4 bg-white/10 rounded-lg backdrop-blur-sm max-w-md mx-auto lg:mx-0">
                  <CheckCircle className="h-5 w-5 text-secondary" />
                  <span className="text-white font-inter">Thank you! Check your email for confirmation.</span>
                </div>
              )}
            </div>
            
            {/* Trust Indicators */}
            <div className="space-y-3">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-light-gray">
                <Users className="h-4 w-4 text-secondary" />
                <span className="font-inter font-medium">Join 1,000+ crypto enthusiasts</span>
              </div>
              <p className="text-sm text-white/70 font-inter">
                3 emails daily • Unsubscribe anytime
              </p>
            </div>
          </div>
          
          {/* Right Column - Illustration Placeholder (40%) */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl aspect-[4/3] flex items-center justify-center border border-white/20">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-secondary" />
                </div>
                <h4 className="text-white font-montserrat font-bold text-lg mb-2">
                  Newsletter Preview
                </h4>
                <p className="text-white/70 font-inter text-sm">
                  Professional insights delivered to your inbox
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;