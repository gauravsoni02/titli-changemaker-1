import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TitliButton } from "./TitliButton";
import { TitliButterfly } from "./ScriptAccent";
import { NAV } from "@/constants/testIds";

const LINKS = [
  { id: "how", label: "How it Works", href: "#how" },
  { id: "schools", label: "For Schools", href: "#schools" },
  { id: "students", label: "For Students", href: "#students" },
  { id: "impact", label: "Impact", href: "#impact" },
  { id: "blogs", label: "About Titli", href: "#taboo" },
];

export function Nav({ onRegisterSchool }) {
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
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div
        className={`flex items-center gap-2 md:gap-4 rounded-full px-4 md:px-6 py-2 md:py-2.5 transition-all duration-500 ease-titli ${
          scrolled ? "bg-white/95 backdrop-blur-xl shadow-pill" : "bg-white/85 backdrop-blur-lg shadow-soft"
        } border border-black/[0.04]`}
      >
        <a href="#top" data-testid="nav-brand" className="flex items-center gap-2 pr-2 md:pr-4 group">
          <TitliButterfly size={26} className="transition-transform duration-500 group-hover:scale-110" />
          <span className="font-sans font-extrabold text-[15px] tracking-[0.18em] text-[#EC5A99] uppercase hidden sm:inline">
            Titli Foundation
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={l.href}
              data-testid={NAV.link(l.id)}
              className="relative px-3.5 py-2 rounded-full text-[13px] font-medium text-black/70 hover:text-[#EC5A99] transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <TitliButton
          size="sm"
          onClick={onRegisterSchool}
          data-testid={NAV.donate}
          className="!px-5 !py-2.5"
        >
          Register School
        </TitliButton>
        <a
          href="/login"
          data-testid="nav-signin"
          className="hidden md:inline-flex items-center text-[12px] text-black/55 hover:text-[#EC5A99] transition-colors font-medium pr-1"
        >
          Sign in
        </a>
      </div>
    </motion.header>
  );
}
