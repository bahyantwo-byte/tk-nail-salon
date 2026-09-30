export function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-[var(--color-line)] bg-[var(--color-cream)]/95 p-3 backdrop-blur md:hidden">
      <a
        href="tel:7812703185"
        className="flex-1 rounded-full border border-[var(--color-wine)] py-3 text-center text-sm font-semibold text-[var(--color-wine)]"
      >
        Call
      </a>
      <a
        href="https://booking.gocheckin.net/v2/4451"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 rounded-full bg-[var(--color-wine)] py-3 text-center text-sm font-semibold text-[var(--color-cream)]"
      >
        Book Now
      </a>
    </div>
  );
}
