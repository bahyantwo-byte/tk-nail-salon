"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

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

function staggerReveal(progress: number, start: number, end: number): number {
  return clamp01((progress - start) / Math.max(0.001, end - start));
}

function slideDownStyle(t: number, distance = 16): CSSProperties {
  return {
    opacity: t,
    // Omit the transform once settled so it doesn't fight with hover/active
    // transforms from CSS (an inline transform always wins over :hover).
    transform: t >= 1 ? undefined : `translate3d(0, ${(1 - t) * -distance}px, 0)`,
  };
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

function HeroAnimation() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startOnFirstScroll = () => setStarted(true);
    window.addEventListener("scroll", startOnFirstScroll, {
      passive: true,
      once: true,
    });
    return () => window.removeEventListener("scroll", startOnFirstScroll);
  }, []);

  const sparkleStyle: CSSProperties = {
    transformBox: "fill-box",
    transformOrigin: "center",
    opacity: started ? undefined : 0,
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        viewBox="0 0 400 300"
        className="h-[62%] w-[62%] max-w-[420px]"
        fill="none"
        aria-hidden
      >
        {/* polish bottle */}
        <g
          stroke="var(--color-cream)"
          strokeOpacity="0.55"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M90 180 L90 250 Q90 270 110 270 L140 270 Q160 270 160 250 L160 180 Z" />
          <path d="M110 180 L110 150 L140 150 L140 180" />
          <rect x="105" y="130" width="40" height="22" rx="4" />
          <line x1="125" y1="130" x2="125" y2="92" />
        </g>
        <ellipse cx="125" cy="90" rx="8" ry="5" fill="var(--color-cream)" fillOpacity="0.55" />

        {/* nail outline (rounded "squoval" silhouette) + polish fill reveal */}
        <defs>
          <clipPath id="nailClip">
            <path d="M210 110 Q210 85 235 85 L275 85 Q300 85 300 110 L300 205 Q300 230 275 230 L235 230 Q210 230 210 205 Z" />
          </clipPath>
        </defs>
        <rect
          className={started ? "polish-fill" : undefined}
          x="210"
          y="80"
          width="0"
          height="155"
          fill="var(--color-wine)"
          clipPath="url(#nailClip)"
        />
        <path
          d="M210 110 Q210 85 235 85 L275 85 Q300 85 300 110 L300 205 Q300 230 275 230 L235 230 Q210 230 210 205 Z"
          stroke="var(--color-cream)"
          strokeOpacity="0.55"
          strokeWidth="2.5"
        />

        {/* brush stroke from bottle to nail */}
        <path
          className={started ? "brush-stroke" : undefined}
          d="M125 88 C 165 55, 215 55, 255 86"
          stroke="var(--color-wine)"
          strokeWidth="4"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
        />

        {/* sparkles */}
        <g transform="translate(318,70)">
          <path
            className={started ? "sparkle sparkle-1" : undefined}
            style={sparkleStyle}
            d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2 Z"
            fill="var(--color-blush)"
          />
        </g>
        <g transform="translate(335,145)">
          <path
            className={started ? "sparkle sparkle-2" : undefined}
            style={sparkleStyle}
            d="M0 -6 L1.5 -1.5 L6 0 L1.5 1.5 L0 6 L-1.5 1.5 L-6 0 L-1.5 -1.5 Z"
            fill="var(--color-blush)"
          />
        </g>
        <g transform="translate(192,205)">
          <path
            className={started ? "sparkle sparkle-3" : undefined}
            style={sparkleStyle}
            d="M0 -6 L1.5 -1.5 L6 0 L1.5 1.5 L0 6 L-1.5 1.5 L-6 0 L-1.5 -1.5 Z"
            fill="var(--color-blush)"
          />
        </g>
      </svg>
    </div>
  );
}

function HeroVisual({
  title,
  revealProgress,
}: {
  title: string;
  revealProgress: number;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[var(--color-ink)]">
      <div className="absolute inset-0 z-0">
        <HeroAnimation />
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
  copyProgress,
}: {
  keywords: string[];
  headline: string;
  body: string;
  subheadline: string;
  footerLeft: string;
  footerCenter: string;
  footerRight: string;
  socialHandle: string;
  copyProgress: number;
}) {
  const tagsT = staggerReveal(copyProgress, 0, 0.35);
  const headlineT = staggerReveal(copyProgress, 0.15, 0.5);
  const bodyT = staggerReveal(copyProgress, 0.3, 0.65);
  const buttonT = staggerReveal(copyProgress, 0.45, 0.8);
  const footerT = staggerReveal(copyProgress, 0.6, 1);

  return (
    <div className="relative flex min-h-[40%] flex-col border-0 bg-transparent p-[clamp(1.1rem,4.5cqw,2.25rem)] text-[var(--color-cream)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/85 via-[var(--color-wine-deep)]/55 to-transparent"
      />
      <div
        className="relative z-10 flex items-start justify-between gap-3 text-[clamp(9px,1.7cqw,11px)] font-semibold uppercase tracking-[0.18em] text-[var(--color-cream)]/70"
        style={slideDownStyle(tagsT)}
      >
        {keywords.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>

      <h2
        className="relative z-10 mt-[clamp(0.7rem,2.2cqw,1.15rem)] font-[family-name:var(--font-display)] text-[clamp(1.25rem,3.8cqw,1.9rem)] italic leading-[1.3] text-[var(--color-cream)]"
        style={slideDownStyle(headlineT)}
      >
        {headline}
      </h2>

      <p
        className="relative z-10 mt-[clamp(0.5rem,1.6cqw,0.75rem)] max-w-[64%] text-[clamp(10px,1.7cqw,12px)] font-medium leading-[1.55] text-[var(--color-cream)]/85"
        style={slideDownStyle(bodyT)}
      >
        {body}
      </p>

      <a
        href="https://booking.gocheckin.net/v2/4451"
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 mt-[clamp(0.75rem,2.4cqw,1.15rem)] inline-flex w-fit items-center rounded-full bg-[var(--color-cream)] px-[clamp(0.9rem,2.8cqw,1.4rem)] py-[clamp(0.4rem,1.4cqw,0.65rem)] text-[clamp(11px,2cqw,13px)] font-bold text-[var(--color-wine-deep)] transition-transform hover:scale-[1.03]"
        style={slideDownStyle(buttonT)}
      >
        {subheadline}
      </a>

      <div
        className="relative z-10 mt-auto flex items-end justify-between gap-3 pt-[clamp(0.7rem,2.4cqw,1.1rem)] text-[clamp(9px,1.6cqw,11px)] font-medium tracking-[0.06em] text-[var(--color-cream)]/75"
        style={slideDownStyle(footerT, 10)}
      >
        <span>{footerLeft}</span>
        <span>{footerCenter}</span>
        <span>{footerRight}</span>
      </div>

      <span
        className="absolute bottom-[clamp(0.35rem,1.2cqw,0.65rem)] right-[clamp(0.75rem,4.5cqw,2.25rem)] z-10 text-[clamp(9px,2cqw,11px)] font-medium text-[var(--color-cream)]/40"
        style={{ opacity: footerT }}
      >
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
            <HeroVisual title="T&K" revealProgress={progress} />
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
              copyProgress={copyProgress}
            />
          </div>
        </article>
      </div>
    </section>
  );
}
