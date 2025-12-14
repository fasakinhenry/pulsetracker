import { delay } from "../utils/delay";

export async function makeTransfer({ amount, recipient }) {
  await delay(1500); // realistic bank processing delay

  if (!amount || !recipient) {
    throw new Error("Invalid transfer details");
  }

  return {
    status: "success",
    reference: `TX-${Date.now()}`,
  };
}
