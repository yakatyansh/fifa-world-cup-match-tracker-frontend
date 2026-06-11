type TeamChipProps = {
  team: string;
  onRemove: (team: string) => void;
};

export default function TeamChip({ team, onRemove }: TeamChipProps) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-white select-none"
      style={{ backgroundColor: "var(--sp-blue)" }}
    >
      <span>{team}</span>

      <button
        onClick={() => onRemove(team)}
        aria-label={`Remove ${team}`}
        className="rounded-full w-4 h-4 flex items-center justify-center text-white/70 hover:text-white transition-colors duration-150 hover:bg-white/20"
      >
        {/* ✕ as SVG so it scales predictably */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 12 12"
          fill="currentColor"
          className="w-2.5 h-2.5"
          aria-hidden="true"
        >
          <path d="M1.5 1.5 10.5 10.5M10.5 1.5 1.5 10.5"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" fill="none"
          />
        </svg>
      </button>
    </div>
  );
}