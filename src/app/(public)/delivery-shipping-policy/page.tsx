import PolicyShell from "@/components/custom-utils/PolicyShell";

const sections = [
    {
        title: "Delivery Services",
        content: (
            <>
                <p>
                    We offer delivery services for products purchased through our platform. Delivery availability depends on your location, the product type, and the logistics arrangement selected at checkout.
                </p>
                <p>
                    For orders that require delivery, the owner of the goods is responsible for covering the delivery cost separately unless otherwise stated by our team at the time of purchase.
                </p>
            </>
        ),
    },
    {
        title: "Shipping and Handling",
        content: (
            <>
                <p>
                    All orders are packed with care to reduce the risk of damage during transit. However, once an order has been handed over to a delivery partner, the company cannot be held responsible for delays caused by weather, traffic, carrier issues, or circumstances beyond our control.
                </p>
                <p>
                    Customers are expected to provide accurate delivery information so orders can be completed successfully.
                </p>
            </>
        ),
    },
    {
        title: "Delivery Timeframes",
        content: (
            <>
                <p>
                    Estimated delivery times are provided as guides only. Delays may occur during peak periods, public holidays, or logistics disruptions.
                </p>
                <p>
                    We will do our best to keep customers informed if any substantial delay occurs.
                </p>
            </>
        ),
    },
    {
        title: "Failed or Unsuccessful Delivery",
        content: (
            <>
                <p>
                    If delivery cannot be completed due to an incorrect address, absence of the recipient, or refusal to accept the package, the customer may be required to arrange a re-delivery or collect the parcel from the indicated location.
                </p>
                <p>
                    Additional delivery charges may apply where a second delivery attempt becomes necessary.
                </p>
            </>
        ),
    },
];

export default function Page() {
    return (
        <PolicyShell
            title="Delivery and Shipping Policy"
            intro="This policy explains how our delivery and shipping process works, including the customer’s responsibility for delivery costs where applicable and the company’s approach to safe, reliable order fulfillment."
            sections={sections}
            effectiveDate="1st July 2026"
        />
    );
}
