import { Megaphone, Bot, MailCheck } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Megaphone,
      title: "Step 1: AI Scrapes Twitter",
      description: "Monitor 50K+ Daily Twitter Posts AI tracks verified crypto accounts, whale watchers, and influencers 24/7.",
      iconBg: "bg-blue-500"
    },
    {
      icon: Bot,
      title: "Step 2: Smart Curation",
      description: "Filter Top 1% Signals Advanced algorithms identify market-moving content, eliminate noise.",
      iconBg: "bg-purple-500"
    },
    {
      icon: MailCheck,
      title: "Step 3: Delivered to You",
      description: "Perfect Timing Clean insights at 8 AM, 1 PM, 6 PM UTC.",
      iconBg: "bg-teal-500"
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
          89% Accuracy Rate. Here's How.
        </h2>
        
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
                
                <div className="relative backdrop-blur-glass bg-glass-bg border border-glass-border rounded-2xl p-8 shadow-glass transition-all duration-500 hover:scale-102 text-center min-h-[200px]">
                  {/* Step number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-accent text-dark-gray rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  
                  <div className="flex justify-center mb-6 pt-4">
                    <div className={`w-16 h-16 ${step.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
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