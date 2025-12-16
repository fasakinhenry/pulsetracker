import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section
      id="cta"
      className="bg-gradient-to-b from-[#1A975D] scroll-mt-16 to-[#0E6B44] px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Ready to track your customer pulse in real-time?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-green-100">
            Start tracking your customer pulse today. Get instant visibility
            into customer satisfaction, sentiment, and experience.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex mx-auto items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Get Started
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
