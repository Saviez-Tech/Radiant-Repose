"use client";

import { useEffect, useState, useTransition } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  fetchPreorderTrack,
  initiatePreorderNextPayment,
  verifyPreorderPayment,
  type PreorderTrackData,
} from "@/actions/preorder.server";
import Scalffold from "@/components/custom-utils/Scalffold";
import { dm_mono } from "@/fonts";
import { formatNaira } from "@/lib/helperFns/formatNumber";
import toast from "react-hot-toast";
import {
  Package,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  CreditCard,
  ArrowRight,
  ShieldCheck,
  RotateCw,
  FileText,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function PreorderTrackPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = params?.token as string;

  const [trackData, setTrackData] = useState<PreorderTrackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [payingChoice, setPayingChoice] = useState<"installment" | "remaining" | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  // Load tracking information
  const loadTrackingData = async (showLoading = true) => {
    if (!token) return;
    if (showLoading) setLoading(true);
    setErrorMessage(null);

    const res = await fetchPreorderTrack(token);
    if (!res.success) {
      setErrorMessage(res.error || "Unable to find this pre-order. Please check your link.");
    } else if (res.data) {
      setTrackData(res.data);
    }
    if (showLoading) setLoading(false);
  };

  useEffect(() => {
    loadTrackingData();
  }, [token]);

  // Handle Paystack callback verify if reference is present in query parameters
  useEffect(() => {
    const reference = searchParams.get("reference") || searchParams.get("trxref");
    if (!reference) return;

    let isMounted = true;
    const runVerification = async () => {
      setVerifying(true);
      toast.loading("Verifying your payment...", { id: "verify-toast" });

      const res = await verifyPreorderPayment(reference);
      toast.dismiss("verify-toast");

      if (!isMounted) return;

      if (res.success && res.data) {
        toast.success(
          `Payment of ${formatNaira(res.data.amount, true, true)} verified successfully!`
        );
        setVerificationResult(
          `Payment successful! Reference: ${res.data.reference}. Your order balance has been updated.`
        );
        // Refresh track data
        loadTrackingData(false);
      } else {
        toast.error(res.error || "Could not verify payment status.");
        setVerificationResult(
          res.error || "Could not verify payment. Please contact support or refresh to try again."
        );
      }
      setVerifying(false);

      // Clean up URL parameters without refreshing
      router.replace(`/preorder/track/${token}`);
    };

    runVerification();

    return () => {
      isMounted = false;
    };
  }, [searchParams, token]);

  // Handle continuing / initiating installment or remaining payment
  const handlePayment = async (choice: "installment" | "remaining") => {
    if (!token) return;
    setPayingChoice(choice);

    try {
      const res = await initiatePreorderNextPayment(token, choice);
      if (!res.success || !res.data) {
        toast.error(res.error || "Failed to start payment.");
        setPayingChoice(null);
        return;
      }

      toast.success("Redirecting to Paystack checkout...");
      window.location.href = res.data.authorization_url;
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Payment error occurred");
      setPayingChoice(null);
    }
  };

  if (loading) {
    return (
      <Scalffold>
        <div className="app-container py-16 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-primary-darkRed/20 border-t-primary-darkRed rounded-full animate-spin mb-4" />
          <p className="text-sm font-medium text-primary-text_stone_color">
            Loading preorder details…
          </p>
        </div>
      </Scalffold>
    );
  }

  if (errorMessage || !trackData) {
    return (
      <Scalffold>
        <div className="app-container py-16 flex flex-col items-center justify-center min-h-[60vh] text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-4">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-xl font-bold text-primary-deepBlack mb-2">Pre-Order Not Found</h2>
          <p className="text-sm text-primary-text_stone_color leading-relaxed mb-6">
            {errorMessage || "We couldn't locate this pre-order. The tracking link may be invalid or expired."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => loadTrackingData(true)}
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <RotateCw size={15} /> Try Again
            </button>
            <Link
              href="/preorder"
              className="px-5 py-2.5 rounded-xl bg-primary-darkRed text-white text-sm font-semibold hover:bg-primary-red flex items-center justify-center gap-1.5"
            >
              Browse Pre-Orders <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </Scalffold>
    );
  }

  const { preorder, payments, payment_choices } = trackData;
  const isPaidInFull = preorder.payment || parseFloat(preorder.balance_due) <= 0;
  const totalAmount = parseFloat(preorder.total_amount) || 0;
  const amountPaid = parseFloat(preorder.amount_paid) || 0;
  const balanceDue = parseFloat(preorder.balance_due) || 0;
  const progressPercent =
    totalAmount > 0 ? Math.min(100, Math.round((amountPaid / totalAmount) * 100)) : 0;

  return (
    <Scalffold>
      <div className="app-container py-10 max-w-4xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-primary-text_stone_color mb-6">
          <Link href="/preorder" className="hover:text-primary-darkRed transition-colors">
            Pre-Orders
          </Link>
          <span>/</span>
          <span className="font-semibold text-primary-deepBlack">Pre-Order Tracking</span>
        </div>

        {/* Verification Alert Banner */}
        {verificationResult && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3">
            <CheckCircle2 className="text-emerald-600 mt-0.5 shrink-0" size={18} />
            <div className="flex-1">
              <span className="font-semibold">Verification Update: </span>
              {verificationResult}
            </div>
          </div>
        )}

        {/* Header Banner */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs uppercase tracking-wider font-semibold text-primary-yellow">
                  Pre-Order Status
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full capitalize ${
                    preorder.status?.toLowerCase() === "delivered"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {preorder.status?.toLowerCase() === "delivered" ? (
                    <CheckCircle2 size={11} />
                  ) : (
                    <Clock size={11} />
                  )}
                  {preorder.status || "Pending"}
                </span>
                {isPaidInFull ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    <CheckCircle2 size={11} /> Paid in Full
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    <Clock size={11} /> In Progress
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary-deepBlack">
                {preorder.product_name}
              </h1>
              <p className="text-xs text-primary-text_stone_color mt-1 flex items-center gap-2">
                <Calendar size={13} /> Ordered on {new Date(preorder.created_at).toLocaleDateString("en-NG", {
                  dateStyle: "medium",
                })}
                <span>•</span>
                <span>Quantity: {preorder.quantity}</span>
                <span>•</span>
                <span className="capitalize">Plan: {preorder.payment_option}</span>
              </p>
            </div>

            <div className="flex sm:flex-col items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0">
              <span className="text-xs text-primary-text_stone_color font-medium">Pre-Order Total</span>
              <span className={`${dm_mono.className} text-xl sm:text-2xl font-bold text-primary-darkRed`}>
                {formatNaira(totalAmount, true, true)}
              </span>
            </div>
          </div>

          {/* Payment Progress Bar */}
          <div className="pt-6">
            <div className="flex items-center justify-between mb-2 text-xs font-semibold">
              <span className="text-primary-deepBlack">Payment Progress ({progressPercent}%)</span>
              <span className="text-primary-text_stone_color">
                {formatNaira(amountPaid, true, true)} of {formatNaira(totalAmount, true, true)} paid
              </span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isPaidInFull
                    ? "bg-emerald-500"
                    : "bg-gradient-to-r from-primary-darkRed to-primary-red"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              <div className="bg-primary-light_peach/50 rounded-2xl p-4 border border-primary-light_amber/30">
                <span className="text-xs font-medium text-primary-text_stone_color">Total Cost</span>
                <p className={`${dm_mono.className} text-lg font-bold text-primary-deepBlack mt-1`}>
                  {formatNaira(totalAmount, true, true)}
                </p>
                <span className="text-[11px] text-gray-500">
                  {preorder.quantity} × {formatNaira(parseFloat(preorder.price_at_order) || 0, true, true)}
                </span>
              </div>

              <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-100">
                <span className="text-xs font-medium text-emerald-800">Amount Paid</span>
                <p className={`${dm_mono.className} text-lg font-bold text-emerald-700 mt-1`}>
                  {formatNaira(amountPaid, true, true)}
                </p>
                <span className="text-[11px] text-emerald-600">
                  {progressPercent}% cleared
                </span>
              </div>

              <div className="bg-rose-50/60 rounded-2xl p-4 border border-rose-100">
                <span className="text-xs font-medium text-rose-800">Remaining Balance</span>
                <p className={`${dm_mono.className} text-lg font-bold text-rose-700 mt-1`}>
                  {formatNaira(balanceDue, true, true)}
                </p>
                <span className="text-[11px] text-rose-600">
                  {balanceDue <= 0 ? "No balance remaining" : "Pending installment(s)"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Action Section: Make Another Payment ── */}
        {payment_choices && payment_choices.length > 0 && balanceDue > 0 && (
          <div className="bg-gradient-to-br from-white to-primary-light_peach/30 rounded-3xl border-2 border-primary-darkRed/20 shadow-sm p-6 sm:p-8 mb-6">
            <div className="flex items-center gap-2 mb-2 text-primary-darkRed font-bold text-sm">
              <CreditCard size={18} />
              <span>Next Payment Installment</span>
            </div>
            <h2 className="text-xl font-bold text-primary-deepBlack mb-1">
              Pay Your Pre-Order Balance
            </h2>
            <p className="text-xs sm:text-sm text-primary-text_stone_color mb-6 max-w-xl">
              Keep your pre-order confirmed by continuing with your scheduled 30% installment or paying off your entire remaining balance now.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option 1: Installment */}
              {payment_choices.includes("installment") && (
                <div className="flex flex-col justify-between bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:border-primary-darkRed transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-primary-deepBlack">
                        Next Installment (30%)
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                        Scheduled
                      </span>
                    </div>
                    <p className="text-xs text-primary-text_stone_color mb-4 leading-relaxed">
                      Pay the next 30% milestone towards your order. Capped at actual remaining balance.
                    </p>
                  </div>
                  <div>
                    <button
                      type="button"
                      disabled={payingChoice !== null || verifying}
                      onClick={() => handlePayment("installment")}
                      className="w-full py-3 px-4 rounded-xl bg-primary-deepBlack text-white hover:bg-gray-800 font-semibold text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {payingChoice === "installment" ? (
                        <>
                          <RotateCw size={14} className="animate-spin" /> Preparing Checkout…
                        </>
                      ) : (
                        <>
                          Pay Installment <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Option 2: Remaining Balance */}
              {payment_choices.includes("remaining") && (
                <div className="flex flex-col justify-between bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:border-primary-darkRed transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-primary-deepBlack">
                        Complete Balance
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        Finalize All
                      </span>
                    </div>
                    <p className="text-xs text-primary-text_stone_color mb-4 leading-relaxed">
                      Clear the entire remaining balance of{" "}
                      <strong className="text-primary-darkRed">{formatNaira(balanceDue, true, true)}</strong> now to finalize your order payments.
                    </p>
                  </div>
                  <div>
                    <button
                      type="button"
                      disabled={payingChoice !== null || verifying}
                      onClick={() => handlePayment("remaining")}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary-darkRed to-primary-red text-white hover:opacity-95 font-semibold text-xs transition-opacity flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                    >
                      {payingChoice === "remaining" ? (
                        <>
                          <RotateCw size={14} className="animate-spin" /> Preparing Checkout…
                        </>
                      ) : (
                        <>
                          Pay Full Balance ({formatNaira(balanceDue, true, true)}) <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 mt-4 text-[11px] text-gray-500">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>
                Processed securely through Paystack. If you have an unpaid checkout attempt, you will resume it automatically.
              </span>
            </div>
          </div>
        )}

        {/* ── Payments History Section ── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-primary-deepBlack">Payment History</h3>
              <p className="text-xs text-primary-text_stone_color mt-0.5">
                All recorded payment attempts and verified transactions for this pre-order.
              </p>
            </div>
            <button
              onClick={() => loadTrackingData(false)}
              className="text-xs text-primary-darkRed hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCw size={12} /> Refresh
            </button>
          </div>

          {payments && payments.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {payments.map((p, idx) => {
                const isPaid = p.status?.toLowerCase() === "paid" || p.status?.toLowerCase() === "success";
                return (
                  <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                          isPaid ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {isPaid ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-primary-deepBlack">
                            {formatNaira(parseFloat(p.amount) || 0, true, true)}
                          </span>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded capitalize ${
                              isPaid
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {p.status || "Pending"}
                          </span>
                        </div>
                        <span className="text-[11px] text-primary-text_stone_color block mt-0.5">
                          {p.paid_at
                            ? `Paid on ${new Date(p.paid_at).toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" })}`
                            : `Created on ${new Date(p.created_at).toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" })}`}
                        </span>
                      </div>
                    </div>

                    {p.reference && (
                      <span className="text-[10px] font-mono text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-200 hidden sm:inline-block">
                        {p.reference}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-primary-text_stone_color text-xs">
              No payments recorded yet for this order.
            </div>
          )}
        </div>
      </div>
    </Scalffold>
  );
}
