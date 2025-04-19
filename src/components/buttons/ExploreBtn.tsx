'use client';

import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ExploreBtn() {
  return (
    <button
      className="group bg-gradient-to-r from-[#990000] to-[#FF0000] hover:from-[#b30000] hover:to-[#cc0000]
                 active:scale-95 text-white font-medium px-6 py-3 rounded-lg inline-flex items-center gap-2
                 transition-all duration-300 shadow-md hover:shadow-lg"
    >
      Explore Now
      <motion.span
        className="inline-block"
        initial={{ x: 0 }}
        animate={{ x: [0, 5, 0] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        <FaArrowRight className="text-sm group-hover:text-white" />
      </motion.span>
    </button>
  )
}
