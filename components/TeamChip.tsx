type teamChipProps = {
    team: string;
    onRemove: (team: string) => void;
}

export default function TeamChip({team, onRemove}: teamChipProps) {
    return(
       <div className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-white">
      <span>{team}</span>

      <button
        onClick={() => onRemove(team)}
        className="font-bold"
      >
        ✕
      </button>
    </div>
    )
}

