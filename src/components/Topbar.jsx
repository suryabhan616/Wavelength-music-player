import { Search } from "lucide-react";

export default function Topbar({
  query,
  setQuery,
  scrolled,
}) {
  return (
    <div
      className={`wl-topbar${scrolled ? " scrolled" : ""}`}
    >
      <div className="wl-search">
        <Search
          size={16}
          color="var(--muted)"
        />

        <input
          type="text"
          placeholder="Search songs, artists, albums"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div
        className="wl-avatar"
        title="Profile"
      />
    </div>
  );
}