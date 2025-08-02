import { Zap, Clock, Brain, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Effortless Efficiency",
      description: "Stop endless scrolling. Get only what matters—curated crypto insights in minutes, not hours."
    },
    {
      icon: Clock,
      title: "Perfect Work-Life Balance",
      description: "Stay ahead during business hours. Spend your evenings living, not researching crypto trends."
    },
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Our AI filters out noise, FUD, and spam. Only genuine, high-quality insights reach your inbox."
    },
    {
      icon: Shield,
      title: "Curated for Accuracy",
      description: "Every tweet is fact-checked and refined. No more misleading information or crypto scams."
    }
  ];

  return (
    <section className="py-20 bg-light-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-montserrat font-bold text-center text-foreground mb-16">
          Why Choose Our Newsletter?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index}
                className="p-6 hover:scale-102 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <IconComponent className="w-12 h-12 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-montserrat font-semibold text-card-foreground mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;