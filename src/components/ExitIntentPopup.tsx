import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle } from 'lucide-react';

const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsOpen(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Don't Miss Tomorrow's Alerts</DialogTitle>
          <DialogDescription className="text-center text-lg">
            Join 1,247+ traders getting Twitter's hottest crypto insights daily.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Input type="email" placeholder="Email" className="flex-1" />
            <Button className="bg-green-500 hover:bg-green-600 text-white">Subscribe Now</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
