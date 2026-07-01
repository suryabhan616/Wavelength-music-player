import { Home, Search, Library } from "lucide-react";

export default function Sidebar({
  activeNav,
  setActiveNav,
  playlists,
  activePlaylist,
  setActivePlaylist,
}) {
  return (
    <aside className="wl-sidebar">
      {/* Logo */}
      <div className="wl-brand">
        <div className="wl-brand-mark">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 14C4 14 6 8 12 8C18 8 20 14 20 14"
              stroke="#0B0B12"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M4 18C4 18 7 12 12 12C17 12 20 18 20 18"
              stroke="#0B0B12"
              strokeWidth="2.4"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </div>

        <div className="wl-brand-name">Wavelength</div>
      </div>

      {/* Navigation */}
      <nav className="wl-nav">
        <button
          className={`wl-nav-item ${
            activeNav === "home" ? "active" : ""
          }`}
          onClick={() => setActiveNav("home")}
        >
          <Home size={18} />
          Home
        </button>

        <button
          className={`wl-nav-item ${
            activeNav === "search" ? "active" : ""
          }`}
          onClick={() => setActiveNav("search")}
        >
          <Search size={18} />
          Search
        </button>

        <button
          className={`wl-nav-item ${
            activeNav === "library" ? "active" : ""
          }`}
          onClick={() => setActiveNav("library")}
        >
          <Library size={18} />
          Your Library
        </button>
      </nav>

      {/* Playlist Heading */}
      <div className="wl-nav-label">
        Playlists
      </div>

      {/* Playlist List */}
      <div className="wl-playlist-list">
        {playlists.map((playlist, index) => (
          <div
            key={playlist}
            className={`wl-playlist-item ${
              activePlaylist === index ? "active" : ""
            }`}
            onClick={() => setActivePlaylist(index)}
          >
            {playlist}
          </div>
        ))}
      </div>
    </aside>
  );
}