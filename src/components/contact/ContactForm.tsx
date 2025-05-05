"use client";
import { useForm } from "react-hook-form";
import AppInput from "../custom-utils/AppInput";
import { ArrowRight } from "lucide-react";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="bg-white p-5 flex flex-col gap-5 ">
      <h2 className="font-semibold md:text-[28px] text-lg md:text-center">Contact Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {formfileds.map((field) => (
          <AppInput
            key={field.name}
            {...field}
            register={register}
            // errors={errors}
          />
        ))}
       

        <button
          type="submit"
          className="btn-gradient w-fit py-3 px-4 text-white font-semibold !rounded-md hover:opacity-90 transition duration-200 inline-flex items-center  gap-2"
        >
          Contact Us <ArrowRight />
        </button>
      </form>
    </div>
  );
}

const formfileds = [
    {
        label: "Full Name",
        name: "fullName",
        placeholder: "Enter full name",
    },
    {
        label: "Email",
        name: "email",
        placeholder: "Enter email",
    },
    {
        label: "Subject",
        name: "subject",
        placeholder: "Enter subject",
    },
    {
        label: "Message",
        name: "message",
        placeholder: "Enter message",
    },
]