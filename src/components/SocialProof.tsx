
import { Check } from 'lucide-react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const SocialProof = () => {
  return (
    <section className="bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Trusted by Crypto Enthusiasts Worldwide
          </h2>
        </div>
        <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-5xl font-bold text-[#FFC300]">1,247+</p>
            <p className="mt-2 text-lg font-medium text-gray-900">
              Active Subscribers Growing daily
            </p>
          </div>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <p className="italic text-gray-600">
                "Finally, crypto news that actually helps me spot opportunities."
              </p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <p className="text-sm font-semibold text-[#FFC300]">
                — @CryptoTrader_Mike
              </p>
            </CardFooter>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <p className="italic text-gray-600">
                "No more Twitter noise. Perfect."
              </p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <p className="text-sm font-semibold text-[#FFC300]">
                — @DeFi_Dave
              </p>
            </CardFooter>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <p className="italic text-gray-600">
                "Three alerts a day is perfect. I stay informed without information overload."
              </p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <p className="text-sm font-semibold text-[#FFC300]">
                — @BlockchainSarah
              </p>
            </CardFooter>
          </Card>
        </div>
        
      </div>
    </section>
  );
};

export default SocialProof;
