import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CancellationAndRefund = () => {
  return (
    <div className="min-h-screen bg-gradient-main">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <Link to="/">
          <Button variant="ghost" className="mb-8 text-white hover:bg-white/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto bg-glass border-crypto-glow backdrop-blur-xl rounded-2xl p-8">
          <h1 className="text-4xl font-bold bg-gradient-crypto-text bg-clip-text text-transparent mb-8">
            Cancellation and Refund Policy
          </h1>
          
          <div className="space-y-8 text-white/80">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Subscription Policy</h2>
              <p>
                Our newsletter service is completely free to subscribe to. There are no charges or payments required to receive our crypto insights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
              <p>
                For questions about our Cancellation and Refund Policy, please contact us at{' '}
                <a href="mailto:support@cryptoinsights.ai" className="text-crypto-positive hover:underline">
                  support@cryptoinsights.ai
                </a>
              </p>
            </section>

            <div className="text-sm text-white/60 pt-8 border-t border-white/20">
              Last Updated: August 2025
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationAndRefund;
