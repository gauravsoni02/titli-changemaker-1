import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { STEPS } from "@/constants/testIds";
import { EyebrowLabel } from "./TitliButton";
import { ScribbleWord } from "./ScriptAccent";

const STEPS_DATA = [
  {
    n: "01",
    chapter: "Step one",
    title: "Your school registers.",
    body: "A quick five-minute form. You'll get a dedicated Titli coordinator, a school dashboard, and a page for every class to run its own fundraiser.",
    tag: "For coordinators",
  },
  {
    n: "02",
    chapter: "Step two",
    title: "Students launch fundraisers.",
    body: "Each class or student gets a shareable link. They rally parents, alumni, and family — no competition, no leaderboards, just collective momentum.",
    tag: "For students",
  },
  {
    n: "03",
    chapter: "Step three",
    title: "Titli delivers dignity — in your name.",
    body: "Every rupee raised buys menstrual cups, sanitary pads, and community workshops. Your school gets a field report with photographs from the girls you helped.",
    tag: "The outcome",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="how" ref={ref} data-testid={STEPS.section} className="relative py-32 md:py-40 bg-[#FFFBF7]">
      <div className="titli-container">
        <div className="max-w-[760px]">
          <EyebrowLabel>How it works — three steps</EyebrowLabel>
          <h2 className="mt-6 font-sans font-extrabold text-[42px] md:text-[64px] leading-[1.02] tracking-tight balance text-[#111]">
            From your assembly hall
            <br />
            to <ScribbleWord rotate={-4} size={1}>her hands</ScribbleWord>.
          </h2>
          <p className="mt-6 text-[16px] md:text-[18px] text-[#4A4A4A] leading-[1.65] max-w-[560px] font-body">
            No middlemen, no confusion. A single, direct pipeline from your
            school community to the girls who need it most.
          </p>
        </div>

        <div className="relative mt-24 max-w-[920px] mx-auto">
          <svg
            className="absolute left-[38px] md:left-[52px] top-0 h-full w-[3px] overflow-visible pointer-events-none"
            viewBox="0 0 3 800"
            preserveAspectRatio="none"
          >
            <motion.line
              x1="1.5" y1="0" x2="1.5" y2="800"
              stroke="#EC5A99" strokeWidth="3" strokeLinecap="round"
              strokeDasharray="2 10"
              style={{ pathLength }}
            />
          </svg>

          <div className="flex flex-col gap-16 md:gap-24">
            {STEPS_DATA.map((s, i) => (
              <motion.div
                key={i}
                data-testid={STEPS.step(i)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-24 md:pl-40"
              >
                <div className="absolute left-0 top-1 flex items-start justify-center">
                  <div className="relative">
                    <div className="w-[76px] h-[76px] md:w-[104px] md:h-[104px] rounded-full bg-white border border-[#FFC5DE] shadow-soft flex items-center justify-center">
                      <span className="font-sans font-extrabold text-[32px] md:text-[44px] text-[#EC5A99]">{s.n}</span>
                    </div>
                    <div className="absolute -inset-2 rounded-full border border-[#FFC5DE] opacity-70" />
                  </div>
                </div>
                <div className="text-[11px] uppercase tracking-[0.24em] text-titli-action mb-3 font-semibold">
                  {s.chapter} · {s.tag}
                </div>
                <h3 className="font-sans font-extrabold text-[28px] md:text-[40px] leading-[1.1] tracking-tight balance text-[#111]">
                  {s.title}
                </h3>
                <p className="mt-4 text-[16px] leading-[1.7] text-[#4A4A4A] max-w-[560px] font-body">
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
