import React, { useCallback, useEffect, useState } from "react";
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

export function WhereItGoes() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start", dragFree: true, containScroll: "trimSnaps" });
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    setProgress(Math.max(0, Math.min(1, emblaApi.scrollProgress())));
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi.on("scroll", onScroll);
    emblaApi.on("reInit", onScroll);
  }, [emblaApi, onScroll]);

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
              disabled={!canPrev}
              className="w-12 h-12 rounded-full border border-[#EC5A99]/30 bg-white flex items-center justify-center transition-all hover:border-[#EC5A99] hover:text-[#EC5A99] disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Previous location"
            >←</button>
            <button
              data-testid={STORIES.next}
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              className="w-12 h-12 rounded-full border border-[#EC5A99]/30 bg-white flex items-center justify-center transition-all hover:border-[#EC5A99] hover:text-[#EC5A99] disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Next location"
            >→</button>
          </div>
        </div>
      </div>

      <div className="pl-6 md:pl-12 xl:pl-[calc((100vw-1440px)/2+96px)]" ref={emblaRef}>
        <div className="embla__container gap-6 md:gap-8">
          {LOCATIONS.map((s, i) => (
            <motion.article
              key={i}
              data-testid={STORIES.slide(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="embla__slide relative shrink-0 w-[85vw] md:w-[58vw] lg:w-[520px] aspect-[3/4] rounded-[32px] overflow-hidden shadow-lift group"
            >
              <img src={s.img} alt={s.location} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10"/>
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
          <div className="shrink-0 w-12 md:w-24" />
        </div>
      </div>

      <div className="titli-container mt-10">
        <div className="h-[2px] w-full bg-black/10 rounded-full overflow-hidden max-w-[280px]">
          <motion.div className="h-full bg-[#EC5A99]" style={{ width: `${progress * 100}%` }}/>
        </div>
      </div>
    </section>
  );
}
