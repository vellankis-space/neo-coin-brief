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
      title: "Effortless Efficiency",
      description: "Stop endless scrolling. Get only what matters—curated crypto insights in minutes, not hours.",
      iconBg: "bg-yellow-500"
    },
    {
      icon: Hourglass,
      title: "Perfect Work-Life Balance",
      description: "Stay ahead during business hours. Spend your evenings living, not researching crypto trends.",
      iconBg: "bg-orange-500"
    },
    {
      icon: Lightbulb,
      title: "AI-Powered Intelligence",
      description: "Our AI filters out noise, FUD, and spam. Only genuine, high-quality insights reach your inbox.",
      iconBg: "bg-purple-500"
    },
    {
      icon: ShieldCheck,
      title: "Curated for Accuracy",
      description: "Every tweet is fact-checked and refined. No more misleading information or crypto scams.",
      iconBg: "bg-green-500"
    }
  ];

  return (
    <motion.section 
      className="py-20 bg-muted/30 relative overflow-hidden"
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
        <h2 className="text-4xl font-montserrat font-bold text-center text-foreground mb-4">
          Why Choose Our Newsletter?
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Experience the future of crypto news consumption with AI-powered curation
        </p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="backdrop-blur-glass bg-glass-bg border-glass-border p-6 h-full shadow-glass transition-all duration-500 hover:scale-102 group cursor-pointer">
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-16 h-16 ${feature.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-montserrat font-semibold text-card-foreground mb-3 transition-all duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
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