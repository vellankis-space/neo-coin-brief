import { motion } from 'framer-motion';
import { Rocket, Hourglass, Lightbulb, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const Features = () => {
  const features = [
    {
      icon: Rocket,
      title: "Benefit 1: Stop Endless Scrolling",
      description: "Skip 3+ hours of Twitter noise. Get only insights that move markets.",
      iconBg: "bg-yellow-500"
    },
    {
      icon: Hourglass,
      title: "Benefit 2: Never Sleep on Opportunities",
      description: "AI monitors 24/7 across all time zones. You stay ahead without burnout.",
      iconBg: "bg-orange-500"
    },
    {
      icon: Lightbulb,
      title: "Benefit 3: Beyond Human Speed",
      description: "AI processes more in 1 hour than you could in a month. Facts, not hype.",
      iconBg: "bg-purple-500"
    },
    {
      icon: ShieldCheck,
      title: "Benefit 4: Verified Intelligence",
      description: "Every insight is fact-checked and traceable to original Twitter sources.",
      iconBg: "bg-green-500"
    }
  ];

  return (
    <motion.section 
      className="py-16 sm:py-20 bg-muted/30 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/6 w-40 h-40 bg-gradient-glow rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/6 w-32 h-32 bg-gradient-glow rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-center text-foreground mb-4">
          Why 1,247+ Traders Trust Us
        </h2>
        <p className="text-center text-muted-foreground mb-12 sm:mb-16 max-w-2xl mx-auto">
          
        </p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="backdrop-blur-glass bg-glass-bg border-glass-border p-6 sm:p-8 h-full shadow-glass transition-all duration-500 hover:scale-102 group cursor-pointer">
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-14 h-14 sm:w-16 sm:h-16 ${feature.iconBg} rounded-2xl flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-montserrat font-semibold text-card-foreground mb-3 transition-all duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Features;