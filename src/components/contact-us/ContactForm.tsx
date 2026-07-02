"use client";
import { contactHandler } from "@/actions/contact.server";
import { ArrowRight } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AppInput from "../custom-utils/AppInput";

export interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  phoneNumber: string;
  address: string;

}

const formFields = [
  {
    label: "Full Name",
    name: "full_name",
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
    label: "Phone Number",
    name: "phone_number",
    placeholder: "Enter phone number",
    validation: { required: "Phone number is required" }
  },
  {
    label: "Address",
    name: "address",
    placeholder: "Enter address",
    validation: { required: "address is required" }
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


   const handleFormSubmit: SubmitHandler<ContactFormData> = async(data) => {
        
        try {
            const result = await contactHandler(data)
            console.log({result});
            
            
            if (!result.success) {
                toast.error(result.error || "something went wrong")
                return;
            }
            
            toast.success("Message sent successfully")
            reset()
        } catch (err) {
            console.error("Login error in component:", err)
            
            if (err instanceof Error) {
                toast.error(err.message)
            } else {
                toast.error("An unexpected error occurred")
            }
        }
    }

  return (
    <div className="bg-white p-5 flex flex-col gap-5">
      <h2 className="font-semibold md:text-[28px] text-lg md:text-center">Contact Form</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
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
        // onClick={handleSubmit(handleFormSubmit)}
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

