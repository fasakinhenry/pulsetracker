import { useState } from "react";
import { sendFeedback } from "../../services/feedbackService";

const OPTIONS = [
  { emoji: "😊", label: "Great", score: 5 },
  { emoji: "😐", label: "Okay", score: 3 },
  { emoji: "😣", label: "Bad", score: 1 },
];

export default function MicroFeedback({ context }) {
  const [submitted, setSubmitted] = useState(false);

  async function handleFeedback(option) {
    await sendFeedback({
      type: "CSAT",
      score: option.score,
      emotion: option.label,
      context,
      timestamp: new Date().toISOString(),
    });

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center text-green-400 mt-6">
        Thank you for your feedback 💚
      </div>
    );
  }

  return (
    <div className="mt-8 p-5 rounded-2xl bg-gray-900 border border-gray-800">
      <p className="text-sm text-gray-400 mb-4 text-center">
        How was your transfer experience?
      </p>

      <div className="flex justify-center gap-6">
        {OPTIONS.map((option) => (
          <button
            key={option.label}
            onClick={() => handleFeedback(option)}
            className="text-3xl hover:scale-110 transition"
          >
            {option.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
