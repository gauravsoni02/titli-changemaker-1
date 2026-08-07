import React from "react";
import { motion } from "framer-motion";
import { TitliButton } from "./TitliButton";
import { Butterfly } from "./ScriptAccent";
import { CTA } from "@/constants/testIds";

const BG =
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80";

export function FinalCTA({ onDonate, externalDonateUrl = "https://titlifoundation.org/donate" }) {
  return (
    <section id="donate" data-testid={CTA.section} className="relative py-24 md:py-32 bg-[#FFFBF7]">
      <div className="titli-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[40px] md:rounded-[56px] shadow-lift"
        >
          <img
            src={BG}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.9) 100%)",
            }}
          />
          {/* Pink cast */}
          <div
            className="absolute inset-0 mix-blend-multiply pointer-events-none opacity-40"
            style={{
              background:
                "radial-gradient(60% 50% at 20% 100%, rgba(236,90,153,0.45), transparent 60%)",
            }}
          />

          <div className="relative z-10 min-h-[620px] flex flex-col items-center justify-center text-center px-8 md:px-16 py-24 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mb-6 animate-butterfly-flutter"
            >
              <Butterfly size={80} />
            </motion.div>

            <div className="text-[11px] uppercase tracking-[0.32em] text-[#FFC5DE] mb-4">
              Chapter 10 · a beginning
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="font-editorial text-white text-[48px] md:text-[80px] lg:text-[104px] leading-[0.95] tracking-tight balance max-w-[900px]"
            >
              Turn a page.
              <br />
              <span className="italic text-[#FFC5DE]">Turn a life.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 text-white/80 text-[16px] md:text-[18px] max-w-[560px] leading-[1.6]"
            >
              Give once. Give monthly. Give in honour of someone. Every rupee
              lands in a classroom you can visit.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-4"
            >
              <TitliButton
                size="lg"
                onClick={onDonate}
                data-testid={CTA.primary}
                glow
                className="!px-10"
              >
                Donate now — via card
                <span aria-hidden>↗</span>
              </TitliButton>
              <TitliButton
                variant="outlineWhite"
                size="lg"
                as="a"
                href={externalDonateUrl}
                target="_blank"
                rel="noreferrer noopener"
                data-testid={CTA.secondary}
              >
                Or give on titlifoundation.org
              </TitliButton>
            </motion.div>

            <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.28em] text-white/50">
              <span>80G · 50% tax back</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>Secure — Stripe · UPI · Cards</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>Field report in your inbox</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
