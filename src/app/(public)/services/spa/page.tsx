import Scaffold from "@/components/custom-utils/Scalffold";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Appointment from "./Appointment";

export default function Page() {
  return (
    <Scaffold>
      <div className="flex flex-col pt-5 lg:pt-16">
        <Hero />
        <About />
        <Services />
        <Appointment />
      </div>
    </Scaffold>
  );
}
