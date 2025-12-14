import { createContext, useState } from "react";
import { transactions as mockTransactions } from "../utils/mockData";

export const AccountContext = createContext(null);

export function AccountProvider({ children }) {
  const [balance, setBalance] = useState(425000);
  const [transactions, setTransactions] = useState(mockTransactions);

  return (
    <AccountContext.Provider
      value={{ balance, setBalance, transactions, setTransactions }}
    >
      {children}
    </AccountContext.Provider>
  );
}
