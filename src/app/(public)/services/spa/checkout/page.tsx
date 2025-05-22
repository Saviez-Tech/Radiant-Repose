import Scaffold2 from "@/components/custom-utils/Scalffold";
import CheckoutForm from "./CheckoutForm";
import SelectedService from "./SelectedService";
import Checkout from "./Checkout";

export default function Page() {
  return (
    <Scaffold2>
     <main>
      <Checkout />
     </main>
    </Scaffold2>
  );
}
