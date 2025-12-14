import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Layout/Header";
import BalanceCard from "../components/Cards/BalanceCard";
import TransactionCard from "../components/Cards/TransactionCard";
import { AccountContext } from "../context/AccountContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { transactions } = useContext(AccountContext);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="px-6 py-6 space-y-6">
        <BalanceCard />

        <button
          onClick={() => navigate("/transfer")}
          className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-medium"
        >
          Transfer Money
        </button>

        <section>
          <h3 className="text-sm text-gray-400 mb-2">
            Recent Transactions
          </h3>

          <div className="bg-gray-900 rounded-xl px-4">
            {transactions.map((tx) => (
              <TransactionCard
                key={tx.id}
                {...tx}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
