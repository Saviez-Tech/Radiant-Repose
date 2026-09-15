"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { reducePoints, fetchMyWorkerProfile } from "@/actions/loyalty.server";
import { Loader2, ArrowDownCircle } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";

export default function ReducePointsForm() {
  const [loading, setLoading] = useState(false);
  const [workerProfileId, setWorkerProfileId] = useState<number | null>(null);
  const staffId = useAppSelector((store) => store.authUser.id);

  useEffect(() => {
    fetchMyWorkerProfile().then((res) => {
      if (res.success && res.data) setWorkerProfileId(res.data.id);
    });
  }, [staffId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const payload: any = {
      referral_id: formData.get("referral_id") as string,
      amount: parseInt(formData.get("amount") as string),
    };
    
    const note = formData.get("note") as string;
    if (note) payload.note = note;
    
    const staffId = formData.get("staff_id") as string;
    if (staffId) payload.staff_id = parseInt(staffId);

    const result = await reducePoints(payload);
    
    if (result.success) {
      toast.success(`Redeemed ${result.data?.points_deducted || 0} pts. New Balance: ${result.data?.new_balance || 0}`);
      form.reset();
    } else {
      toast.error(result.error || "An error occurred. Please try again.");
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-primary-deepBlack flex items-center gap-2 mb-3">
          <ArrowDownCircle className="w-5 h-5 text-primary-darkRed" />
          Reduce (Redeem) Points
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

        <div>
          <input
            type="number"
            id="amount"
            name="amount"
            required
            min="1"
            className="w-full text-sm px-4 py-4 border border-gray-300 rounded-lg bg-gray-50 placeholder-primary-dark_gray/50 focus:outline-none focus:ring-2 focus:ring-primary-darkRed focus:border-transparent transition-all duration-200"
            placeholder="Points to Deduct (e.g. 50)"
          />
        </div>
        
        <div>
          <input
            type="text"
            id="note"
            name="note"
            className="w-full text-sm px-4 py-4 border border-gray-300 rounded-lg bg-gray-50 placeholder-primary-dark_gray/50 focus:outline-none focus:ring-2 focus:ring-primary-darkRed focus:border-transparent transition-all duration-200"
            placeholder="Reason / Note (Optional)"
          />
        </div>
        
        <div>
          <input
            type="number"
            id="staff_id"
            name="staff_id"
            min="1"
            defaultValue={workerProfileId ?? ""}
            className="w-full text-sm px-4 py-4 border border-gray-300 rounded-lg bg-gray-50 placeholder-primary-dark_gray/50 focus:outline-none focus:ring-2 focus:ring-primary-darkRed focus:border-transparent transition-all duration-200"
            placeholder="Staff ID (Optional, e.g. 3)"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-darkRed hover:bg-red-700 text-primary-base_color1 font-semibold py-4 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-darkRed focus:ring-offset-2 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Processing...
            </>
          ) : (
            "Redeem Points"
          )}
        </button>
      </form>
    </div>
  );
}
