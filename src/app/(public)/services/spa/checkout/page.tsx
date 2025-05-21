import Scaffold2 from "@/components/custom-utils/Scalffold";
import CheckoutForm from "./CheckoutForm";
import SelectedService from "./SelectedService";

export default function Page() {
  return (
    <Scaffold2>
      <main className="flex flex-col md:flex-row justify-center items-start gap-12 py-12 app-container">
        <div className="w-full md:max-w-md lg:max-w-lg">
          <CheckoutForm />
        </div>
        <div className="w-full md:max-w-md lg:max-w-lg">
          <SelectedService />
        </div>
      </main>
    </Scaffold2>
  );
}
