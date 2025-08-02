import { Search, Cpu, Mail } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "AI Scrapes Twitter",
      description: "Our AI monitors crypto Twitter 24/7, identifying the top 20 most engaging tweets from trusted sources."
    },
    {
      icon: Cpu,
      title: "Smart Curation",
      description: "Advanced AI summarizes and refines content, removing noise and focusing on actionable insights."
    },
    {
      icon: Mail,
      title: "Delivered to You",
      description: "Receive perfectly formatted newsletters at 8 AM, 1 PM, and 6 PM UTC—never miss important crypto news."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-montserrat font-bold text-center text-foreground mb-16">
          How It Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={index}
                className="text-center p-8 rounded-lg bg-card border shadow-sm hover:shadow-md transition-all duration-300 hover:scale-102"
              >
                <div className="flex justify-center mb-6">
                  <IconComponent className="w-12 h-12 text-accent" />
                </div>
                <h3 className="text-xl font-montserrat font-semibold text-card-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;