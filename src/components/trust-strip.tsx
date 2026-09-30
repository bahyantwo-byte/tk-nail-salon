const FACTS = [
  {
    tag: "Since day one",
    title: "10+ Years",
    body: "A local fixture on Cambridge Street, trusted by generations of regulars.",
  },
  {
    tag: "Every visit",
    title: "Autoclave Sterilized",
    body: "Metal implements are sterilized between every guest; files and buffers are single-use.",
  },
  {
    tag: "Every pedicure",
    title: "Fresh Liner",
    body: "New bath liner and full tub sanitation for each client — no exceptions.",
  },
  {
    tag: "In stock",
    title: "1,500+ Shades",
    body: "Regular, gel, dipping powder, and non-toxic lacquers from top brands.",
  },
];

export function TrustStrip() {
  return (
    <section className="border-y border-[var(--color-line)] bg-[var(--color-cream-deep)]/60">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-14 md:grid-cols-4 md:gap-6">
        {FACTS.map((fact) => (
          <div key={fact.title}>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-wine)]">
              {fact.tag}
            </p>
            <p className="mt-2 font-[family-name:var(--font-condensed)] text-2xl font-extrabold uppercase leading-none tracking-wide text-[var(--color-ink)]">
              {fact.title}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">
              {fact.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
