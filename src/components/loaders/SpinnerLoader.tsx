import Image from "next/image";

export default function SpinnerLoader({ className }:{ className?: string}){
    return (
        <div aria-label="loading" className={`flex justify-center items-center ${className}`}>
            <Image src="/icons/spinner.svg" alt="loading" width={70} height={70} />
        </div>
    )
}