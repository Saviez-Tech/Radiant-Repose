"use client"

import { useState } from "react";
import TestimonialItem from "./TestimonialItem";
import { testimonials } from "@/components-data/about-page";

export default function ClientTestimonialsContainer() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const next = () => setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  return (
    <div className="py-4">
        <TestimonialItem {...testimonials[currentIndex]} prev={prev} next={next} />
    </div>
  )
}
