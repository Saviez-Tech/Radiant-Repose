import Image from "next/image";

export default function SpinnerLoader(){
    return (
        <div aria-label="loading" className="flex justify-center items-center">
            <Image src="/icons/spinner.svg" alt="loading" width={70} height={70} />
        </div>
    )
}