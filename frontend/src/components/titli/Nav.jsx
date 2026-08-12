import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NAV } from "@/constants/testIds";

const LINKS = [
  { id: "how", label: "How it Works", href: "#how" },
  { id: "schools", label: "For Schools", href: "#schools" },
  { id: "students", label: "For Students", href: "#students" },
  { id: "impact", label: "Impact", href: "#impact" },
];

export function Nav({ onRegisterSchool }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      data-testid={NAV.container}
      initial={{ x: "-50%", y: -8, opacity: 0 }}
      animate={{ x: "-50%", y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="fixed z-50 left-1/2 flex items-center justify-between overflow-visible"
      style={{
        transitionProperty: "top, width, height, border-radius, background-color, box-shadow, backdrop-filter, padding-left, padding-right",
        transitionDuration: "600ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        top: scrolled ? "16px" : "0px",
        width: scrolled ? "min(1120px, calc(100vw - 32px))" : "100vw",
        height: "70px",
        borderRadius: scrolled ? "100px" : "0px",
        backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,1)",
        boxShadow: scrolled ? "0 10px 30px rgba(236,90,153,0.10)" : "0 2px 6px rgba(0,0,0,0.04)",
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        paddingLeft: scrolled ? "32px" : "clamp(24px, 5vw, 64px)",
        paddingRight: scrolled ? "16px" : "clamp(24px, 5vw, 64px)",
      }}
    >
      <a
        href="#top"
        data-testid="nav-brand"
        className="flex items-center gap-3 focus:outline-none shrink-0 transition-opacity hover:opacity-85"
      >
        <img
          src="/titli-logo.png"
          alt="Titli Foundation"
          className="transition-all duration-500 ease-titli"
          style={{ width: scrolled ? "132px" : "160px", height: "auto" }}
          draggable={false}
        />
      </a>

      <div className="hidden md:flex items-center gap-1 lg:gap-2">
        {LINKS.map((l) => (
          <a
            key={l.id}
            href={l.href}
            data-testid={NAV.link(l.id)}
            className="px-3 lg:px-4 py-2 text-[14px] font-medium text-[#EC5A99] hover:opacity-70 transition-opacity duration-200 whitespace-nowrap"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {l.label}
          </a>
        ))}
        <a
          href="/login"
          data-testid="nav-signin"
          className="inline-flex items-center gap-1.5 px-3 lg:px-4 py-2 text-[13px] font-medium text-black/55 hover:text-[#EC5A99] transition-colors duration-200 whitespace-nowrap group"
        >
          <svg width="14" height="14" viewBox="0 0 48 48" fill="none" aria-hidden className="transition-transform duration-500 ease-titli group-hover:scale-110 group-hover:rotate-6">
            <path d="M24 24 C 16 12, 6 10, 4 20 C 2 28, 12 32, 24 24 Z" fill="currentColor" opacity="0.7"/>
            <path d="M24 24 C 32 12, 42 10, 44 20 C 46 28, 36 32, 24 24 Z" fill="currentColor" opacity="0.7"/>
            <path d="M24 24 C 18 30, 10 34, 10 40 C 10 44, 20 42, 24 26 Z" fill="currentColor" opacity="0.55"/>
            <path d="M24 24 C 30 30, 38 34, 38 40 C 38 44, 28 42, 24 26 Z" fill="currentColor" opacity="0.55"/>
            <ellipse cx="24" cy="24" rx="1.2" ry="9" fill="currentColor"/>
          </svg>
          Sign in
        </a>
        <button
          onClick={onRegisterSchool}
          data-testid={NAV.donate}
          className="ml-2 lg:ml-3 px-5 lg:px-6 py-2.5 text-[14px] font-semibold text-white bg-[#EC5A99] rounded-[12px] shadow-sm hover:bg-[#D84C8A] active:opacity-80 transition-all duration-200 whitespace-nowrap"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          Register School
        </button>
      </div>

      <div className="flex md:hidden items-center">
        <button
          onClick={onRegisterSchool}
          data-testid={`${NAV.donate}-mobile`}
          className="px-4 py-2 text-[13px] font-semibold text-white bg-[#EC5A99] rounded-[10px]"
        >
          Register
        </button>
      </div>
    </motion.header>
  );
}
