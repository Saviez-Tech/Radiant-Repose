"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useState } from "react";
import { Minus, Plus, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { submitPreorder, type PreorderProduct } from "@/actions/preorder.server";
import AppInput from "@/components/custom-utils/AppInput";
import { useCountriesAndStates } from "@/hooks/useCountries";
import AppSelect from "@/components/custom-utils/AppSelect";
import { formatNaira } from "@/lib/helperFns/formatNumber";
import { dm_mono } from "@/fonts";

// ── Validation schema ──────────────────────────────────────────────────────
const preorderSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone number is required"),
  street_address: z.string().min(1, "Street address is required"),
  zip_code: z.string().min(1, "Zip code is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  note: z.string().optional(),
});

type PreorderSchemaValues = z.infer<typeof preorderSchema>;

export default function PreorderForm({ product }: { product: PreorderProduct }) {
  const [qty, setQty] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  const { countries, states, setCountry } = useCountriesAndStates();

  const countryOptions = countries.map((c) => ({ value: c.isoCode, label: c.name }));
  const stateOptions = states.map((s) => ({ value: s.isoCode, label: s.name }));

  const form = useForm<PreorderSchemaValues>({
    resolver: zodResolver(preorderSchema),
    mode: "onBlur",
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = form;

  const preorderPrice = parseFloat(product.preorder_price) || parseFloat(product.price);
  const totalPrice = preorderPrice * qty;

  const onSubmit = async (data: PreorderSchemaValues) => {
    try {
      const selectedCountry = countries.find(
        (c) => c.isoCode === data.country || c.name === data.country
      );
      const selectedState = states.find(
        (s) => s.isoCode === data.state || s.name === data.state
      );

      const result = await submitPreorder({
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        street_address: data.street_address,
        zip_code: data.zip_code,
        city: data.city,
        state: selectedState ? selectedState.name : data.state,
        country: selectedCountry ? selectedCountry.name : data.country,
        product: product.id,
        quantity: qty,
        note: data.note ?? "",
      });

      if (!result.success) {
        toast.error(result.error || "Failed to submit preorder");
        return;
      }

      if (result.authorizationUrl) {
        setIsRedirecting(true);
        toast.success("Pre-order saved! Redirecting to Paystack payment...");
        window.location.href = result.authorizationUrl;
        return;
      }

      setSubmitted(true);
      toast.success("Pre-order placed successfully!");
    } catch (err) {
      console.error("Preorder form error:", err);
      toast.error(err instanceof Error ? err.message : "An unexpected error occurred");
    }
  };

  // ── Success state ──────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-16 bg-white rounded-2xl border border-gray-100 shadow text-center px-6">
        <CheckCircle2 size={56} className="text-primary-green animate-bounce" />
        <div>
          <h3 className="text-xl font-bold text-primary-deepBlack mb-2">
            Pre-Order Confirmed!
          </h3>
          <p className="text-sm text-primary-text_stone_color leading-relaxed max-w-xs mx-auto">
            Thank you! Your pre-order for{" "}
            <strong className="text-primary-darkRed">{product.name}</strong> has
            been received. We&apos;ll contact you as soon as it&apos;s ready to
            ship.
          </p>
        </div>
        <button
          onClick={() => router.push("/preorder")}
          className="bg-primary-darkRed text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-red transition-colors"
        >
          Browse More Pre-Orders
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8 bg-white rounded-2xl border border-gray-100 shadow p-6"
      id="preorder-form"
      noValidate
    >
      {/* ── Customer Details ── */}
      <section className="flex flex-col gap-4">
        <div>
          <h3 className="text-base font-semibold text-primary-deepBlack">Customer Details</h3>
          <div className="border-t border-gray-200 mt-2" />
        </div>
        <AppInput
          variant="transparent"
          label="Full Name"
          name="full_name"
          placeholder="Enter your full name"
          register={register}
          error={errors.full_name?.message}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AppInput
            variant="transparent"
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            register={register}
            error={errors.email?.message}
          />
          <AppInput
            variant="transparent"
            label="Phone Number"
            name="phone"
            placeholder="e.g. +2348012345678"
            type="tel"
            register={register}
            error={errors.phone?.message}
          />
        </div>
      </section>

      {/* ── Delivery Address ── */}
      <section className="flex flex-col gap-4">
        <div>
          <h3 className="text-base font-semibold text-primary-deepBlack">Delivery Address</h3>
          <div className="border-t border-gray-200 mt-2" />
        </div>
        <AppInput
          variant="transparent"
          label="Street Address"
          name="street_address"
          placeholder="Enter street address"
          register={register}
          error={errors.street_address?.message}
        />
        <div className="grid grid-cols-2 gap-4">
          <AppInput
            variant="transparent"
            label="Zip Code"
            name="zip_code"
            placeholder="Zip / postal code"
            register={register}
            error={errors.zip_code?.message}
          />
          <AppInput
            variant="transparent"
            label="City"
            name="city"
            placeholder="Enter your city"
            register={register}
            error={errors.city?.message}
          />
          <AppSelect
            label="Country"
            name="country"
            placeholder="Select Country"
            options={countryOptions}
            control={control as any}
            error={errors.country?.message}
            variant="transparent"
            onChange={setCountry}
          />
          <AppSelect
            label="State"
            name="state"
            placeholder="Select State"
            options={stateOptions}
            control={control as any}
            error={errors.state?.message}
            variant="transparent"
          />
        </div>
      </section>

      {/* ── Order Details ── */}
      <section className="flex flex-col gap-4">
        <div>
          <h3 className="text-base font-semibold text-primary-deepBlack">Order Details</h3>
          <div className="border-t border-gray-200 mt-2" />
        </div>

        {/* Quantity picker */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-primary-dark_gray">Quantity</label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              id="preorder-qty-minus"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={qty <= 1}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-primary-deepBlack hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className={`${dm_mono.className} text-lg font-semibold text-primary-deepBlack w-8 text-center`}>
              {qty}
            </span>
            <button
              type="button"
              id="preorder-qty-plus"
              onClick={() => setQty((q) => q + 1)}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-primary-deepBlack hover:bg-gray-100 transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Additional notes */}
        <AppInput
          variant="transparent"
          label="Additional Notes (optional)"
          name="note"
          placeholder="Any specific requests or instructions…"
          register={register}
          textarea
          rows={3}
        />
      </section>

      {/* ── Order summary strip ── */}
      <div className="flex items-center justify-between bg-primary-light_peach rounded-xl px-5 py-3">
        <span className="text-sm text-primary-text_stone_color font-medium">
          Total ({qty} × {product.name})
        </span>
        <span className={`${dm_mono.className} text-lg font-bold text-primary-darkRed`}>
          {formatNaira(totalPrice, true, true)}
        </span>
      </div>

      {/* ── Submit ── */}
      <button
        type="submit"
        id="preorder-submit-btn"
        disabled={isSubmitting || isRedirecting || !isValid}
        className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
          isValid && !isSubmitting && !isRedirecting
            ? "bg-gradient-to-r from-primary-darkRed to-primary-red text-white hover:opacity-90 active:scale-95 shadow-md"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        {isRedirecting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Redirecting to Paystack…
          </span>
        ) : isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Submitting…
          </span>
        ) : (
          `Pay & Confirm Pre-Order · ${formatNaira(totalPrice, true, true)}`
        )}
      </button>
    </form>
  );
}
