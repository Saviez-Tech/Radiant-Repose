import PolicyShell from "@/components/custom-utils/PolicyShell";

const sections = [
    {
        title: "Refund Eligibility",
        content: (
            <>
                <p>
                    Refunds may be considered for products that are damaged, defective, incorrect, or not as described at the time of delivery.
                    Refund requests must be made within the period stated in our order confirmation and support communication.
                </p>
                <p>
                    Items that have been used, opened, altered, or damaged by the customer after delivery may not be eligible for a refund unless the issue is caused by a supplier or delivery fault.
                </p>
            </>
        ),
    },
    {
        title: "Refund Process",
        content: (
            <>
                <p>
                    To request a refund, customers must contact our support team with their order number, a clear description of the issue, and supporting evidence such as photographs where applicable.
                </p>
                <p>
                    Once a refund request is approved, the refund will be processed through the original payment method or as otherwise agreed by our team.
                </p>
            </>
        ),
    },
    {
        title: "Non-Refundable Items",
        content: (
            <>
                <p>
                    Certain products may be non-refundable if they are perishable, personalized, sealed items that have been opened, or otherwise excluded by the product-specific terms.
                </p>
                <p>
                    Delivery charges and service fees may be non-refundable where the service has already been provided or where the order is canceled after dispatch.
                </p>
            </>
        ),
    },
    {
        title: "Protection Against Abuse",
        content: (
            <>
                <p>
                    We reserve the right to refuse refund requests that appear fraudulent, repetitive, or not supported by valid evidence.
                    This helps protect the company from misuse while ensuring genuine customers are treated fairly.
                </p>
            </>
        ),
    },
];

export default function Page() {
    return (
        <PolicyShell
            title="Refund Policy"
            intro="Our refund policy is designed to be fair, transparent, and protective of both customers and the business. We aim to resolve genuine issues quickly while preventing misuse of refund requests."
            sections={sections}
            effectiveDate="1st July 2026"
        />
    );
}
