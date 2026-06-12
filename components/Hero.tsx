type HeroProps = {
  theme: string;
  onToggleTheme: () => void;
};

export default function Hero({ theme, onToggleTheme }: HeroProps) {
  const isDark = theme === "dark";

  return (
    <div>
      <div
        className="hero-texture relative overflow-hidden"
        style={{ backgroundColor: "var(--sp-navy)" }}
      >
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-10 pb-10">

          {/* Eyebrow */}
          <p
            className="text-[11px] font-bold tracking-[0.14em] uppercase mb-2"
            style={{ color: "var(--sp-gold)" }}
          >
            FIFA World Cup 2026 · USA / CAN / MEX
          </p>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-3">
            Track your teams.<br />
            Every fixture.
          </h1>

          {/* Sub-copy */}
          <p
            className="text-sm sm:text-base max-w-xl leading-relaxed"
            style={{ color: "rgba(255,255,255,0.50)" }}
          >
            Follow every match, stadium, and kick-off time for your favourite
            national teams throughout the FIFA World Cup 2026.
          </p>

        </div>
      </div>
    </div>
  );
}