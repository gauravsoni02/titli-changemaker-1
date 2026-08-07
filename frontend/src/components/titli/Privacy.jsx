import React from "react";
import { motion } from "framer-motion";
import { PRIVACY } from "@/constants/testIds";
import { EyebrowLabel } from "./TitliButton";

const TRUST = [
  {
    n: "I.",
    title: "80G, 12A, FCRA certified.",
    body:
      "Every rupee you send is tracked through India's most rigorous NGO compliance regime. We publish quarterly attestations, signed by our chartered auditors.",
    tag: "Compliance",
  },
  {
    n: "II.",
    title: "Zero data resale. Ever.",
    body:
      "We do not sell, rent, or share donor data with anyone — not sponsors, not partners, not affiliates. Your email lives in one place, and only for what you asked.",
    tag: "Data ethics",
  },
  {
    n: "III.",
    title: "Field audits. Real photographs.",
    body:
      "For every ₹50,000 disbursed, we publish an on-ground field report. Actual children, actual classrooms, actual signatures — with dignity, always.",
    tag: "On-ground truth",
  },
];

export function Privacy() {
  return (
    <section
      id="privacy"
      data-testid={PRIVACY.section}
      className="relative py-32 md:py-48 bg-black text-white overflow-hidden"
    >
      {/* subtle grain */}
      <div className="absolute inset-0 grain opacity-40 pointer-events-none" />

      {/* pink glow accents */}
      <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-[#EC5A99]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 w-[400px] h-[400px] rounded-full bg-[#EC5A99]/10 blur-3xl pointer-events-none" />

      <div className="titli-container relative z-10">
        <div className="grid grid-cols-12 gap-8 md:gap-16 items-start">
          <div className="col-span-12 md:col-span-5 md:sticky md:top-32">
            <EyebrowLabel dark>Privacy · Trust · Ethics</EyebrowLabel>
            <h2 className="mt-6 font-editorial text-[44px] md:text-[64px] leading-[0.95] tracking-tight balance">
              We built the ledger
              <span className="italic text-[#EC5A99]"> in daylight.</span>
            </h2>
            <p className="mt-6 text-white/60 text-[16px] leading-[1.7] max-w-[420px]">
              Titli's operating principle is simple. If it can't be shown to
              you, it shouldn't be done in your name.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur">
              <span className="w-2 h-2 rounded-full bg-[#EC5A99] animate-pulse" />
              <span className="text-[12px] uppercase tracking-widest text-white/80">
                Ochre badge · verified quarterly
              </span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 flex flex-col gap-6">
            {TRUST.map((t, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-[28px] p-8 md:p-10 border border-white/12 bg-white/[0.06] backdrop-blur-xl transition-all duration-500 hover:border-[#EC5A99]/50 hover:bg-white/[0.09]"
              >
                <div className="flex items-start gap-6">
                  <div className="font-editorial text-[42px] md:text-[52px] leading-none text-[#EC5A99]">
                    {t.n}
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] uppercase tracking-[0.28em] text-white/50 mb-3">
                      {t.tag}
                    </div>
                    <h3 className="font-editorial text-[24px] md:text-[30px] leading-[1.15] tracking-tight text-white">
                      {t.title}
                    </h3>
                    <p className="mt-4 text-[15px] text-white/70 leading-[1.7] max-w-[520px]">
                      {t.body}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-[#EC5A99] to-transparent transition-all duration-700" />
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
