"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#visit", label: "Visit" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-cream)]/90 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <a
          href="#top"
          className={`font-[family-name:var(--font-display)] text-xl tracking-tight transition-colors ${
            scrolled ? "text-[var(--color-ink)]" : "text-[var(--color-cream)]"
          }`}
        >
          T&amp;K{" "}
          <span
            className={
              scrolled ? "text-[var(--color-wine)]" : "text-[var(--color-blush)]"
            }
          >
            Nail Salon
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-[var(--color-wine)] ${
                scrolled ? "text-[var(--color-ink-soft)]" : "text-[var(--color-cream)]/85"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="tel:7812703185"
            className={`text-sm font-medium hover:text-[var(--color-wine)] ${
              scrolled ? "text-[var(--color-ink-soft)]" : "text-[var(--color-cream)]/85"
            }`}
          >
            781-270-3185
          </a>
          <a
            href="https://booking.gocheckin.net/v2/4451"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[var(--color-wine)] px-5 py-2.5 text-sm font-semibold text-[var(--color-cream)] transition-colors hover:bg-[var(--color-wine-deep)]"
          >
            Book Now
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className={`flex h-10 w-10 items-center justify-center rounded-full border md:hidden ${
            scrolled || open
              ? "border-[var(--color-line)]"
              : "border-[var(--color-cream)]/40"
          }`}
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute inset-x-0 top-0 h-px transition-transform ${
                scrolled || open ? "bg-[var(--color-ink)]" : "bg-[var(--color-cream)]"
              } ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`absolute inset-x-0 bottom-0 h-px transition-transform ${
                scrolled || open ? "bg-[var(--color-ink)]" : "bg-[var(--color-cream)]"
              } ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-[var(--color-line)] bg-[var(--color-cream)] px-5 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-base font-medium text-[var(--color-ink)]"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex gap-3">
            <a
              href="tel:7812703185"
              className="flex-1 rounded-full border border-[var(--color-wine)] px-4 py-3 text-center text-sm font-semibold text-[var(--color-wine)]"
            >
              Call Us
            </a>
            <a
              href="https://booking.gocheckin.net/v2/4451"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-full bg-[var(--color-wine)] px-4 py-3 text-center text-sm font-semibold text-[var(--color-cream)]"
            >
              Book Now
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
