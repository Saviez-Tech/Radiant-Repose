import ContactForm from "@/components/contact/ContactForm";
import ContactInformations from "@/components/contact/ContactInformations";
import Hero from "@/components/contact/Hero";
import Map from "@/components/contact/Map";
import Scalffold from "@/components/custom-utils/Scalffold";
import SearchInput from "@/components/custom-utils/SearchInput";

export default function Page() {
  return (
    <Scalffold>
      <div>
        <Hero />
        <div className="flex flex-col md:app-container py-12 gap-20">
          <div className="flex flex-col items-center justify-center mx-auto gap-6 w-full px-4">
            <h1 className="text-xl md:text-4xl font-semibold text-primary-deepBlack text-center ">
              Find a Radiant Repose near you.
            </h1>

            <div className="w-full max-w-5xl">
              <SearchInput placeholder="Enter your location" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 md:max-w-5xl w-full mx-auto">
            <ContactInformations />
            <ContactForm />
          </div>
        </div>
        <Map />
      </div>
    </Scalffold>
  );
}
