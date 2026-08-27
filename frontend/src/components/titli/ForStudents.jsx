import React from "react";
import { motion } from "framer-motion";
import { EyebrowLabel, TitliButton, Chip } from "./TitliButton";
import { ScribbleWord } from "./ScriptAccent";

const IMG = "https://www.titlifoundation.in/images/caro%201.png";

const PERKS = [
  { icon: "✎", label: "A campaign page in 60 seconds" },
  { icon: "⌁", label: "Share link, WhatsApp story, QR code" },
  { icon: "❤︎", label: "Real-time counter — no leaderboards, no comparison" },
  { icon: "✦", label: "Certificate for every campaign, not just the top ones" },
  { icon: "◐", label: "Group with friends, split the effort" },
  { icon: "☺", label: "Learn what your money actually did" },
];

export function ForStudents({ onStart }) {
  return (
    <section id="students" className="relative py-32 md:py-40 bg-[#FFFBF7] overflow-hidden">
      <div className="titli-container">
        <div className="grid grid-cols-12 gap-8 md:gap-16 items-center">
          <div className="col-span-12 lg:col-span-6 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-lift"
            >
              <img src={IMG} alt="Students collaborating" className="absolute inset-0 w-full h-full object-cover"/>
              <div className="absolute inset-0" style={{
                background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.5) 100%)"
              }}/>
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
            
              </div>
            </motion.div>
          </div>

          <div className="col-span-12 lg:col-span-6 order-1 lg:order-2">
            <h2 className="mt-0 font-sans font-extrabold text-[42px] md:text-[60px] leading-[1.02] tracking-tight balance text-[#111]">
              Your fundraiser is<br/>
              <ScribbleWord rotate={-3}>your voice</ScribbleWord>.
            </h2>
            <p className="mt-6 text-[16px] md:text-[18px] text-[#4A4A4A] leading-[1.65] max-w-[520px] font-body">
              We built this for students, not for competition. Every campaign
              matters. Every rupee lands. Raise ten or ten thousand — a girl
              somewhere in India gets to sit through class without shame.
            </p>

            <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PERKS.map((p, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="flex items-start gap-3"
                >
                  <span className="flex-none w-8 h-8 rounded-full bg-[#FEF1F8] text-[#EC5A99] flex items-center justify-center font-bold text-[16px]">
                    {p.icon}
                  </span>
                  <span className="text-[14px] text-[#111] leading-[1.5] font-medium pt-1">
                    {p.label}
                  </span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10">
              <TitliButton size="lg" onClick={onStart} glow>
                Start your fundraiser →
              </TitliButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
