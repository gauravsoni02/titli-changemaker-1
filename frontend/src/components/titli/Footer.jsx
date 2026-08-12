import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FOOTER } from "@/constants/testIds";
import { TitliButterfly } from "./ScriptAccent";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const COLS = [
  { title: "Program", links: ["How it Works", "For Schools", "For Students", "Impact"] },
  { title: "Titli Foundation", links: ["About Us", "Careers", "Gallery", "Blogs"] },
  { title: "Legal", links: ["Privacy Policy", "Terms & Conditions", "80G Certificate", "Refund Policy"] },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/titlifoundation" },
  { label: "LinkedIn", href: "#" },
  { label: "X / Twitter", href: "#" },
  { label: "YouTube", href: "#" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr("Enter a valid email");
      setState("error");
      return;
    }
    try {
      setState("loading");
      await axios.post(`${API}/newsletter/subscribe`, { email, source: "footer" });
      setState("success");
      setEmail("");
    } catch {
      setErr("Try again in a moment");
      setState("error");
    }
  };

  return (
    <footer data-testid={FOOTER.container} className="relative bg-[#EC5A99] text-white overflow-hidden">
      {/* Newsletter band on cream (matches real site's rhythm) */}
      <div className="bg-[#FEF1F8] text-[#111] py-20 md:py-28">
        <div className="titli-container">
          <div className="grid grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="col-span-12 md:col-span-6">
              <div className="text-[11px] uppercase tracking-[0.28em] text-[#EC5A99] font-bold mb-4">Stay in the circle</div>
              <h3 className="font-sans font-extrabold text-[34px] md:text-[52px] leading-[1] tracking-tight balance">
                A quiet letter. Once a month. <span className="text-[#EC5A99]">Never sold.</span>
              </h3>
            </div>
            <div className="col-span-12 md:col-span-6">
              <p className="text-[#4A4A4A] text-[15px] leading-[1.6] mb-6 max-w-[440px] font-body">
                One story from the field, one photo, one invitation.
              </p>
              <form onSubmit={submit} className="relative flex items-center">
                <input
                  data-testid={FOOTER.newsletterInput}
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
                  aria-label="Email address"
                  className="w-full bg-white border border-[#EC5A99]/20 focus:border-[#EC5A99] outline-none py-4 pl-6 pr-14 text-[16px] placeholder-black/30 text-[#111] rounded-full transition-colors"
                />
                <AnimatePresence mode="wait">
                  {state === "success" ? (
                    <motion.button
                      key="ok"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      type="button"
                      className="absolute right-2 w-11 h-11 rounded-full bg-[#EC5A99] flex items-center justify-center text-white shadow-pill"
                    >✓</motion.button>
                  ) : (
                    <motion.button
                      key="arrow"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      data-testid={FOOTER.newsletterSubmit}
                      disabled={state === "loading"}
                      className="absolute right-2 w-11 h-11 rounded-full bg-[#EC5A99] hover:bg-[#D84C8A] flex items-center justify-center text-white shadow-pill transition-all"
                      type="submit"
                      aria-label="Subscribe"
                    >
                      {state === "loading" ? (
                        <span className="w-4 h-4 rounded-full border-2 border-white/70 border-t-transparent animate-spin"/>
                      ) : "→"}
                    </motion.button>
                  )}
                </AnimatePresence>
              </form>
              <div className="min-h-[24px] mt-3 text-[13px]">
                {state === "success" && <span className="text-[#EC5A99] font-semibold">Welcome. A hello is on its way.</span>}
                {state === "error" && <span className="text-[#4A4A4A]">{err}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solid pink body — signature footer look from titlifoundation.in */}
      <div className="relative pt-20 pb-10">
        <div className="absolute top-0 right-0 opacity-15 pointer-events-none">
          <TitliButterfly size={320}/>
        </div>
        <div className="titli-container relative z-10">
          <div className="grid grid-cols-12 gap-8 md:gap-12 pb-16 border-b border-white/20">
            <div className="col-span-12 md:col-span-4">
              <div className="mb-6">
                <img
                  src="/titli-logo.png"
                  alt="Titli Foundation"
                  className="brightness-0 invert"
                  style={{ width: "180px", height: "auto" }}
                  draggable={false}
                />
              </div>
              <p className="text-white/85 text-[15px] leading-[1.7] max-w-[320px] font-body">
                We stand against period poverty across India — with compassion,
                dignity, and #BreakTheTaboo.
              </p>
              <div className="mt-6 space-y-2 text-[13px] text-white/85">
                <div>contact@titlifoundation.in</div>
                <div>+91 86049 42501</div>
                <div className="text-white/70 leading-[1.6] max-w-[280px] mt-2">
                  Pandey Krishi Kendra, Nirala Nagar, Khojanpur,
                  <br/>Faizabad, Uttar Pradesh — 224001
                </div>
              </div>
            </div>

            {COLS.map((col) => (
              <div key={col.title} className="col-span-6 md:col-span-2">
                <div className="text-[11px] uppercase tracking-[0.24em] text-white/70 font-bold mb-5">{col.title}</div>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-[14px] text-white/95 hover:text-white transition-colors relative inline-block group">
                        {l}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white group-hover:w-full transition-all duration-500"/>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="col-span-12 md:col-span-2">
              <div className="text-[11px] uppercase tracking-[0.24em] text-white/70 font-bold mb-5">Social</div>
              <ul className="space-y-3">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer noopener" className="text-[14px] text-white/95 hover:text-white transition-colors">
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="text-[12px] tracking-wider text-white/80">
              © {new Date().getFullYear()} Titli Foundation. All Rights Reserved. · Registered 80G · 12A
            </div>
            <div className="text-[12px] tracking-wider text-white/80">
              Built with care · #BreakTheTaboo
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
