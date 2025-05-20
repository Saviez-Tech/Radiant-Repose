"use client";

import Scaffold2 from "@/components/custom-utils/Scalffold";
import CheckoutForm from "./CheckoutForm";
import { useForm } from "react-hook-form";
import { CheckoutFormData } from "./CheckoutForm"; 
import SelectedService from "./SelectedService";

export default function Page() {
  const form = useForm<CheckoutFormData>();

  return (
    <Scaffold2>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12 app-container items-center">
        <CheckoutForm form={form} />
        <SelectedService />
      </main>
    </Scaffold2>
  );
}
