import React from "react";
import { motion } from "framer-motion";
import { TitliButton } from "./TitliButton";
import { TitliButterfly } from "./ScriptAccent";
import { CTA } from "@/constants/testIds";

const BG = "https://www.titlifoundation.in/images/caro%204.png";

export function FinalCTA({ onRegisterSchool, onStartFundraiser }) {
  return (
    <section id="cta" data-testid={CTA.section} className="relative py-24 md:py-32 bg-[#FFFBF7]">
      <div className="titli-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[36px] md:rounded-[48px] shadow-lift grid md:grid-cols-2"
        >
          {/* LEFT — Schools */}
          <div className="relative bg-[#EC5A99] text-white p-10 md:p-16 flex flex-col justify-between min-h-[520px]">
            <div>
              <h3 className="font-sans font-extrabold text-[36px] md:text-[52px] leading-[1] tracking-tight balance">
                Register your school. Now.
              </h3>
              <p className="mt-5 text-white/85 text-[15px] md:text-[16px] leading-[1.6] max-w-[380px] font-body">
                Five-minute form. Named coordinator. Live dashboard by tomorrow morning.
              </p>
            </div>
            <div className="mt-10">
              <TitliButton
                variant="light"
                size="lg"
                onClick={onRegisterSchool}
                data-testid={CTA.primary}
                className="!px-8"
              >
                Register school →
              </TitliButton>
            </div>
            <div className="absolute -bottom-6 -right-6 opacity-25 animate-flutter">
              <TitliButterfly size={160}/>
            </div>
          </div>

          {/* RIGHT — Students */}
          <div className="relative min-h-[520px] flex flex-col justify-between p-10 md:p-16 text-white overflow-hidden">
            <img src={BG} alt="" className="absolute inset-0 w-full h-full object-cover"/>
            <div className="absolute inset-0" style={{
              background: "linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(236,90,153,0.55) 100%)"
            }}/>
            <div className="relative">
              <h3 className="font-sans font-extrabold text-[36px] md:text-[52px] leading-[1] tracking-tight balance">
                Start your fundraiser today.
              </h3>
              <p className="mt-5 text-white/90 text-[15px] md:text-[16px] leading-[1.6] max-w-[380px] font-body">
                No school code needed to explore. Launch in 60 seconds and start sharing.
              </p>
            </div>
            <div className="relative mt-10">
              <TitliButton
                variant="outlineWhite"
                size="lg"
                onClick={onStartFundraiser}
                data-testid={CTA.secondary}
                className="!px-8"
              >
                Start fundraising →
              </TitliButton>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
