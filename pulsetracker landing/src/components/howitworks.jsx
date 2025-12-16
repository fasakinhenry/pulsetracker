import { MessageSquare, Zap, BarChart3, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Collect Feedback",
      description:
        "Capture customer feedback from all touchpoints — surveys, support tickets, in-app signals, and more.",
      icon: MessageSquare,
    },
    {
      number: 2,
      title: "Analyse Instantly",
      description:
        "Our AI engine processes feedback in real-time, extracting sentiment, intent, and key themes.",
      icon: Zap,
    },
    {
      number: 3,
      title: "Visualise & Track",
      description:
        "See your unified Pulse Score and trends on a beautiful, intuitive dashboard.",
      icon: BarChart3,
    },
    {
      number: 4,
      title: "Act Faster",
      description:
        "Get instant alerts and actionable insights to resolve issues before they escalate.",
      icon: ArrowRight,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="bg-[#1A975D] scroll-mt-16 px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-green-100">
            How it works
          </p>
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
            From feedback to action in four steps
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-green-100">
            PulseTracker makes it simple to understand your customers and act on
            their needs.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute -right-3 top-20 hidden h-1 w-6 bg-green-400 lg:block" />
                )}

                {/* Step Card */}
                <div className="rounded-2xl border border-green-400 border-opacity-40 bg-green-500 bg-opacity-50 p-8 backdrop-blur-sm">
                  {/* Number Badge */}
                  <div className="mb-6 flex items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                      <span className="text-lg font-bold text-white">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="mb-4 flex justify-center">
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 text-center text-2xl font-bold text-white">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-center h-24 text-green-100">
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
}
