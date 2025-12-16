import { Zap, Brain, Target, Bell } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Zap,
      title: "Live CX Dashboard",
      description:
        "Real-time updates on customer experience metrics across all touchpoints.",
      highlight: "Never miss a signal — see feedback the moment it happens.",
    },
    {
      icon: Brain,
      title: "AI-Powered Sentiment Analysis",
      description: "Advanced NLP models analyze customer feedback instantly.",
      highlight: "Understand not just what customers say, but how they feel.",
    },
    {
      icon: Target,
      title: "Unified Pulse Score",
      description:
        "One comprehensive score combining CSAT, NPS, CES, and sentiment.",
      highlight: "Stop juggling metrics — get one number that matters.",
    },
    {
      icon: Bell,
      title: "Real-Time Alerts & Trends",
      description:
        "Instant notifications when metrics dip or anomalies are detected.",
      highlight: "Act before problems escalate into churn.",
    },
  ];

  return (
    <section
      id="features"
      className="bg-white scroll-mt-16 px-4 py-20 sm:px-6 lg:px-8"
      ref={ref}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-teal-600">
            Features
          </p>
          <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
            Everything you need to understand your customers
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Powerful tools designed specifically for digital banks and fintechs
            to deliver exceptional customer experiences.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="mb-4 inline-block rounded-lg bg-teal-50 p-3"
                >
                  <Icon className="h-6 w-6 text-teal-600" />
                </motion.div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mb-4 text-gray-600">{feature.description}</p>

                {/* Highlight */}
                <p className="font-semibold text-teal-600">
                  {feature.highlight}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
