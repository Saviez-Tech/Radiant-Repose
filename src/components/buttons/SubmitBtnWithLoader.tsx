import { Loader2, LucideArrowRight } from "lucide-react";

export default function SubmitBtnWithLoader({ isSubmitting, text = "Submit" }:{ isSubmitting: boolean, text: string}){
    return (
        <button className="flex gap-2 bg-primary-green w-fit !text-white font-medium text-sm rounded-md px-5 py-3 hover:bg-green-600 transition-colors">
            {isSubmitting ? (
            <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading...
            </>
        ) : (
            <>
            {text}
            <LucideArrowRight className="h-4 w-4" />
            </>
        )}
        </button>
    )
}