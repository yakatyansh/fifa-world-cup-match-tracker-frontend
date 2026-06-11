import ReactCountryFlag from "react-country-flag";
import { countryCodes } from "../data/countryCodes";

type Match = {
  date: string;
  home_team: string;
  away_team: string;
  group: string;
  stadium: string;
};

type MatchCardProps = {
  match: Match;
  theme: string;
  index?: number;
};

/*
  Left-border accent color per team.
  Falls back to --sp-blue if the team isn't listed here.
  Extend this map as your fixture data grows.
*/
const TEAM_ACCENT: Record<string, string> = {
  Brazil:      "#009c3b",
  England:     "#cf081f",
  Germany:     "#2a2a2a",
  France:      "#003189",
  Argentina:   "#74acdf",
  Spain:       "#c60b1e",
  Portugal:    "#006600",
  Netherlands: "#f36c00",
  Belgium:     "#f00",
  Italy:       "#003994",
  USA:         "#bf0a30",
  Mexico:      "#006847",
  Japan:       "#bc002d",
  Morocco:     "#c1272d",
  Senegal:     "#00853f",
  Croatia:     "#ff0000",
  Serbia:      "#c6363c",
  Switzerland: "#ff0000",
  Poland:      "#dc143c",
  Australia:   "#00843d",
  Ecuador:     "#ffd100",
  Cameroon:    "#007a5e",
  Ghana:       "#006b3f",
  Uruguay:     "#5aaae7",
  Colombia:    "#fcd116",
  Chile:       "#d52b1e",
  Costa_Rica:  "#002b7f",
  Canada:      "#ff0000",
  South_Korea: "#003478",
  Iran:        "#239f40",
};

function getAccent(teamName: string): string {
  const key = teamName.replace(/\s+/g, "_");
  return TEAM_ACCENT[key] ?? TEAM_ACCENT[teamName] ?? "var(--sp-blue)";
}

function formatDate(raw: string): string {
  /* Handles both ISO strings and "DD Mon YYYY, HH:MM" format from scraper */
  try {
    const d = new Date(raw);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  } catch {
    /* fall through */
  }
  return raw; /* return raw string if it can't be parsed */
}

export default function MatchCard({ match, index = 0 }: MatchCardProps) {
  const accent = getAccent(match.home_team);
  const homeCode = countryCodes[match.home_team];
  const awayCode = countryCodes[match.away_team];

  return (
    <article
      className="sp-animate-in rounded-xl p-5 mb-3 cursor-pointer transition-all duration-200"
      style={{
        backgroundColor: "var(--sp-bg-surface)",
        border: "0.5px solid var(--sp-border)",
        borderLeft: `3px solid ${accent}`,
        animationDelay: `${index * 60}ms`,
      }}
      /* Lift on hover is handled by Tailwind below */
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.boxShadow =
          "0 4px 16px rgba(0,0,0,0.12)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.boxShadow = "none")
      }
      aria-label={`${match.home_team} vs ${match.away_team}, Group ${match.group}`}
    >
      {/* ── Top row: group badge ──────────────────────────────── */}
      <div className="mb-4">
        <span
          className="inline-block text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded"
          style={{
            backgroundColor: "var(--sp-blue-tint)",
            color: "var(--sp-blue)",
          }}
        >
          Group {match.group}
        </span>
      </div>

      {/* ── Teams row ──────────────────────────────────────────── */}
      <div className="grid grid-cols-3 items-center text-center gap-3 mb-5">

        {/* Home team */}
        <div className="flex flex-col items-center gap-2">
          {homeCode ? (
            <ReactCountryFlag
              countryCode={homeCode}
              svg
              style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%" }}
              title={match.home_team}
            />
          ) : (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                backgroundColor: "var(--sp-blue-tint)",
                color: "var(--sp-blue)",
              }}
              aria-hidden="true"
            >
              {match.home_team.slice(0, 2).toUpperCase()}
            </div>
          )}
          <span
            className="text-sm sm:text-base font-bold leading-tight"
            style={{ color: "var(--sp-text-primary)" }}
          >
            {match.home_team}
          </span>
        </div>

        {/* VS divider */}
        <div className="flex flex-col items-center">
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "var(--sp-text-muted)" }}
          >
            vs
          </span>
        </div>

        {/* Away team */}
        <div className="flex flex-col items-center gap-2">
          {awayCode ? (
            <ReactCountryFlag
              countryCode={awayCode}
              svg
              style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%" }}
              title={match.away_team}
            />
          ) : (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                backgroundColor: "var(--sp-blue-tint)",
                color: "var(--sp-blue)",
              }}
              aria-hidden="true"
            >
              {match.away_team.slice(0, 2).toUpperCase()}
            </div>
          )}
          <span
            className="text-sm sm:text-base font-bold leading-tight"
            style={{ color: "var(--sp-text-primary)" }}
          >
            {match.away_team}
          </span>
        </div>

      </div>

      {/* ── Footer: date + stadium ─────────────────────────────── */}
      <div
        className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-5 pt-3 text-xs"
        style={{
          borderTop: "0.5px solid var(--sp-border)",
          color: "var(--sp-text-muted)",
        }}
      >
        <span className="flex items-center gap-1.5">
          {/* Calendar icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {formatDate(match.date)}
        </span>

        <span className="flex items-center gap-1.5">
          {/* Stadium icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8z"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10V8m8 2V8M12 10V7"/>
          </svg>
          {match.stadium}
        </span>
      </div>
    </article>
  );
}