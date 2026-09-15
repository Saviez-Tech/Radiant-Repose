import LoyaltyTabs from "@/components/pos/luxury/LoyaltyTabs";

export const metadata = {
  title: "Loyalty & Referrals - Luxury POS",
};

export default function LoyaltyPage() {
  return (
    <main className="min-h-screen h-full flex flex-col justify-center items-center">
      <div className="mb-8 text-center">
        <h1 className="text-xl font-semibold text-primary-deepBlack">Customer Loyalty</h1>
        <p className="text-primary-dark_slate text-sm mt-2">Manage points, referrals, and rewards.</p>
      </div>

      <LoyaltyTabs />
    </main>
  );
}
