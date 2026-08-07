import React from "react";
import { motion } from "framer-motion";
import { BENTO } from "@/constants/testIds";
import { EyebrowLabel } from "./TitliButton";

const BENTO_IMG_1 =
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80";
const BENTO_IMG_2 =
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80";

function Card({ children, className = "", index = 0, dark = false }) {
  return (
    <motion.div
      data-testid={BENTO.card(index)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className={`relative group overflow-hidden rounded-[28px] md:rounded-[36px] border ${
        dark ? "border-white/10" : "border-black/[0.06]"
      } shadow-soft transition-shadow duration-500 ease-titli hover:shadow-lift ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function WhyJoin() {
  return (
    <section
      id="why"
      data-testid={BENTO.section}
      className="relative py-32 md:py-40 bg-[#FEF1F8]"
    >
      <div className="titli-container">
        <div className="flex items-end justify-between gap-8 mb-16">
          <div>
            <EyebrowLabel>Why join Titli</EyebrowLabel>
            <h2 className="mt-6 font-editorial text-[44px] md:text-[68px] leading-[0.95] tracking-tight balance max-w-[720px]">
              Give once — and watch it
              <span className="italic text-[#EC5A99]"> compound </span>
              for a lifetime.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {/* Big card — image + copy */}
          <Card
            index={0}
            className="col-span-12 md:col-span-8 min-h-[420px] bg-black text-white"
            dark
          >
            <img
              src={BENTO_IMG_1}
              alt="Girls in a classroom"
              className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-[900ms] ease-titli group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent" />
            <div className="relative p-8 md:p-12 flex flex-col justify-end h-full min-h-[420px]">
              <div className="text-[11px] uppercase tracking-[0.28em] text-[#FFC5DE] mb-4">
                A₁ · Direct impact
              </div>
              <h3 className="font-editorial text-[32px] md:text-[44px] leading-[1.05] tracking-tight balance max-w-[420px]">
                Your ₹1,000 puts a library into a classroom.
              </h3>
              <p className="mt-4 max-w-[400px] text-[15px] text-white/75 leading-[1.6]">
                Every rupee is tagged to a specific school, a specific corner,
                a specific bookshelf. You get to watch it happen.
              </p>
            </div>
          </Card>

          {/* Tall card — number */}
          <Card
            index={1}
            className="col-span-12 md:col-span-4 min-h-[420px] bg-white"
          >
            <div className="p-8 md:p-10 h-full flex flex-col justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.28em] text-[#EC5A99] mb-4">
                  A₂ · Transparency
                </div>
                <div className="font-editorial text-[92px] md:text-[112px] leading-[0.85] tracking-tighter text-black">
                  92<span className="text-[#EC5A99]">%</span>
                </div>
                <div className="mt-4 text-[15px] text-[#4A4A4A] max-w-[240px]">
                  of every donation reaches the classroom — audited, verified,
                  documented.
                </div>
              </div>
              <a
                href="#privacy"
                className="mt-8 inline-flex items-center gap-2 text-[13px] font-medium text-black underline underline-offset-4 decoration-[#EC5A99] decoration-2 hover:decoration-4 transition-all"
              >
                Read our transparency ledger →
              </a>
            </div>
          </Card>

          {/* Small card — tax */}
          <Card
            index={2}
            className="col-span-12 md:col-span-4 min-h-[320px] bg-white"
          >
            <div className="p-8 md:p-10 h-full flex flex-col justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.28em] text-[#EC5A99] mb-4">
                  A₃ · Tax benefit
                </div>
                <h3 className="font-editorial text-[26px] md:text-[32px] leading-[1.1] tracking-tight text-black">
                  80G certified.
                  <br />
                  50% back to you.
                </h3>
              </div>
              <div className="mt-6 flex items-center gap-3 text-[13px] text-[#4A4A4A]">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF1F8] text-[#EC5A99] border border-[#FFC5DE] text-[11px] uppercase tracking-widest">
                  Verified · MoF
                </span>
              </div>
            </div>
          </Card>

          {/* Wide card — image + quote */}
          <Card
            index={3}
            className="col-span-12 md:col-span-8 min-h-[320px] bg-[#FFFBF7]"
          >
            <div className="grid grid-cols-5 h-full">
              <div className="col-span-2 relative overflow-hidden hidden md:block">
                <img
                  src={BENTO_IMG_2}
                  alt="Teacher and student"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-titli group-hover:scale-105"
                />
              </div>
              <div className="col-span-5 md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                <div className="text-[11px] uppercase tracking-[0.28em] text-[#EC5A99] mb-4">
                  A₄ · The chorus
                </div>
                <blockquote className="font-editorial text-[22px] md:text-[28px] leading-[1.25] tracking-tight text-black balance">
                  “Titli didn’t give my daughter books. They gave her the
                  belief that <em className="text-[#EC5A99]">she could read them</em>. That is a different
                  gift entirely.”
                </blockquote>
                <div className="mt-6 text-[13px] text-[#4A4A4A]">
                  — Sunita Devi, parent · Munger, Bihar
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
