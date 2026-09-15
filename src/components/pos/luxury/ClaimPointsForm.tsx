"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { claimTransactionPoints, fetchLuxuryTransactions } from "@/actions/loyalty.server";
import { Loader2, CheckCircle2, ChevronDown } from "lucide-react";

type SaleRecord = { id: number; transaction: { id: number; timestamp: string; subtotal: number } };
type TxOption = { id: number; timestamp: string; subtotal: number };

export default function ClaimPointsForm() {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<TxOption[]>([]);
  const [txLoading, setTxLoading] = useState(true);
  const [selectedTx, setSelectedTx] = useState<TxOption | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchLuxuryTransactions().then((res) => {
      if (res.success && Array.isArray(res.data)) {
        // Deduplicate by transaction.id since multiple sale items share one transaction
        const seen = new Set<number>();
        const unique: TxOption[] = [];
        for (const sale of (res.data as unknown) as SaleRecord[]) {
          const tx = sale?.transaction;
          if (tx && !seen.has(tx.id)) {
            seen.add(tx.id);
            unique.push({ id: tx.id, timestamp: tx.timestamp, subtotal: tx.subtotal });
          }
        }
        setTransactions(unique);
      }
      setTxLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedTx) {
      toast.error("Please select a transaction.");
      return;
    }
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      referral_id: formData.get("referral_id") as string,
      transaction_id: selectedTx.id,
      transaction_type: "luxury",
    };

    const result = await claimTransactionPoints(payload);

    if (result.success) {
      toast.success(`Points claimed! Earned ${result.data?.points_awarded || 0} pts. New Balance: ${result.data?.new_balance || 0}`);
      form.reset();
      setSelectedTx(null);
    } else {
      toast.error(result.error || "An error occurred");
    }

    setLoading(false);
  };

  const formatDate = (iso: string) => {
    if (!iso) return "Unknown date";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "Unknown date";
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-primary-deepBlack flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-5 h-5 text-primary-darkRed" />
          Claim Transaction Points
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            id="referral_id"
            name="referral_id"
            required
            className="w-full text-sm px-4 py-4 border border-gray-300 rounded-lg bg-gray-50 placeholder-primary-dark_gray/50 focus:outline-none focus:ring-2 focus:ring-primary-darkRed focus:border-transparent transition-all duration-200"
            placeholder="Customer Referral ID (e.g. RADIANT-...)"
          />
        </div>

        {/* Transaction Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="w-full text-sm px-4 py-4 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-darkRed transition-all duration-200 flex justify-between items-center"
          >
            {txLoading ? (
              <span className="text-primary-dark_gray/50 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Loading transactions...
              </span>
            ) : selectedTx ? (
              <span className="text-primary-deepBlack">
                #{selectedTx.id} — {formatDate(selectedTx.timestamp)}
              </span>
            ) : (
              <span className="text-primary-dark_gray/50">Select a Transaction</span>
            )}
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>

          {open && (
            <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
              {transactions.length === 0 ? (
                <li className="px-4 py-3 text-sm text-gray-400">No transactions found</li>
              ) : (
                transactions.map((tx) => (
                  <li
                    key={tx.id}
                    onClick={() => { setSelectedTx(tx); setOpen(false); }}
                    className={`px-4 py-3 text-sm cursor-pointer hover:bg-red-50 hover:text-primary-darkRed transition-colors ${selectedTx?.id === tx.id ? "bg-red-50 text-primary-darkRed font-medium" : "text-primary-deepBlack"}`}
                  >
                    <span className="font-medium">#{tx.id}</span> — {formatDate(tx.timestamp)}
                    <span className="ml-2 text-xs text-gray-400">₦{Number(tx.subtotal).toLocaleString()}</span>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !selectedTx}
          className="w-full bg-primary-darkRed hover:bg-red-700 text-primary-base_color1 font-semibold py-4 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-darkRed focus:ring-offset-2 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Processing...
            </>
          ) : (
            "Claim Points"
          )}
        </button>
      </form>
    </div>
  );
}
