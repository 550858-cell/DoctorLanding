import { cn } from "@/lib/cn";

const palettes = [
  "from-primary/25 via-primary/10 to-cream",
  "from-accent/20 via-primary/10 to-cream",
  "from-primary-light/30 via-cream to-primary/15",
  "from-emerald-200/40 via-cream to-primary/15",
];

export function Placeholder({
  label = "Фото клиники",
  className,
  variant = 0,
  rounded = "rounded-3xl",
}: {
  label?: string;
  className?: string;
  variant?: number;
  rounded?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        palettes[variant % palettes.length],
        rounded,
        className,
      )}
    >
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="relative flex flex-col items-center gap-2 px-6 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/70 text-primary shadow-soft backdrop-blur">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 16l5-5 4 4 3-3 4 4M4 6h16v12H4z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="text-sm font-medium text-ink/70">{label}</span>
      </div>
    </div>
  );
}
