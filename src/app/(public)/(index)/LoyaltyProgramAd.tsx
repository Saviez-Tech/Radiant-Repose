import Link from "next/link";
import { ArrowRight } from "lucide-react";

const perks = [
  {
    number: "01",
    title: "Earn Points",
    desc: "Get loyalty points automatically on every purchase you make.",
  },
  {
    number: "02",
    title: "Exclusive Rewards",
    desc: "Unlock member-only discounts and early access to new arrivals.",
  },
  {
    number: "03",
    title: "Redeem & Save",
    desc: "Use your points as cash off your next order — instantly.",
  },
  {
    number: "04",
    title: "Refer & Earn",
    desc: "Invite a friend and earn bonus points when they shop with us.",
  },
];

export default function LoyaltyProgramAd() {
  return (
    <section className="app-container pb-16 md:pb-20">
      {/* Red card block — same pattern as Services.tsx inner container */}
      <div className="bg-primary-darkRed rounded-3xl px-8 pt-12 pb-12 shadow-xl">

        {/* Header row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-10">
          <div>
            <p className="text-primary-yellow font-semibold text-xs uppercase tracking-widest mb-2">
              Radiant Royalty Programme
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug">
              Shop more. Earn more.{" "}
              <br className="hidden md:block" />
              Get rewarded.
            </h2>
          </div>
          <div className="md:text-right">
            <p className="text-white/80 text-sm md:text-base">
              Turn every purchase into real rewards. Track your points, redeem
              discounts, and enjoy exclusive member perks — all in one place.
            </p>
          </div>
        </div>

        {/* Perks grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {perks.map((perk) => (
            <div
              key={perk.number}
              className="bg-white rounded-2xl p-5"
            >
              <span className="block text-primary-darkRed font-bold text-xl mb-2">
                {perk.number}
              </span>
              <h3 className="text-primary-deepBlack font-semibold text-sm mb-1">
                {perk.title}
              </h3>
              <p className="text-primary-dark_slate text-xs leading-relaxed">
                {perk.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="https://customers.radiantrepose.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary-yellow text-white font-semibold px-7 py-3 rounded-full hover:bg-primary-yellow/90 transition-colors duration-200 text-sm"
        >
          Join the Royalty Programme
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
