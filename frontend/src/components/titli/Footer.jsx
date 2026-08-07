import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FOOTER } from "@/constants/testIds";
import { CupGlyph } from "./ScriptAccent";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const COLS = [
  {
    title: "The Foundation",
    links: ["Our story", "Team", "Trustees", "Financials", "Annual reports"],
  },
  {
    title: "The Work",
    links: ["Programmes", "Schools", "Field stories", "Research", "Press"],
  },
  {
    title: "Get involved",
    links: ["Donate", "Volunteer", "Partnerships", "Corporate CSR", "Alumni"],
  },
];

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "X · Twitter", href: "#" },
  { label: "YouTube", href: "#" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | success | error
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr("Enter a valid email");
      setState("error");
      return;
    }
    try {
      setState("loading");
      await axios.post(`${API}/newsletter/subscribe`, {
        email,
        source: "footer",
      });
      setState("success");
      setEmail("");
    } catch (e2) {
      setErr("Try again in a moment");
      setState("error");
    }
  };

  return (
    <footer
      data-testid={FOOTER.container}
      className="relative bg-black text-white pt-24 md:pt-32 pb-10 overflow-hidden"
    >
      <div
        className="absolute -top-40 right-0 w-[560px] h-[560px] rounded-full bg-[#EC5A99]/15 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="titli-container relative z-10">
        {/* Top — huge editorial line + newsletter */}
        <div className="grid grid-cols-12 gap-8 md:gap-16 pb-16 border-b border-white/10">
          <div className="col-span-12 md:col-span-7">
            <div className="text-[11px] uppercase tracking-[0.28em] text-white/50 mb-6">
              Stay in the circle
            </div>
            <h3 className="font-editorial text-[36px] md:text-[56px] leading-[0.98] tracking-tight balance">
              A quiet letter,
              <br />
              once a month.
              <span className="text-[#FFC5DE]">.</span>
            </h3>
          </div>
          <div className="col-span-12 md:col-span-5 flex flex-col justify-center">
            <p className="text-white/60 text-[15px] leading-[1.6] mb-6 max-w-[420px]">
              One story from the field, one number to watch, one invitation.
              Never sold. Never shared.
            </p>
            <form onSubmit={submit} className="relative flex items-center">
              <input
                data-testid={FOOTER.newsletterInput}
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === "error") setState("idle");
                }}
                aria-label="Email address"
                className="w-full bg-transparent border-b border-white/25 focus:border-[#EC5A99] outline-none py-4 pr-14 text-[16px] placeholder-white/30 text-white transition-colors"
              />
              <AnimatePresence mode="wait">
                {state === "success" ? (
                  <motion.button
                    key="ok"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    type="button"
                    className="absolute right-0 w-11 h-11 rounded-full bg-[#EC5A99] flex items-center justify-center text-white"
                  >
                    ✓
                  </motion.button>
                ) : (
                  <motion.button
                    key="arrow"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    data-testid={FOOTER.newsletterSubmit}
                    disabled={state === "loading"}
                    className="absolute right-0 w-11 h-11 rounded-full bg-white/10 border border-white/25 flex items-center justify-center hover:bg-[#EC5A99] hover:border-[#EC5A99] transition-all duration-300 disabled:opacity-60"
                    type="submit"
                    aria-label="Subscribe"
                  >
                    {state === "loading" ? (
                      <span className="w-4 h-4 rounded-full border-2 border-white/70 border-t-transparent animate-spin" />
                    ) : (
                      "→"
                    )}
                  </motion.button>
                )}
              </AnimatePresence>
            </form>
            <div className="min-h-[24px] mt-3 text-[12px]">
              {state === "success" && (
                <span className="text-[#FFC5DE]">
                  Welcome. Check your inbox for a hello.
                </span>
              )}
              {state === "error" && <span className="text-white/60">{err}</span>}
            </div>
          </div>
        </div>

        {/* Middle — link columns */}
        <div className="grid grid-cols-12 gap-8 py-16 border-b border-white/10">
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-3">
              <CupGlyph size={30} />
              <span className="font-editorial text-[26px] tracking-tight">
                Titli<span className="text-[#EC5A99]">.</span>
              </span>
            </div>
            <p className="mt-5 text-white/60 text-[15px] leading-[1.7] max-w-[320px]">
              A quiet foundation — restoring classrooms across India since 2013.
            </p>
            <div className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-white/50">
              <span className="w-2 h-2 rounded-full bg-[#EC5A99]" />
              80G · 12A · FCRA
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title} className="col-span-6 md:col-span-2">
              <div className="text-[11px] uppercase tracking-[0.24em] text-white/45 mb-5">
                {col.title}
              </div>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[14px] text-white/80 hover:text-white transition-colors relative inline-block group"
                    >
                      {l}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#EC5A99] group-hover:w-full transition-all duration-500 ease-titli" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-12 md:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.24em] text-white/45 mb-5">
              Social
            </div>
            <ul className="space-y-3">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="text-[14px] text-white/80 hover:text-[#EC5A99] transition-colors"
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom — giant wordmark + copyright */}
        <div className="pt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="text-[11px] uppercase tracking-[0.28em] text-white/40">
            © 2013–{new Date().getFullYear()} · The Titli Foundation
            <br className="md:hidden" />
            <span className="hidden md:inline"> · </span>
            Registered under Section 8, Companies Act
          </div>
          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.24em] text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Field ledger</a>
          </div>
        </div>

        {/* huge wordmark */}
        <div className="mt-14 relative overflow-hidden">
          <div
            aria-hidden
            className="font-editorial leading-[0.85] tracking-tighter text-white/[0.05] select-none"
            style={{ fontSize: "clamp(80px, 20vw, 320px)" }}
          >
            titli.
          </div>
        </div>
      </div>
    </footer>
  );
}
