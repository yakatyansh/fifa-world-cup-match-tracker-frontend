"use client";

import MatchCard from "@/components/MatchCard";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import TeamChip from "@/components/TeamChip";
import Hero from "@/components/Hero";
import Navbar from "@/components/NavBar";

type TeamLookup = Record<string, { iso2: string; flag?: string }>;

type Match = {
  date: string;
  home_team: string;
  away_team: string;
  group: string;
  stadium: string;
  home_score: string;
  away_score: string;
  finished: string;
  time_elapsed: string;
  home_scorers: string[];
  away_scorers: string[];
};

type Team = {
  id: string;
  name_en: string;
  iso2: string;
  flag: string;
  group: string;
};

function normalizeScorers(value: string | string[] | undefined): string[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value.trim() !== "") return [value];
  return [];
}

function normalizeMatch(raw: any): Match {
  return {
    date: raw.date,
    home_team: raw.home_team,
    away_team: raw.away_team,
    group: raw.group,
    stadium: raw.stadium,
    home_score: raw.home_score,
    away_score: raw.away_score,
    finished: raw.finished,
    time_elapsed: raw.time_elapsed,
    home_scorers: normalizeScorers(raw.home_scorers),
    away_scorers: normalizeScorers(raw.away_scorers),
  };
}

export default function Home() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [search, setSearch]             = useState("");
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [matches, setMatches]           = useState<Match[]>([]);
  const [theme, setTheme]               = useState("dark");

  /* ── Apply dark class to <html> so CSS variables switch ──────── */
  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [theme]);

  /* ── Fetch all teams on mount ─────────────────────────────────── */
  useEffect(() => {
  console.log("Fetching teams...");

  fetch("https://fifa-world-cup-match-tracker-backend.onrender.com/teams")
    .then((response) => {
      console.log("STATUS:", response.status);
      return response.json();
    })
    .then((data) => {
      console.log("DATA:", data);
      setTeams(data);
    })
    .catch((error) => {
      console.error("ERROR:", error);
    });
}, []);

  /* ── Fetch matches whenever selected teams change ─────────────── */
  useEffect(() => {
     console.log("Fetching teams...");
    if (selectedTeams.length === 0) {
      setMatches([]);
      return;
    }
    fetch(`https://fifa-world-cup-match-tracker-backend.onrender.com/matches?teams=${selectedTeams.join(",")}`)
      .then((res) => res.json())
      .then((data) => setMatches(data))
      .catch((err) => console.error("Failed to fetch matches:", err));
  }, [selectedTeams]);

  /* ── Helpers ──────────────────────────────────────────────────── */
const filteredTeams = teams.filter(
  (team) =>
    team.name_en.toLowerCase().includes(search.toLowerCase()) &&
    !selectedTeams.includes(team.name_en)
);

  const addTeam = (team: string) => {
    if (selectedTeams.includes(team)) return;
    setSelectedTeams([...selectedTeams, team]);
    setSearch("");
  };

  const removeTeam = (team: string) => {
    setSelectedTeams(selectedTeams.filter((t) => t !== team));
  };

  /* ── Groups represented in current matches ────────────────────── */
  const groups = [...new Set(matches.map((m) => m.group))].sort();
  const teamLookup = Object.fromEntries(
  teams.map((team) => [
    team.name_en,
    {
      flag: team.flag,
      iso2: team.iso2,
    },
  ])
);

  return (

    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--sp-bg-page)" }}
    >
      <Navbar
        isDark={theme === "dark"}
        onToggleTheme={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
      />
      <Hero
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
      />

      {/* ── Main content ──────────────────────────────────────────── */}
      <main className="w-full max-w-5xl mx-auto px-6 py-8" id="main-content">

        {/* ── Team search section ───────────────────────────────── */}
        <section className="mb-8" aria-label="Team selection">

          <h2
            className="text-[11px] font-bold tracking-widest uppercase mb-3"
            style={{ color: "var(--sp-blue)" }}
          >
            Select teams
          </h2>

          {/* Selected team chips */}
          {selectedTeams.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3" role="list" aria-label="Selected teams">
              {selectedTeams.map((team) => (
                <div key={team} role="listitem">
                  <TeamChip team={team} onRemove={removeTeam} />
                </div>
              ))}
            </div>
          )}

          {/* Search input */}
          <SearchBar search={search} setSearch={setSearch} theme={theme} />

          {/* Dropdown results */}
          {search.trim() !== "" && (
            <div
              className="mt-1 rounded-xl overflow-hidden"
              style={{
                border: "0.5px solid var(--sp-border-strong)",
                backgroundColor: "var(--sp-bg-surface)",
              }}
              role="listbox"
              aria-label="Team search results"
            >
              {filteredTeams.length === 0 ? (
                <p
                  className="px-4 py-3 text-sm"
                  style={{ color: "var(--sp-text-muted)" }}
                >
                  No teams match &ldquo;{search}&rdquo;
                </p>
              ) : (
                filteredTeams.slice(0, 8).map((team) => (
                <button
                  key={team.id}
                  role="option"
                  aria-selected={false}
                  onClick={() => addTeam(team.name_en)}
                  className="block w-full text-left px-4 py-3 hover:bg-blue-500/10 transition-colors"
                  style={{
                    color: "var(--sp-text-primary)",
                  }}
                >
                  {team.name_en}
                </button>
              ))
              )}
            </div>
          )}
        </section>

        {/* ── Stats bar — only when matches are loaded ──────────── */}
        {matches.length > 0 && (
          <div
            className="grid grid-cols-3 gap-3 mb-8"
            role="region"
            aria-label="Schedule summary"
          >
            {[
              {
                label: "Fixtures",
                value: matches.length,
                sub: `${selectedTeams.length} team${selectedTeams.length > 1 ? "s" : ""}`,
              },
              {
                label: "Groups",
                value: groups.join(" · ") || "—",
                sub: `${groups.length} group${groups.length > 1 ? "s" : ""}`,
              },
              {
                label: "Next match",
                value: (() => {
                  const next = matches
                    .map((m) => new Date(m.date))
                    .filter((d) => !isNaN(d.getTime()) && d > new Date())
                    .sort((a, b) => a.getTime() - b.getTime())[0];
                  if (!next) return "—";
                  return next.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                  });
                })(),
                sub: "upcoming",
              },
            ].map(({ label, value, sub }) => (
              <div
                key={label}
                className="rounded-xl p-4"
                style={{
                  backgroundColor: "var(--sp-bg-surface)",
                  border: "0.5px solid var(--sp-border)",
                }}
              >
                <p
                  className="text-[10px] font-bold uppercase tracking-widest mb-1"
                  style={{ color: "var(--sp-text-muted)" }}
                >
                  {label}
                </p>
                <p
                  className="text-xl font-extrabold leading-none mb-0.5"
                  style={{ color: "var(--sp-text-primary)" }}
                >
                  {value}
                </p>
                <p
                  className="text-[11px]"
                  style={{ color: "var(--sp-text-muted)" }}
                >
                  {sub}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ── Match cards ───────────────────────────────────────── */}
        {matches.length > 0 && (
          <section aria-label="Your schedule">
            <div className="flex items-center justify-between mb-4">
              <h2
                className="text-[11px] font-bold tracking-widest uppercase"
                style={{ color: "var(--sp-blue)" }}
              >
                Your schedule
              </h2>
              <span
                className="text-xs"
                style={{ color: "var(--sp-text-muted)" }}
              >
                {matches.length} fixture{matches.length > 1 ? "s" : ""}
              </span>
            </div>

            <div>
              {matches.map((match, index) => (
                <MatchCard
                  key={index}
                  match={match}
                  theme={theme}
                  index={index}
                  teamLookup={teamLookup}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Empty state — teams selected but no matches ───────── */}
        {selectedTeams.length > 0 && matches.length === 0 && (
          <div className="flex flex-col items-center text-center py-16">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
              style={{ backgroundColor: "var(--sp-blue-tint)" }}
              aria-hidden="true"
            >
              📅
            </div>
            <p
              className="font-bold mb-1"
              style={{ color: "var(--sp-text-primary)" }}
            >
              No fixtures found
            </p>
            <p
              className="text-sm max-w-xs"
              style={{ color: "var(--sp-text-muted)" }}
            >
              No scheduled matches for the selected{" "}
              {selectedTeams.length === 1 ? "team" : "teams"} yet.
            </p>
          </div>
        )}

        {/* ── Welcome state — no teams selected yet ─────────────── */}
        {selectedTeams.length === 0 && (
          <div className="flex flex-col items-center text-center py-16">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
              style={{ backgroundColor: "var(--sp-blue-tint)" }}
              aria-hidden="true"
            >
              🔍
            </div>
            <p
              className="font-bold mb-1"
              style={{ color: "var(--sp-text-primary)" }}
            >
              Pick your teams to get started
            </p>
            <p
              className="text-sm max-w-xs"
              style={{ color: "var(--sp-text-muted)" }}
            >
              Search for a national team above and select it to see all their
              World Cup fixtures.
            </p>
          </div>
        )}

      </main>
    </div>
  );
}