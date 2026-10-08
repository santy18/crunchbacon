import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — CrunchBacon",
  description: "How CrunchBacon handles information when you visit this site or contact us.",
};

const heading = { fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif", fontWeight: 500 } as const;

const SECTIONS = [
  {
    title: "The short version",
    body: [
      "We don't run user accounts, we don't use analytics or advertising trackers, and we don't sell or share your information. The only information we receive is what you choose to send us through the contact form.",
    ],
  },
  {
    title: "Browsing this site",
    body: [
      "We don't set cookies and we don't track visitors. Like any website, our hosting and network providers (including Cloudflare) process technical data such as your IP address and browser type in order to deliver the site and keep it secure. We don't use that data for anything else.",
      "The site loads fonts from Google Fonts and images and video from a content delivery network, so those providers receive your IP address when your browser requests those files.",
    ],
  },
  {
    title: "The contact form",
    body: [
      "If you submit the consultation form, we receive the details you enter: your name, email address, phone number (optional), company or project name, and your message. We don't save these in a database on this website.",
      "The submission is passed to our internal workflow tool, which delivers it to us so we can reply. We use it only to respond to your request and to discuss a project with you. We don't sell it or use it for marketing lists.",
    ],
  },
  {
    title: "Your choices",
    body: [
      "You can ask us what we received from you, or ask us to delete it, at any time. Send your request through the contact form and we'll respond within a reasonable time.",
    ],
  },
  {
    title: "Changes",
    body: [
      "If we change how this site handles information, we'll update this page and the date below.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f4f4f2] text-[#111111]">
      <div className="max-w-2xl mx-auto px-6 py-24">
        <Link href="/" className="text-xs tracking-[0.3em] uppercase font-mono text-[#ff6b35] hover:underline">
          ← CrunchBacon
        </Link>
        <h1 className="text-4xl md:text-5xl mt-8 mb-4" style={heading}>
          Privacy Policy
        </h1>
        <p className="text-xs text-[#111111]/40 font-mono uppercase tracking-widest mb-16">
          Last updated: October 7, 2026
        </p>

        <div className="flex flex-col gap-12">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="text-2xl mb-4" style={heading}>
                {s.title}
              </h2>
              <div className="flex flex-col gap-4">
                {s.body.map((p) => (
                  <p key={p} className="text-[#111111]/70 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-16 text-[#111111]/70">
          Questions? <Link href="/#book" className="text-[#ff6b35] underline">Contact us</Link>.
        </p>
      </div>
    </main>
  );
}
