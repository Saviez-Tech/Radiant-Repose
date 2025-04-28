"use client"

import LogoSrc from "../../../../public-assets/logo/Logo1.svg";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginAccountFormData, loginSchema } from "@/schemas/login.schema";
import Logo from "@/components/layout-components/Logo";
import PasswordInput from "@/components/custom-utils/PasswordInput";

export default function Login(){

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<LoginAccountFormData>({
        resolver: zodResolver(loginSchema),
    })

    const router = useRouter()
    

    return(
        <main className="">
            <div className="glob-px text-primary-light_black pb-12 md:basis-1/2 md:px-10">
                <div className="flex justify-between gap-4 items-center py-10">
                    <Logo src={LogoSrc} className="w-48" />
                    <div>
                        <h2 className="font-medium text-base text-primary-deepBlack"><span className="font-semibold">Radiant Repose</span> Point of Sales System</h2>
                        <p className="text-xs">Varoyal Plaza, opp Royal Spring Palm suit, Akachi road, Owerri</p>
                    </div>
                </div>

                <div className="flex flex-col justify-center mt-8 max-w-md mx-auto">
                    <h1 className="font-bold text-xl mt-4 text-center text-primary-darkRed mb-1 md:text-2xl">Welcome Back!</h1>
                    <p className="text-sm font-medium md:text-base text-center">Enter your details to continue</p>

                    <form className="mt-9">
                        <div className="mb-5">
                            <label htmlFor="phoneOrEmail" className="text-sm font-medium mb-2 block md:text-base">Email or Phone Number</label>
                            <input 
                                type="text" 
                                {...register("phoneOrEmail")} 
                                id="phoneOrEmail"
                                placeholder="Enter your email or Phone Number"
                                className="bg-gray-100/80 rounded-md border border-gray-100 p-4 text-sm block w-full outline-none 
                                    focus:ring-2 focus:ring-primary-brightring-primary-bright
                                    hover:ring-2 hover:ring-bright_yellow 
                                    transition-all duration-200"
                            />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="password" className="text-sm font-medium mb-2 block md:text-base">Password</label>
                            <PasswordInput id="password" name="password" />
                        </div>
                        <button onClick={() => router.push("/auth/forgot_password")} className="text-primary-bright_yellow text-sm font-medium hover:text-red-400">Forgot Password?</button>

                        <div className="mt-6">
                            <button
                                className="bg-primary-darkRed  text-primary-base_color1 w-full block font-medium rounded-md px-6 py-3 hover:bg-primary-darkRed/80 focus:bg-red-400 focus:outline-none transition-all"
                            >
                                Login
                            </button>
                            <p className="md:hidden mt-3 font-medium text-sm md:text-base">Don’t have an account? <Link className="text-primary-bright_yellow  ms-2 font-semibold" href="/auth/login">Sign  up</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}