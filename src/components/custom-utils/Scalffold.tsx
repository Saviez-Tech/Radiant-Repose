import Image from "next/image";
import { ReactNode } from "react";

export default function Scaffold2({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-[white] to-[#e8cab9]">
      <div className="relative">
          <Image
              src="/images/logo2.png"
              alt="Logo"
              width={750}
              height={620}
              className=" absolute w-60 md:w-[26em] top-0 right-0"
          />

          <div className="absolute right-0 overflow-hidden top-0 w-1/2 max-w-[742px] h-auto">
          <Image
              src="/images/logo2.png"
              alt="Logo"
              width={750}
              height={620}
              priority
              className="w-full h-auto transform -translate-y-[20%] translate-x-[15%]"
          />
          </div>

          <div className="relative space-for-header ">
          {children}
          </div>
      </div>
    </section>
  )
}