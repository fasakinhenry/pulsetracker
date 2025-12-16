import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="bg-white px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2"
        >
          <div className="h-2 w-2 rounded-full bg-teal-600"></div>
          <span className="xs:text-sm text-xs font-medium text-teal-700">
            Real-time CX Analytics
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 xs:text-5xl text-4xl font-bold leading-tight text-gray-900 md:text-6xl"
        >
          Track the real-time pulse of your customers{" "}
          <span className="text-[#1A975D]">— before issues become churn.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-600"
        >
          PulseTracker gives digital banks instant visibility into customer
          satisfaction, sentiment, and experience — all in one live dashboard.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 rounded bg-blue-700 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Get Started
            <span>→</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Add video modal or link here
            }}
            className="flex items-center gap-2 rounded border-2 border-gray-300 bg-white px-8 py-3 font-medium text-gray-900 transition-colors hover:border-gray-400"
          >
            <span className="text-xl">▶</span>
            Watch Demo
          </motion.button>
        </motion.div>

        {/* Social Proof / Sponsors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 border-t border-gray-200 pt-10"
        >
          <p className="mb-8 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Trusted by innovation teams in leading banks
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {/* Wema Bank */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                <img src="/wema.png" alt="Wema Bank Logo" className="" />
              </div>
              <span className="text-xl font-bold text-gray-500">Wema Bank</span>
            </motion.div>

            {/* ALAT */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                <img src="/alat.png" alt="ALAT Logo" className="" />
              </div>
              <span className="text-xl font-bold text-gray-500">ALAT</span>
            </motion.div>

            {/* Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="relative mt-16 md:mt-20"
            >
              <div className="relative mx-auto max-w-5xl">
                {/* Gradient fade overlay */}
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-white" />

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                  {/* Mock Dashboard Header */}
                  <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-100 px-4 py-3">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-400" />
                      <div className="h-3 w-3 rounded-full bg-yellow-400" />
                      <div className="h-3 w-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex flex-1 justify-center">
                      <div className="rounded bg-white px-4 py-1 text-xs text-gray-500">
                        dashboard.pulsetracker.io
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="bg-white p-6 md:p-8">
                    {/* Stats Grid */}
                    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
                      {[
                        { label: "Pulse Score", value: "87", change: "+5.2%" },
                        {
                          label: "Active Users",
                          value: "12,847",
                          change: "+12.3%",
                        },
                        {
                          label: "Avg. Sentiment",
                          value: "Positive",
                          change: "+8.1%",
                        },
                        {
                          label: "Response Rate",
                          value: "94%",
                          change: "+2.4%",
                        },
                      ].map((stat, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                          className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                        >
                          <p className="text-xs font-medium text-gray-500">
                            {stat.label}
                          </p>
                          <p className="mt-2 text-3xl font-bold text-gray-900">
                            {stat.value}
                          </p>
                          <span className="mt-1 inline-block text-xs font-semibold text-teal-600">
                            {stat.change}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Chart */}
                    <div className="flex h-48 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-6 md:h-64">
                      <motion.div 
                       initial={{ opacity: 0, y: -20 }}
                       viewport={{margin: "-100px", once: true}}
        whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
                      className="flex h-full w-full items-end gap-2">
                        {[40, 65, 45, 80, 60, 90, 75, 85, 70, 95, 80, 88].map(
                          (h, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: 0 }}
                              whileInView={{ height: `${h}%` }}
                              viewport={{once: true}}
                              transition={{
                                duration: 0.5,
                                delay: 0.5 + i * 0.05,
                                ease: "easeOut",
                              }}
                              whileHover={{ backgroundColor: "#0d9488" }}
                              className="flex-1 cursor-pointer rounded-t-lg bg-teal-500 transition-all duration-300"
                            />
                          ),
                        )}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
