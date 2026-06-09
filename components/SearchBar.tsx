type SearchBarProps = {
  search: string;
  setSearch: (search: string) => void;
  theme: string;
};

export default function SearchBar({ search, setSearch, theme }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search national teams..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full rounded-lg border p-3"
    />
  );
}

