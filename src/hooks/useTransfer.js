import { useState } from "react";
import { makeTransfer } from "../services/transferService";

export function useTransfer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function transfer(data) {
    setLoading(true);
    setError(null);

    try {
      const result = await makeTransfer(data);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { transfer, loading, error };
}
