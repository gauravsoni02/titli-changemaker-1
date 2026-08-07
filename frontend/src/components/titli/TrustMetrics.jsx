import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { METRICS } from "@/constants/testIds";
import { EyebrowLabel } from "./TitliButton";

const METRICS_DATA = [
  { label: "Classrooms activated", value: 1240, suffix: "+", note: "across 9 states" },
  { label: "Children reached", value: 42800, suffix: "+", note: "and counting" },
  { label: "Teachers trained", value: 3600, suffix: "", note: "workshops, cohorts" },
  { label: "Years of quiet work", value: 11, suffix: "", note: "since 2013" },
];

export function TrustMetrics() {
  return (
    <section
      data-testid={METRICS.section}
      className="relative py-24 md:py-32 bg-[#FFFBF7] border-t border-b border-black/[0.08]"
    >
      <div className="titli-container">
        <div className="flex items-end justify-between gap-6 mb-16">
          <div>
            <EyebrowLabel>The Ledger of Small Miracles</EyebrowLabel>
            <h2 className="mt-4 font-editorial text-[40px] md:text-[54px] leading-[1] tracking-tight balance max-w-[560px]">
              Numbers we count, quietly.
            </h2>
          </div>
          <p className="hidden md:block text-[13px] text-black/50 max-w-[280px] text-right">
            Every metric below is verified by our on-ground field partners and
            audited annually.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {METRICS_DATA.map((m, i) => (
            <motion.div
              key={i}
              data-testid={METRICS.card(i)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.08,
              }}
              className="group relative pt-6 border-t-2 border-black/10 hover:border-[#EC5A99] transition-colors duration-500"
            >
              <div className="text-[11px] uppercase tracking-[0.24em] text-black/45 mb-6">
                0{i + 1}
              </div>
              <div className="font-editorial text-[56px] md:text-[80px] leading-[0.9] tracking-tighter text-black">
                <CountUp
                  end={m.value}
                  duration={2.6}
                  separator=","
                  enableScrollSpy
                  scrollSpyOnce
                />
                <span className="text-[#EC5A99]">{m.suffix}</span>
              </div>
              <div className="mt-4 text-[15px] font-medium text-black">{m.label}</div>
              <div className="mt-1 text-[13px] text-[#4A4A4A]">{m.note}</div>
              <div className="absolute -top-[3px] left-0 h-[2px] w-0 group-hover:w-full bg-[#EC5A99] transition-all duration-700 ease-titli" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
