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
      ? "min-h-11 px-8 py-3 text-[15px]"
      : size === "sm"
        ? "min-h-11 px-4 py-2 text-[13px]"
        : "min-h-11 px-6 py-2 text-[14px]";

  const base =
    "relative inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 ease-titli focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-titli-action focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFBF7] disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary:
      "bg-titli-action text-white hover:bg-titli-action-hover shadow-pill hover:shadow-[0_18px_44px_rgba(236,90,153,0.35)] active:scale-[0.98]",

    ghost:
      "border border-titli-action/40 bg-transparent text-titli-action hover:border-titli-action hover:bg-titli-action/10 active:scale-[0.98]",

    outlineWhite:
      "border border-white/60 bg-transparent text-white hover:border-white hover:bg-white/10 active:scale-[0.98]",

    dark:
      "bg-black text-white hover:bg-black/85 active:scale-[0.98]",

    light:
      "border border-white bg-white text-titli-action hover:shadow-lg active:scale-[0.98]",

    solidBlack:
      "bg-[#111] text-white hover:bg-black active:scale-[0.98]",
  };

  const cls = `${base} ${sizeCls} ${variants[variant]} ${
    glow ? "animate-pink-glow" : ""
  } ${className}`;

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
        aria-disabled={disabled || undefined}
        {...rest}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
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
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}

export function EyebrowLabel({
  children,
  className = "",
  dark = false,
}) {
  return (
    <div
      className={`inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.2em] ${
        dark ? "text-white" : "text-titli-action"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-px w-6 ${
          dark ? "bg-white/80" : "bg-titli-action"
        }`}
      />

      <span>{children}</span>
    </div>
  );
}

export function Chip({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-[#E7A7C3] bg-[#FEF1F8] px-3.5 py-1.5 text-[12px] font-semibold tracking-[0.12em] text-titli-action ${className}`}
    >
      <span
        aria-hidden="true"
        className="inline-block h-1.5 w-1.5 rounded-full bg-[#EC5A99]"
      />

      <span>{children}</span>
    </span>
  );
}