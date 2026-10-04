export default function CapacityMeter({
  label,
  left,
  cap,
  onDark = false,
}: {
  label: string;
  left: number;
  cap: number;
  onDark?: boolean;
}) {
  const takenPct = Math.min(100, Math.max(0, (100 * (cap - left)) / cap));

  return (
    <div className="grid gap-1.5">
      <div
        className={`flex items-center justify-between text-[14px] ${
          onDark ? "text-white/80" : "text-muted"
        }`}
      >
        <span>{label}</span>
        <span className="tnum font-semibold">
          {left} / {cap}
        </span>
      </div>
      <div
        className={`h-2 overflow-hidden rounded-full ${
          onDark ? "bg-white/15" : "bg-[var(--surface-2)]"
        }`}
        role="progressbar"
        aria-valuenow={cap - left}
        aria-valuemin={0}
        aria-valuemax={cap}
        aria-label={label}
      >
        {/* CSS-driven: the fill must end at the right width even if the tab
            was in the background while it animated. */}
        <i
          className="meter-fill block h-full rounded-full bg-[var(--saffron)]"
          style={{ ["--pct" as string]: `${takenPct}%` }}
        />
      </div>
    </div>
  );
}
