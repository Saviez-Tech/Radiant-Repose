"use client"

import { usePathname } from "next/navigation"
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"
import Logo from "./Logo"
import LogoSrc from "../../public-assets/logo/Logo2.svg"
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { newsletterHandler } from "@/actions/newsletter.server"
import AppInput from "../custom-utils/AppInput"

type NewsletterFormData = {
  email: string;
};
export default function Footer() {
     const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
      } = useForm<NewsletterFormData>()

    const pathName = usePathname()


const handleFormSubmit: SubmitHandler<NewsletterFormData> = async (data) => {
  try {
    const result = await newsletterHandler(data.email);
    console.log({ result });

    if (!result.success) {
      toast.error(result.error || "Something went wrong");
      return;
    }

    toast.success("You've successfully subscribed to our newsletter!");
    reset();
  } catch (err) {
    console.error("Newsletter error in component:", err);

    if (err instanceof Error) {
      toast.error(err.message);
    } else {
      toast.error("An unexpected error occurred");
    }
  }
};

    return (
        pathName.startsWith("/auth") || 
        pathName.startsWith("/pos") || 
        pathName.startsWith("/cart-monitor") || 
        pathName.startsWith("/admin")  ? null :
        <footer className="bg-primary-darkRed text-primary-base_color1 pt-12 glob-px">
            <div className="text-center md:text-left md:flex gap-10 justify-between">
                <div>
                    <h3 className="text-3xl md:text-4xl font-semibold mb-2">
                    Subscribe to our <span className="text-primary-base_color1/90">News letter</span>
                    </h3>
                    <p className="text-primary-base_color1/80 mb-6 max-w-xl">
                        Sign up to our newsletter and enjoy timely updates revolving around Wellness, Beauty and Luxury
                    </p>
                </div>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4 md:items-end">
                    <AppInput
                        {...register("email", { required: true })}
                        register={register}
                        type="email"
                        placeholder="Enter your email address"
                        className="px-4 py-3 rounded-md text-black w-full md:w-[400px] focus:outline-none"
                    />
                    <button  className="bg-primary-red hover:bg-red-600 text-primary-base_color1 font-semibold px-6 py-3 rounded-md transition">
                       {isSubmitting ? "Loading..." : "Get Started"}
                    </button>
                </form>
            </div>

            <div className="border-t border-primatext-primary-base_color1/30 my-10"></div>

            <div className="w-full flex flex-col md:grid grid-cols-2 md:flex-row justify-between gap-10 text-sm">
                <div className="max-w-xs">
                    <Logo src={LogoSrc} />
                    <p className="my-2">
                        We transform your vision into reality with tailored Tech solutions that drive growth.
                    </p>
                    <p>
                        Our focus is on delivering impactful digital solutions that creates lasting impression.
                    </p>
                </div>

               {/* QUICK LINKS */}
                <div>
                    <h4 className="font-semibold mb-2">QUICK LINKS</h4>
                    <nav>
                        <ul className="space-y-1 text-primary-base_color1/80">
                        <li>
                            <Link
                                href="/"
                                className="hover:text-primary-base_color1 transition-colors duration-200"
                            >
                            Home
                            </Link>
                        </li>
                        <li>
                            <Link
                            href="/about"
                            className="text-primary-base_color1 font-semibold hover:text-primary-base_color1 transition-colors duration-200"
                            >
                            About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                            href="/services"
                            className="hover:text-primary-base_color1 transition-colors duration-200"
                            >
                            Services
                            </Link>
                        </li>
                        <li>
                            <Link
                            href="/blog"
                            className="hover:text-primary-base_color1 transition-colors duration-200"
                            >
                            Blog
                            </Link>
                        </li>
                        </ul>
                    </nav>
                </div>

                {/* CONTACT */}
                <div className="max-w-xs">
                    <h4 className="font-semibold mb-2">CONTACT</h4>
                    <address className="not-italic space-y-2 text-primary-base_color1/80">
                        <div className="flex items-start gap-2">
                        <FaMapMarkerAlt className="mt-1" />
                        <span>
                            At Varoyal Plaza, opp Royal Spring Palm suit, Akachi road, Owerri
                        </span>
                        </div>
                        <div className="flex items-center gap-2">
                        <FaEnvelope />
                        <Link
                            href="mailto:info@radiantrepose.com"
                            className="hover:text-primary-base_color1 transition-colors duration-200"
                        >
                            info@radiantrepose.com
                        </Link>
                        </div>
                        <div className="flex items-center gap-2">
                        <FaPhone />
                        <Link
                            href="tel:+2349160666820"
                            className="hover:text-primary-base_color1 transition-colors duration-200"
                        >
                            +234 (0)916 0666 820
                        </Link>
                        </div>
                    </address>
                </div>

                {/* SOCIALS */}
                <div>
                    <h4 className="font-semibold mb-2">SOCIALS</h4>
                    <ul className="space-y-1 text-primary-base_color1/80">
                        <li>
                        <Link
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary-base_color1 transition-colors duration-200"
                        >
                            Facebooks
                        </Link>
                        </li>
                        <li>
                        <Link
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary-base_color1 transition-colors duration-200"
                        >
                            Instagram
                        </Link>
                        </li>
                        <li>
                        <Link
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary-base_color1 transition-colors duration-200"
                        >
                            Twitter
                        </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-primary-base_color1 text-sm mt-10 py-6">
                Copyright © 2025 – Radiant Repose
            </div>
        </footer>
    )
}
