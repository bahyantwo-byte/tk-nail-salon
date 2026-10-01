import Image from "next/image";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div className="relative order-2 md:order-1">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem]">
            <Image
              src="/images/clip-interior-poster.jpg"
              alt="Inside T&K Nail Salon"
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="order-1 flex flex-col justify-center md:order-2">
          <div className="mb-5 flex flex-wrap gap-x-5 gap-y-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-wine)]">
            <span>About</span>
            <span>Burlington, MA</span>
            <span>Est. 10+ Years</span>
          </div>
          <h2 className="font-[family-name:var(--font-condensed)] text-5xl font-extrabold uppercase leading-[0.95] text-[var(--color-ink)] md:text-6xl">
            A calm, welcoming spot
          </h2>
          <p className="mt-3 font-[family-name:var(--font-display)] text-2xl italic text-[var(--color-wine)]">
            to slow down.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-ink-soft)]">
            Located in the center of Burlington, MA, T&amp;K Nail Salon has
            been a popular nail spa for local and new customers alike for
            over ten years. Our commitment is to deliver the highest quality
            nail care with a team that takes professionalism, sanitation, and
            consistency seriously — in an environment where you can truly
            relax, unwind, and escape.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-ink-soft)]">
            If we don&apos;t exceed your expectations, tell us — we want the
            chance to make it right for you and every guest after you.
          </p>
        </div>
      </div>
    </section>
  );
}
