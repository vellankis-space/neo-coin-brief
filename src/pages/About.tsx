import { ArrowLeft, Users, Target, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-main">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <Link to="/">
          <Button variant="ghost" className="mb-8 text-white hover:bg-white/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-crypto-text bg-clip-text text-transparent mb-4 sm:mb-6">
              About CryptoInsights AI
            </h1>
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              We're revolutionizing crypto trading by transforming Twitter noise into actionable intelligence. 
              Our AI scans thousands of crypto influencers to deliver you the signals that matter.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <Card className="bg-glass border-crypto-glow backdrop-blur-xl">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-white/70 leading-relaxed">
                  To democratize access to high-quality crypto trading signals by leveraging AI to analyze 
                  social sentiment from the most influential voices in the crypto space.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-glass border-crypto-glow backdrop-blur-xl">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-400 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-white/70 leading-relaxed">
                  To become the most trusted source of crypto intelligence, helping traders make informed 
                  decisions backed by data-driven insights from social media sentiment analysis.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Us?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">Expert Team</h4>
                <p className="text-white/70">
                  Founded by crypto veterans with 10+ years in trading and AI development.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">Proven Results</h4>
                <p className="text-white/70">
                  Our signals have generated an average of 127% portfolio growth for subscribers.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">Real-time Analysis</h4>
                <p className="text-white/70">
                  24/7 monitoring of 1000+ crypto influencers for instant signal generation.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center bg-glass border-crypto-glow backdrop-blur-xl rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Trading?</h2>
            <p className="text-white/80 mb-8 text-lg">
              Join thousands of traders already profiting from our AI-powered insights.
            </p>
            <Link to="/">
              <Button className="bg-gradient-to-r from-crypto-positive to-emerald-400 hover:from-emerald-400 hover:to-crypto-positive text-white font-semibold px-8 py-3 text-lg shadow-lg hover:shadow-crypto transition-all duration-300">
                Start Trading Smarter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;