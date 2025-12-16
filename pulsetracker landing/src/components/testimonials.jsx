import { Users, Building2, Star, Shield } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    {
      icon: Users,
      value: "100+",
      label: "Early testers onboarded",
    },
    {
      icon: Building2,
      value: "25+",
      label: "Fintechs in waitlist",
    },
    {
      icon: Star,
      value: "4.9",
      label: "Average rating",
    },
    {
      icon: Shield,
      value: "SOC 2",
      label: "Compliance ready",
    },
  ];

  const companies = ["Wema Bank", "ALAT"];

  return (
    <section
      id="testimonials"
      className="bg-white px-4 py-20 sm:px-6 lg:px-8"
      ref={ref}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-teal-600">
            Trusted
          </p>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Built for modern digital banks and fintechs
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm"
              >
                <motion.div
                  initial={{ rotate: -10 }}
                  animate={isInView ? { rotate: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                >
                  <Icon className="mx-auto mb-4 h-8 w-8 text-teal-600" />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="mb-2 text-4xl font-bold text-gray-900"
                >
                  {stat.value}
                </motion.p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 border-t border-gray-200"
        />

        {/* Companies Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="mb-8 text-gray-600">Trusted by innovative teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {companies.map((company, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="text-lg font-semibold text-gray-400"
              >
                {company}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
