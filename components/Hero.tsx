type HeroProps = {
  theme: string;
  onToggleTheme: () => void;
};

export default function Hero({ theme, onToggleTheme }: HeroProps) {
  const isDark = theme === "dark";

  return (
    <div>
      {/* ════════════════════════════════════════════════════════
          NAV BAR
          Background: always --sp-navy (dark regardless of theme)
          Position: sticky top-0 so it scrolls with the page
      ════════════════════════════════════════════════════════ */}
      <nav
        className="sticky top-0 z-50 h-14 flex items-center"
        style={{
          backgroundColor: "var(--sp-navy)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="w-full max-w-5xl mx-auto px-6 flex items-center justify-between gap-4">

          {/* Logo mark + wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0"
              style={{ backgroundColor: "var(--sp-blue)" }}
              aria-hidden="true"
            >
              ⚽
            </div>
            <div className="leading-none">
              <p className="text-[13px] font-bold tracking-[0.08em] uppercase text-white leading-tight">
                WC26
              </p>
              <p
                className="text-[10px] font-semibold tracking-[0.12em] uppercase leading-tight"
                style={{ color: "var(--sp-gold)" }}
              >
                Tracker
              </p>
            </div>
          </div>

          {/* Nav links — hidden on small screens */}
          <div className="hidden sm:flex items-center gap-1">
            {(["Schedule", "Groups", "Teams"] as const).map((label) => (
              <span
                key={label}
                className="text-[13px] font-medium px-3 py-1.5 rounded-lg transition-colors duration-150 cursor-default"
                style={
                  label === "Schedule"
                    ? { backgroundColor: "var(--sp-blue)", color: "#fff" }
                    : { color: "rgba(255,255,255,0.50)" }
                }
              >
                {label}
              </span>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            className="shrink-0 flex items-center gap-2 rounded-full text-[11px] font-semibold px-3 py-1.5 transition-colors duration-150"
            style={{
              backgroundColor: "rgba(255,255,255,0.09)",
              border: "0.5px solid rgba(255,255,255,0.18)",
              color: "rgba(255,255,255,0.75)",
            }}
          >
            <span aria-hidden="true">{isDark ? "☀️" : "🌙"}</span>
            <span className="hidden sm:inline">
              {isDark ? "Light mode" : "Dark mode"}
            </span>
          </button>

        </div>
      </nav>

      {/* ════════════════════════════════════════════════════════
          HERO SECTION
          Background: always --sp-navy (same dark base as nav)
          Texture: CSS diagonal stripe via hero-texture class
      ════════════════════════════════════════════════════════ */}
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