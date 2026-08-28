"use client";
import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { Preloader } from "@/components/Preloader";
import { AudioToggle } from "@/components/AudioToggle";
import { ConversionSection } from "@/components/ConversionSection";

const ScrollStory = dynamic(
  () => import("@/components/ScrollStory").then((m) => m.ScrollStory),
  { ssr: false }
);

export default function Home() {
  const [loadProgress, setLoadProgress] = useState(0);

  // Lock scroll until preloader exits
  useEffect(() => {
    document.body.style.overflow = loadProgress >= 100 ? "auto" : "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, [loadProgress]);

  // Safety net: never leave the page locked if a video stalls
  useEffect(() => {
    const id = setTimeout(() => setLoadProgress(100), 10000);
    return () => clearTimeout(id);
  }, []);

  const handleLoadProgress = useCallback((pct: number) => {
    setLoadProgress(pct);
  }, []);

  const handleAllLoaded = useCallback(() => {
    setLoadProgress(100);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    // AnimatePresence onExitComplete — nothing extra needed
  }, []);

  return (
    <>
      <Preloader progress={loadProgress} onComplete={handlePreloaderComplete} />

      <main>
        <ScrollStory
          revealed={loadProgress >= 100}
          onLoadProgress={handleLoadProgress}
          onAllLoaded={handleAllLoaded}
        />
        <ConversionSection />
      </main>

      <AudioToggle />
    </>
  );
}
