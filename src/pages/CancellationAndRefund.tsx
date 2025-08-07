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
              <h2 className="text-2xl font-semibold text-white mb-4">Refund Policy</h2>
              <p>
                All sales are final. We do not offer refunds for any subscriptions or services once the payment is made. 
                By making a payment, you acknowledge and agree to this no-refund policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Cancellation Policy</h2>
              <p className="mb-4">
                You may cancel your subscription at any time. However, the cancellation will only take effect after your initial one-month subscription period has ended. 
                You will continue to have access to the service until the end of your billing cycle.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Cancellation is available after the first month of your subscription.</li>
                <li>To cancel, please visit your account settings or contact our support team.</li>
                <li>You will not be charged for the next billing cycle after cancellation.</li>
              </ul>
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
