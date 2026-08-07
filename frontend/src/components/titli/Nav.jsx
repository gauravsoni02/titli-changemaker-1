import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CupGlyph } from "./ScriptAccent";
import { TitliButton } from "./TitliButton";
import { NAV } from "@/constants/testIds";

const LINKS = [
  { id: "mission", label: "Mission", href: "#hero" },
  { id: "how", label: "How it Works", href: "#how" },
  { id: "stories", label: "Stories", href: "#stories" },
  { id: "schools", label: "Schools", href: "#schools" },
];

export function Nav({ onDonate }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      data-testid={NAV.container}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className={`transition-all duration-[320ms] ease-titli ${
          scrolled
            ? "bg-[#FFFBF7]/85 backdrop-blur-xl border-b border-black/[0.06]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="titli-container flex items-center justify-between h-[76px]">
          <a
            href="#top"
            className="flex items-center gap-3 group"
            data-testid="nav-brand"
          >
            <div className="transition-transform duration-500 ease-titli group-hover:rotate-12">
              <CupGlyph size={28} />
            </div>
            <span className="font-editorial text-[22px] tracking-tight leading-none">
              Titli
              <span className="text-[#EC5A99]">.</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-9">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={l.href}
                data-testid={NAV.link(l.id)}
                className="relative text-[13px] text-black/70 hover:text-black transition-colors duration-200 group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#EC5A99] group-hover:w-full transition-all duration-500 ease-titli" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#stories"
              className="hidden md:inline-block text-[13px] text-black/70 hover:text-black transition-colors"
            >
              Impact ↗
            </a>
            <TitliButton
              size="sm"
              onClick={onDonate}
              data-testid={NAV.donate}
              className="!px-5"
            >
              Donate
            </TitliButton>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
