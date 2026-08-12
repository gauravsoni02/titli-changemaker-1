import React, { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { STORIES } from "@/constants/testIds";
import { EyebrowLabel } from "./TitliButton";

// Real Titli deployment locations (from titlifoundation.in)
const LOCATIONS = [
  {
    img: "https://www.titlifoundation.in/images/caro%202.png",
    location: "SOS Village, Bangalore",
    tag: "Location 001",
    body: "40 girls trained on menstrual health. 120 cups distributed. Follow-up workshop scheduled.",
  },
  {
    img: "https://www.titlifoundation.in/images/caro%201.png",
    location: "Pondicherry, Puducherry",
    tag: "Location 002",
    body: "Coastal community outreach. Sanitary pad distribution + dignity workshops with local women.",
  },
  {
    img: "https://www.titlifoundation.in/images/caro%204.png",
    location: "Kanpur, Uttar Pradesh",
    tag: "Location 003",
    body: "In partnership with IIT Kanpur — awareness sessions at government schools across the district.",
  },
];

const PARALLAX_AMOUNT = 0.28;
const TWEEN_FACTOR = 1.2;

export function WhereItGoes() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    dragFree: false,
    containScroll: false,
  });
  const tweenNodesRef = useRef([]);
  const tweenFactorRef = useRef(0);

  const setTweenNodes = useCallback((api) => {
    tweenNodesRef.current = api.slideNodes().map((slideNode) => {
      return slideNode.querySelector("[data-parallax-img]");
    });
  }, []);

  const setTweenFactor = useCallback((api) => {
    tweenFactorRef.current = TWEEN_FACTOR * api.scrollSnapList().length;
  }, []);

  const tweenParallax = useCallback((api, eventName) => {
    const engine = api.internalEngine();
    const scrollProgress = api.scrollProgress();
    const slidesInView = api.slidesInView();
    const isScrollEvent = eventName === "scroll";

    api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);
              if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
              if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
            }
          });
        }

        const translate = diffToTarget * (-1 * PARALLAX_AMOUNT) * tweenFactorRef.current * 100;
        const tweenNode = tweenNodesRef.current[slideIndex];
        if (tweenNode) {
          tweenNode.style.transform = `translate3d(${translate}%, 0, 0)`;
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenParallax(emblaApi);
    emblaApi
      .on("reInit", (api) => { setTweenNodes(api); setTweenFactor(api); tweenParallax(api); })
      .on("scroll", (api, evt) => tweenParallax(api, evt))
      .on("slideFocus", tweenParallax);
  }, [emblaApi, setTweenNodes, setTweenFactor, tweenParallax]);

  // Slides — duplicated so the loop feels populated (3 → 6)
  const slides = [...LOCATIONS, ...LOCATIONS];

  return (
    <section id="where" data-testid={STORIES.section} className="relative py-32 md:py-40 bg-[#FEF1F8] overflow-hidden">
      <div className="titli-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div>
            <EyebrowLabel>Where your donation goes</EyebrowLabel>
            <h2 className="mt-6 font-sans font-extrabold text-[42px] md:text-[64px] leading-[1.02] tracking-tight balance max-w-[760px] text-[#111]">
              Actual towns. Actual girls. Actual receipts.
            </h2>
            <p className="mt-6 text-[16px] md:text-[18px] text-[#4A4A4A] leading-[1.65] max-w-[560px] font-body">
              Every fundraiser is routed to one of Titli&apos;s live deployment
              locations. You&apos;ll know exactly where your school&apos;s money
              landed.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button
              data-testid={STORIES.prev}
              onClick={() => emblaApi?.scrollPrev()}
              className="w-12 h-12 rounded-full border border-[#EC5A99]/30 bg-white flex items-center justify-center transition-all hover:border-[#EC5A99] hover:text-[#EC5A99] hover:scale-105"
              aria-label="Previous location"
            >←</button>
            <button
              data-testid={STORIES.next}
              onClick={() => emblaApi?.scrollNext()}
              className="w-12 h-12 rounded-full border border-[#EC5A99]/30 bg-white flex items-center justify-center transition-all hover:border-[#EC5A99] hover:text-[#EC5A99] hover:scale-105"
              aria-label="Next location"
            >→</button>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="embla__container touch-pan-y">
            {slides.map((s, i) => (
              <motion.article
                key={i}
                data-testid={STORIES.slide(i)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="embla__slide relative shrink-0 mx-3 md:mx-4 w-[85vw] md:w-[52vw] lg:w-[560px] aspect-[3/4] rounded-[32px] overflow-hidden shadow-lift group cursor-grab active:cursor-grabbing"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    data-parallax-img
                    src={s.img}
                    alt={s.location}
                    draggable={false}
                    className="absolute top-0 left-0 h-full w-[140%] max-w-none object-cover will-change-transform"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 pointer-events-none"/>
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white">
                  <div className="text-[11px] uppercase tracking-[0.24em] font-semibold opacity-90">{s.tag}</div>
                  <div className="rounded-full bg-white/95 px-3 py-1 text-[11px] uppercase tracking-widest text-[#EC5A99] font-bold">Live</div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 text-white">
                  <h3 className="font-sans font-extrabold text-[26px] md:text-[34px] leading-[1.05] tracking-tight balance">
                    {s.location}
                  </h3>
                  <p className="mt-3 text-[14px] md:text-[15px] text-white/85 leading-[1.6] max-w-[440px] font-body">
                    {s.body}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* subtle infinite hint */}
        <div className="mt-10 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.28em] text-black/45 font-semibold">
          <span>Drag or swipe</span>
          <span className="w-1 h-1 rounded-full bg-black/30"/>
          <span className="text-[#EC5A99]">Infinite loop</span>
          <span className="w-1 h-1 rounded-full bg-black/30"/>
          <span>{LOCATIONS.length} live locations</span>
        </div>
      </div>
    </section>
  );
}
