"use client";
import MatchCard from "@/components/MatchCard";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import TeamChip from "@/components/TeamChip";
import Hero from "@/components/Hero";

export default function Home() {
  const [teams, setTeams] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [matches, setMatches] = useState([]);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/teams")
      .then((response) => response.json())
      .then((data) => {
        setTeams(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedTeams.length === 0) {
      setMatches([]);
      return;
    }

    fetch (`http://127.0.0.1:8000/matches?teams=${selectedTeams.join(",")}`)
      .then((response) => response.json())
      .then((data) => {
        setMatches(data);
      })
      .catch((error) => console.error(error));
  }, [selectedTeams]);

  const filteredTeams = teams.filter(
    (team) =>
      team.toLowerCase().includes(search.toLowerCase()) &&
      !selectedTeams.includes(team)
  );

  const addTeam = (team: string) => {
    if (selectedTeams.includes(team)) return;

    setSelectedTeams([...selectedTeams, team]);
    setSearch("");
  };

  const removeTeam = (team: string) => {
    setSelectedTeams(
      selectedTeams.filter((t) => t !== team)
    );
  };

  return (
 <main
  className={`min-h-screen transition-colors duration-300 ${
    theme === "dark"
      ? "bg-black text-white"
      : "bg-slate-100 text-slate-900"
  }`}
>
    <button
  onClick={() =>
    setTheme(
      theme === "dark"
        ? "light"
        : "dark"
    )
  }
  className="px-4 py-2 rounded-lg border"
>
  {theme === "dark"
    ? "☀️ Light"
    : "🌙 Dark"}
</button>

    <section
  className={
    theme === "dark"
      ? "bg-[#091628]"
      : "bg-gray-200"
  }
>
      <Hero theme={theme}/>
    </section>

    <section className="max-w-6xl mx-auto px-6 py-10">

      <h2 className="text-2xl font-semibold mb-4">
        Teams
      </h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {selectedTeams.map((team) => (
          <TeamChip
            key={team}
            team={team}
            onRemove={removeTeam}
          />
        ))}
      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
        theme = {theme}
      />

      {search.trim() !== "" && (
        <div className="mt-2 rounded-lg border overflow-hidden">
          {filteredTeams.slice(0, 8).map((team) => (
            <button
              key={team}
              onClick={() => addTeam(team)}
              className="
                block
                w-full
                text-left
                p-3
                hover:bg-gray-100
                hover:text-black
                transition
              "
            >
              {team}
            </button>
          ))}
        </div>
      )}

      {/* Future Stats Bar Goes Here */}

      <div className="mt-10">

        {matches.length > 0 && (
          <h2 className="
            text-blue-500
            font-bold
            tracking-wider
            uppercase
            mb-4
          ">
            Your Schedule
          </h2>
        )}

        {matches.map((match, index) => (
          <MatchCard
            key={index}
            match={match}
            theme={theme}
          />
        ))}

      </div>

    </section>

  </main>
);
}