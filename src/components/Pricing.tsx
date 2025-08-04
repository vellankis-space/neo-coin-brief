
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
import { CircleCheck, LockKeyhole, ShieldHalf, ChevronDown, BadgeCheck } from "lucide-react";
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
    <section id="pricing" className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Simple Pricing</h2>
        </div>
        <div className="flex justify-center">
          <Card className="max-w-[90vw] w-full md:max-w-sm bg-white rounded-lg shadow-lg p-6 sm:p-8 border-2 border-[#00CFAF] relative hover:shadow-xl hover:scale-[1.01] transition-all duration-300 ease-in-out">
            <Badge className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FFC300] text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 rounded-full">
              MOST POPULAR
            </Badge>
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-xl sm:text-2xl font-bold text-[#1E1E2F]">Pro Newsletter</CardTitle>
              <div className="my-4 flex flex-col sm:flex-row items-center justify-center">
                <span className="text-4xl sm:text-5xl font-bold text-gray-900">$9</span>
                <span className="text-lg sm:text-xl text-gray-500 ml-2">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="mt-6 space-y-3 sm:space-y-4 text-sm sm:text-base">
                <li className="flex items-center">
                  <CircleCheck className="text-green-500 mr-3" />
                  <span>3 daily newsletters</span>
                </li>
                <li className="flex items-center">
                  <CircleCheck className="text-green-500 mr-3" />
                  <span>Top 20 AI insights</span>
                </li>
                <li className="flex items-center">
                  <CircleCheck className="text-green-500 mr-3" />
                  <span>Breaking alerts</span>
                </li>
                <li className="flex items-center">
                  <CircleCheck className="text-green-500 mr-3" />
                  <span>24/7 support</span>
                </li>
              </ul>
              <Separator className="my-6" />
              <Button
                onClick={handleSubscription}
                className="w-full mt-6 bg-[#00CFAF] text-white rounded-lg py-3 sm:py-4 text-base sm:text-lg hover:bg-[#00b89f] hover:scale-102 transition-transform"
              >
                Start Subscription
              </Button>
              <div className="text-center mt-4 text-xs sm:text-sm text-gray-500">
                <div className="flex items-center justify-center mt-2">
                  <BadgeCheck className="w-4 h-4 mr-2" />
                  <span>30-Day Satisfaction Guarantee — Cancel anytime within 30 days.</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
      </div>
    </section>
  );
};

export default Pricing;

