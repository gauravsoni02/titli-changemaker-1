import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { STEPS } from "@/constants/testIds";
import { EyebrowLabel } from "./TitliButton";

const STEPS_DATA = [
  {
    n: "01",
    chapter: "Chapter one",
    title: "We enter classrooms that history forgot.",
    body:
      "Every partnership starts with a walk-through: dusty government schools in tier-3 towns, tin roofs, forty students to a bench. We listen more than we speak.",
    tag: "Discover",
  },
  {
    n: "02",
    chapter: "Chapter two",
    title: "We build — libraries, labs, teachers who believe.",
    body:
      "Books, blackboards, learning corners, science kits, and quarterly cohorts that train the teachers who already show up. No parallel structures — we strengthen what exists.",
    tag: "Build",
  },
  {
    n: "03",
    chapter: "Chapter three",
    title: "We stay. For years. Until it holds.",
    body:
      "Impact isn't a photograph — it's an eleventh-grader reading Toni Morrison because her fourth-grade teacher had the training we funded. We measure that.",
    tag: "Stay",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="how"
      ref={ref}
      data-testid={STEPS.section}
      className="relative py-32 md:py-40 bg-[#FFFBF7]"
    >
      <div className="titli-container">
        <div className="max-w-[720px]">
          <EyebrowLabel>The Manifesto — in three chapters</EyebrowLabel>
          <h2 className="mt-6 font-editorial text-[44px] md:text-[68px] leading-[0.95] tracking-tight balance">
            How the work
            <span className="italic text-[#EC5A99]"> actually </span>
            gets done.
          </h2>
          <p className="mt-6 text-[16px] text-[#4A4A4A] leading-[1.6] max-w-[560px]">
            Not a pitch deck. Not a hashtag. Three chapters, told in the order
            we live them.
          </p>
        </div>

        <div className="relative mt-24 max-w-[880px] mx-auto">
          {/* Dotted pink SVG connector, drawn on scroll */}
          <svg
            className="absolute left-[38px] md:left-[52px] top-0 h-full w-[3px] overflow-visible pointer-events-none"
            viewBox="0 0 3 800"
            preserveAspectRatio="none"
          >
            <motion.line
              x1="1.5"
              y1="0"
              x2="1.5"
              y2="800"
              stroke="#EC5A99"
              strokeWidth="3"
              strokeLinecap="round"
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
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-24 md:pl-40"
              >
                {/* Number badge */}
                <div className="absolute left-0 top-1 w-[76px] md:w-[104px] flex items-start justify-center">
                  <div className="relative">
                    <div className="w-[76px] h-[76px] md:w-[104px] md:h-[104px] rounded-full bg-white border border-black/[0.08] shadow-soft flex items-center justify-center">
                      <span className="font-editorial text-[36px] md:text-[52px] text-[#EC5A99]">
                        {s.n}
                      </span>
                    </div>
                    <div className="absolute -inset-2 rounded-full border border-[#FFC5DE] opacity-70" />
                  </div>
                </div>

                <div className="text-[11px] uppercase tracking-[0.24em] text-[#EC5A99] mb-3">
                  {s.chapter} · {s.tag}
                </div>
                <h3 className="font-editorial text-[30px] md:text-[44px] leading-[1.05] tracking-tight balance text-black">
                  {s.title}
                </h3>
                <p className="mt-5 text-[16px] leading-[1.7] text-[#4A4A4A] max-w-[520px]">
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
