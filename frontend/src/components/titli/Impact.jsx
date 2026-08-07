import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { METRICS } from "@/constants/testIds";
import { EyebrowLabel } from "./TitliButton";

// Real Titli Foundation stats (from titlifoundation.in)
const STATS = [
  {
    value: 10000, suffix: "+", label: "Pads donated", note: "and counting…",
    img: "https://cdn.sanity.io/images/a2qr83b2/production/c328f93012f2b5929bbfde145846cbb690d2f78b-826x341.png?auto=format&fit=max&w=800&q=75",
  },
  {
    value: 500, suffix: "+", label: "Cups donated", note: "and counting…",
    img: "https://cdn.sanity.io/images/a2qr83b2/production/1d6acb9e21a5fe2af551794c9aacb662db33ddfb-826x341.png?auto=format&fit=max&w=800&q=75",
  },
  {
    value: 3500, suffix: "+", label: "Volunteers", note: "driving the cause",
    img: "https://cdn.sanity.io/images/a2qr83b2/production/d2087fd8553737c6e985a30542a448c346f8f293-826x341.png?auto=format&fit=max&w=800&q=75",
  },
  {
    value: 60, suffix: "+", label: "Campaigns conducted", note: "on-ground",
    img: "https://cdn.sanity.io/images/a2qr83b2/production/4a1afbcb8a9d185f712bbe5461293a24e4aee2b8-825x342.png?auto=format&fit=max&w=800&q=75",
  },
];

export function Impact() {
  return (
    <section id="impact" data-testid={METRICS.section} className="relative py-32 md:py-40 bg-[#FFFBF7]">
      <div className="titli-container">
        <div className="max-w-[760px] mb-16">
          <EyebrowLabel>Titli — impact so far</EyebrowLabel>
          <h2 className="mt-6 font-sans font-extrabold text-[42px] md:text-[64px] leading-[1.02] tracking-tight balance text-[#111]">
            What your school will be joining.
          </h2>
          <p className="mt-6 text-[16px] md:text-[18px] text-[#4A4A4A] leading-[1.65] max-w-[560px] font-body">
            These are the real numbers Titli Foundation has posted since 2020.
            Your school&apos;s next fundraiser adds to them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              data-testid={METRICS.card(i)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              className="group relative rounded-[32px] overflow-hidden border border-[#FFC5DE]/50 bg-[#FEF1F8] hover:bg-white transition-colors duration-500"
            >
              <div className="grid grid-cols-5 items-center">
                <div className="col-span-2 relative aspect-square overflow-hidden">
                  <img
                    src={s.img}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[900ms] group-hover:scale-105"
                  />
                </div>
                <div className="col-span-3 p-8 md:p-10">
                  <div className="text-[11px] uppercase tracking-[0.24em] text-[#EC5A99] font-semibold mb-3">
                    0{i + 1} · verified
                  </div>
                  <div className="font-sans font-extrabold text-[54px] md:text-[80px] leading-[0.9] tracking-tight text-[#111]">
                    <CountUp end={s.value} duration={2.6} separator="," enableScrollSpy scrollSpyOnce />
                    <span className="text-[#EC5A99]">{s.suffix}</span>
                  </div>
                  <div className="mt-4 text-[15px] font-bold text-[#111]">{s.label}</div>
                  <div className="text-[13px] text-[#4A4A4A]">{s.note}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
