"use client";
import { useEffect, useState } from "react";
import { useMotionValue, useAnimationFrame, motion } from "framer-motion";

export default function Counter() {
  return (
    <div className="grid md:grid-cols-4 grid-cols-2 max-md:gap-8">
      {counters.map((counter, idx) => (
        <CounterItem
          key={idx}
          value={parseInt(counter.value)}
          suffix="+"
          label={counter.label}
        />
      ))}
    </div>
  );
}

function CounterItem({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);

  useAnimationFrame((t) => {
    if (hasEntered) {
      const progress = Math.min(t / 3000, 1); // animate for 1 second
      const current = Math.floor(value * progress);
      count.set(current);
      setDisplayValue(current);
    }
    return;
  });

  // useEffect(() => {
  //   if (!hasEntered) return;
  //   const timeout = setTimeout(() => setDisplayValue(value), 1000);
  //   return () => clearTimeout(timeout);
  // }, [hasEntered, value]);

  return (
    <motion.div
      onViewportEnter={() => setHasEntered(true)}
      className="flex flex-col items-center"
    >
      <span className="md:text-4xl text-3xl font-semibold text-primary-deepBlack">
        {displayValue}
        {suffix}
      </span>
      <span className="text-primary-deepBlack md:text-lg text-sm text-center">
        {label}
      </span>
    </motion.div>
  );
}

const counters = [
  { value: "35", label: "Certified Experts" },
  { value: "280", label: "Appointments Booked" },
  { value: "720", label: "Satisfied Customers" },
  { value: "12", label: "Years of Service" },
];
