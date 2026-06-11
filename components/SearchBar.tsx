type SearchBarProps = {
  search: string;
  setSearch: (value: string) => void;
  theme: string;
};

export default function SearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors duration-150"
      style={{
        backgroundColor: "var(--sp-bg-surface)",
        border: "0.5px solid var(--sp-border-strong)",
      }}
    >
      {/* Search icon */}
      <svg
        className="w-4 h-4 shrink-0"
        style={{ color: "var(--sp-text-muted)" }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
        />
      </svg>

      <input
        type="text"
        placeholder="Search national teams…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search national teams"
        className="w-full bg-transparent text-sm outline-none"
        style={{
          color: "var(--sp-text-primary)",
          fontFamily: "inherit",
        }}
      />

      {/* Clear button — only visible when there is text */}
      {search.length > 0 && (
        <button
          onClick={() => setSearch("")}
          aria-label="Clear search"
          className="shrink-0 rounded text-xs font-semibold px-2 py-0.5 transition-colors duration-150"
          style={{
            color: "var(--sp-text-muted)",
            backgroundColor: "var(--sp-blue-tint)",
          }}
        >
          Clear
        </button>
      )}
    </div>
  );
}