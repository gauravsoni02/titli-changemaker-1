import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { SCHOOLS } from "@/constants/testIds";
import { EyebrowLabel } from "./TitliButton";

const ROW_1 = [
  "Kendriya Vidyalaya",
  "Delhi Public School",
  "Sardar Patel Vidyalaya",
  "Modern School",
  "St. Xavier's",
  "La Martiniere",
  "Doon School",
  "Rishi Valley",
];
const ROW_2 = [
  "Cathedral & John Connon",
  "Bombay Scottish",
  "Bishop Cotton",
  "The Valley School",
  "Mahatma Gandhi International",
  "Vasant Valley",
  "Shri Ram School",
  "Welham Girls",
];

const REGIONS = [
  { name: "Delhi NCR", x: 46, y: 32 },
  { name: "Mumbai", x: 32, y: 58 },
  { name: "Bengaluru", x: 46, y: 78 },
  { name: "Kolkata", x: 74, y: 46 },
  { name: "Chennai", x: 54, y: 82 },
  { name: "Ahmedabad", x: 30, y: 44 },
  { name: "Hyderabad", x: 50, y: 68 },
  { name: "Munger", x: 68, y: 44 },
  { name: "Alwar", x: 40, y: 34 },
];

function LogoPill({ name }) {
  return (
    <div className="mx-3 shrink-0 h-16 px-8 rounded-full border border-black/10 bg-white flex items-center justify-center text-black/45 hover:text-[#EC5A99] hover:border-[#EC5A99]/60 transition-all duration-500 ease-titli">
      <span className="font-editorial text-[18px] tracking-tight whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

// A simplified India silhouette
const INDIA_PATH =
  "M 40 12 L 52 10 L 62 12 L 68 22 L 72 32 L 76 40 L 78 52 L 76 62 L 70 72 L 62 82 L 54 90 L 48 92 L 42 90 L 36 82 L 32 72 L 28 60 L 26 48 L 28 38 L 32 28 L 36 20 Z";

export function Schools() {
  const [hover, setHover] = useState(null);

  return (
    <section
      id="schools"
      data-testid={SCHOOLS.section}
      className="relative py-32 md:py-40 bg-[#FFFBF7] overflow-hidden"
    >
      <div className="titli-container mb-16">
        <div className="flex items-end justify-between gap-8">
          <div>
            <EyebrowLabel>Schools we walk with</EyebrowLabel>
            <h2 className="mt-6 font-editorial text-[44px] md:text-[64px] leading-[0.95] tracking-tight balance max-w-[720px]">
              A quiet coalition of
              <span className="italic text-[#EC5A99]"> 1,240 </span>
              schools.
            </h2>
          </div>
          <p className="hidden md:block max-w-[280px] text-[13px] text-black/50 leading-[1.6]">
            From tin-roofed government primary schools to elite private
            institutions running our sponsorship programmes — we're all in the
            same book.
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Marquee row 1 */}
        <div className="marquee-mask">
          <Marquee gradient={false} speed={30} pauseOnHover>
            {[...ROW_1, ...ROW_1].map((n, i) => (
              <LogoPill key={`r1-${i}`} name={n} />
            ))}
          </Marquee>
        </div>

        {/* Marquee row 2 — opposite direction */}
        <div className="marquee-mask mt-6">
          <Marquee gradient={false} speed={30} direction="right" pauseOnHover>
            {[...ROW_2, ...ROW_2].map((n, i) => (
              <LogoPill key={`r2-${i}`} name={n} />
            ))}
          </Marquee>
        </div>

        {/* Floating India map card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[300px] md:w-[380px] rounded-[32px] bg-white shadow-hero border border-black/[0.06] p-6 md:p-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-[11px] uppercase tracking-[0.24em] text-black/50">
              India · 9 states
            </div>
            <div className="text-[11px] uppercase tracking-[0.24em] text-[#EC5A99]">
              live now
            </div>
          </div>

          <div className="relative aspect-square rounded-[20px] bg-[#FEF1F8] p-6 overflow-hidden">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
              <path
                d={INDIA_PATH}
                fill="#FFC5DE"
                stroke="#EC5A99"
                strokeWidth="0.6"
                opacity="0.55"
              />
              {REGIONS.map((r, i) => (
                <g
                  key={i}
                  onMouseEnter={() => setHover(r.name)}
                  onMouseLeave={() => setHover(null)}
                  className="cursor-titli"
                >
                  <circle
                    cx={r.x}
                    cy={r.y}
                    r="2.6"
                    fill="#EC5A99"
                  >
                    <animate
                      attributeName="r"
                      values="2.6;3.4;2.6"
                      dur={`${1.6 + (i % 3) * 0.4}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle
                    cx={r.x}
                    cy={r.y}
                    r="5"
                    fill="none"
                    stroke="#EC5A99"
                    strokeWidth="0.4"
                    opacity="0.4"
                  >
                    <animate
                      attributeName="r"
                      values="4;8;4"
                      dur={`${1.6 + (i % 3) * 0.4}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.55;0;0.55"
                      dur={`${1.6 + (i % 3) * 0.4}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              ))}
            </svg>
            {hover && (
              <div className="absolute bottom-3 left-3 right-3 rounded-full bg-black text-white text-[12px] uppercase tracking-widest px-4 py-1.5 text-center">
                {hover}
              </div>
            )}
          </div>

          <div className="mt-5 flex items-center justify-between text-[12px]">
            <div className="text-black/60">Regions with active programmes</div>
            <div className="font-editorial text-[22px] text-[#EC5A99]">50+</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
