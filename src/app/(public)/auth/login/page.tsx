"use client"

import LogoSrc from "../../../../public-assets/logo/Logo1.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginAccountFormData, loginSchema } from "@/schemas/login.schema";
import Logo from "@/components/layout-components/Logo";
import PasswordInput from "@/components/custom-utils/PasswordInput";
import { LoginHandler } from "@/actions/auth.server";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setAuthUser } from "@/lib/redux/slices/authUserSlice";
import ErrorPara from "@/components/custom-utils/ErrorPara";

export default function Login(){

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginAccountFormData>({
        resolver: zodResolver(loginSchema),
    })

    const router = useRouter()
    const dispatch = useAppDispatch()
    const searchParams = useSearchParams()
    const redirectPath = searchParams.get("redirect")

    const handleFormSubmit: SubmitHandler<LoginAccountFormData> = async(data) => {
        
        try {
            const result = await LoginHandler(data.phoneOrEmail, data.password)
            
            if (!result.success) {
                toast.error(result.error || "Login failed")
                return;
            }
            
            if (result.id) {
                const { group, id, username, name } = result;
                dispatch(setAuthUser({ emailOrUsername: username, id, group, name }))
                
                toast.success("Login Successful")
                
                if (redirectPath && redirectPath.length > 2) {
                    if (redirectPath.startsWith("/admin") && group.toLowerCase() === "administrator") {
                        router.push("/admin")
                        return;
                    } else if (redirectPath.startsWith("/pos") && group.toLowerCase() === "worker") {
                        router.push("/pos")
                        return;
                    }
                }

                if (group.toLowerCase() === "administrator") {
                    router.push("/admin")
                } else {
                    router.push("/pos")
                }
            }
        } catch (err) {
            console.error("Login error in component:", err)
            
            if (err instanceof Error) {
                toast.error(err.message)
            } else {
                toast.error("An unexpected error occurred")
            }
        }
    }
    
    return(
        <main className="">
            <div className="glob-px text-primary-light_black pb-12 md:basis-1/2 md:px-10">
                <div className="flex flex-col md:flex-row justify-between gap-y-8 gap-x-4 items-center py-10">
                    <Logo src={LogoSrc} className="w-48" />
                    {/* <div>
                        <h2 className="font-medium text-base text-primary-deepBlack"><span className="font-semibold">Radiant Repose</span> Point of Sales System</h2>
                        <p className="text-xs">Varoyal Plaza, opp Royal Spring Palm suit, Akachi road, Owerri</p>
                    </div> */}
                </div>

                <div className="flex flex-col justify-center mt-8 max-w-md mx-auto">
                    <h1 className="font-bold text-xl mt-4 text-center text-primary-darkRed mb-1 md:text-2xl">Welcome Back!</h1>
                    <p className="text-sm font-medium md:text-base text-center">Enter your details to continue</p>
                    <form className="mt-9" onSubmit={handleSubmit(handleFormSubmit)}>
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
                            {errors.phoneOrEmail?.message && <ErrorPara errorText={errors.phoneOrEmail?.message} />}
                        </div>

                        <div className="mb-5">
                            <label htmlFor="password" className="text-sm font-medium mb-2 block md:text-base">Password</label>
                            <PasswordInput id="password" name="password" register={register} />
                            {errors.password?.message && <ErrorPara errorText={errors.password?.message} />}
                        </div>

                        <div className="mt-6">
                            <button
                                disabled={isSubmitting}
                                className={`bg-primary-darkRed text-primary-base_color1 w-full block font-medium rounded-md px-6 py-3 hover:bg-primary-darkRed/80 focus:bg-red-400 focus:outline-none transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Processing...</span>
                                    </div>
                                ) : (
                                    "Login"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}