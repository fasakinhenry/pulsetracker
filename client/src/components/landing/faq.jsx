import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "What metrics does PulseTracker track?",
    answer:
      "PulseTracker tracks multiple customer satisfaction metrics including NPS (Net Promoter Score), CSAT (Customer Satisfaction Score), sentiment analysis, key themes from feedback, and custom KPIs tailored to your business needs.",
  },
  {
    question: "Is PulseTracker truly real-time?",
    answer:
      "Yes, PulseTracker processes customer feedback in real-time using advanced AI technology. You get instant insights and alerts as feedback comes in, allowing you to respond to issues immediately.",
  },
  {
    question: "Who is PulseTracker designed for?",
    answer:
      "PulseTracker is designed for businesses of all sizes - from startups to enterprises. It's particularly valuable for customer success teams, product managers, and customer support teams who need to understand and act on customer feedback.",
  },
  {
    question: "Is PulseTracker available yet?",
    answer:
      "PulseTracker is currently in development and accepting early access signups. Join our waitlist to be among the first to experience the platform when it launches.",
  },
  {
    question: "How does PulseTracker integrate with existing tools?",
    answer:
      "PulseTracker integrates with popular customer communication platforms including Zendesk, Intercom, Slack, Microsoft Teams, and more. We continue to expand our integrations based on customer needs.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white scroll-mt-16 py-16 md:py-24">
      <div className="px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 text-center md:mb-16"
        >
          <span className=" text-sm font-semibold uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="font-display text-foreground mb-4 mt-3 text-3xl font-bold md:text-4xl">
            Frequently asked questions
          </h2>
        </motion.div>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true, margin: "-100px" }}
              className="hover:border-primary/30 overflow-hidden rounded-lg border border-gray-200 transition-colors"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-gray-50"
              >
                <span className="text-foreground text-md xs:text-lg font-semibold">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="text-primary h-5 w-5 flex-shrink-0" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-gray-200"
                  >
                    <p className="px-6 py-4 text-sm xs:text-base leading-relaxed text-gray-600">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
