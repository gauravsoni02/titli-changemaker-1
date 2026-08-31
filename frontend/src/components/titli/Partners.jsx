import React from "react";
import Marquee from "react-fast-marquee";
import { SCHOOLS } from "@/constants/testIds";
import { EyebrowLabel } from "./TitliButton";

// Real Titli Foundation partner logos (from titlifoundation.in/images/brands/)
const BASE = "https://www.titlifoundation.in/images/brands/";
const ROW_1 = [
  { name: "Delhi Police", file: "Delhi%20police.png" },
  { name: "Pee Safe", file: "pee-safe.png" },
  { name: "Sirona", file: "Sirona.png" },
  { name: "SOS Children's Village", file: "SOS%20Children_s%20Village.png" },
  { name: "IIT Kanpur", file: "IIT%20Kanpur%20Logo_.png" },
  { name: "mid-day", file: "mid-day%20logo.png" },
  { name: "Rajdhani College", file: "Rajdhani%20college.png" },
  { name: "Dream a Dozen", file: "Dream%20a%20dozen_.png" },
];
const ROW_2 = [
  { name: "Sudha Rani Foundation", file: "Sudha%20Rani%20foundation_.jpg" },
  { name: "GAIMS", file: "gaims-logo.jpeg" },
  { name: "SK Children Foundation", file: "SK%20Children%20foundation_.jpg" },
  { name: "Brand Honchos", file: "brandhonchos.png" },
  { name: "ICSR", file: "icsr.png" },
  { name: "ISIA", file: "isia.png" },
  { name: "Trustsignal", file: "trustsignal.png" },
];

function LogoPill({ name, file }) {
  return (
    <div className="mx-4 shrink-0 h-24 w-[220px] rounded-[24px] bg-white border border-black/[0.04] flex items-center justify-center px-6 grayscale hover:grayscale-0 transition-all duration-500 hover:shadow-soft">
      <img
        src={BASE + file}
        alt={name}
        loading="lazy"
        className="max-h-14 max-w-full object-contain"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.parentElement.innerHTML = `<span class="text-[13px] font-bold text-titli-action tracking-tight text-center">${name}</span>`;
        }}
      />
    </div>
  );
}

export function Partners() {
  return (
    <section id="partners" data-testid={SCHOOLS.section} className="relative py-24 md:py-32 bg-[#FFFBF7] overflow-hidden">
      <div className="titli-container mb-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <EyebrowLabel>Trusted partners · Titli Foundation</EyebrowLabel>
            <h2 className="mt-6 font-sans font-extrabold text-[42px] md:text-[60px] leading-[1.02] tracking-tight balance max-w-[720px] text-[#111]">
              Alongside the names <br/>your school already knows.
            </h2>
          </div>
          <p className="hidden md:block max-w-[280px] text-[13px] text-black/50 leading-[1.6] font-body">
            Real partnerships — from Delhi Police to IIT Kanpur, Sirona to
            SOS Children&apos;s Village — driving the cause since 2020.
          </p>
        </div>
      </div>

      <div className="marquee-mask">
        <Marquee gradient={false} speed={30} pauseOnHover>
          {[...ROW_1, ...ROW_1].map((p, i) => (
            <LogoPill key={`r1-${i}`} name={p.name} file={p.file}/>
          ))}
        </Marquee>
      </div>
      <div className="marquee-mask mt-6">
        <Marquee gradient={false} speed={30} direction="right" pauseOnHover>
          {[...ROW_2, ...ROW_2].map((p, i) => (
            <LogoPill key={`r2-${i}`} name={p.name} file={p.file}/>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
