export default function Hero() {
    return (
      <section className="relative w-full h-full py-12 px-4">
        <div className="absolute inset-0">
          <img
            src="/images/christin-hume.png"
            alt="Consultation Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#990000]/30" />
        </div>
  
        <div className="relative text-center flex flex-col gap-9 py-16 max-w-[600px] mx-auto">
        <h2 className=" md:text-4xl text-2xl font-bold text-white">Contact Us</h2>
        <p className=" text-white max-md:text-base">Have an inquiry or need assistance regarding our any of our services?
        We're here to help.</p>
         
        </div>
      </section>
    );
  }