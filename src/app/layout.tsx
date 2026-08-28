import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CrunchBacon — Engineered for Reality",
  description:
    "A Miami-based product engineering studio. Digital infrastructure, physical prototyping, rapid iteration — from napkin sketch to working hardware.",
  openGraph: {
    title: "CrunchBacon — Engineered for Reality",
    description: "A cinematic story of building the physical proof of concept.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&family=JetBrains+Mono:wght@400;500&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
