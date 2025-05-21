import AppInput from "@/components/custom-utils/AppInput";
import { SpaCheckoutFormValues } from "@/schemas/SpaCheckoutSchema";
import { UseFormReturn } from "react-hook-form";

export default function SameDayBooking({
  form,
}: {
  form: UseFormReturn<SpaCheckoutFormValues>;
}) {
  const { register, setValue, watch } = form;
  return (
    <div className="flex flex-col gap-4">
      <div className="grid md:grid-cols-2 gap-4">
        <AppInput
          label="Date"
          name="birthDate"
          type="date"
          placeholder="Select a date"
          variant="transparent"
          register={register}
        />
        <AppInput
          label="Time"
          name="appointmentTime"
          type="time"
          variant="transparent"
          placeholder="Select a time"
          register={register}
        />
      </div>

      <AppInput
        variant="transparent"
        name="note"
        placeholder="Enter your note"
        register={register}
        textarea
        label="Enter Special Requests/Note here"
      />
    </div>
  );
}
