"use client";
import { useForm } from "react-hook-form";
import AppInput from "../custom-utils/AppInput";
import AppSelect from "../custom-utils/AppSelect";

interface DeliveryFormData {
  street_address: string;
  zip_code: string;
  city: string;
  state: string;
  country: string;
}

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
];

const stateOptions = [
  { value: "ny", label: "New York" },
  { value: "ca", label: "California" },
  { value: "tx", label: "Texas" },
  { value: "fl", label: "Florida" },
];

const cityOptions = [
  { value: "nyc", label: "New York City" },
  { value: "la", label: "Los Angeles" },
  { value: "ch", label: "Chicago" },
  { value: "ho", label: "Houston" },
];

export default function DeliveryAddress() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DeliveryFormData>();

  const onSubmit = (data: DeliveryFormData) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold text-primary-deepBlack">
        Delivery Address
      </h3>
      <div className="border-t border-gray-400 my-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-4 w-full flex flex-col gap-4">
            <AppInput
              variant="transparent"
              label="Street Address"
              className="!bg-transparent"
              name="street_address"
              placeholder="Enter street address"
              register={register}
              error={errors.street_address?.message}
            />
            <div className="grid grid-cols-2 gap-4">
              <AppInput
                variant="transparent"
                label="Zip Code"
                className="!bg-transparent w-full"
                name="zip_code"
                placeholder="Enter zip code"
                type="text"
                register={register}
                error={errors.zip_code?.message}
              />
              <AppInput
                variant="transparent"
                label="City"
                className="!bg-transparent w-full"
                name="city"
                register={register}
                placeholder="Enter your city"
                error={errors.city?.message}
              />
              <AppSelect
                label="State"
                name="state"
                placeholder="Select State"
                options={stateOptions}
                control={control}
                error={errors.state?.message}
                variant="transparent"
              />
              <AppSelect
                label="Country"
                name="country"
                placeholder="Select Country"
                options={countryOptions}
                control={control}
                error={errors.country?.message}
                variant="transparent"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
