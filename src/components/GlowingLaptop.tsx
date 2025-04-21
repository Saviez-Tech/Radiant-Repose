import React from "react";

export default function GlowingLaptop(){
    return(
         <div className="relative flex justify-center mb-8 animate-float">
    <img
      src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80"
      alt="Glowing laptop"
      className="w-40 h-28 md:w-64 md:h-44 object-cover rounded-xl shadow-lg z-10 border-4 border-white/30"
      draggable={false}
    />
    <div
      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-36 h-8 blur-2xl bg-gradient-to-r from-purple-200 via-purple-500/50 to-pink-200 rounded-full opacity-70 z-0"
      aria-hidden="true"
    />
  </div>
    )
}
