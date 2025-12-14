import { useState } from "react";

export default function TransferForm({ onSubmit, loading }) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      recipient,
      amount: Number(amount),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Recipient name or account"
        className="w-full p-3 rounded bg-gray-900 border border-gray-800 focus:ring-2 focus:ring-blue-500"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount (₦)"
        className="w-full p-3 rounded bg-gray-900 border border-gray-800 focus:ring-2 focus:ring-blue-500"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-medium disabled:opacity-50"
      >
        {loading ? "Processing transfer..." : "Send Money"}
      </button>
    </form>
  );
}
