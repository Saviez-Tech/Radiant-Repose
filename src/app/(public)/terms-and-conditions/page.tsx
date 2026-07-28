import PolicyShell from "@/components/custom-utils/PolicyShell";

const sections = [
    {
        title: "Acceptance of Terms",
        content: (
            <>
                <p>
                    By visiting, browsing, or placing an order on our website, you agree to be bound by these Terms and Conditions.
                    These terms apply to all customers, guests, and users of our platform.
                </p>
                <p>
                    If you do not agree with any part of these terms, please do not use our services or place orders with us.
                </p>
            </>
        ),
    },
    {
        title: "Use of Our Services",
        content: (
            <>
                <p>
                    You agree to provide accurate information when placing orders, creating accounts, or contacting our support team.
                    You are responsible for keeping your account details secure and for all actions taken under your account.
                </p>
                <p>
                    You must not use our website for unlawful purposes, fraud, abusive behavior, or unauthorized reselling of products.
                </p>
            </>
        ),
    },
    {
        title: "Orders, Pricing, and Payment",
        content: (
            <>
                <p>
                    All product prices are displayed in the currency applicable at the time of purchase and may be updated without notice.
                    We reserve the right to accept, reject, or cancel orders where necessary for accuracy, availability, fraud prevention, or security reasons.
                </p>
                <p>
                    Payments must be completed through approved payment methods. If payment fails or is disputed, the order may be delayed or canceled until the issue is resolved.
                </p>
            </>
        ),
    },
    {
        title: "Intellectual Property",
        content: (
            <>
                <p>
                    All content on this website, including images, branding, descriptions, and design elements, remains the property of Radiant Repose unless otherwise stated.
                    You may not copy, reuse, or distribute our materials without written permission.
                </p>
            </>
        ),
    },
    {
        title: "Limitation of Liability",
        content: (
            <>
                <p>
                    We will do our best to provide accurate and reliable service, but we shall not be held liable for indirect, incidental, or consequential damages arising from the use of our website or products.
                </p>
                <p>
                    Our maximum liability for any claim arising from our services shall not exceed the amount paid for the affected order, unless otherwise required by law.
                </p>
            </>
        ),
    },
];

export default function Page() {
    return (
        <PolicyShell
            title="Terms and Conditions"
            intro="These Terms and Conditions govern your use of our website and services. They help protect both our customers and our business by creating a clear and fair framework for transactions, communication, and account use."
            sections={sections}
            effectiveDate="1st July 2026"
        />
    );
}
