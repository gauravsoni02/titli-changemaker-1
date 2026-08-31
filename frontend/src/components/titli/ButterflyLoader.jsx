import React from "react";
import { motion } from "framer-motion";

/**
 * ButterflyLoader — a gentle fluttering butterfly used in place of plain spinners.
 * Uses the real Titli butterfly image, animated with framer-motion.
 *
 * Props:
 *   size (number, default 48) — pixel size
 *   label (string, optional) — small caption below the butterfly
 *   tone ("pink" | "white", default "pink") — coloring
 */
export function ButterflyLoader({ size = 48, label, tone = "pink", className = "" }) {
  const filter = tone === "white" ? "brightness(0) invert(1)" : "none";
  return (
    <div
      role="status"
      aria-live="polite"
      className={`inline-flex flex-col items-center justify-center gap-2 ${className}`}
      data-testid="butterfly-loader"
    >
      <motion.img
        src="/titli-butterfly.png"
        alt=""
        aria-hidden
        draggable={false}
        style={{ width: size, height: size, objectFit: "contain", filter }}
        initial={{ y: 0, rotate: 0, scale: 1 }}
        animate={{
          y: [0, -8, 0, -4, 0],
          rotate: [0, -8, 6, -4, 0],
          scale: [1, 1.03, 0.98, 1.02, 1],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {label && (
        <span
          className={`text-[11px] uppercase tracking-[0.24em] font-semibold ${
            tone === "white" ? "text-white" : "text-titli-action"
          }`}
        >
          {label}
        </span>
      )}
      <span className="sr-only">Loading…</span>
    </div>
  );
}
