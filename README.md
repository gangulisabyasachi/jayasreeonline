# Jayasree Online — The Triad of Indian Legal Excellence

A luxury, interactive 3-panel ecosystem landing page built with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS**, **Lenis Smooth Scroll**, **Web Audio API**, and **Canvas Confetti / Particle Refractions**.

The screen is split into three portals:
1. **Portal 01: Jayasree Law Bookstore** (`01`) — Curated jurisprudence, treatises, commentaries, leather-bound deluxe editions, and instant chamber catalog search.
2. **Portal 02: Advocate's Digital Court Diary** (`02`) — Real-time hearing docket, live cause list sync, CNR tracker, item alert toggles, and daily court schedule.
3. **Portal 03: Jayasree Legal Digest** (`03`) — Breaking Supreme Court and High Court judgments, authoritative ratio decidendi breakdown, and statute cross-referencing.

---

## Key Features & Visual Architecture

- **Interactive 3-Panel Split-Screen**:
  - Balanced 33% resting state with glowing ambient divider lines and status dots.
  - Expands smoothly on hover or click (~55% focus width) while adjacent panels gracefully contract.
  - Interactive background watermarks and hue-matched ambient glows.
- **Ambient Canvas Particles**:
  - Dynamic 2D canvas that generates floating dust motes and embers shifting between warm gold (Books), cyan sapphire (Diary), and emerald malachite (Digest).
- **Zero-Dependency Web Audio API Synthesizer**:
  - Soft acoustic feedback for hover transitions, clicks, and portal changes. Muted by default with an instant audio toggle in the top bar.
- **Accessible Native Dialogs**:
  - Built with the native `<dialog>` element and `.showModal()` for focus trap protection, backdrop blurring, and light dismiss on click or `Esc`.
- **Customizable Destination URLs**:
  - A settings modal lets you configure custom destination links for each of the three portals, persisted via `localStorage`.
- **Keyboard Shortcuts**:
  - Press `1`, `2`, or `3` to instantly expand and focus on a specific portal.
  - Press `ArrowLeft` / `ArrowRight` to cycle between portals.
  - Press `Esc` to reset to the balanced 3-way view.
- **Mobile Responsive Design**:
  - Automatically converts on smaller screens to a segmented tabbed view with touch-friendly tabs.

---

## Getting Started

### 1. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the next available port) to view the live site.

### 2. Build for Production
```bash
npm run build
npm run start
```
