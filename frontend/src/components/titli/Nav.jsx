import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV } from "@/constants/testIds";

const LINKS = [
  { id: "how", label: "How it Works", href: "#how" },
  { id: "schools", label: "For Schools", href: "#schools" },
  { id: "students", label: "For Students", href: "#students" },
  { id: "impact", label: "Impact", href: "#impact" },
];

export function Nav({ onRegisterSchool }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
        borderRadius: scrolled ? (mobileOpen ? "24px" : "100px") : "0px",
        backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,1)",
        boxShadow: scrolled ? "0 10px 30px rgba(236,90,153,0.10)" : "0 2px 6px rgba(0,0,0,0.04)",
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        paddingLeft: scrolled ? "24px" : "clamp(20px, 5vw, 64px)",
        paddingRight: scrolled ? "16px" : "clamp(20px, 5vw, 64px)",
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
          style={{ width: scrolled ? "124px" : "150px", height: "auto" }}
          draggable={false}
        />
      </a>

      {/* Desktop Menu Links */}
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
          <img
            src="/titli-butterfly.png"
            alt=""
            aria-hidden
            draggable={false}
            className="w-4 h-4 transition-transform duration-500 ease-titli group-hover:scale-110 group-hover:rotate-6"
          />
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

      {/* Mobile Actions: Register CTA + 3-Dot Menu Button */}
      <div className="flex md:hidden items-center gap-2">
        <button
          onClick={onRegisterSchool}
          data-testid={`${NAV.donate}-mobile`}
          className="px-3.5 py-1.5 text-[13px] font-semibold text-white bg-[#EC5A99] rounded-[10px] shadow-sm active:scale-95 transition-transform"
        >
          Register
        </button>

        {/* 3-Dot Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          className="p-2 rounded-full text-[#EC5A99] hover:bg-[#FFEDF4] active:bg-[#FFD6E6] focus:outline-none transition-colors"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="2.2" />
            <circle cx="12" cy="12" r="2.2" />
            <circle cx="12" cy="19" r="2.2" />
          </svg>
        </button>
      </div>

      {/* Mobile Animated Dropdown Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-3 top-[calc(100%+8px)] w-[240px] bg-white border border-[#FFC5DE] shadow-xl rounded-2xl p-3 flex flex-col gap-1.5 z-50 text-left"
          >
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                data-testid={NAV.link(l.id)}
                className="px-3 py-2 text-[14px] font-semibold text-[#2D2D2D] hover:text-[#EC5A99] hover:bg-[#FFF2F7] rounded-xl transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="h-px bg-black/5 my-1" />
            <a
              href="/login"
              data-testid="nav-signin"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 text-[14px] font-medium text-black/70 hover:text-[#EC5A99] hover:bg-[#FFF2F7] rounded-xl transition-colors flex items-center gap-2"
            >
              <img src="/titli-butterfly.png" alt="" className="w-4 h-4" />
              Sign in
            </a>
            <button
              onClick={() => {
                setMobileOpen(false);
                onRegisterSchool();
              }}
              className="w-full mt-1 px-4 py-2 text-[13px] font-semibold text-white bg-[#EC5A99] rounded-xl shadow-sm hover:bg-[#D84C8A]"
            >
              Register School
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
