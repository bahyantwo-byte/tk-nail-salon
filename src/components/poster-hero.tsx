"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_PAD_CLASS = "p-[clamp(1.25rem,4vmin,2.5rem)]";

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function readScrollProgress(track: HTMLElement): number {
  const rect = track.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  const scrollable = track.offsetHeight - vh;
  if (scrollable <= 0) return 1;
  return clamp01(-rect.top / scrollable);
}

type TitleChar = {
  key: string;
  char: string;
  index: number;
  fromCenter: number;
};

function splitTitleChars(title: string): TitleChar[] {
  const chars = Array.from(title);
  const mid = Math.max(chars.length - 1, 1) / 2;
  return chars.map((char, index) => ({
    key: `${index}-${char === " " ? "sp" : char}`,
    char: char === " " ? " " : char,
    index,
    fromCenter: mid <= 0 ? 0 : Math.abs(index - mid) / mid,
  }));
}

function charReveal(progress: number, fromCenter: number): number {
  const start = fromCenter * 0.55;
  const end = Math.min(1, start + 0.38);
  return clamp01((progress - start) / Math.max(0.001, end - start));
}

function FitTitle({
  title,
  revealProgress,
}: {
  title: string;
  revealProgress: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLSpanElement>(null);
  const [fontPx, setFontPx] = useState<number | null>(null);
  const chars = splitTitleChars(title);
  const titleProgress = clamp01(revealProgress / 0.6);

  useEffect(() => {
    const wrap = wrapRef.current;
    const probe = probeRef.current;
    if (!wrap || !probe) return;

    const PROBE = 100;
    let cancelled = false;
    const fit = () => {
      if (cancelled) return;
      const widthFit = (wrap.clientWidth / Math.max(1, probe.scrollWidth)) * PROBE;
      const probeHeight = probe.getBoundingClientRect().height;
      const heightFit =
        probeHeight > 0 ? (wrap.clientHeight / probeHeight) * PROBE : widthFit;
      const next = Math.min(widthFit, heightFit);
      if (!Number.isFinite(next) || next <= 0) return;
      setFontPx(next);
    };

    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    fit();

    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, [title]);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-x-[5%] top-[6%] bottom-[46%] z-20 flex items-end overflow-hidden"
    >
      <span
        ref={probeRef}
        aria-hidden
        className="pointer-events-none invisible absolute whitespace-nowrap font-[family-name:var(--font-condensed)] font-extrabold uppercase leading-none"
        style={{ fontSize: 100, letterSpacing: "0.02em" }}
      >
        {title}
      </span>
      <h1
        className="m-0 overflow-visible whitespace-nowrap text-left font-[family-name:var(--font-condensed)] font-extrabold uppercase leading-none text-white"
        style={{
          fontSize: fontPx != null ? `${fontPx}px` : "min(38cqw, 52cqh)",
          letterSpacing: "0.02em",
        }}
      >
        {chars.map((item) => {
          const t = charReveal(titleProgress, item.fromCenter);
          const y = (1 - t) * (18 + item.fromCenter * 24);
          return (
            <span
              key={item.key}
              aria-hidden
              className="inline-block"
              style={{ opacity: t, transform: `translate3d(0, ${y}px, 0)` }}
            >
              {item.char}
            </span>
          );
        })}
        <span className="sr-only">{title}</span>
      </h1>
    </div>
  );
}

function HeroVisual({
  title,
  sceneSrc,
  sceneAlt,
  revealProgress,
}: {
  title: string;
  sceneSrc: string;
  sceneAlt: string;
  revealProgress: number;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element -- pinned scroll layout needs a plain img inside a non-fixed-size container */}
        <img
          src={sceneSrc}
          alt={sceneAlt}
          className="absolute inset-0 h-full w-full scale-105 object-cover object-[65%_50%]"
          draggable={false}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--color-ink)]/10 via-transparent to-[var(--color-ink)]/20"
        />
      </div>

      <FitTitle title={title} revealProgress={revealProgress} />
    </div>
  );
}

function CopyPanel({
  keywords,
  headline,
  body,
  subheadline,
  footerLeft,
  footerCenter,
  footerRight,
  socialHandle,
}: {
  keywords: string[];
  headline: string;
  body: string;
  subheadline: string;
  footerLeft: string;
  footerCenter: string;
  footerRight: string;
  socialHandle: string;
}) {
  return (
    <div className="relative flex min-h-[40%] flex-col border-0 bg-transparent p-[clamp(1.1rem,4.5cqw,2.25rem)] text-[var(--color-cream)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/85 via-[var(--color-wine-deep)]/55 to-transparent"
      />
      <div className="relative z-10 flex items-start justify-between gap-3 text-[clamp(9px,1.7cqw,11px)] font-semibold uppercase tracking-[0.18em] text-[var(--color-cream)]/70">
        {keywords.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>

      <h2 className="relative z-10 mt-[clamp(0.7rem,2.2cqw,1.15rem)] font-[family-name:var(--font-display)] text-[clamp(1.25rem,3.8cqw,1.9rem)] italic leading-[1.3] text-[var(--color-cream)]">
        {headline}
      </h2>

      <p className="relative z-10 mt-[clamp(0.5rem,1.6cqw,0.75rem)] max-w-[64%] text-[clamp(10px,1.7cqw,12px)] font-medium leading-[1.55] text-[var(--color-cream)]/85">
        {body}
      </p>

      <a
        href="https://booking.gocheckin.net/v2/4451"
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 mt-[clamp(0.75rem,2.4cqw,1.15rem)] inline-flex w-fit items-center rounded-full bg-[var(--color-cream)] px-[clamp(0.9rem,2.8cqw,1.4rem)] py-[clamp(0.4rem,1.4cqw,0.65rem)] text-[clamp(11px,2cqw,13px)] font-bold text-[var(--color-wine-deep)] transition-transform hover:scale-[1.03]"
      >
        {subheadline}
      </a>

      <div className="relative z-10 mt-auto flex items-end justify-between gap-3 pt-[clamp(0.7rem,2.4cqw,1.1rem)] text-[clamp(9px,1.6cqw,11px)] font-medium tracking-[0.06em] text-[var(--color-cream)]/75">
        <span>{footerLeft}</span>
        <span>{footerCenter}</span>
        <span>{footerRight}</span>
      </div>

      <span className="absolute bottom-[clamp(0.35rem,1.2cqw,0.65rem)] right-[clamp(0.75rem,4.5cqw,2.25rem)] z-10 text-[clamp(9px,2cqw,11px)] font-medium text-[var(--color-cream)]/40">
        {socialHandle}
      </span>
    </div>
  );
}

export function PosterHero() {
  const trackRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [stickyPx, setStickyPx] = useState<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let target = 0;
    let current = 0;
    let raf = 0;

    const loop = () => {
      const delta = target - current;
      current += Math.abs(delta) > 0.35 ? delta * 0.22 : delta * 0.14;
      if (Math.abs(delta) < 0.0008) current = target;
      setProgress(current);
      raf = requestAnimationFrame(loop);
    };

    const onScroll = () => {
      target = readScrollProgress(track);
    };

    const onResize = () => {
      setStickyPx(window.innerHeight);
      target = reduceMotion ? 1 : readScrollProgress(track);
    };

    onResize();
    current = target;
    raf = requestAnimationFrame(loop);

    if (!reduceMotion) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  const copyProgress = clamp01((progress - 0.45) / 0.55);
  const copyOffset = `${(1 - copyProgress) * 100}%`;

  return (
    <section
      ref={trackRef}
      id="top"
      className="relative isolate w-full bg-[var(--color-ink)]"
      style={{ height: "180vh" }}
    >
      <div
        className={`box-border w-full overflow-hidden sticky top-0 ${FRAME_PAD_CLASS}`}
        style={{ height: stickyPx ?? "100svh" }}
      >
        <article className="@container relative flex h-full w-full min-h-0 flex-col overflow-hidden rounded-[1.75rem] bg-[var(--color-ink)] shadow-[0_30px_80px_-20px_rgba(37,26,28,0.5)]">
          <div className="@container relative min-h-0 flex-1 overflow-hidden [container-type:size]">
            <HeroVisual
              title="T&K"
              sceneSrc="/images/hero-gel-manicure.jpg"
              sceneAlt="Fresh white gel manicure"
              revealProgress={progress}
            />
          </div>

          <div
            className="absolute inset-x-0 bottom-0 z-30 will-change-transform"
            style={{ transform: `translate3d(0, ${copyOffset}, 0)` }}
          >
            <CopyPanel
              keywords={["Manicure", "Pedicure", "Lash & Wax"]}
              headline="Nails done right. | Burlington, MA."
              body="Burlington's nail spa for over ten years — manicures, pedicures, acrylics, waxing, and lash extensions, with 1,500+ shades on hand."
              subheadline="Book an Appointment"
              footerLeft="T&K Nail Salon"
              footerCenter="10+ Years"
              footerRight="781-270-3185"
              socialHandle="@tknails.burlington"
            />
          </div>
        </article>
      </div>
    </section>
  );
}
