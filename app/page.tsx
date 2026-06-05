"use client";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";

export default function Home() {
  const [teams, setTeams] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const filteredTeams = teams.filter((team) =>
    team.toLowerCase().includes(search.toLowerCase())
  );


  useEffect(() => {
    fetch("http://127.0.0.1:8000/teams")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTeams(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">
        FIFA World Cup 2026 Tracker
      </h1>

      <h2 className="text-2xl font-semibold mb-4">
        Teams
      </h2>

      <SearchBar search={search} setSearch={setSearch} />

      <ul className="space-y-2">
        {filteredTeams.map((team) => (
          <li
            key={team}
            className="border rounded-lg p-3"
          >
            {team}
          </li>
        ))}
      </ul>
    </main>
  );
}