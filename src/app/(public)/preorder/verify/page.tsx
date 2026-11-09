"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyPreorderPayment, type PreorderVerifyResponse } from "@/actions/preorder.server";
import Scalffold from "@/components/custom-utils/Scalffold";
import { formatNaira } from "@/lib/helperFns/formatNumber";
import { dm_mono } from "@/fonts";
import { CheckCircle2, AlertCircle, RotateCw, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PreorderVerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const reference =
    searchParams.get("reference") || searchParams.get("trxref") || "";

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PreorderVerifyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const doVerify = async () => {
    if (!reference) {
      setError("No transaction reference provided.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const res = await verifyPreorderPayment(reference);
    if (res.success && res.data) {
      setData(res.data);
    } else {
      setError(
        res.error ||
          "Payment verification failed. If your payment was deducted, please give it a moment or contact support."
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    doVerify();
  }, [reference]);

  return (
    <Scalffold>
      <div className="app-container py-16 flex flex-col items-center justify-center min-h-[60vh] max-w-lg mx-auto">
        {loading ? (
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 border-4 border-primary-darkRed/20 border-t-primary-darkRed rounded-full animate-spin mb-4" />
            <h2 className="text-xl font-bold text-primary-deepBlack mb-1">
              Verifying Pre-Order Payment…
            </h2>
            <p className="text-sm text-primary-text_stone_color">
              Please wait while we confirm your transaction with Paystack.
            </p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-3xl border border-red-100 shadow-sm p-8 text-center w-full">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} />
            </div>
            <h2 className="text-xl font-bold text-primary-deepBlack mb-2">
              Payment Verification Failed
            </h2>
            <p className="text-sm text-primary-text_stone_color leading-relaxed mb-6">
              {error}
            </p>
            {reference && (
              <span className="text-[11px] font-mono bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg mb-6 inline-block">
                Ref: {reference}
              </span>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={doVerify}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <RotateCw size={14} /> Retry Verification
              </button>
              <Link
                href="/preorder"
                className="px-5 py-2.5 rounded-xl bg-primary-darkRed text-white text-sm font-semibold hover:bg-primary-red flex items-center justify-center gap-1"
              >
                Return to Pre-Orders
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center w-full">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={36} />
            </div>
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-600">
              Payment Confirmed
            </span>
            <h2 className="text-2xl font-bold text-primary-deepBlack mt-1 mb-2">
              Payment Successful!
            </h2>
            <p className="text-sm text-primary-text_stone_color leading-relaxed mb-6">
              Your payment has been received and your pre-order has been updated.
            </p>

            <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Amount Paid</span>
                <span className={`${dm_mono.className} font-bold text-primary-darkRed text-sm`}>
                  {formatNaira(data?.amount || 0, true, true)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Reference</span>
                <span className="font-mono text-gray-800">{data?.reference}</span>
              </div>
              {data?.email && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Email</span>
                  <span className="text-gray-800">{data.email}</span>
                </div>
              )}
              {data?.transaction_date && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Date</span>
                  <span className="text-gray-800">
                    {new Date(data.transaction_date).toLocaleString("en-NG", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
              )}
            </div>

            <Link
              href="/preorder"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary-darkRed to-primary-red text-white text-sm font-semibold hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5"
            >
              Continue to Pre-Orders <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </Scalffold>
  );
}
