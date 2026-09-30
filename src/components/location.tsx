const HOURS = [
  { day: "Monday – Friday", time: "9:30 AM – 7:30 PM" },
  { day: "Saturday", time: "9:30 AM – 6:30 PM" },
  { day: "Sunday", time: "10:30 AM – 4:30 PM" },
];

export function Location() {
  return (
    <section
      id="visit"
      className="bg-[var(--color-cream-deep)]/60 px-5 py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-wine)]">
            Visit Us
          </p>
          <h2 className="font-[family-name:var(--font-condensed)] text-5xl font-extrabold uppercase leading-[0.9] text-[var(--color-ink)] md:text-6xl">
            206 Cambridge St.
          </h2>
          <p className="mt-2 font-[family-name:var(--font-display)] text-xl italic text-[var(--color-wine)]">
            Burlington, MA 01803
          </p>

          <dl className="mt-8 space-y-2">
            {HOURS.map((row) => (
              <div
                key={row.day}
                className="flex justify-between gap-4 border-b border-dashed border-[var(--color-line)] py-2 text-sm"
              >
                <dt className="font-medium text-[var(--color-ink)]">{row.day}</dt>
                <dd className="text-[var(--color-ink-soft)]">{row.time}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="tel:7812703185"
              className="rounded-full border border-[var(--color-wine)] px-6 py-3 text-sm font-semibold text-[var(--color-wine)] transition-colors hover:bg-[var(--color-wine)] hover:text-[var(--color-cream)]"
            >
              Call 781-270-3185
            </a>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=206+Cambridge+Street+Burlington+MA+01803"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[var(--color-wine)] px-6 py-3 text-sm font-semibold text-[var(--color-cream)] transition-colors hover:bg-[var(--color-wine-deep)]"
            >
              Get Directions
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-[var(--color-line)]">
          <iframe
            title="T&K Nail Salon location map"
            src="https://www.google.com/maps?q=206+Cambridge+Street+Burlington+MA+01803&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 360 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
