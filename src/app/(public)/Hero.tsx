import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full  min-h-[600px] overflow-x-clip">
      <Image
        src="/images/logo2.png"
        alt="Logo"
        width={750}
        height={620}
        className=" absolute right-0 top-0 aspect-[742/660] max-w-[742px] w-1/2 object-contain object-bottom-left  translate-y-[-20%] translate-x-[15%]"
      />
      <div>
        <div className="container mx-auto grid md:grid-cols-2">
        
        </div>
      </div>
    </section>
  );
}
