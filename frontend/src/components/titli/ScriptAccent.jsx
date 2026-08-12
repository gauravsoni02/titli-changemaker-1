import React from "react";
import { motion } from "framer-motion";

// The signature "cup" hand-drawn pink oval — sourced from titlifoundation.in DNA
// We render the cup mark inline inside the H1, matching the real site.
export function CupOval({ className = "", size = 100 }) {
  return (
    <motion.span
      className={`relative inline-flex items-center justify-center align-middle ${className}`}
      style={{ height: size * 0.72, width: size, verticalAlign: "-0.14em", transformOrigin: "center" }}
      whileHover={{
        rotate: [0, -6, 5, -3, 2, 0],
        transition: { duration: 0.7, ease: "easeInOut" },
      }}
      data-testid="cup-oval"
    >
      {/* Pink filled oval (bg) */}
      <img
        src="/cupCircle.svg"
        alt=""
        aria-hidden
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          inset: 0,
          objectFit: "contain",
          opacity: 0.55,
        }}
        draggable={false}
      />
      {/* Hand-drawn pen-stroke oval that draws itself in */}
      <motion.svg
        viewBox="0 0 220 130"
        preserveAspectRatio="none"
        aria-hidden
        style={{ position: "absolute", inset: 0, height: "100%", width: "100%", overflow: "visible" }}
      >
        <motion.path
          d="M 30 65
             C 30 22, 70 15, 115 15
             C 165 15, 205 28, 200 65
             C 195 100, 145 115, 100 112
             C 55 109, 25 100, 32 55
             C 34 42, 45 30, 60 25"
          fill="none"
          stroke="#EC5A99"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1], delay: 1.4 }}
        />
      </motion.svg>
      {/* the word */}
      <span
        className="font-script text-[#EC5A99] relative z-10 leading-none select-none"
        style={{
          fontSize: size * 0.54,
          transform: "rotate(-4deg) translateY(-2%)",
          letterSpacing: "-0.02em",
          fontWeight: 400,
        }}
      >
        cup
      </span>
    </motion.span>
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
// Uses the SAME 1.35s pen-stroke choreography as CupOval for unified motion language.
export function ScribbleWord({ children, rotate = -3, size = 1 }) {
  return (
    <span className="relative inline-block align-baseline mx-1" style={{ transform: `rotate(${rotate}deg)` }}>
      <motion.svg
        viewBox="0 0 220 90"
        className="absolute inset-0 -inset-x-4 -inset-y-3 w-[calc(100%+32px)] h-[calc(100%+24px)] pointer-events-none"
        preserveAspectRatio="none"
        fill="none"
        style={{ overflow: "visible" }}
      >
        <motion.path
          d="M 20 55 C 20 20, 65 12, 115 15 C 170 18, 210 30, 205 55 C 200 78, 140 82, 90 78 C 40 74, 12 68, 22 45"
          stroke="#EC5A99"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </motion.svg>
      <span className="font-script text-[#EC5A99] relative" style={{ fontSize: `${size}em` }}>
        {children}
      </span>
    </span>
  );
}
