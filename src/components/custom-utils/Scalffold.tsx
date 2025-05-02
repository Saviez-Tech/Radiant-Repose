import ExploreBtn from "@/components/buttons/ExploreBtn";
import Image from "next/image";
import { ReactNode } from "react";

export default function Scalffold({ children }: { children: ReactNode }) {
  return (
    <section className="space-for-header relative w-full overflow-x-clip bg-gradient-to-br from-[white] to-[#e8cab9]">
      <Image
        src="/images/logo2.png"
        alt="Logo"
        width={750}
        height={620}
        className=" absolute right-0 top-0 aspect-[742/660] max-w-[742px] w-1/2 object-contain object-bottom-left  translate-y-[-20%] translate-x-[15%]"
      />
      <div className="relative">{children}</div>
    </section>
  );
}
