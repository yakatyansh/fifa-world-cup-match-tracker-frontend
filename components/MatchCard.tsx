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
};

export default function MatchCard({
  match,
}: MatchCardProps) {
  return (
    <div className="border border-l-4 border-l-blue-500 rounded-xl p-5 mb-4 hover:border-blue-400 transition-all bg-white">
      <span
        className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm mb-6 ">
        GROUP {match.group}
      </span>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          items-center
          gap-4
          text-center
          mb-6
        "
      >
        <div className="flex flex-col items-center">
          <ReactCountryFlag
            countryCode={countryCodes[match.home_team]}
            style={{
              width: "2.5rem",
              height: "2.5rem",
            }}
          />
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-shadow-black">
            {match.home_team}
          </h2>
        </div>

        <span className=" text-gray-400 font-semibold text-xl">
          VS
        </span>

        <div className="flex flex-col items-center">
          <ReactCountryFlag
            countryCode={countryCodes[match.away_team]}
            style={{
              width: "48px",
              height: "48px",
            }}
          />
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            {match.away_team}
          </h2>
        </div>
      </div>

      <div
        className="
          flex
          flex-col
          gap-2
          text-base
          text-gray-300
        "
      >
        <div>
          📅 {match.date}
        </div>

        <div>
          🏟 {match.stadium}
        </div>
      </div>
    </div>
  );
}