"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function PreorderSuccessfulModal() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const reference = searchParams.get("reference") || searchParams.get("trxref");

  useEffect(() => {
    if (searchParams.has("reference") && searchParams.has("trxref")) {
      setOpen(true);
    }
  }, [searchParams]);

  const handleClose = () => {
    setOpen(false);
    // Clean up query parameters from the URL
    router.replace(pathname);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => { if (!val) handleClose(); }}>
      <DialogContent className="flex flex-col items-center text-center justify-center p-6 sm:p-8 max-w-md rounded-2xl">
        <div className="relative mb-2">
          <Image
            width={88}
            height={88}
            src="/images/confetti.png"
            alt="Success"
            className="w-20 h-20 object-contain animate-bounce"
          />
        </div>
        <div className="flex items-center gap-1.5 text-primary-green mb-1 font-semibold text-xs tracking-wider uppercase">
          <CheckCircle2 size={16} />
          Pre-Order Confirmed
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-primary-deepBlack">
          Payment Successful!
        </h3>
        {reference && (
          <span className="text-[11px] font-mono bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md mt-1 mb-2">
            Ref: {reference}
          </span>
        )}
        <p className="text-sm text-primary-text_stone_color leading-relaxed mt-1">
          Your pre-order and payment have been received successfully. We will notify you via email and phone as soon as your item is dispatched!
        </p>
        <button
          onClick={handleClose}
          className="mt-6 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-primary-darkRed to-primary-red text-white text-sm font-semibold hover:opacity-95 transition-opacity"
        >
          Done
        </button>
      </DialogContent>
    </Dialog>
  );
}
