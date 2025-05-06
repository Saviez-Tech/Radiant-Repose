"use client";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SpaFAQ() {
  const [selected, setSelected] = useState<number | null>(0); 

  return (
    <section className="py-12 px-4 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary-deepBlack mb-4">
            Spa Section - FAQs
          </h2>
          <p className="text-sm md:text-base mb-6 text-primary-deepBlack">
            Relax and rejuvenate with ease—get all the details on bookings, services, and what to expect from your spa experience with us.
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
                        : "bg-transparent hover:shadow"
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

        <div className="bg-white gap-5 flex-col p-6 rounded-lg hidden shadow-md min-h-[250px] md:block">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {faqs[selected ?? 0]?.question}
          </h3>
          <p className="text-sm md:text-base text-gray-700 whitespace-pre-line">
            {faqs[selected ?? 0]?.answer}
          </p>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: "How do I book a spa appointment through Radiant Repose?",
    answer: "You can easily book a spa session via our website by selecting your preferred location, service type, and available time slot."
  },
  {
    question: "What spa services do you offer?",
    answer: "We offer a wide range of spa services including massages, facials, body treatments, and specialized therapies tailored to your needs."
  },
  {
    question: "Can I reschedule or cancel my appointment?",
    answer: "Yes, you can reschedule or cancel your appointment up to 24 hours before your scheduled time through your account on our website."
  },
  {
    question: "Are the spa professionals certified?",
    answer: "All our spa professionals are fully certified and undergo regular training to ensure the highest quality of service."
  },
  {
    question: "Do you offer at-home spa services?",
    answer: "Yes, we provide premium at-home spa services in select locations. Check our website for availability in your area."
  }
];