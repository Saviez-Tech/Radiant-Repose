import AppInput from "@/components/custom-utils/AppInput";
import { SpaCheckoutFormValues } from "@/schemas/SpaCheckoutSchema";
import { UseFormReturn } from "react-hook-form";

export default function SameDayBooking({
  form,
}: {
  form: UseFormReturn<SpaCheckoutFormValues>;
}) {
  const { register, formState: { errors } } = form;
  return (
    <div className="flex flex-col gap-4">
      <div className="grid md:grid-cols-2 gap-4">
        <AppInput
          label="Date"
          name="date"
          type="date"
          placeholder="Select a date"
          variant="transparent"
          register={register}
          error={errors.date?.message}
        />
        <AppInput
          label="Time"
          name="time"
          type="time"
          variant="transparent"
          placeholder="Select a time"
          register={register}
          error={errors.time?.message}
        />
      </div>

      <AppInput
        variant="transparent"
        name="note"
        placeholder="Enter your note"
        register={register}
        textarea
        label="Enter Special Requests/Note here"
        error={errors.note?.message}
      />
    </div>
  );
}
