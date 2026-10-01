import Image from "next/image";
import { VideoStrip } from "./video-strip";

const PHOTOS = [
  { src: "/images/eyelash-extensions.jpg", alt: "Lash extensions by T&K", tall: true },
  { src: "/images/hero-process-poster.jpg", alt: "Nail art application in progress" },
  { src: "/images/clip-hearts-poster.jpg", alt: "Finished heart nail art" },
  { src: "/images/clip-galaxy-poster.jpg", alt: "Finished galaxy nail art" },
  { src: "/images/clip-interior-poster.jpg", alt: "Inside T&K Nail Salon" },
];

export function Gallery() {
  return (
    <section id="gallery" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-wine)]">
            Gallery
          </p>
          <h2 className="font-[family-name:var(--font-condensed)] text-5xl font-extrabold uppercase leading-[0.9] text-[var(--color-ink)] md:text-6xl">
            A glimpse of the work.
          </h2>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-semibold">
          <a
            href="https://www.instagram.com/tknails.burlington/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-wine)] underline underline-offset-4"
          >
            @tknails.burlington
          </a>
          <a
            href="https://www.instagram.com/ilash_burlington/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-wine)] underline underline-offset-4"
          >
            @iLash_burlington
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {PHOTOS.map((photo, index) => (
          <div
            key={photo.src}
            className={`relative overflow-hidden rounded-2xl ${
              photo.tall
                ? "col-span-2 row-span-2 aspect-square md:aspect-auto"
                : "aspect-square"
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={
                photo.tall
                  ? "(min-width: 768px) 45vw, 90vw"
                  : "(min-width: 768px) 22vw, 45vw"
              }
              loading={index < 2 ? undefined : "lazy"}
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>

      <VideoStrip />
    </section>
  );
}
