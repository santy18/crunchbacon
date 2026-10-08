"use client";
import { useState, useRef, useCallback } from "react";

const SERVICES = [
  { icon: "✦", title: "Product Strategy", desc: "From a rough idea to a defined spec, scope, and roadmap." },
  { icon: "◈", title: "Web & Mobile Apps", desc: "Full-stack products built with modern frameworks, from MVP to scale." },
  { icon: "◉", title: "Backend & Cloud", desc: "APIs, data pipelines, and infrastructure that stay fast and reliable under load." },
  { icon: "◇", title: "AI & Automation", desc: "LLM features, agents, and workflow automation wired into your product." },
  { icon: "◎", title: "Testing & DevOps", desc: "CI/CD, observability, and QA so every release ships with confidence." },
  { icon: "△", title: "Prototyping & Hardware", desc: "When software needs a body: embedded firmware, electronics, and 3D-printed prototypes." },
];

const PLAYBOOK = [
  {
    title: "Before you write a line of code",
    points: [
      "Name the one user and the one problem. If you need two, you have two products.",
      "Write the smallest version that proves people want it, then cut it in half.",
      "Decide how you'll know it worked: a number, a date, a decision.",
    ],
  },
  {
    title: "Build, buy, or glue it together",
    points: [
      "Buy or use off-the-shelf for anything customers won't notice: auth, payments, email.",
      "Build the part that is your advantage. That's the code worth owning.",
      "Glue tools together with automation first. Replace them only when they hurt.",
    ],
  },
  {
    title: "Red flags in a dev proposal",
    points: [
      "One big number and no milestones. You should see something working every week or two.",
      "No mention of hosting, monitoring, or who fixes it after launch.",
      "You won't own the repo, the cloud accounts, and the domain on day one.",
    ],
  },
  {
    title: "Ready for launch?",
    points: [
      "Backups exist and someone has actually restored one.",
      "You'll get an alert before your users tell you it's down.",
      "Secrets are out of the repo, and there's a way to roll back a bad release.",
    ],
  },
];

export function ConversionSection() {
  const [sliderPos, setSliderPos] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          project: form.address,
          notes: form.notes,
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

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
          Software built to ship. Hardware when you need it.
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

      {/* Playbook */}
      <div className="bg-[#111111] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-[#ff6b35] mb-4 font-mono">The playbook</p>
          <h2 className="text-4xl md:text-5xl text-[#f4f4f2] mb-4" style={{ fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif", fontWeight: 500 }}>
            Build it right the first time.
          </h2>
          <p className="text-[#f4f4f2]/50 text-sm mb-16 max-w-xl">
            Four checklists we use on every project. Take them, whether or not you work with us.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PLAYBOOK.map((card, n) => (
              <div key={card.title} className="border border-[#f4f4f2]/10 p-8">
                <p className="text-[#ff6b35] text-xs font-mono mb-3">{String(n + 1).padStart(2, "0")}</p>
                <h3 className="text-[#f4f4f2] text-xl mb-5" style={{ fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif", fontWeight: 500 }}>
                  {card.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {card.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-sm text-[#f4f4f2]/70 leading-relaxed">
                      <span className="text-[#ff6b35] shrink-0">→</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
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
            onSubmit={handleSubmit}
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
              disabled={sending}
              className="mt-2 bg-[#111111] text-[#f4f4f2] py-4 px-8 text-xs tracking-[0.3em] uppercase hover:bg-[#ff6b35] hover:text-[#111111] transition-colors duration-300 disabled:opacity-50"
            >
              {sending ? "Sending..." : "Request Free Consultation"}
            </button>
            {error && (
              <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
            )}
          </form>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-[#111111]/10 py-12 px-6 text-center">
        <p className="text-2xl text-[#111111] mb-2" style={{ fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif", fontWeight: 500 }}>CrunchBacon</p>
        <p className="text-xs text-[#111111]/40 tracking-widest uppercase font-mono">Software Engineering Studio · Miami, Florida</p>
        <p className="text-xs text-[#111111]/30 mt-8">
          © 2026 CrunchBacon. All rights reserved. ·{" "}
          <a href="/privacy" className="underline hover:text-[#ff6b35]">Privacy</a>
        </p>
      </footer>
    </section>
  );
}
