import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-main">
      <div className="container mx-auto px-4 py-16">
        <Link to="/">
          <Button variant="ghost" className="mb-8 text-white hover:bg-white/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto bg-glass border-crypto-glow backdrop-blur-xl rounded-2xl p-8">
          <h1 className="text-4xl font-bold bg-gradient-crypto-text bg-clip-text text-transparent mb-8">
            Terms of Service
          </h1>
          
          <div className="space-y-8 text-white/80">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Acceptance of Terms</h2>
              <p>
                By accessing and using CryptoInsights AI, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by these terms, please do 
                not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Service Description</h2>
              <p className="mb-4">
                CryptoInsights AI provides cryptocurrency trading insights and analysis based on social 
                media sentiment analysis. Our service includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>AI-powered analysis of cryptocurrency social media trends</li>
                <li>Trading signals and market insights</li>
                <li>Educational content about cryptocurrency trading</li>
                <li>Newsletter delivery with market updates</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Investment Disclaimer</h2>
              <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-4 mb-4">
                <p className="font-semibold text-amber-200 mb-2">⚠️ Important Investment Warning</p>
                <p className="text-amber-100">
                  Cryptocurrency trading involves substantial risk and is not suitable for every investor. 
                  Past performance does not guarantee future results. You should carefully consider your 
                  financial situation before making any investment decisions.
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Our insights are for informational purposes only, not financial advice</li>
                <li>Always conduct your own research before making investment decisions</li>
                <li>Never invest more than you can afford to lose</li>
                <li>Cryptocurrency markets are highly volatile and unpredictable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">User Responsibilities</h2>
              <p className="mb-4">As a user of our service, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete information when creating an account</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use the service in accordance with applicable laws and regulations</li>
                <li>Not share or redistribute our proprietary content without permission</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Subscription and Billing</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Subscriptions are billed automatically on a recurring basis</li>
                <li>You can cancel your subscription at any time</li>
                <li>All payments are processed securely through Razorpay</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
              <p>
                CryptoInsights AI shall not be liable for any direct, indirect, incidental, special, 
                or consequential damages resulting from the use or inability to use our service, 
                including but not limited to trading losses or missed opportunities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Intellectual Property</h2>
              <p>
                All content, algorithms, and materials provided through our service are protected by 
                intellectual property laws. Users are granted a limited, non-exclusive license to use 
                the service for personal trading purposes only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Termination</h2>
              <p>
                We reserve the right to terminate or suspend access to our service immediately, without 
                prior notice, for conduct that we believe violates these Terms of Service or is harmful 
                to other users of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting. Your continued use of the service constitutes acceptance 
                of any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
              <p>
                For questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:legal@cryptoinsights.ai" className="text-crypto-positive hover:underline">
                  legal@cryptoinsights.ai
                </a>
              </p>
            </section>

            <div className="text-sm text-white/60 pt-8 border-t border-white/20">
              Last Updated: January 2025
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;