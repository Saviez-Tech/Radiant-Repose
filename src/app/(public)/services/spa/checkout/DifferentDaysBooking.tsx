import AppInput from "@/components/custom-utils/AppInput";
import { UseFormReturn } from "react-hook-form";
import { SpaCheckoutFormValues } from "@/schemas/SpaCheckoutSchema";

export default function DifferentDaysBooking({
  form,
  item,
}: {
  form: UseFormReturn<SpaCheckoutFormValues>;
  item: SpaService;
}) {
  const { register, setValue, watch } = form;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="relative w-[39px] h-[39px] flex-shrink-0 rounded-md overflow-hidden shadow-md">
          <img
            src={item.image}
            alt="Spa"
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-sm font-semibold whitespace-nowrap flex-shrink-0">
          {item.name}
        </p>

        <div className="flex-1 h-[1px] bg-gray-400"></div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <AppInput
          label="Date"
          name="date"
          type="date"
          placeholder="Select a date"
          variant="transparent"
          register={register}
        />
        <AppInput
          label="Time"
          name="time"
          type="time"
          variant="transparent"
          placeholder="Select a time"
          register={register}
        />
      </div>
    </div>
  );
}
