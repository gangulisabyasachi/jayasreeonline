"use client";

import { useState } from "react";

const PANELS = [
  {
    id: "books",
    title: "Book Store",
    subtitle: "Jayasree Publications",
    buttonText: "VISIT STORE",
    href: "https://jayasreepublications.vercel.app/",
    // Atmospheric bookstore interior with floor-to-ceiling wooden bookshelves
    image: "/images/bookstore.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1600&auto=format&fit=crop",
    // Aesthetic, soothing warm dark espresso / antique oak overlay
    tint: "bg-[#1c140e]/75 group-hover:bg-[#1c140e]/55",
  },
  {
    id: "diary",
    title: "Lawyer Diary",
    subtitle: "Court Diary & Cause List",
    buttonText: "OPEN DIARY",
    href: "https://lex-daily.vercel.app/",
    // Leather-bound court diary with gilded edges and thumb index tabs
    image: "/images/lawyer-diary.jpg",
    fallbackImage: "/images/lawyer-diary.jpg",
    // Deep court navy / sapphire overlay matching Law Diary brand
    tint: "bg-[#0b1b36]/70 group-hover:bg-[#0b1b36]/50",
  },
  {
    id: "digest",
    title: "Legal Digest",
    subtitle: "Journals, Reports & Case Law",
    buttonText: "READ DIGEST",
    href: "https://legal-digest-lovat.vercel.app/",
    // Stack / bundle of legal journals, law reports & magazines with reading specs
    image: "/images/legal-digest-specs.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1600&auto=format&fit=crop",
    // Deep emerald / malachite green overlay
    tint: "bg-[#05291d]/75 group-hover:bg-[#05291d]/55",
  },
];

export default function HomePage() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <main className="h-screen w-screen overflow-hidden flex flex-col md:flex-row bg-black select-none">
      {PANELS.map((panel) => {
        const isHovered = hovered === panel.id;
        const isAnyHovered = hovered !== null;

        return (
          <a
            key={panel.id}
            href={panel.href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(panel.id)}
            onMouseLeave={() => setHovered(null)}
            className={`relative flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isHovered
                ? "md:flex-[1.85] flex-[1.6]"
                : isAnyHovered
                ? "md:flex-[0.58] flex-[0.7]"
                : "flex-1"
            } group border-b md:border-b-0 md:border-r border-white/10 last:border-none`}
          >
            {/* Background Image with Fallback and Smooth Hover Zoom */}
            <img
              src={panel.image}
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== panel.fallbackImage) {
                  target.src = panel.fallbackImage;
                }
              }}
              alt={panel.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
            />

            {/* Tinted Color Overlay */}
            <div
              className={`absolute inset-0 ${panel.tint} transition-colors duration-500`}
            />

            {/* Subtle Vignette for cinematic contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/35 pointer-events-none" />

            {/* Centered Content */}
            <div className="relative z-10 text-center px-4 sm:px-8 space-y-4 max-w-sm">
              <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white/70 drop-shadow">
                {panel.subtitle}
              </p>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight drop-shadow-md">
                {panel.title}
              </h2>

              {/* Minimalist bordered box button */}
              <div className="pt-2">
                <span className="inline-block px-8 py-3.5 border-2 border-white text-white text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:shadow-2xl">
                  {panel.buttonText}
                </span>
              </div>
            </div>
          </a>
        );
      })}
    </main>
  );
}
