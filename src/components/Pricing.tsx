
// Add to .env.local:
// NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
// STRIPE_SECRET_KEY=sk_test_...
// STRIPE_WEBHOOK_SECRET=whsec_...
// STRIPE_PRICE_ID=price_12345

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { CircleCheck, LockKeyhole, ShieldHalf, ChevronDown } from "lucide-react";
import { loadStripe } from '@stripe/stripe-js';

interface PricingProps {
  customerEmail: string;
}

const stripePromise = loadStripe(import.meta.env.VITE_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Pricing: React.FC<PricingProps> = ({ customerEmail }) => {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const handleSubscription = async () => {
    const stripe = await stripePromise;

    if (!stripe) {
      console.error('Stripe.js failed to load.');
      return;
    }

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: import.meta.env.VITE_STRIPE_PRICE_ID,
          customerEmail: customerEmail,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/#pricing`,
        }),
      });

      const session = await response.json();

      if (session.error) {
        console.error('Error creating checkout session:', session.error);
        alert(session.error);
        return;
      }

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error('Stripe checkout error:', result.error.message);
      }
    } catch (error) {
      console.error('Failed to initiate checkout:', error);
    }
  };

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600 mt-2">Join thousands of crypto enthusiasts getting smarter every day</p>
        </div>
        <div className="flex justify-center">
          <Card className="max-w-[90vw] w-full md:max-w-sm bg-white rounded-lg shadow-lg p-8 border-2 border-[#00CFAF] relative hover:shadow-xl hover:scale-[1.01] transition-all duration-300 ease-in-out">
            <Badge className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FFC300] text-white text-sm font-bold px-4 py-1 rounded-full">
              TO THE MOON!
            </Badge>
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-2xl font-bold text-[#1E1E2F]">Pro Newsletter</CardTitle>
              <div className="my-4 flex flex-col sm:flex-row items-center justify-center">
                <span className="text-5xl font-bold text-gray-900">$9</span>
                <span className="text-xl text-gray-500 ml-2">/month</span>
              </div>
              <p className="text-sm text-[#00CFAF] italic">That's only $0.10 per newsletter!</p>
            </CardHeader>
            <CardContent>
              <ul className="mt-6 space-y-4">
                <li className="flex items-center">
                  <CircleCheck className="text-green-500 mr-3" />
                  <span>3 daily newsletters (8 AM, 1 PM, 6 PM UTC)</span>
                </li>
                <li className="flex items-center">
                  <CircleCheck className="text-green-500 mr-3" />
                  <span>Top 20 AI-curated crypto insights</span>
                </li>
                <li className="flex items-center">
                  <CircleCheck className="text-green-500 mr-3" />
                  <span>Breaking news alerts</span>
                </li>
              </ul>
              <Separator className="my-6" />
              <Collapsible open={isFeaturesOpen} onOpenChange={setIsFeaturesOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full flex items-center justify-center text-sm font-semibold text-gray-600 hover:text-gray-900">
                    Show all features
                    <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isFeaturesOpen ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ul className="mt-4 space-y-4">
                    <li className="flex items-center">
                      <CircleCheck className="text-green-500 mr-3" />
                      <span>Mobile-optimized email format</span>
                    </li>
                    <li className="flex items-center">
                      <CircleCheck className="text-green-500 mr-3" />
                      <span>Unsubscribe anytime</span>
                    </li>
                    <li className="flex items-center">
                      <CircleCheck className="text-green-500 mr-3" />
                      <span>No ads or spam</span>
                    </li>
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              <Button
                onClick={handleSubscription}
                className="w-full mt-6 bg-[#00CFAF] text-white rounded-lg py-4 text-lg hover:bg-[#00b89f] hover:scale-102 transition-transform"
              >
                Start My Subscription
              </Button>
              <div className="text-center mt-4 text-sm text-gray-500">
                <div className="flex items-center justify-center">
                  <LockKeyhole className="w-4 h-4 mr-2" />
                  <span>Secure payment via Stripe</span>
                </div>
                <div className="flex items-center justify-center mt-2">
                  <ShieldHalf className="w-4 h-4 mr-2" />
                  <span>24/7 Email Support</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

