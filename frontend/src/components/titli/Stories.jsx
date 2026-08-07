import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { STORIES } from "@/constants/testIds";
import { EyebrowLabel } from "./TitliButton";

const STORIES_DATA = [
  {
    img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
    chapter: "Story · 001",
    location: "Munger, Bihar",
    title: "The library that grew out of a broom cupboard.",
    excerpt:
      "When we found Shanti Kanya Vidyalaya, they didn't have a library — they had a broom cupboard with a promise. Eleven months later, 340 books, 60 chairs, and a girl named Ritu who has now read them all.",
  },
  {
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    chapter: "Story · 002",
    location: "Dausa, Rajasthan",
    title: "How Meera's science kit built a chemist.",
    excerpt:
      "Meera Kumari was going to drop out in Class 8. Then she got hold of a Titli science kit — 24 experiments, a workbook, and a teacher who now had the training to use them. She is now studying chemistry at Delhi University.",
  },
  {
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    chapter: "Story · 003",
    location: "Alwar, Rajasthan",
    title: "A teacher, retrained. A school, transformed.",
    excerpt:
      "Mr. Ravi Shankar had been teaching Class 5 for 19 years. Our four-day cohort didn't teach him to teach — it gave him permission to try what he had always wanted to. His classroom scores are now the best in the district.",
  },
  {
    img: "https://images.unsplash.com/photo-1541199249251-f713e6145474?auto=format&fit=crop&w=1200&q=80",
    chapter: "Story · 004",
    location: "Nadia, West Bengal",
    title: "Forty-three girls. One learning centre. Zero dropouts.",
    excerpt:
      "The Nadia learning centre started in 2019 with forty-three girls, aged 10 to 14, all one bad monsoon from dropping out. Five years later, all forty-three are still in school. Two are in engineering college.",
  },
  {
    img: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
    chapter: "Story · 005",
    location: "Osmanabad, Maharashtra",
    title: "The school that decided books were a right.",
    excerpt:
      "The panchayat head in Kalamb didn't have a big budget. What she had was conviction. In eight months, with our books and her volunteers, she built a village reading circle that now runs every Saturday.",
  },
];

export function Stories() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const p = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setProgress(p);
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
    <section
      id="stories"
      data-testid={STORIES.section}
      className="relative py-32 md:py-40 bg-[#FFFBF7] overflow-hidden"
    >
      <div className="titli-container">
        <div className="flex items-end justify-between gap-8 mb-14">
          <div>
            <EyebrowLabel>Stories of impact — verified</EyebrowLabel>
            <h2 className="mt-6 font-editorial text-[44px] md:text-[68px] leading-[0.95] tracking-tight balance max-w-[720px]">
              Five children.
              <br />
              <span className="italic text-[#EC5A99]">Five different endings.</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button
              data-testid={STORIES.prev}
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              className="w-12 h-12 rounded-full border border-black/15 flex items-center justify-center transition-all hover:border-[#EC5A99] hover:text-[#EC5A99] disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Previous story"
            >
              ←
            </button>
            <button
              data-testid={STORIES.next}
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              className="w-12 h-12 rounded-full border border-black/15 flex items-center justify-center transition-all hover:border-[#EC5A99] hover:text-[#EC5A99] disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Next story"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="pl-6 md:pl-12 xl:pl-[calc((100vw-1440px)/2+96px)]" ref={emblaRef}>
        <div className="embla__container gap-6 md:gap-8">
          {STORIES_DATA.map((s, i) => (
            <motion.article
              key={i}
              data-testid={STORIES.slide(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="embla__slide relative shrink-0 w-[85vw] md:w-[62vw] lg:w-[46vw] xl:w-[560px] aspect-[3/4] rounded-[40px] overflow-hidden shadow-lift group cursor-titli"
            >
              <img
                src={s.img}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-titli group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10" />
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white">
                <div className="text-[11px] uppercase tracking-[0.28em] opacity-80">
                  {s.chapter}
                </div>
                <div className="text-[11px] uppercase tracking-[0.28em] opacity-80">
                  {s.location}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 text-white">
                <h3 className="font-editorial text-[26px] md:text-[34px] leading-[1.15] tracking-tight balance">
                  {s.title}
                </h3>
                <p className="mt-4 text-[14px] md:text-[15px] text-white/80 leading-[1.6] max-w-[440px]">
                  {s.excerpt}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-[#FFC5DE] group-hover:text-white transition-colors">
                  Read the full story
                  <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </motion.article>
          ))}
          <div className="shrink-0 w-12 md:w-24" />
        </div>
      </div>

      <div className="titli-container mt-10">
        <div className="h-[2px] w-full bg-black/10 rounded-full overflow-hidden max-w-[280px]">
          <motion.div
            className="h-full bg-[#EC5A99]"
            style={{ width: `${progress * 100}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      </div>
    </section>
  );
}
