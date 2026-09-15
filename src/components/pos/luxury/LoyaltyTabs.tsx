"use client";

import { useState } from "react";
import ClaimPointsForm from "./ClaimPointsForm";
import SubmitReferralForm from "./SubmitReferralForm";
import ReducePointsForm from "./ReducePointsForm";
import { CheckCircle2, Users, ArrowDownCircle } from "lucide-react";

export default function LoyaltyTabs() {
  const [activeTab, setActiveTab] = useState<"claim" | "referral" | "reduce">("claim");

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex flex-wrap lg:flex-nowrap justify-center gap-5 mt-4 mb-8 w-full">
        <div className="flex flex-wrap justify-center gap-3">
          <button
            aria-selected={activeTab === "claim"}
            onClick={() => setActiveTab("claim")}
            className={`p-4 flex min-w-24 w-fit drop-shadow-sm justify-center items-center text-sm gap-2 font-medium rounded-[2.4rem] whitespace-nowrap ${
              activeTab === "claim"
                ? "bg-primary-darkRed text-primary-base_color1"
                : "bg-primary-dark_gray/10 text-primary-dark_gray/60 border border-gray-200"
            } focus:outline-none focus:ring-2 focus:ring-red-400 px-3`}
          >
            <CheckCircle2 className="w-4 h-4" />
            Claim Points
          </button>
          
          <button
            aria-selected={activeTab === "referral"}
            onClick={() => setActiveTab("referral")}
            className={`p-4 flex min-w-24 w-fit drop-shadow-sm justify-center items-center text-sm gap-2 font-medium rounded-[2.4rem] whitespace-nowrap ${
              activeTab === "referral"
                ? "bg-primary-darkRed text-primary-base_color1"
                : "bg-primary-dark_gray/10 text-primary-dark_gray/60 border border-gray-200"
            } focus:outline-none focus:ring-2 focus:ring-red-400 px-3`}
          >
            <Users className="w-4 h-4" />
            Submit Referral
          </button>
          
          <button
            aria-selected={activeTab === "reduce"}
            onClick={() => setActiveTab("reduce")}
            className={`p-4 flex min-w-24 w-fit drop-shadow-sm justify-center items-center text-sm gap-2 font-medium rounded-[2.4rem] whitespace-nowrap ${
              activeTab === "reduce"
                ? "bg-primary-darkRed text-primary-base_color1"
                : "bg-primary-dark_gray/10 text-primary-dark_gray/60 border border-gray-200"
            } focus:outline-none focus:ring-2 focus:ring-red-400 px-3`}
          >
            <ArrowDownCircle className="w-4 h-4" />
            Redeem Points
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "claim" && <ClaimPointsForm />}
        {activeTab === "referral" && <SubmitReferralForm />}
        {activeTab === "reduce" && <ReducePointsForm />}
      </div>
    </div>
  );
}
