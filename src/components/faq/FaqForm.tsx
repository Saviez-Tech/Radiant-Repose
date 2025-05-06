"use client";
import { useForm } from "react-hook-form";
import AppInput from "../custom-utils/AppInput";
import { ArrowRight } from "lucide-react";

export default function FAQForm() {
  const {
    register,
    // handleSubmit,
  } = useForm()

  // const onSubmit : SubmitErrorHandler<TYPE> = (data) => {
  //   console.log(data);
  // }

  return (
    <div className="flex flex-col w-full bg-white p-6  ">
      <h2 className="text-primary-deepBlack md:text-2xl text-xl font-semibold">
        Contact Form
      </h2>
      <p className="text-primary-deepBlack md:text-base text-sm">
        Still have pending questions? Reach out to us.
      </p>
      <form className="flex flex-col gap-[24px]">
        <div className="grid md:grid-cols-2 gap-[24px] w-full">
          {formFields.map((field) => (
            <AppInput
              key={field.name}
              {...field}
              register={register}
              // errors={errors}
            />
          ))}
        </div>
        <AppInput
          name="message"
          label="Message"
          placeholder="Enter your message"
          className="w-full"
          register={register}
          textarea
        />

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

const formFields = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "Enter your first name",
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Enter your last name",
  },
  {
    name: "email",
    label: "Email Adress",
    placeholder: "Enter your email address",
  },
  {
    name: "subject",
    label: "Subject",
    placeholder: "Enter your message subject",
  },
  //    {
  //     name: "message",
  //     label: "Message",
  //     placeholder: "Enter your message",
  //     textarea: true,
  //    },
];
