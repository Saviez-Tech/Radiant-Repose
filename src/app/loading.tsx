import { LucideLoader } from "lucide-react";

export default function Loading() {
    return (
         <div className="min-h-screen w-full flex items-center justify-center backdrop-blur-xl  bg-white">
      <div className="  rounded-3xl px-10 py-14 flex flex-col items-center">
        <div className="flex items-center justify-center mb-8">
          <LucideLoader className="h-16 w-16 text-primary-red animate-spin" strokeWidth={2.5} />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2 drop-shadow-lg tracking-tight">
          Loading...
        </h1>
      </div>
    </div>
    );
}