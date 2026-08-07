import React from "react";
import { motion } from "framer-motion";

// The signature "cup" hand-drawn pink oval — sourced from titlifoundation.in DNA
// We render the cup mark inline inside the H1, matching the real site.
export function CupOval({ className = "", size = 100 }) {
  return (
    <span className={`relative inline-flex items-center justify-center align-middle ${className}`} style={{ height: size * 0.72, width: size }}>
      <img
        src="/cupCircle.svg"
        alt=""
        aria-hidden
        style={{ height: size * 0.95, width: size * 1.05, position: "absolute", inset: 0, margin: "auto" }}
        draggable={false}
      />
      <span
        className="font-script text-[#EC5A99] relative z-10 leading-none"
        style={{ fontSize: size * 0.5, transform: "rotate(-4deg)" }}
      >
        cup
      </span>
    </span>
  );
}

// Small pink butterfly (Titli = butterfly). Signature accent.
export function TitliButterfly({ size = 34, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <g>
        <path d="M24 24 C 16 12, 6 10, 4 20 C 2 28, 12 32, 24 24 Z" fill="#EC5A99" opacity="0.9"/>
        <path d="M24 24 C 32 12, 42 10, 44 20 C 46 28, 36 32, 24 24 Z" fill="#EC5A99" opacity="0.9"/>
        <path d="M24 24 C 18 30, 10 34, 10 40 C 10 44, 20 42, 24 26 Z" fill="#EC5A99" opacity="0.7"/>
        <path d="M24 24 C 30 30, 38 34, 38 40 C 38 44, 28 42, 24 26 Z" fill="#EC5A99" opacity="0.7"/>
        <ellipse cx="24" cy="24" rx="1.4" ry="10" fill="#111"/>
        <path d="M22 15 L20 11" stroke="#111" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M26 15 L28 11" stroke="#111" strokeWidth="1.2" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

// Handwritten script accent (Shadows Into Light) inside a pink hand-drawn oval —
// same visual language as the cupCircle used on titlifoundation.in
export function ScribbleWord({ children, rotate = -3, size = 1 }) {
  return (
    <span className="relative inline-block align-baseline mx-1" style={{ transform: `rotate(${rotate}deg)` }}>
      <motion.svg
        viewBox="0 0 220 90"
        className="absolute inset-0 -inset-x-4 -inset-y-3 w-[calc(100%+32px)] h-[calc(100%+24px)] pointer-events-none"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          d="M 15 55 C 15 20, 60 12, 110 15 C 170 18, 210 30, 205 55 C 200 78, 140 82, 90 78 C 40 74, 12 68, 18 45"
          stroke="#EC5A99"
          strokeWidth="3.4"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        />
      </motion.svg>
      <span className="font-script text-[#EC5A99] relative" style={{ fontSize: `${size}em` }}>
        {children}
      </span>
    </span>
  );
}
