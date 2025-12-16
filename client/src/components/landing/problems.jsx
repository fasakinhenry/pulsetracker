import {
  AlertCircle,
  CheckCircle,
  Database,
  BarChart3,
  Clock,
  Zap,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Problems() {
  const problemItems = [
    {
      icon: Database,
      text: "CX data scattered across multiple tools",
    },
    {
      icon: BarChart3,
      text: "Manual CSAT, NPS, and CES calculations",
    },
    {
      icon: Clock,
      text: "Insights arrive too late to act on",
    },
    {
      icon: AlertCircle,
      text: "Teams react after customers are frustrated",
    },
  ];

  const solutionItems = [
    {
      icon: Zap,
      text: "Real-time feedback capture across touchpoints",
    },
    {
      icon: Target,
      text: "Instant AI-powered sentiment analysis",
    },
    {
      icon: BarChart3,
      text: "Unified customer pulse score",
    },
    {
      icon: CheckCircle,
      text: "Proactive alerts before issues escalate",
    },
  ];

  return (
    <section
      id="problems"
      className="overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-teal-600">
            The Challenge
          </p>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Stop reacting. Start predicting.
          </h2>
        </motion.div>

        {/* Problem vs Solution Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* The Problem Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-sm"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-red-100 p-3">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 xs:text-2xl">
                The Problem
              </h3>
            </div>

            <div className="space-y-4">
              {problemItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex gap-4 text-sm xs:text-base"
                  >
                    <Icon className="mt-1 h-5 w-5 flex-shrink-0 text-gray-400" />
                    <p className="text-gray-700">{item.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* The Solution Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="rounded-2xl bg-[#1A975D] p-8 shadow-lg"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-[#0E6B44] p-3">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                The PulseTracker Solution
              </h3>
            </div>

            <div className="space-y-4">
              {solutionItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex gap-4 text-sm xs:text-base"
                  >
                    <Icon className="mt-1 h-5 w-5 flex-shrink-0 text-green-100" />
                    <p className="text-green-50">{item.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
