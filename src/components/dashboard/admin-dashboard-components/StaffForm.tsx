"use client";

import { addStaffHandler, editStaffHandler } from "@/actions/staff.server";
import SubmitBtnWithLoader from "@/components/buttons/SubmitBtnWithLoader";
import AppInput from "@/components/custom-utils/AppInput";
import AppSelect from "@/components/custom-utils/AppSelect";
import { useAppSelector } from "@/lib/redux/hooks";
import {
  EditStaffFormValues,
  staffEditFormSchema,
  staffFormSchema,
  StaffFormValues,
} from "@/schemas/addStaff.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import toast from "react-hot-toast";

export default function StaffForm({
  defaultValues,
  staffID = "",
  formActionType
}: {
  defaultValues?: StaffFormValues;
  formActionType: "add" | "edit";
  staffID?: string
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<StaffFormValues | EditStaffFormValues>({
    resolver: zodResolver(formActionType === "add" ? staffFormSchema : staffEditFormSchema),
    defaultValues,
  })

  const router = useRouter()
  const { branches } = useAppSelector(store => store.storeBranches)

  const locationOptions = branches.map(v => {
    return { label: `${v.name}, ${v.location}`, value: v.id.toString()}
  })

  const onSubmit: SubmitHandler<StaffFormValues | EditStaffFormValues> = async(data) => {
    const { success, error } = formActionType === "add" ? await addStaffHandler(data as StaffFormValues) : await editStaffHandler(data as EditStaffFormValues,staffID)
    if (success){
      toast.success(`Staff ${formActionType === "add" ? "Added" : "Editted"}`)
      router.push("/admin/staff-management")
    }
    else if (error){
      toast.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full py-6">
      {/* Grid layout with 3 columns and auto rows */}
      <div className="grid md:grid-cols-3 gap-x-6 gap-y-8 mb-6">
        <AppSelect
          label="Assigned Location"
          name="AssignedLocation"
          placeholder="Select Location"
          options={locationOptions}
          control={control}
          error={errors.AssignedLocation?.message}
        />

        <AppInput
          label="Full Name"
          name="fullName"
          placeholder="Enter Full Name"
          register={register as UseFormRegister<StaffFormValues>}
          error={errors.fullName?.message}
        />
        <AppInput
          label="Phone Number"
          name="phoneNumber"
          placeholder="Enter Phone Number"
          register={register as UseFormRegister<StaffFormValues>}
          error={errors.phoneNumber?.message}
        />
        <AppInput
          label="Email Address Or Username"
          name="emailOrUsername"
          placeholder="Enter Email Address Or Username"
          register={register as UseFormRegister<StaffFormValues>}
          error={errors.emailOrUsername?.message}
        />
        <AppInput
          label="Address"
          name="address"
          placeholder="Enter Address"
          register={register as UseFormRegister<StaffFormValues>}
          error={errors.address?.message}
        />

        {/* <FileUpload
          label="Upload Staff Photo"
          name="image"
          className="h-12"
          control={control}
          error={errors.staffPhoto?.message}
        /> */}

        {
          formActionType === "add" &&
          <>
            <AppInput
              label="Password"
              name="password"
              type="password"
              placeholder="Enter Password"
              register={register as UseFormRegister<StaffFormValues>}
              error={errors.password?.message}
            />
            <AppInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Enter Password"
              register={register as UseFormRegister<StaffFormValues>}
              error={errors.confirmPassword?.message}
            />
          </>
        }
      </div>

      <div className="flex mt-10">
        <SubmitBtnWithLoader isSubmitting={isSubmitting} text={formActionType === "add" ? "Create Staff" : "Edit Staff"}/>
      </div>
    </form>
  );
}
