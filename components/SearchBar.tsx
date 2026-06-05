type SearchBarProps = {
  search: string;
  setSearch: (search: string) => void;
};

export default function SearchBar({search, setSearch}: SearchBarProps) {
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

