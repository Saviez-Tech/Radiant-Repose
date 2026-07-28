import Link from "next/link";
import { ReactNode } from "react";

type PolicySection = {
    title: string;
    content: ReactNode;
};

interface PolicyShellProps {
    title: string;
    intro: string;
    sections: PolicySection[];
    effectiveDate?: string;
}

export default function PolicyShell({
    title,
    intro,
    sections,
    effectiveDate,
}: PolicyShellProps) {
    return (
        <section className="px-4 pb-16 pt-20 md:px-8 lg:px-12">
            <div className="mx-auto max-w-5xl rounded-[2rem] border border-[#efe0d4] bg-white/90 p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.18)] backdrop-blur-sm md:p-12">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-full border border-[#e9d2c0] bg-[#fff7f0] px-4 py-2 text-sm font-medium text-[#7a3f2b] transition hover:bg-[#fce9dc]"
                >
                    ← Back to Home
                </Link>

                <div className="mt-8 inline-flex rounded-full bg-[#f8efe8] px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#8b4f35]">
                    Company Policy
                </div>

                <h1 className="mt-5 text-3xl font-semibold text-[#2f241f] sm:text-4xl">
                    {title}
                </h1>

                <p className="mt-4 max-w-3xl text-base leading-8 text-[#5f4b41] sm:text-lg">
                    {intro}
                </p>

                {effectiveDate ? (
                    <p className="mt-4 text-sm font-medium text-[#8b4f35]">
                        Effective date: {effectiveDate}
                    </p>
                ) : null}

                <div className="mt-10 space-y-6">
                    {sections.map((section, index) => (
                        <article
                            key={`${section.title}-${index}`}
                            className="rounded-2xl border border-[#f2e5da] bg-[#fffaf7] p-6"
                        >
                            <h2 className="text-xl font-semibold text-[#2f241f]">
                                {section.title}
                            </h2>
                            <div className="mt-4 space-y-3 text-base leading-8 text-[#5f4b41]">
                                {section.content}
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-10 rounded-2xl border border-[#efe0d4] bg-[#f8efe8] p-6 text-sm leading-7 text-[#633d2c]">
                    For questions or support, please contact our team through the contact page or our customer care line.
                </div>
            </div>
        </section>
    );
}
