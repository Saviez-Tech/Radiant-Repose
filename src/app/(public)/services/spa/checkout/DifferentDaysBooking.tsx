import AppInput from "@/components/custom-utils/AppInput";
import { SpaCheckoutFormValues } from "@/schemas/SpaCheckoutSchema";
import { UseFormReturn } from "react-hook-form";

export default function DifferentDaysBooking({
  form,
  item,
}: {
  form: UseFormReturn<SpaCheckoutFormValues>;
  item: SpaService;
}) {
  const {
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = form;
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
          name={item.id + "-date"}
          type="date"
          placeholder="Select a date"
          variant="transparent"
          register={register}
          error={errors.date?.message}
        />
        <AppInput
          label="Time"
          name={item.id + "-time"}
          type="time"
          variant="transparent"
          placeholder="Select a time"
          register={register}
          error={errors.time?.message}
        />
      </div>
    </div>
  );
}
