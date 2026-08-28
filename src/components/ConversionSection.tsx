"use client";
import { useState, useRef, useCallback } from "react";

const SERVICES = [
  { icon: "✦", title: "Product Strategy", desc: "From a rough idea and a napkin sketch to a defined spec, scope, and roadmap." },
  { icon: "◈", title: "Software & App Engineering", desc: "Full-stack web and mobile builds — the digital infrastructure behind the hardware." },
  { icon: "◉", title: "Embedded & Firmware", desc: "Sensors, control systems, and electronics integration that make hardware smart." },
  { icon: "◇", title: "Rapid 3D Prototyping", desc: "CAD, 3D printing, and laser cutting to test form, fit, and function fast." },
  { icon: "◎", title: "Hardware Design & DFM", desc: "Engineering for manufacturability — BOMs, sourcing, and production-ready parts." },
  { icon: "△", title: "Testing & Iteration", desc: "Validation cycles and refinement sprints until the prototype proves itself." },
];

// Placeholder testimonials — swap in real client quotes before launch.
const REVIEWS = [
  { name: "Maria R.", location: "Founder, Reef & Root", stars: 5, text: "We walked in with a napkin sketch and walked out with a working prototype in under three weeks. CrunchBacon moves at the speed a startup actually needs." },
  { name: "Daniel K.", location: "CTO, Halyard Systems", stars: 5, text: "Most shops do software or hardware. CrunchBacon does both, in the same room, on the same timeline. That's the whole reason our device shipped on schedule." },
  { name: "Alicia P.", location: "Product Lead, Ferro Labs", stars: 5, text: "The iteration speed is unreal. We tested five physical revisions in the time it used to take us to get one back from a contract manufacturer." },
];

export function ConversionSection() {
  const [sliderPos, setSliderPos] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSlider = useCallback((e: React.PointerEvent) => {
    const el = sliderRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  return (
    <section className="bg-[#f4f4f2] text-[#111111]">
      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-xs tracking-[0.4em] uppercase text-[#ff6b35] mb-4 font-mono">What we do</p>
        <h2 className="text-4xl md:text-5xl mb-16" style={{ fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif", fontWeight: 500 }}>
          Software and hardware, engineered together.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((s) => (
            <div key={s.title} className="group border border-[#111111]/10 p-8 hover:border-[#ff6b35]/40 transition-all duration-300">
              <span className="block text-2xl text-[#ff6b35] mb-4">{s.icon}</span>
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-[#111111]/60 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Before / After Slider */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <p className="text-xs tracking-[0.4em] uppercase text-[#ff6b35] mb-4 font-mono">See the difference</p>
        <h2 className="text-4xl md:text-5xl mb-10" style={{ fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif", fontWeight: 500 }}>
          Sketch to shipped.
        </h2>

        <div
          ref={sliderRef}
          className="relative w-full overflow-hidden select-none cursor-ew-resize"
          style={{ aspectRatio: "16/7" }}
          onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); handleSlider(e); }}
          onPointerMove={(e) => { if (dragging.current) handleSlider(e); }}
          onPointerUp={() => { dragging.current = false; }}
        >
          {/* After (right side = background) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://d8j0ntlcm91z4.cloudfront.net/user_3GSk4Z8RmdvNGsBlVgLkC7JLui6/hf_20260827_020822_d3f0603b-66f2-4c60-95b9-c4cea453e6a6.png)`,
            }}
          />
          {/* Before (left side, clipped) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://d8j0ntlcm91z4.cloudfront.net/user_3GSk4Z8RmdvNGsBlVgLkC7JLui6/hf_20260827_020819_2761accf-9f65-4080-b1b7-785444e1a9e7.png)`,
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
            }}
          />
          {/* Divider */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xl"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="before-after-handle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
                <polyline points="9 18 15 12 9 6" transform="translate(6,0)" />
              </svg>
            </div>
          </div>
          {/* Labels */}
          <span className="absolute bottom-4 left-4 text-xs uppercase tracking-widest text-white bg-black/40 px-2 py-1 rounded">Before</span>
          <span className="absolute bottom-4 right-4 text-xs uppercase tracking-widest text-white bg-black/40 px-2 py-1 rounded">After</span>
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-[#111111] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-[#ff6b35] mb-4 font-mono">Reviews</p>
          <h2 className="text-4xl md:text-5xl text-[#f4f4f2] mb-16" style={{ fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif", fontWeight: 500 }}>
            Founders noticed the speed.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((r) => (
              <div key={r.name} className="border border-[#f4f4f2]/10 p-8">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <span key={i} className="text-[#ff6b35] text-sm">★</span>
                  ))}
                </div>
                <p className="text-[#f4f4f2]/80 text-sm leading-relaxed mb-6 italic">&ldquo;{r.text}&rdquo;</p>
                <p className="text-[#f4f4f2] text-xs font-semibold tracking-wider uppercase">{r.name}</p>
                <p className="text-[#f4f4f2]/40 text-xs mt-0.5">{r.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Build Request Form */}
      <div className="max-w-2xl mx-auto px-6 py-24" id="book">
        <p className="text-xs tracking-[0.4em] uppercase text-[#ff6b35] mb-4 font-mono">Get started</p>
        <h2 className="text-4xl md:text-5xl mb-2" style={{ fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif", fontWeight: 500 }}>
          Request a build consultation.
        </h2>
        <p className="text-[#111111]/50 text-sm mb-12">We&apos;ll assess your concept and scope a plan — free, no obligation.</p>

        {submitted ? (
          <div className="text-center py-16 border border-[#111111]/10">
            <span className="text-4xl block mb-4 text-[#ff6b35]">✓</span>
            <p className="text-2xl mb-2" style={{ fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif" }}>We&apos;ll be in touch.</p>
            <p className="text-sm text-[#111111]/50">Expect a reply within one business day.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="flex flex-col gap-5"
          >
            {[
              { name: "name", label: "Full Name", type: "text", required: true },
              { name: "email", label: "Email Address", type: "email", required: true },
              { name: "phone", label: "Phone Number", type: "tel", required: false },
              { name: "address", label: "Company / Project Name", type: "text", required: true },
            ].map(({ name, label, type, required }) => (
              <div key={name}>
                <label className="block text-xs tracking-widest uppercase text-[#111111]/50 mb-2 font-mono">{label}</label>
                <input
                  type={type}
                  required={required}
                  value={form[name as keyof typeof form]}
                  onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
                  className="w-full bg-transparent border border-[#111111]/20 px-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-[#ff6b35] transition-colors"
                  placeholder={label}
                />
              </div>
            ))}

            <div>
              <label className="block text-xs tracking-widest uppercase text-[#111111]/50 mb-2 font-mono">Tell us about your idea</label>
              <textarea
                rows={4}
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                className="w-full bg-transparent border border-[#111111]/20 px-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-[#ff6b35] transition-colors resize-none"
                placeholder="What are you trying to build?"
              />
            </div>

            <button
              type="submit"
              className="mt-2 bg-[#111111] text-[#f4f4f2] py-4 px-8 text-xs tracking-[0.3em] uppercase hover:bg-[#ff6b35] hover:text-[#111111] transition-colors duration-300"
            >
              Request Free Consultation
            </button>
          </form>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-[#111111]/10 py-12 px-6 text-center">
        <p className="text-2xl text-[#111111] mb-2" style={{ fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif", fontWeight: 500 }}>CrunchBacon</p>
        <p className="text-xs text-[#111111]/40 tracking-widest uppercase font-mono">Product Engineering Studio · Miami, Florida</p>
        <p className="text-xs text-[#111111]/30 mt-8">© 2026 CrunchBacon. All rights reserved.</p>
      </footer>
    </section>
  );
}
