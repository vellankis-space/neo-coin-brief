import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Loader2, Mail } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { CircleCheck, LockKeyhole, ShieldHalf, ChevronDown, BadgeCheck } from "lucide-react";


const Pricing: React.FC = () => {
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
      // 1. Save email to Supabase
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

      // 2. Get Cashfree payment URL
      const cashfreeResponse = await fetch('/api/create-cashfree-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!cashfreeResponse.ok) {
        const errorData = await cashfreeResponse.json();
        throw new Error(errorData.error || 'Failed to get Cashfree URL.');
      }

      const { redirect_url } = await cashfreeResponse.json();

      if (redirect_url) {
        // 3. Redirect to Cashfree payment page
        window.location.href = redirect_url;
      } else {
        throw new Error('Cashfree redirect URL not found.');
      }

    } catch (error: any) {
      console.error('Subscription error:', error);
      setError(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
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
                <span className="text-4xl sm:text-5xl font-bold text-gray-900">₹800</span>
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
              <div className="space-y-4 mb-4">
                <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`w-full pl-4 h-12 bg-gray-100 border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-blue-500 rounded-lg ${error ? 'border-2 border-red-500' : ''}`}
                />
                <Button 
                  onClick={handleSubscribe}
                  disabled={isLoading}
                  className="w-full h-12 px-8 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : 'Subscribe Now'}
                </Button>
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="text-center mt-4 text-xs sm:text-sm text-gray-500">
                <div className="flex items-center justify-center mt-2">
                  <BadgeCheck className="w-6 h-6 sm:w-8 sm:h-8 mr-2" />
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