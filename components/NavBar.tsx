"use client";

type NavbarProps = {
  isDark: boolean;
  onToggleTheme: () => void;
};

export default function Navbar({
  isDark,
  onToggleTheme,
}: NavbarProps) {
  return (
    <nav
      className="sticky top-0 z-50 h-14 flex items-center"
      style={{
        backgroundColor: "var(--sp-navy)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="w-full max-w-5xl mx-auto px-6 flex items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0"
            style={{ backgroundColor: "var(--sp-blue)" }}
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

        {/* Navigation */}
        <div className="hidden sm:flex items-center gap-1">
          {(["Fixtures", "Schedule", "Groups"] as const).map((label) => (
            <span
              key={label}
              className="text-[13px] font-medium px-3 py-1.5 rounded-lg transition-colors duration-150 cursor-pointer"
              style={
                label === "Fixtures"
                  ? {
                      backgroundColor: "var(--sp-blue)",
                      color: "#fff",
                    }
                  : {
                      color: "rgba(255,255,255,0.50)",
                    }
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
          <span>{isDark ? "☀️" : "🌙"}</span>

          <span className="hidden sm:inline">
            {isDark ? "Light mode" : "Dark mode"}
          </span>
        </button>

      </div>
    </nav>
  );
}