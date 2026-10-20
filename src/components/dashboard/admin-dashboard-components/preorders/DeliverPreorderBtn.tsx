"use client";

import { useState } from "react";
import { CheckCircle2, Truck } from "lucide-react";
import toast from "react-hot-toast";
import { deliverPreorder } from "@/actions/admin-preorders.server";
import DestructiveActionPrompt from "@/components/modals/DestructiveActionPrompt";

interface DeliverPreorderBtnProps {
  preorderId: number;
  status: string;
  onSuccess?: () => void;
  compact?: boolean;
}

export default function DeliverPreorderBtn({
  preorderId,
  status,
  onSuccess,
  compact = false,
}: DeliverPreorderBtnProps) {
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  const isDelivered = status?.toLowerCase() === "delivered";

  if (isDelivered) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <CheckCircle2 size={13} className="text-emerald-600" />
        Delivered
      </span>
    );
  }

  const handleConfirm = async () => {
    setProcessing(true);
    try {
      const result = await deliverPreorder(preorderId);
      if (result.success) {
        toast.success(`Pre-order #${preorderId} marked as delivered!`);
        setOpen(false);
        onSuccess?.();
      } else {
        toast.error(result.error || "Failed to mark as delivered");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-1.5 rounded-lg font-medium transition-all duration-200 shadow-sm active:scale-95 ${
          compact
            ? "px-3 py-1.5 text-xs bg-primary-darkRed text-white hover:bg-primary-red"
            : "px-4 py-2 text-sm bg-primary-darkRed text-white hover:bg-primary-red"
        }`}
      >
        <Truck size={14} />
        <span>Mark as Delivered</span>
      </button>

      <DestructiveActionPrompt
        open={open}
        description={`mark Pre-Order #${preorderId} as Delivered`}
        onCancel={() => setOpen(false)}
        onConfirm={handleConfirm}
        processing={processing}
      />
    </>
  );
}
