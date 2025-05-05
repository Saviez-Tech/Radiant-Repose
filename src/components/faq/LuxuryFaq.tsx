"use client";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LuxuryFAQ() {
  const [selected, setSelected] = useState<number | null>(0); 

  return (
    <section className="py-12 px-4 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary-deepBlack mb-4">
            Luxury Section - FAQs
          </h2>
          <p className="text-sm md:text-base  mb-6 text-primary-deepBlack">
            Indulge in elegance and discover answers to your questions about our
            premium self-care collections, delivery options, and product
            authenticity.
          </p>

          <ul className="space-y-3">
            {faqs.map((faq, index) => {
              const isSelected = selected === index;

              return (
                <div key={index} className="flex flex-col">
                  <li
                    onClick={() => setSelected(isSelected ? null : index)}
                    className={`flex flex-col px-4 py-3 rounded-md cursor-pointer transition-all ${
                      isSelected
                        ? "bg-white shadow-md"
                        : "bg-transparent  hover:shadow"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-3 h-3 rounded-full inline-block transition-colors duration-200 flex-shrink-0 ${
                            isSelected ? "bg-primary-darkRed" : "bg-primary-red"
                          }`}
                        />
                        <p className="text-sm md:text-base font-medium text-primary-deepBlack">
                          {faq.question}
                        </p>
                      </div>

                     {/* Mobile chevron animation */}
                     <motion.span
                        animate={{ 
                          rotate: isSelected ? 90 : 0,
                          color: isSelected ? "#981B1B" : "#EF4444" 
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="text-lg md:hidden"
                      >
                        <ChevronRight />
                      </motion.span>
                      {/* Desktop chevron - now changes color when active */}
                      <span className={`text-lg hidden md:inline-block ${
                        isSelected ? "text-primary-darkRed" : "text-primary-red"
                      }`}>
                        <ChevronRight />
                      </span>
                    </div>
                  </li>
                  
                  {/* Mobile Answer Toggle (only visible on mobile) */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ 
                          height: 0, 
                          opacity: 0,
                          marginTop: 0,
                          paddingTop: 0,
                          paddingBottom: 0
                        }}
                        animate={{ 
                          height: "auto", 
                          opacity: 1,
                          marginTop: "1rem",
                          paddingTop: "0.75rem",
                          paddingBottom: "0.75rem"
                        }}
                        exit={{ 
                          height: 0, 
                          opacity: 0,
                          marginTop: 0,
                          paddingTop: 0,
                          paddingBottom: 0
                        }}
                        transition={{ 
                          duration: 0.35, 
                          ease: [0.16, 0.77, 0.47, 0.97] 
                        }}
                        className="overflow-hidden bg-white shadow-md rounded-md px-4 md:hidden"
                      >
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: 0.1, duration: 0.2 }}
                          className="text-sm text-gray-700 whitespace-pre-line"
                        >
                          {faq.answer}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </ul>
        </div>

        <div className="bg-white gap-5 flex-col p-6 rounded-lg  hidden shadow-md min-h-[250px]  md:block">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {faqs[selected ?? 0]?.question} {/* Fallback to first question if null */}
          </h3>
          <p className="text-sm md:text-base text-gray-700 whitespace-pre-line">
            {faqs[selected ?? 0]?.answer} {/* Fallback to first answer if null */}
          </p>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: "What types of luxury products do we offer?",
    answer:
      "We offer a curated selection of premium self-care items including fragrances, skincare, and wellness packages.",
  },
  {
    question:
      "Are there gift-wrapping options available? If yes, are there extra charges for it?",
    answer: `Absolutely! You can select gift-wrapping during checkout, and even include a personalized message for a special touch. 
It comes with an additional cost of ₦2000 only, and an extra ₦1000 for the note.`,
  },
  {
    question: "Do you deliver luxury items nationwide?",
    answer:
      "Yes, we deliver to all 36 states in Nigeria with tracked delivery and safe packaging.",
  },
  {
    question: "Can I return or exchange a luxury item?",
    answer:
      "Returns and exchanges are accepted within 7 days for unopened items. See our return policy for full details.",
  },
  {
    question: "Are all luxury products authentic?",
    answer:
      "Yes. All products are original and sourced directly from authorized vendors.",
  },
];