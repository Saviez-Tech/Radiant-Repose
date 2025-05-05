"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AppInput from "../custom-utils/AppInput";
import { Copy } from "lucide-react";

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  // const [formData, setFormData] = useState({
  //   cardNumber: "",
  //   expirationDate: "",
  //   cvv: "",
  //   bankTransferConfirmed: false,
  // })

  // const [isFormValid, setIsFormValid] = useState(false)
  const isFormValid = false;

  // // Update form data when input changes
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold text-primary-deepBlack">Payment:</h3>
      <div className="border-t border-gray-400 my-4">
        <div className="py-4 w-full flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-lg font-semibold text-primary-deepBlack">
              Pay With:
            </h1>
            <RadioGroup
              className="flex gap-4"
              value={paymentMethod}
              onValueChange={setPaymentMethod}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="card" id="card" />
                <label
                  htmlFor="card"
                  className="text-sm font-medium text-primary-text_stone_color"
                >
                  Card
                </label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="bank" id="bank" />
                <label
                  htmlFor="bank"
                  className="text-sm font-medium text-primary-text_stone_color"
                >
                  Bank Transfer
                </label>
              </div>
            </RadioGroup>
          </div>

          {paymentMethod === "card" ? (
            <>
              <AppInput
                variant="transparent"
                label="Card Number"
                className="!bg-transparent"
                name="cardNumber"
                placeholder="1234 1234 1234 1234"
                register={Payment}
              />
              <div className="flex gap-2 w-full">
                <AppInput
                  variant="transparent"
                  label="Expiry Date"
                  className="!bg-transparent w-full"
                  name="expirationDate"
                  placeholder="MM/YY"
                  register={Payment}
                />
                <AppInput
                  variant="transparent"
                  label="CVV"
                  className="!bg-transparent w-full"
                  name="cvv"
                  placeholder="123"
                  register={Payment}
                />
              </div>
            </>
          ) : (
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
          )}

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
