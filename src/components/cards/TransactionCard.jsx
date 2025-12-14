export default function TransactionCard({ name, amount, date }) {
    const isCredit = amount > 0;
  
    return (
      <div className="flex items-center justify-between py-3 border-b border-gray-800">
        <div>
          <p className="text-sm text-white">{name}</p>
          <p className="text-xs text-gray-400">{date}</p>
        </div>
  
        <p
          className={`text-sm font-medium ${
            isCredit ? "text-green-400" : "text-red-400"
          }`}
        >
          {isCredit ? "+" : "-"}₦{Math.abs(amount).toLocaleString()}
        </p>
      </div>
    );
  }
  