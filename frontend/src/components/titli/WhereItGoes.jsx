import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import { STORIES } from "@/constants/testIds";
import { EyebrowLabel } from "./TitliButton";

// Real Titli deployment locations (from titlifoundation.in)
const LOCATIONS = [
  {
    img: "https://www.titlifoundation.in/images/caro%202.png",
    location: "SOS Village, Bangalore",
    tag: "Location 001",
    body: "40 girls trained on menstrual health. 120 cups distributed. Follow-up workshop scheduled.",
    partner: "SOS Children's Village",
    signature: "Ms. Kavita R. · Field Coordinator",
    delivered: "November 2024",
    outcome: "40 girls trained · 120 menstrual cups distributed · 60 pad kits · 3 follow-up sessions scheduled through Q1 2025.",
  },
  {
    img: "https://www.titlifoundation.in/images/caro%201.png",
    location: "Pondicherry, Puducherry",
    tag: "Location 002",
    body: "Coastal community outreach. Sanitary pad distribution + dignity workshops with local women.",
    partner: "Pee Safe · Sirona",
    signature: "Ms. Malar S. · Community Lead",
    delivered: "October 2024",
    outcome: "180 pad kits distributed · 22 households reached · Ongoing menstrual dignity workshops in 4 fishing communities.",
  },
  {
    img: "https://www.titlifoundation.in/images/caro%204.png",
    location: "Kanpur, Uttar Pradesh",
    tag: "Location 003",
    body: "In partnership with IIT Kanpur — awareness sessions at government schools across the district.",
    partner: "IIT Kanpur · District Education",
    signature: "Mr. Rohit K. · School Programme Lead",
    delivered: "January 2025",
    outcome: "6 government schools reached · ~420 students in awareness sessions · Teacher training kits placed in 4 staff rooms.",
  },
];

// Real parallax: image is 200% wide with left:-50% (50% margin on each side).
// Translate clamped to ±50% so every image always covers its card frame.
// Per-slide delta ≈ 8.3% → visible drift; loop-wrap delta up to 50% → showcase moment.
const PARALLAX = 0.5;

export function WhereItGoes() {
  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnMouseEnter: true, stopOnInteraction: false })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", dragFree: false, containScroll: false, startIndex: LOCATIONS.length },
    [autoplay.current]
  );
  const tweenNodesRef = useRef([]);
  const [selected, setSelected] = useState(0);
  const [modalItem, setModalItem] = useState(null);
  const sectionRef = useRef(null);

  const setTweenNodes = useCallback((api) => {
    tweenNodesRef.current = api
      .slideNodes()
      .map((n) => n.querySelector("[data-parallax-img]"));
  }, []);

  const tweenParallax = useCallback((api, eventName) => {
    const engine = api.internalEngine();
    const scrollProgress = api.scrollProgress();
    const slidesInView = api.slidesInView();
    const isScrollEvent = eventName === "scroll";

    api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diff = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];
      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;
        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);
              if (sign === -1) diff = scrollSnap - (1 + scrollProgress);
              if (sign === 1) diff = scrollSnap + (1 - scrollProgress);
            }
          });
        }
        // clamp so image never leaves the card
        const clamped = Math.max(-1.2, Math.min(1.2, diff));
        const tx = clamped * -PARALLAX * 100;
        const node = tweenNodesRef.current[slideIndex];
        if (node) node.style.transform = `translate3d(${tx}%, 0, 0)`;
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setTweenNodes(emblaApi);
    tweenParallax(emblaApi);
    const onSelect = () => { setSelected(emblaApi.selectedScrollSnap()); tweenParallax(emblaApi); };
    emblaApi
      .on("reInit", (api) => { setTweenNodes(api); tweenParallax(api); onSelect(); })
      .on("scroll", (api) => tweenParallax(api))
      .on("settle", (api) => tweenParallax(api))
      .on("slideFocus", (api) => tweenParallax(api))
      .on("select", onSelect);
    onSelect();
  }, [emblaApi, setTweenNodes, tweenParallax]);

  // Keyboard arrows — only when the section is in the viewport
  useEffect(() => {
    if (!emblaApi || !sectionRef.current) return;
    let inView = false;
    const io = new IntersectionObserver(
      ([entry]) => { inView = entry.isIntersecting; },
      { threshold: 0.35 }
    );
    io.observe(sectionRef.current);

    const onKey = (e) => {
      if (!inView) return;
      const tag = (e.target && e.target.tagName) || "";
      if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;
      if (e.key === "ArrowRight") { e.preventDefault(); emblaApi.scrollNext(); autoplay.current?.reset(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); emblaApi.scrollPrev(); autoplay.current?.reset(); }
    };
    window.addEventListener("keydown", onKey);
    return () => { io.disconnect(); window.removeEventListener("keydown", onKey); };
  }, [emblaApi]);

  // Escape closes the modal
  useEffect(() => {
    if (!modalItem) return;
    const onKey = (e) => { if (e.key === "Escape") setModalItem(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalItem]);

  const pauseAutoplay = () => autoplay.current?.stop();
  const resumeAutoplay = () => autoplay.current?.play();

  // 6 slides = duplicated pool so infinite loop always feels full
  const slides = [...LOCATIONS, ...LOCATIONS];
  const activeIndex = selected % LOCATIONS.length;

  const scrollToRealIndex = (idx) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(idx);
    autoplay.current?.reset();
  };

  return (
    <section id="where" ref={sectionRef} data-testid={STORIES.section} className="relative py-32 md:py-40 bg-[#FEF1F8] overflow-hidden">
      <div className="titli-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div>
            <h2 className="mt-0 font-sans font-extrabold text-[42px] md:text-[64px] leading-[1.02] tracking-tight balance max-w-[760px] text-[#111]">
              Actual towns. Actual girls. Actual receipts.
            </h2>
            <p className="mt-6 text-[16px] md:text-[18px] text-[#4A4A4A] leading-[1.65] max-w-[560px] font-body">
              Every fundraiser is routed to one of Titli&apos;s live deployment
              locations. Click any card to see the field report.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button
              data-testid={STORIES.prev}
              onClick={() => { emblaApi?.scrollPrev(); autoplay.current?.reset(); }}
              className="w-12 h-12 rounded-full border border-[#EC5A99]/30 bg-white flex items-center justify-center transition-all hover:border-[#EC5A99] hover:text-[#EC5A99] hover:scale-105"
              aria-label="Previous location"
            >←</button>
            <button
              data-testid={STORIES.next}
              onClick={() => { emblaApi?.scrollNext(); autoplay.current?.reset(); }}
              className="w-12 h-12 rounded-full border border-[#EC5A99]/30 bg-white flex items-center justify-center transition-all hover:border-[#EC5A99] hover:text-[#EC5A99] hover:scale-105"
              aria-label="Next location"
            >→</button>
          </div>
        </div>
      </div>

      <div className="relative" onMouseEnter={pauseAutoplay} onMouseLeave={resumeAutoplay}>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="embla__container touch-pan-y">
            {slides.map((s, i) => {
              const realIdx = i % LOCATIONS.length;
              return (
                <article
                  key={i}
                  data-testid={STORIES.slide(i)}
                  role="button"
                  tabIndex={0}
                  onClick={() => setModalItem(s)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setModalItem(s); } }}
                  className="embla__slide relative shrink-0 mx-3 md:mx-4 w-[85vw] md:w-[52vw] lg:w-[520px] aspect-[3/4] rounded-[32px] overflow-hidden shadow-lift group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC5A99] focus-visible:ring-offset-4"
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      data-parallax-img
                      src={s.img}
                      alt={s.location}
                      draggable={false}
                      className="absolute top-0 h-full max-w-none object-cover will-change-transform"
                      style={{
                        left: "-50%",
                        width: "200%",
                        transform: "translate3d(0, 0, 0)",
                        backfaceVisibility: "hidden",
                      }}
                      loading="eager"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 pointer-events-none"/>
                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white">
                    <div className="text-[11px] uppercase tracking-[0.24em] font-semibold opacity-90">{s.tag}</div>
                   
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 text-white">
                    <h3 className="font-sans font-extrabold text-[26px] md:text-[32px] leading-[1.05] tracking-tight balance">
                      {s.location}
                    </h3>
                    <p className="mt-3 text-[13px] md:text-[14px] text-white/85 leading-[1.55] max-w-[440px] font-body">
                      {s.body}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold text-[#FFC5DE] group-hover:text-white transition-colors">
                      Read the field report
                      <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Progress dots — 3 dots for the 3 real locations */}
        <div className="mt-10 flex items-center justify-center gap-3" data-testid="carousel-dots">
          {LOCATIONS.map((_, i) => {
            const active = i === activeIndex;
            return (
              <button
                key={i}
                data-testid={`carousel-dot-${i}`}
                aria-label={`Go to location ${i + 1}`}
                onClick={() => scrollToRealIndex(i)}
                className="group relative py-2"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-500 ease-titli ${
                    active ? "w-10 bg-[#EC5A99]" : "w-4 bg-black/15 group-hover:bg-[#EC5A99]/50"
                  }`}
                />
              </button>
            );
          })}
        </div>

    
      </div>

      {/* Field report modal */}
      <AnimatePresence>
        {modalItem && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            data-testid="location-modal"
            role="dialog"
            aria-modal="true"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" onClick={() => setModalItem(null)}/>
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[880px] bg-[#FFFBF7] rounded-[32px] overflow-hidden shadow-hero border border-[#FFC5DE]/40 grid md:grid-cols-2 max-h-[92vh]"
            >
              <button
                data-testid="location-modal-close"
                onClick={() => setModalItem(null)}
                className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/95 hover:bg-white flex items-center justify-center text-black/70 shadow-soft transition-all"
                aria-label="Close"
              >×</button>
              <div className="relative aspect-[4/5] md:aspect-auto min-h-[300px]">
                <img src={modalItem.img} alt={modalItem.location} className="absolute inset-0 w-full h-full object-cover"/>
                <div className="absolute top-5 left-5 rounded-full bg-white/95 px-3 py-1 text-[11px] uppercase tracking-widest text-[#EC5A99] font-bold">
                  {modalItem.tag}
                </div>
              </div>
              <div className="p-8 md:p-10 overflow-y-auto">
                <div className="text-[11px] uppercase tracking-[0.28em] text-[#EC5A99] font-bold mb-3">Field Report · Verified</div>
                <h3 className="font-sans font-extrabold text-[28px] md:text-[36px] leading-[1.05] tracking-tight text-[#111]">
                  {modalItem.location}
                </h3>
                <p className="mt-4 text-[15px] text-[#4A4A4A] leading-[1.65] font-body">
                  {modalItem.outcome}
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4 text-[13px]">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-black/50 font-semibold">Partner</div>
                    <div className="mt-1 font-semibold text-[#111]">{modalItem.partner}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-black/50 font-semibold">Delivered</div>
                    <div className="mt-1 font-semibold text-[#111]">{modalItem.delivered}</div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-[#FFC5DE]/60">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-black/50 font-semibold mb-2">Signed by</div>
                  <div className="font-script text-[26px] text-[#EC5A99] leading-none" style={{ transform: "rotate(-2deg)" }}>
                    {modalItem.signature.split(" · ")[0]}
                  </div>
                  <div className="mt-1 text-[12px] text-black/55">
                    {modalItem.signature.split(" · ")[1] || ""}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
