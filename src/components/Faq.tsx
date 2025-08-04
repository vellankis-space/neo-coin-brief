import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Faq = () => {
  const faqItems = [
    {
      question: "How is this different from browsing crypto Twitter?",
      answer: "A: We filter 50K+ daily posts to the top 20 insights. You skip the noise."
    },
    {
      question: "Why 3 emails daily?",
      answer: "A: Crypto Twitter never sleeps. We cover Asian, European, and US market sessions."
    },
    {
      question: "Can I trust AI-curated Twitter content?",
      answer: "A: We curate real tweets from verified Twitter accounts. You get facts, not opinions."
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Common Questions From Smart Traders</h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-base sm:text-lg font-semibold">{item.question}</AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faq;
