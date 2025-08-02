import CryptoTicker from '@/components/CryptoTicker';

const Index = () => {
  return (
    <>
      {/* Fixed crypto price ticker */}
      <CryptoTicker />
      
      {/* Main content with top padding to account for fixed ticker */}
      <div className="min-h-screen pt-12 flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-montserrat font-bold mb-4 text-primary">
            AI-Powered Crypto Newsletter
          </h1>
          <p className="text-xl text-muted-foreground font-inter">
            Get top 20 crypto insights delivered 3x daily by AI
          </p>
          <div className="mt-8 px-4">
            <p className="text-secondary font-inter font-semibold">
              Real-time crypto prices streaming above ↑
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
