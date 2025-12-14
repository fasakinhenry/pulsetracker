import { useContext } from "react";
import { AccountContext } from "../../context/AccountContext";

export default function BalanceCard() {
  const { balance } = useContext(AccountContext);

  return (
    <div className="bg-gradient-to-br from-blue-900 to-black rounded-2xl p-6 shadow-lg">
      <p className="text-gray-400 text-sm mb-1">
        Available Balance
      </p>

      <h2 className="text-3xl font-bold text-green-400">
        ₦{balance.toLocaleString()}
      </h2>
    </div>
  );
}
