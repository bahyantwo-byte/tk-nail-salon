"use client";

import { useState } from "react";
import { SERVICE_CATEGORIES } from "@/lib/services";

export function Services() {
  const [activeId, setActiveId] = useState(SERVICE_CATEGORIES[0].id);
  const active =
    SERVICE_CATEGORIES.find((c) => c.id === activeId) ?? SERVICE_CATEGORIES[0];

  return (
    <section
      id="services"
      className="bg-[var(--color-ink)] px-5 py-20 text-[var(--color-cream)] md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-blush)]">
              The Menu
            </p>
            <h2 className="font-[family-name:var(--font-condensed)] text-5xl font-extrabold uppercase leading-[0.9] md:text-6xl">
              Priced upfront.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[var(--color-cream)]/60">
            Every service on our in-salon menu, no surprises at checkout.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-white/15 pb-5">
          {SERVICE_CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveId(category.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                category.id === activeId
                  ? "bg-[var(--color-wine)] text-[var(--color-cream)]"
                  : "bg-white/5 text-[var(--color-cream)]/60 hover:text-[var(--color-cream)]"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <ul className="mt-6 grid gap-x-10 gap-y-1 md:grid-cols-2">
          {active.services.map((service) => (
            <li
              key={service.name}
              className="flex items-baseline justify-between gap-4 border-b border-dashed border-white/15 py-4"
            >
              <div>
                <p className="font-medium text-[var(--color-cream)]">
                  {service.name}
                </p>
                <p className="text-sm text-[var(--color-cream)]/50">
                  {service.duration}
                </p>
              </div>
              <p className="whitespace-nowrap font-[family-name:var(--font-condensed)] text-xl font-bold text-[var(--color-blush)]">
                {service.price}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-[var(--color-cream)]/50">
          Prices reflect our current in-salon menu and may be updated
          periodically. Call 781-270-3185 to confirm before booking.
        </p>
      </div>
    </section>
  );
}
