import React from "react";

/**
 * ButterflyLoader / ButterflyLogo
 * Static Titli butterfly — no animation.
 *
 * Props:
 *   size (number, default 48) — pixel size
 *   label (string, optional) — small caption below the butterfly
 *   tone ("pink" | "white", default "pink") — coloring
 */
export function ButterflyLogo({
  size = 48,
  label,
  tone = "pink",
  className = "",
}) {
  const filter = tone === "white" ? "brightness(0) invert(1)" : "none";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`inline-flex flex-col items-center justify-center gap-2 ${className}`}
      data-testid="butterfly-loader"
    >
      <img
        src="/titli-butterfly.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          filter,
        }}
      />

      {label && (
        <span
          className={`text-[11px] uppercase tracking-[0.24em] font-semibold ${
            tone === "white"
              ? "text-white/80"
              : "text-[#EC5A99]"
          }`}
        >
          {label}
        </span>
      )}

      <span className="sr-only">Loading…</span>
    </div>
  );
}

/*
 * Keep ButterflyLoader available for any existing imports.
 * Both names now use the same static butterfly component.
 */
export const ButterflyLoader = ButterflyLogo;