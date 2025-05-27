"use client";

import { Copy } from "lucide-react";

export default function Payment() {
 
  const isFormValid = false;



  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold text-primary-deepBlack">Payment:</h3>
      <div className="border-t border-gray-400 my-4">
        <div className="py-4 w-full flex flex-col gap-4">
          

            <div className="">
              <div className="relative z-10 flex flex-col items-center">
                <p className="text-primary-dark_ash_slate mb-2">
                  Transfer N12,345 to:
                </p>
                <h3 className="text-xl font-bold mb-1">Union Bank</h3>

                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl font-bold">9876543210</span>
                  <button
                    className="text-primary-dark_ash_slate hover:text-gray-600"
                    onClick={() => navigator.clipboard.writeText("9876543210")}
                  >
                    <Copy size={16} />
                  </button>
                </div>

                <p className="font-medium mb-4">Radiant Repose</p>

                <div className="flex items-center gap-2 mb-8">
                  <span className="text-primary-dark_ash_slate">
                    Expires in
                  </span>
                  <span className="text-primary-red font-medium">10:00</span>
                  <span className="text-primary-dark_ash_slate">minutes</span>
                </div>
              </div>
            </div>

          <button
            className={`w-full py-3 mt-4 rounded-md transition-colors ${
              isFormValid
                ? "bg-primary-red text-white"
                : "bg-[#5B5B5B1A] text-gray-600"
            }`}
            disabled={!isFormValid}
          >
            Pay
          </button>
          <p className="text-xs text-primary-text_stone_color mt-4 text-center">
            Your personal data will be used to process your order, support your
            experience throughout this website, and for other purposes described
            in our privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
}
