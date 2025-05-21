"use client";

import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function CheckoutSuccessfulModal() {
  const [open, setOpen] = useState(false);
  const p = useSearchParams();
  const { clearCart } = useCart();

  useEffect(() => {
    if (p.has("reference") && p.has("trxref")) {
      clearCart();
      setOpen(true);
    }
  }, [p]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="flex flex-col items-center text-center justify-center">
        <Image width={96} height={96} src="/images/confetti.png" alt="" />
        <p className="md:text-xl text-lg font-bold">Payment Successful!</p>
        <p className="md:text-base text-sm">
          Your payment has been processed successfully. Thank you for choosing
          Radiant Repose.
        </p>
      </DialogContent>
    </Dialog>
  );
}
