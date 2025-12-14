import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Layout/Header";
import MicroFeedback from "../components/feedback/MicroFeedback";

export default function TransferSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="px-6 py-10 max-w-lg mx-auto text-center">
        {/* Success Icon */}
        <div className="text-6xl mb-4">✅</div>

        <h2 className="text-2xl font-semibold mb-2">
          Transfer Successful
        </h2>

        <p className="text-sm text-gray-400 mb-6">
          Reference: <span className="text-green-400">{state?.reference}</span>
        </p>

        {/* Micro Feedback Widget */}
        <MicroFeedback
          context={{
            screen: "Transfer Success",
            action: "Bank Transfer",
          }}
        />

        {/* CTA */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-10 w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-medium"
        >
          Back to Dashboard
        </button>
      </main>
    </div>
  );
}
