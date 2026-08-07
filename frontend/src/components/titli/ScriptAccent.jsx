import React from "react";
import { motion } from "framer-motion";

// The signature handwritten script accent with pink oval SVG scribble
export function ScriptAccent({ children, className = "", rotation = -3 }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <motion.svg
        viewBox="0 0 220 90"
        className="absolute -inset-x-2 -inset-y-3 w-[calc(100%+16px)] h-[calc(100%+24px)] pointer-events-none"
        fill="none"
        preserveAspectRatio="none"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
      >
        <motion.path
          d="M 15 55 C 15 20, 60 12, 110 15 C 170 18, 210 30, 205 55 C 200 78, 140 82, 90 78 C 40 74, 12 68, 18 45"
          stroke="#EC5A99"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        />
      </motion.svg>
      <span
        className="relative font-script text-[#EC5A99] inline-block"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {children}
      </span>
    </span>
  );
}

// Cup-in-circle glyph (brand mark)
export function CupGlyph({ size = 36, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="22" stroke="#EC5A99" strokeWidth="2" />
      <path
        d="M15 20 L15 30 C15 33 17 35 20 35 L26 35 C29 35 31 33 31 30 L31 20 Z"
        stroke="#EC5A99"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M31 22 C34 22 36 24 36 26 C36 28 34 30 31 30"
        stroke="#EC5A99"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M20 15 C20 13 22 12 23 14"
        stroke="#EC5A99"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M25 15 C25 13 27 12 28 14"
        stroke="#EC5A99"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Small butterfly svg — for watermark & flutter
export function Butterfly({ size = 200, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className} aria-hidden>
      <g opacity="0.85">
        <path
          d="M100 100 C 70 60, 30 55, 20 85 C 12 110, 40 130, 100 100 Z"
          fill="#FFC5DE"
        />
        <path
          d="M100 100 C 130 60, 170 55, 180 85 C 188 110, 160 130, 100 100 Z"
          fill="#FFC5DE"
        />
        <path
          d="M100 100 C 78 120, 45 130, 40 155 C 38 170, 70 175, 100 105 Z"
          fill="#EC5A99"
          opacity="0.65"
        />
        <path
          d="M100 100 C 122 120, 155 130, 160 155 C 162 170, 130 175, 100 105 Z"
          fill="#EC5A99"
          opacity="0.65"
        />
        <ellipse cx="100" cy="100" rx="3" ry="30" fill="#000" />
      </g>
    </svg>
  );
}
