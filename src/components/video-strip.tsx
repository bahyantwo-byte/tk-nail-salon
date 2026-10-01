"use client";

import { useEffect, useRef } from "react";

type Clip = {
  src: string;
  poster: string;
  label: string;
};

const CLIPS: Clip[] = [
  { src: "/videos/clip-interior.mp4", poster: "/images/clip-interior-poster.jpg", label: "Inside the salon" },
  { src: "/videos/clip-hearts.mp4", poster: "/images/clip-hearts-poster.jpg", label: "Finished nail art" },
  { src: "/videos/clip-easter.mp4", poster: "/images/clip-easter-poster.jpg", label: "Nail art process" },
  { src: "/videos/clip-galaxy.mp4", poster: "/images/clip-galaxy-poster.jpg", label: "Finished nail art" },
];

function VideoCard({ clip }: { clip: Clip }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative aspect-[9/16] w-[220px] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[260px]">
      <video
        ref={videoRef}
        src={clip.src}
        poster={clip.poster}
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent"
      />
      <span className="absolute bottom-3 left-3 text-xs font-semibold text-white">
        {clip.label}
      </span>
    </div>
  );
}

export function VideoStrip() {
  return (
    <div className="mt-10">
      <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-wine)]">
        In Motion
      </p>
      <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
        {CLIPS.map((clip) => (
          <VideoCard key={clip.src} clip={clip} />
        ))}
      </div>
    </div>
  );
}
