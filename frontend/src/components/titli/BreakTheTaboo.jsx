import React from "react";
import { motion } from "framer-motion";
import { EyebrowLabel } from "./TitliButton";
import { ScribbleWord } from "./ScriptAccent";
import { PRIVACY } from "@/constants/testIds";

export function BreakTheTaboo() {
  return (
    <section id="taboo" data-testid={PRIVACY.section} className="relative py-32 md:py-48 bg-[#FFFBF7] overflow-hidden">
      <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#FFC5DE]/40 blur-3xl pointer-events-none"/>
      <div className="absolute -bottom-24 -left-24 w-[380px] h-[380px] rounded-full bg-[#FEF1F8] blur-3xl pointer-events-none"/>

      <div className="titli-container relative z-10 max-w-[1000px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex justify-center mb-8 animate-flutter"
        >
          <img
            src="/titli-butterfly.png"
            alt="Titli Foundation butterfly"
            className="w-14 h-14 md:w-16 md:h-16 object-contain"
            draggable={false}
          />
        </motion.div>

        <EyebrowLabel className="justify-center">Titli · The manifesto</EyebrowLabel>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 font-sans font-bold text-[30px] md:text-[48px] lg:text-[56px] leading-[1.12] tracking-tight balance text-[#111]"
        >
          Menstrual care is a{" "}
          <ScribbleWord rotate={-3}>fundamental right</ScribbleWord>
          {" "}— for every girl, in every socio-economic bracket, no
          exceptions.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 text-[17px] md:text-[19px] leading-[1.65] text-[#4A4A4A] max-w-[720px] mx-auto font-body"
        >
          It shouldn&apos;t be whispered. It shouldn&apos;t be a source of
          shame. Join us in our efforts to{" "}
          <span className="font-bold text-[#EC5A99]">#BreakTheTaboo</span>{" "}
          and positively impact lives everywhere.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.28em] text-black/50 font-semibold"
        >
          <span>80G · 12A</span>
          <span className="w-1 h-1 rounded-full bg-black/25"/>
          <span>Since 2020</span>
          <span className="w-1 h-1 rounded-full bg-black/25"/>
          <span>Faizabad, UP · India</span>
        </motion.div>
      </div>
    </section>
  );
}
