"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValue,
  useMotionValueEvent,
  animate,
} from "framer-motion";
import { CHAPTERS } from "@/lib/chapters";
import { ChapterText } from "./ChapterText";
import { BreatherSection } from "./BreatherSection";
import { SideProgress } from "./SideProgress";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// One continuous pinned stage: chapters are segments of a single scroll range,
// so nothing ever scrolls between scenes — they crossfade in place.
const TOTAL_VH = CHAPTERS.reduce((s, c) => s + c.pinHeightVh, 0);
const BOUNDS = (() => {
  let acc = 0;
  return CHAPTERS.map((c) => {
    const start = acc / TOTAL_VH;
    acc += c.pinHeightVh;
    return { start, end: acc / TOTAL_VH };
  });
})();

interface Props {
  revealed: boolean;
  onLoadProgress: (pct: number) => void;
  onAllLoaded: () => void;
}

function StoryStage({
  revealed,
  onReady,
  onActive,
}: {
  revealed: boolean;
  onReady: (index: number) => void;
  onActive: (index: number) => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const seekBusy = useRef<boolean[]>(CHAPTERS.map(() => false));
  const pendingSeek = useRef<(number | null)[]>(CHAPTERS.map(() => null));
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  // Scroll-linked video scrubbing writes v.currentTime on every scroll frame,
  // which is decode-heavy and janks touch scrolling badly on phones/tablets.
  // Coarse-pointer devices skip the video entirely and just show the poster.
  // Read synchronously on first render (not in an effect) — this component
  // only ever renders client-side, and if the video briefly mounted before
  // flipping off, the preload-ready effect below would attach its
  // loadeddata/error listeners to a node that gets unmounted a tick later,
  // so onReady(i) would never fire and the loading bar would stick at 0.
  const [coarsePointer, setCoarsePointer] = useState(
    () => window.matchMedia("(pointer: coarse)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const handler = (e: MediaQueryListEvent) => setCoarsePointer(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Story opening: fade up from black once the preloader hands off — not
  // scroll-gated, so the page never strands the visitor on a black screen
  // if they load in and don't immediately scroll.
  const openingFade = useMotionValue(1);
  useEffect(() => {
    if (!revealed) return;
    const controls = animate(openingFade, 0, { duration: 1, ease: "easeOut" });
    return () => controls.stop();
  }, [revealed, openingFade]);

  const seek = (i: number, t: number) => {
    const v = videoRefs.current[i];
    if (!v) return;
    if (seekBusy.current[i]) {
      pendingSeek.current[i] = t;
      return;
    }
    seekBusy.current[i] = true;
    v.currentTime = t;
  };

  const handleSeeked = (i: number) => {
    seekBusy.current[i] = false;
    const next = pendingSeek.current[i];
    if (next !== null) {
      pendingSeek.current[i] = null;
      seekBusy.current[i] = true;
      const v = videoRefs.current[i];
      if (v) v.currentTime = next;
    }
  };

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    // Which chapter segment are we in?
    let i = BOUNDS.findIndex((b) => p >= b.start && p < b.end);
    if (i === -1) i = p >= 1 ? CHAPTERS.length - 1 : 0;

    if (i !== activeRef.current) {
      activeRef.current = i;
      setActive(i);
      onActive(i);
    }

    const ch = CHAPTERS[i];
    if (!ch.videoUrl) return;
    const v = videoRefs.current[i];
    if (!v) return;
    const dur = v.duration;
    if (!dur || isNaN(dur)) return;

    const b = BOUNDS[i];
    const local = (p - b.start) / (b.end - b.start);

    // Snap to exact boundary frames at segment edges
    let t: number;
    if (local >= 0.99) t = dur - 0.04;
    else if (local <= 0.01) t = 0;
    else t = local * dur;

    const atEdge = local >= 0.99 || local <= 0.01;
    if (atEdge || Math.abs(v.currentTime - t) > 0.05) {
      seek(i, t);
    }
  });

  // Preloader progress: one tick per chapter as its video becomes scrubbable
  useEffect(() => {
    const cleanups: (() => void)[] = [];
    CHAPTERS.forEach((ch, i) => {
      if (!ch.videoUrl) {
        onReady(i);
        return;
      }
      const v = videoRefs.current[i];
      if (!v) {
        onReady(i);
        return;
      }
      if (v.readyState >= 2) {
        onReady(i);
        return;
      }
      const fire = () => onReady(i);
      v.addEventListener("loadeddata", fire, { once: true });
      v.addEventListener("error", fire, { once: true });
      cleanups.push(() => {
        v.removeEventListener("loadeddata", fire);
        v.removeEventListener("error", fire);
      });
    });
    return () => cleanups.forEach((c) => c());
  }, [onReady]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
      style={{ height: `${TOTAL_VH}vh` }}
    >
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: "100svh", contain: "paint" }}
      >
        {CHAPTERS.map((ch, i) => {
          const isActive = i === active;
          const isNear = Math.abs(i - active) <= 1;
          return (
            <motion.div
              key={ch.id}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ zIndex: isActive ? 2 : 1 }}
            >
              {/* Poster / static fallback */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${ch.staticImage})` }}
              />

              {ch.videoUrl && !coarsePointer && (
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  src={ch.videoUrl}
                  className="absolute inset-0 w-full h-full object-cover"
                  muted
                  playsInline
                  crossOrigin="anonymous"
                  preload={isNear ? "auto" : "metadata"}
                  onSeeked={() => handleSeeked(i)}
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />

              <ChapterText
                numeral={ch.numeral}
                headline={ch.headline}
                subline={ch.subline}
                active={isActive}
              />
            </motion.div>
          );
        })}

        {/* Opening dip from black */}
        <motion.div
          className="absolute inset-0 bg-[#050505] pointer-events-none"
          style={{ opacity: openingFade, zIndex: 3 }}
        />
      </div>
    </div>
  );
}

export function ScrollStory({ revealed, onLoadProgress, onAllLoaded }: Props) {
  const [activeChapter, setActiveChapter] = useState(0);
  const readySeen = useRef<Set<number>>(new Set());
  const allLoadedRef = useRef(false);
  const reducedMotion = useReducedMotion();
  const total = CHAPTERS.length;

  const handleReady = useCallback(
    (index: number) => {
      if (readySeen.current.has(index)) return;
      readySeen.current.add(index);
      const pct = Math.round((readySeen.current.size / total) * 100);
      onLoadProgress(pct);
      if (readySeen.current.size >= total && !allLoadedRef.current) {
        allLoadedRef.current = true;
        onAllLoaded();
      }
    },
    [total, onLoadProgress, onAllLoaded]
  );

  const handleActive = useCallback((index: number) => {
    setActiveChapter(index);
  }, []);

  // Reduced motion: plain static sections, no pinning or scrubbing
  useEffect(() => {
    if (reducedMotion) {
      onLoadProgress(100);
      onAllLoaded();
    }
  }, [reducedMotion, onLoadProgress, onAllLoaded]);

  if (reducedMotion) {
    return (
      <>
        {CHAPTERS.map((ch) => (
          <div key={ch.id} className="relative w-full" style={{ height: "100svh" }}>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${ch.staticImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
            <ChapterText
              numeral={ch.numeral}
              headline={ch.headline}
              subline={ch.subline}
              active
            />
          </div>
        ))}
        <BreatherSection
          stat={CHAPTERS[0].breather!.stat}
          label={CHAPTERS[0].breather!.label}
        />
      </>
    );
  }

  return (
    <>
      <SideProgress activeChapter={activeChapter} />

      <StoryStage revealed={revealed} onReady={handleReady} onActive={handleActive} />

      <BreatherSection
        stat={CHAPTERS[0].breather!.stat}
        label={CHAPTERS[0].breather!.label}
      />

      {/* Bridge to conversion section */}
      <div className="bg-[#050505] py-20 text-center px-6">
        <p className="text-[#f4f4f2]/40 text-xs tracking-[0.4em] uppercase mb-6 font-mono">
          The end of the story
        </p>
        <h2
          className="text-[#f4f4f2] mb-10"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: 400,
          }}
        >
          Your vision is waiting.
        </h2>
        <a
          href="#book"
          className="inline-block border border-[#ff6b35] text-[#ff6b35] px-10 py-4 text-xs tracking-[0.3em] uppercase hover:bg-[#ff6b35] hover:text-[#050505] transition-all duration-300"
        >
          Start Your Build
        </a>
      </div>
    </>
  );
}
