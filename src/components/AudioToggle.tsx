"use client";
import { useEffect, useRef, useState } from "react";

export function AudioToggle() {
  const [on, setOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Ambient audio: soft mower hum / birds (file placed in /public/audio/ambient.mp3)
    const audio = new Audio("/audio/ambient.mp3");
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!on) {
      try {
        await audio.play();
        // Fade in
        const target = 0.35;
        const step = target / 20;
        const id = setInterval(() => {
          audio.volume = Math.min(audio.volume + step, target);
          if (audio.volume >= target) clearInterval(id);
        }, 50);
      } catch {
        /* autoplay blocked — ignore */
      }
    } else {
      // Fade out
      const id = setInterval(() => {
        audio.volume = Math.max(audio.volume - 0.02, 0);
        if (audio.volume <= 0) {
          clearInterval(id);
          audio.pause();
        }
      }, 50);
    }
    setOn((v) => !v);
  };

  return (
    <button
      onClick={toggle}
      aria-label={on ? "Mute ambient audio" : "Play ambient audio"}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm text-white/70 hover:text-white hover:border-white/40 transition-all text-xs tracking-widest uppercase"
    >
      {on ? (
        <>
          <SoundOnIcon />
          <span>Sound On</span>
        </>
      ) : (
        <>
          <SoundOffIcon />
          <span>Sound Off</span>
        </>
      )}
    </button>
  );
}

function SoundOnIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function SoundOffIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}
