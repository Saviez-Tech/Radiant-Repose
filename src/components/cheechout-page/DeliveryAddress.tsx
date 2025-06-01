/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useCountriesAndStates } from "@/hooks/useCountries";
import { UseFormReturn } from "react-hook-form";
import AppInput from "../custom-utils/AppInput";
import AppSelect from "../custom-utils/AppSelect";

// export interface DeliveryFormData {
//   street_address: string;
//   zip_code: string;
//   city: string;
//   state: string;
//   country: string;
// }

export default function DeliveryAddress({
  form,
}: {
  form: UseFormReturn<any>;
}) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  const { countries, states, setCountry } = useCountriesAndStates();

  const countryOptions = countries.map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const stateOptions = states.map((state) => ({
    value: state.isoCode,
    label: state.name,
  }));

  console.log(form)
  return (<div className="flex flex-col">
      <h3 className="text-lg font-semibold text-primary-deepBlack">
        Delivery Address
      </h3>
      <div className="border-t border-gray-400 my-4">
        <div>
          <div className="py-4 w-full flex flex-col gap-4">
            <AppInput
              variant="transparent"
              label="Street Address"
              className="!bg-transparent"
              name="street_address"
              placeholder="Enter street address"
              register={register}
              error={errors.street_address?.message?.toString()}
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
                error={errors.zip_code?.message?.toString()}
              />
              <AppInput
                variant="transparent"
                label="City"
                className="!bg-transparent w-full"
                name="city"
                register={register}
                placeholder="Enter your city"
                error={errors.city?.message?.toString()}
              />
              <AppSelect
                label="Country"
                name="country"
                placeholder="Select Country"
                options={countryOptions}
                control={control}
                error={errors.country?.message?.toString()}
                variant="transparent"
                onChange={setCountry}
              />
              <AppSelect
                label="State"
                name="state"
                placeholder="Select State"
                options={stateOptions}
                control={control}
                error={errors.state?.message?.toString()}
                variant="transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
