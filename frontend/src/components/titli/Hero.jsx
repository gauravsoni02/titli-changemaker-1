import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CupOval, ScribbleWord } from "./ScriptAccent";
import { TitliButton, EyebrowLabel } from "./TitliButton";
import { HERO } from "@/constants/testIds";

// Warm authentic Indian community photography — Titli deployment locations
const HERO_IMG =
  "https://cdn.sanity.io/images/a2qr83b2/production/d3078eaf4ed94bf01b3b5eedc0fece2f6ae1d3a6-1200x1600.jpg?auto=format&fit=max&w=1100&q=80";
const HERO_IMG_2 =
  "https://www.titlifoundation.in/images/caro%201.png";

export function Hero({ onRegisterSchool, onStartFundraiser }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
 

  const container = { initial: {}, animate: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } } };
  const word = {
    initial: { y: "110%", opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="hero"
      ref={ref}
      data-testid={HERO.section}
      className="relative min-h-[100vh] pt-[110px] pb-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FEF1F8 0%, #FEF1F8 60%, #FFFBF7 100%)" }}
    >
      
      <div className="absolute inset-0 grain pointer-events-none" />

      <div className="titli-container relative z-10 grid grid-cols-12 gap-8 md:gap-14 items-center">
        {/* LEFT — image */}
        <div className="col-span-12 lg:col-span-6 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-hero"
          >
            <motion.img
              src={HERO_IMG}
              onError={(e) => { e.currentTarget.src = HERO_IMG_2; }}
              alt="Titli Foundation volunteers with community members"
              style={{ y: imgY, scale: imgScale }}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.35) 100%)"
            }} />
            <div className="absolute top-5 left-5 rounded-full bg-white/90 backdrop-blur px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] text-[#EC5A99] uppercase">
              In partnership with Titli
            </div>
          </motion.div>

          {/* Floating stat pill under image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1.3 }}
            className="absolute -top-2 lg:top-auto lg:-bottom-4 right-2 lg:-right-6 max-w-[240px] rounded-[20px] p-4 bg-white shadow-lift border border-[#FFC5DE]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#EC5A99] flex items-center justify-center text-white font-extrabold">42</div>
              <div>
                <div className="text-[13px] font-semibold text-[#111]">schools raising</div>
                <div className="text-[11px] text-black/50">right now, live</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — copy */}
        <div className="col-span-12 lg:col-span-6 order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <EyebrowLabel>Schools · Students · #BreakTheTaboo</EyebrowLabel>
          </motion.div>

          <motion.h1
            data-testid={HERO.headline}
            variants={container}
            initial="initial"
            animate="animate"
            className="mt-6 font-sans font-extrabold tracking-tight leading-[0.98] text-[#111]"
            style={{ fontSize: "clamp(44px, 6vw, 92px)" }}
          >
            <span className="block overflow-hidden" style={{ paddingBottom: "0.14em", marginBottom: "-0.12em" }}>
              <motion.span variants={word} className="block whitespace-nowrap">
                Change
              </motion.span>
            </span>
            <span className="block overflow-hidden" style={{ paddingBottom: "0.14em", marginBottom: "-0.12em" }}>
              <motion.span variants={word} className="block whitespace-nowrap">
                begins,
              </motion.span>
            </span>
            <span className="block overflow-hidden" style={{ paddingBottom: "0.14em", marginBottom: "-0.12em" }}>
              <motion.span variants={word} className="inline-flex items-center whitespace-nowrap">
                one
                <CupOval size={132} className="mx-2 md:mx-3" />
              </motion.span>
            </span>
            <span className="block overflow-hidden" style={{ paddingBottom: "0.14em", marginBottom: "-0.12em" }}>
              <motion.span variants={word} className="block whitespace-nowrap">
                at a time.
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
            className="mt-6 inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.24em] font-bold text-[#EC5A99]"
          >
            <span className="w-6 h-px bg-[#EC5A99]"/>
            Now, schools raise for it.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 1.35 }}
            className="mt-8 max-w-[520px] text-[16px] md:text-[18px] leading-[1.6] text-[#4A4A4A] font-body"
          >
            Titli Foundation stands against period poverty across India. Now,
            your school can join the movement — students launch fundraisers,
            we deliver menstrual dignity to underprivileged girls in your name.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 1.5 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <TitliButton size="lg" onClick={onRegisterSchool} data-testid={HERO.ctaPrimary} glow>
              Register your school
              <span aria-hidden>→</span>
            </TitliButton>
            <TitliButton
              variant="ghost"
              size="lg"
              onClick={onStartFundraiser}
              data-testid={HERO.ctaSecondary}
            >
              I&apos;m a student — start fundraising
            </TitliButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.9 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.22em] text-black/45 font-semibold"
          >
            <span>80G Certified</span>
            <span className="w-1 h-1 rounded-full bg-black/25" />
            <span>Zero cost to schools</span>
            <span className="w-1 h-1 rounded-full bg-black/25" />
            <span>#BreakTheTaboo</span>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-black/40 font-semibold"
      >
        <span className="w-px h-8 bg-black/25 animate-pulse" />
        Scroll to see how it works
      </motion.div>
    </section>
  );
}
