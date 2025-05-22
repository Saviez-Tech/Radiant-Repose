"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

type SpaCheckoutSuccessfulModalProps = {
  dates: [string, string][];
  children: ReactNode;
};

export default function SpaCheckoutSuccessfulModal({
  children,
  dates,
}: SpaCheckoutSuccessfulModalProps) {
  const isOneDay = dates.length === 1;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex w-[470px] flex-col items-center text-center justify-center  rounded-3xl max-w-[90vw]">
        <Image
          width={96}
          height={96}
          src="/images/confetti.png"
          alt="Celebration Confetti"
          className="max-md:size-[68px]"
        />

        <DialogTitle className="md:text-xl text-lg font-bold">
          Booking Successful!
        </DialogTitle>

        {isOneDay ? (
          <p className="md:text-base text-sm">
            Your appointment has been scheduled! We look forward to seeing you
            on
            <strong className="text-sm text-[#424F4A]" > {dates[0][0]}</strong> at <strong>{dates[0][1]}</strong>.
          </p>
        ) : (
          <>
            <p className="md:text-base text-sm">
              Your appointment has been scheduled! We look forward to seeing you
              on the following dates
            </p>
            <div className="text-sm text-[#424F4A]">
              {dates.map((d, i) => (
                <>
                  <strong > {d[0]}</strong> at <strong>{d[1]}</strong>. <br />
                </>
              ))}
            </div>
          </>
        )}

        <Link href={"/services/spa/booking-summary"}
          className="btn bg-primary-red text-white rounded-md w-full py-3 px-4;
 "
          onClick={() => {
            console.log("Redirect to booking summary");
          }}
        >
          View Booking Summary
        </Link>
      </DialogContent>
    </Dialog>
  );
}
