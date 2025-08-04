import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface NewsletterPreviewCardProps {
  emoji: string;
  title: string;
  description: string;
}

const NewsletterPreviewCard: React.FC<NewsletterPreviewCardProps> = ({ emoji, title, description }) => {
  return (
    <Card className="bg-white/10 border-white/20 text-white shadow-lg transition-all duration-300 hover:bg-white/15">
      <CardContent className="p-3 sm:p-4 flex items-start space-x-3">
        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-full flex items-center justify-center text-base sm:text-lg">
          {emoji}
        </div>
        <div>
          <h5 className="font-semibold text-sm sm:text-base mb-1">{title}</h5>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsletterPreviewCard;
