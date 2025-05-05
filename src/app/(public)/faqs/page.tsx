import Scalffold from "@/components/custom-utils/Scalffold";
import FAQForm from "@/components/faq/FaqForm";
import LuxuryFAQ from "@/components/faq/LuxuryFaq";
import PharmacyFAQ from "@/components/faq/PhamacyFaq";
import SpaFAQ from "@/components/faq/SpaFaq";

export default function Page() {
    return (
        <Scalffold >
            <div className=" flex flex-col">
            <LuxuryFAQ />
            <SpaFAQ />
            <PharmacyFAQ />
           <div className="flex flex-col md:app-container ">
           <FAQForm />
           </div>
        </div>
        </Scalffold>
    );
}