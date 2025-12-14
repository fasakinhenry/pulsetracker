import { useNavigate } from "react-router-dom";
import TransferForm from "../components/forms/TransferForm";
import { useTransfer } from "../hooks/useTransfer"
import Header from "../components/Layout/Header";

export default function Transfer() {
  const navigate = useNavigate();
  const { transfer, loading, error } = useTransfer();

  async function handleTransfer(data) {
    try {
      const result = await transfer(data);
      navigate("/transfer-success", {
        state: { reference: result.reference },
      });
    } catch {
      // handled via error state
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="px-6 py-6 max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-2">
          Transfer Money
        </h2>

        <p className="text-sm text-gray-400 mb-6">
          Send money securely to another account
        </p>

        <TransferForm onSubmit={handleTransfer} loading={loading} />

        {error && (
          <p className="text-red-400 text-sm mt-4">
            {error}
          </p>
        )}
      </main>
    </div>
  );
}
