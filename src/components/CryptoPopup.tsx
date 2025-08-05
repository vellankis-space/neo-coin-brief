import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Zap, TrendingUp } from 'lucide-react';

const CryptoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000); // Show after 10 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-gradient-crypto border-crypto-glow backdrop-blur-xl max-w-sm md:max-w-md mx-auto p-4 sm:p-6">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors z-10"
        >
          <X size={20} />
        </button>
        
        <DialogHeader className="text-center space-y-4 pt-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-crypto">
            <Zap className="w-8 h-8 text-white" />
          </div>
          
          <DialogTitle className="text-2xl font-bold bg-gradient-crypto-text bg-clip-text text-transparent">
            🚀 Don't Miss the Next Big Move!
          </DialogTitle>
          
          <div className="space-y-2">
            <p className="text-white/90 text-lg font-medium text-center">
              While others scroll Twitter, we deliver results
            </p>
            <div className="flex items-center justify-center gap-2 text-crypto-positive text-sm">
              <TrendingUp size={16} />
              <span>+127% avg. portfolio growth</span>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="flex gap-2">
            <Input 
              type="email" 
              placeholder="Enter your email..." 
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-crypto-positive focus:ring-crypto-positive"
            />
            <Button className="bg-gradient-to-r from-crypto-positive to-emerald-400 hover:from-emerald-400 hover:to-crypto-positive text-white font-semibold px-6 shadow-lg hover:shadow-crypto transition-all duration-300">
              Get Signals
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-4 text-xs text-white/60">
            <span>✅ Cancel anytime</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CryptoPopup;