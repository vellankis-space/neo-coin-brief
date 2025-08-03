
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const SocialProof = () => {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by Crypto Enthusiasts Worldwide
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-5xl font-bold text-[#FFC300]">1,247+</p>
            <p className="mt-2 text-lg font-medium text-gray-900">
              Active Subscribers
            </p>
            <p className="mt-1 text-sm text-gray-500">Growing daily</p>
          </div>
          <Card>
            <CardContent className="p-6">
              <p className="italic text-gray-600">
                "Finally, crypto news that doesn't waste my time. The AI
                summaries are spot-on!"
              </p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <p className="text-sm font-semibold text-[#FFC300]">
                - @CryptoTrader_Mike
              </p>
            </CardFooter>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="italic text-gray-600">
                "Three emails a day is perfect. I stay informed without
                information overload."
              </p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <p className="text-sm font-semibold text-[#FFC300]">
                - @BlockchainSarah
              </p>
            </CardFooter>
          </Card>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardContent className="p-6">
                <p className="italic text-gray-600">
                    "The quality is incredible. No more sifting through crypto
                    Twitter noise."
                </p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                <p className="text-sm font-semibold text-[#FFC300]">
                    - @DeFi_Developer
                </p>
                </CardFooter>
            </Card>
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <p className="font-semibold text-gray-900">No Spam Guarantee</p>
                <p className="font-semibold text-gray-900">Unsubscribe Anytime</p>
                <p className="font-semibold text-gray-900">Privacy Protected</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
