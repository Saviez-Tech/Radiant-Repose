"use client"
import { useEffect } from "react";

export default function ErrorPage({error, reset}:AppPageError) {
    useEffect(() => {
        console.error(error)
    },[error])
    
    return (
        <section className="h-screen w-full flex flex-col gap-6 justify-center items-center app-container text-center">
            <h2 className="text-xl font-semibold">Something went wrong!</h2>
            <p className="text-3xl font-bold max-w-[400px]">{error.message}</p>
            <p className="text-3xl font-bold max-w-[400px]">{error.digest}</p>
            <div className="grid grid-cols-2 w-[320px] gap-4">
            <button className="btn-gradient px-8 !py-2" onClick={()=>window.location.reload()}>
                 Reload Page
            </button>
            <button className="btn-primary px-8 !py-2" onClick={reset}>
                 Try again
            </button>
            </div>
        </section>
    );
}