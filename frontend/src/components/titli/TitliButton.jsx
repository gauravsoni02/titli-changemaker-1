import React from "react";
import { motion } from "framer-motion";

export function TitliButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  as = "button",
  onClick,
  href,
  target,
  rel,
  "data-testid": dataTestId,
  disabled,
  type = "button",
  glow = false,
  ...rest
}) {
  const sizeCls =
    size === "lg"
      ? "px-8 py-4 text-base"
      : size === "sm"
      ? "px-4 py-2 text-sm"
      : "px-6 py-3 text-sm";

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-[320ms] ease-titli focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC5A99] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFBF7] disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-[#EC5A99] text-white hover:bg-[#D84C8A] shadow-hero hover:shadow-[0_18px_50px_rgba(236,90,153,0.35)] active:scale-[0.98]",
    ghost:
      "bg-transparent text-black border border-black/15 hover:border-black hover:bg-black/5 active:scale-[0.98]",
    outlineWhite:
      "bg-transparent text-white border border-white/40 hover:border-white hover:bg-white/10 active:scale-[0.98]",
    dark:
      "bg-black text-white hover:bg-black/85 active:scale-[0.98]",
    light:
      "bg-white text-black border border-black/10 hover:border-black active:scale-[0.98]",
  };

  const cls = `${base} ${sizeCls} ${variants[variant]} ${glow ? "animate-pink-glow" : ""} ${className}`;

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (as === "a" || href) {
    return (
      <motion.a
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        href={href}
        target={target}
        rel={rel}
        className={cls}
        data-testid={dataTestId}
        onClick={onClick}
        {...rest}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      type={type}
      className={cls}
      onClick={onClick}
      disabled={disabled}
      data-testid={dataTestId}
      {...rest}
    >
      {inner}
    </motion.button>
  );
}

export function TagPill({ children, className = "", tone = "pink" }) {
  const tones = {
    pink: "bg-[#FEF1F8] text-[#EC5A99] border border-[#FFC5DE]",
    dark: "bg-white/10 text-white/90 border border-white/15 backdrop-blur",
    cream: "bg-white text-black border border-black/10",
  };
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] ${tones[tone]} ${className}`}
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

export function EyebrowLabel({ children, className = "", dark = false }) {
  return (
    <div
      className={`inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] font-medium ${
        dark ? "text-white/60" : "text-black/50"
      } ${className}`}
    >
      <span className={`w-8 h-px ${dark ? "bg-white/40" : "bg-black/30"}`} />
      {children}
    </div>
  );
}
