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
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-1/4 w-32 h-32 bg-gradient-glow rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-1/4 w-24 h-24 bg-gradient-glow rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <h2 className="text-4xl font-montserrat font-bold text-center text-foreground mb-4">
          How It Works
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Our AI-powered system transforms crypto chaos into organized insights
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={index}
                className="group relative"
              >
                {/* Connection line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-8 h-0.5 bg-gradient-to-r from-accent to-transparent z-0"></div>
                )}
                
                <div className="relative backdrop-blur-glass bg-glass-bg border border-glass-border rounded-2xl p-8 shadow-glass hover:shadow-glow transition-all duration-500 hover:scale-102 text-center">
                  {/* Step number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-accent text-dark-gray rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  
                  <div className="flex justify-center mb-6 pt-4">
                    <div className="p-4 bg-gradient-card rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-12 h-12 text-accent" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-montserrat font-semibold text-card-foreground mb-4 group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;