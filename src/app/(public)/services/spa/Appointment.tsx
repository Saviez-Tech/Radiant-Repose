import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

export default function Appointment() {
  return (
    <section className="relative lg:-mt-14 py-32 w-full flex items-center justify-center text-white bg-[url('/images/appointment.png')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 z-10 bg-[#9900004D]/30"></div>
      <div className="relative text-center px-4 flex flex-col md:gap-8 gap-4 z-20 items-center">
        <h3 className="md:text-4xl text-3xl max-w-[550px] mx-auto font-semibold">
          Ready to Unwind? <br /> Book your next session now.
        </h3>
        <div className="flex flex-col gap-2 ">
          <p className="md:text-xl text-base">A chance to experience a calming escape,</p>
          <p className="md:text-xl text-sm">
            where every detail is designed to restore balance and improve your
            well-being.
          </p>
        </div>
        <Link
          href="/book"
          className="btn-gradient flex items-center w-fit gap-2 !rounded-md !px-5 !py-3 text-white mt-4"
        >
          Book an Appointment <LuArrowRight />
        </Link>
      </div>
    </section>
  );
}
