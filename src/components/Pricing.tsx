
// Environment variables for Stripe integration
// VITE_STRIPE_PUBLISHABLE_KEY=your_publishable_key
// VITE_STRIPE_SECRET_KEY=your_secret_key
// VITE_STRIPE_PRICE_ID=your_price_id

import { Button } from "@/components/ui/button";
import { CheckCircle, Lock, Shield } from "lucide-react";

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600 mt-2">Join thousands of crypto enthusiasts getting smarter every day</p>
        </div>
        <div className="flex justify-center">
          <div className="max-w-sm w-full bg-white rounded-lg shadow-lg p-8 border-2 border-[#00CFAF] relative">
            <div className="absolute top-0 -mt-5 w-full flex justify-center">
              <div className="bg-[#FFC300] text-white text-sm font-bold px-4 py-1 rounded-full">
                TO THE MOON!
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#1E1E2F]">Pro Newsletter</h3>
              <div className="my-4">
                <span className="text-5xl font-bold text-gray-900">$9</span>
                <span className="text-xl text-gray-500">/month</span>
              </div>
              <p className="text-sm text-[#00CFAF] italic">That's only $0.10 per newsletter!</p>
            </div>
            <ul className="mt-8 space-y-4">
              <li className="flex items-center">
                <CheckCircle className="text-green-500 mr-3" />
                <span>3 daily newsletters (8 AM, 1 PM, 6 PM UTC)</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-green-500 mr-3" />
                <span>Top 20 AI-curated crypto insights</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-green-500 mr-3" />
                <span>Breaking news alerts</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-green-500 mr-3" />
                <span>Mobile-optimized email format</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-green-500 mr-3" />
                <span>Unsubscribe anytime</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-green-500 mr-3" />
                <span>No ads or spam</span>
              </li>
            </ul>
            <Button className="w-full mt-8 bg-[#00CFAF] text-white rounded-lg py-4 text-lg hover:bg-[#00b89f] hover:scale-102 transition-transform">
              Start My Subscription
            </Button>
            <div className="text-center mt-4 text-sm text-gray-500">
              <div className="flex items-center justify-center">
                <Lock className="w-4 h-4 mr-2" />
                <span>Secure payment via Stripe</span>
              </div>
              <div className="flex items-center justify-center mt-2">
                <Shield className="w-4 h-4 mr-2" />
                <span>24/7 Email Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
