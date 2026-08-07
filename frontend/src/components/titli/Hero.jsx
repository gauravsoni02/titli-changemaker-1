import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScriptAccent, Butterfly } from "./ScriptAccent";
import { TitliButton, EyebrowLabel } from "./TitliButton";
import { HERO } from "@/constants/testIds";

const HERO_IMG =
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1400&q=80";

const line1 = ["Every", "child", "deserves"];
const line2 = ["a", "future"];
const line3 = ["worth", "reaching", "for."];

export function Hero({ onDonate }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const bfY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const container = {
    initial: {},
    animate: { transition: { staggerChildren: 0.09, delayChildren: 0.35 } },
  };
  const word = {
    initial: { y: "110%", opacity: 0, rotate: 3 },
    animate: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="hero"
      ref={ref}
      data-testid={HERO.section}
      className="relative min-h-[100vh] pt-[120px] pb-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFFBF7 0%, #FEF1F8 100%)" }}
    >
      {/* Butterfly watermark */}
      <motion.div
        style={{ y: bfY }}
        className="pointer-events-none absolute top-[15%] right-[8%] opacity-40 hidden lg:block animate-butterfly-flutter"
        aria-hidden
      >
        <Butterfly size={260} />
      </motion.div>

      {/* Grain overlay */}
      <div className="absolute inset-0 grain pointer-events-none" />

      <div className="titli-container relative z-10 grid grid-cols-12 gap-8 items-center">
        {/* LEFT — copy */}
        <div className="col-span-12 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <EyebrowLabel>Chapter 01 — The Titli Foundation</EyebrowLabel>
          </motion.div>

          <motion.h1
            data-testid={HERO.headline}
            variants={container}
            initial="initial"
            animate="animate"
            className="mt-6 font-editorial font-medium tracking-tight leading-[0.92] text-black balance"
            style={{ fontSize: "clamp(48px, 8.6vw, 132px)" }}
          >
            <span className="block overflow-hidden">
              <motion.span variants={word} className="inline-block">
                {line1.map((w, i) => (
                  <span key={i} className="inline-block mr-[0.22em]">
                    {w}
                  </span>
                ))}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={word} className="inline-block">
                <span className="inline-block mr-[0.22em]">{line2[0]}</span>
                <span className="inline-block mr-[0.22em] relative">
                  <ScriptAccent rotation={-4}>future</ScriptAccent>
                </span>
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={word} className="inline-block italic text-black/85 font-light">
                {line3.map((w, i) => (
                  <span key={i} className="inline-block mr-[0.22em]">
                    {w}
                  </span>
                ))}
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 1.6 }}
            className="mt-10 max-w-[520px] text-[17px] leading-[1.6] text-[#4A4A4A]"
          >
            For eleven years, we've walked into government classrooms across
            India with quiet resolve — building libraries, training teachers,
            and giving every child a doorway that opens outward.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 1.75 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <TitliButton
              size="lg"
              onClick={onDonate}
              data-testid={HERO.ctaPrimary}
              glow
            >
              Donate — become the change
              <span aria-hidden>↗</span>
            </TitliButton>
            <TitliButton
              variant="ghost"
              size="lg"
              as="a"
              href="#how"
              data-testid={HERO.ctaSecondary}
            >
              See how it works
            </TitliButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 2 }}
            className="mt-14 flex items-center gap-6 text-[12px] uppercase tracking-[0.22em] text-black/40"
          >
            <span>Since 2013</span>
            <span className="w-6 h-px bg-black/20" />
            <span>80G Certified</span>
            <span className="w-6 h-px bg-black/20" />
            <span>Delhi · Mumbai · Bengaluru</span>
          </motion.div>
        </div>

        {/* RIGHT — spotlight framed image + floating impact card */}
        <div className="col-span-12 lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-hero"
          >
            <motion.img
              src={HERO_IMG}
              alt="A child reading in a classroom"
              style={{ y: imgY, scale: imgScale }}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* soft spotlight overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(120% 80% at 50% 30%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)",
              }}
            />
            {/* number ticker top-left */}
            <div className="absolute top-6 left-6 font-editorial text-white text-[13px] tracking-widest uppercase opacity-90 mix-blend-difference">
              N° 001 / Portrait
            </div>
          </motion.div>

          {/* Floating glass impact card */}
          <motion.div
            data-testid={HERO.impactCard}
            initial={{ opacity: 0, x: -30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
            className="absolute -left-4 lg:-left-16 bottom-8 max-w-[280px] rounded-[24px] p-5 backdrop-blur-2xl bg-white/70 border border-white shadow-lift"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#EC5A99] text-white flex items-center justify-center text-[18px] font-editorial">
                ✻
              </div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-black/50">
                Impact · YTD
              </div>
            </div>
            <div className="mt-3 font-editorial text-[38px] leading-none tracking-tight text-black">
              10,240
            </div>
            <div className="mt-1 text-[13px] text-[#4A4A4A]">
              children reading better today than last year.
            </div>
            <div className="mt-4 h-1 w-full rounded-full bg-black/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "78%" }}
                transition={{ duration: 1.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-[#EC5A99]"
              />
            </div>
            <div className="mt-2 text-[11px] uppercase tracking-widest text-black/45">
              78% toward our 2026 goal
            </div>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-black/40"
      >
        <span className="w-px h-8 bg-black/25 animate-pulse" />
        Scroll to unfold
      </motion.div>
    </section>
  );
}
