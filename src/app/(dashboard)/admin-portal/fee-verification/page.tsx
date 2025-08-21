"use client";

import { useEffect, useState } from "react";
import FeeVerification from "../components/FeeVeriFication";
import { Transaction } from "../types";

export default function FeeVerificationPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await fetch("/data/transactions.json"); // ✅ public folder
        const data: Transaction[] = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  if (loading) {
    return <div className="p-4">Loading fee verification data...</div>;
  }

  return (
    <>
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Fee Verification
      </h2>
      <FeeVerification transactions={transactions} />
    </>
  );
}
