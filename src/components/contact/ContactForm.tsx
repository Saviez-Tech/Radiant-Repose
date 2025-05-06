"use client";
import { useForm } from "react-hook-form";
import AppInput from "../custom-utils/AppInput";
import { ArrowRight } from "lucide-react";
import { te } from "date-fns/locale";

interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

const formFields = [
  {
    label: "Full Name",
    name: "fullName",
    placeholder: "Enter full name",
    validation: { required: "Full name is required" }
  },
  {
    label: "Email",
    name: "email",
    placeholder: "Enter email",
    validation: { 
      required: "Email is required",
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: "Please enter a valid email address"
      }
    }
  },
  {
    label: "Subject",
    name: "subject",
    placeholder: "Enter subject",
    validation: { required: "Subject is required" }
  },
  {
    label: "Message",
    name: "message",
    placeholder: "Enter message",
    validation: { 
      required: "Message is required",
      minLength: {
        value: 10,
        message: "Message must be at least 10 characters"
      }
    }
  },
]

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>()

  const onSubmit = (data: ContactFormData) => {
    console.log(data)
    reset()
  }

  return (
    <div className="bg-white p-5 flex flex-col gap-5">
      <h2 className="font-semibold md:text-[28px] text-lg md:text-center">Contact Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {formFields.map((field) => (
          <AppInput
            key={field.name}
            label={field.label}
            name={field.name as string}
            placeholder={field.placeholder}
            register={register}
            error={errors[field.name as keyof ContactFormData]?.message}
          />
        ))}
       
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-gradient w-fit py-3 px-4 text-white font-semibold !rounded-md hover:opacity-90 transition duration-200 inline-flex items-center gap-2"
        >
          {isSubmitting ? "Sending..." : "Contact Us"} <ArrowRight />
        </button>
      </form>
    </div>
  )
}
