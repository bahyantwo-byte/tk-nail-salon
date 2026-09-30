export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-cream)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-[family-name:var(--font-condensed)] text-4xl font-extrabold uppercase leading-none">
            T&amp;K <span className="text-[var(--color-blush)]">Nail Salon</span>
          </p>
          <p className="mt-3 text-sm text-[var(--color-cream)]/60">
            206 Cambridge Street, Burlington, MA 01803
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--color-cream)]/70">
          <a href="tel:7812703185" className="hover:text-[var(--color-blush)]">
            781-270-3185
          </a>
          <a
            href="mailto:TKnails.info@gmail.com"
            className="hover:text-[var(--color-blush)]"
          >
            TKnails.info@gmail.com
          </a>
          <a
            href="https://www.instagram.com/tknails.burlington/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-blush)]"
          >
            Instagram
          </a>
        </div>
      </div>
      <p className="border-t border-white/10 px-5 py-4 text-center text-xs text-[var(--color-cream)]/40">
        © {new Date().getFullYear()} T&amp;K Nail Salon. All rights reserved.
      </p>
    </footer>
  );
}
