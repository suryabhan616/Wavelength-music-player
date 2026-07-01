import { useState, useMemo } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Player from "./components/Player";
import Card from "./components/Card";
import TrackRow from "./components/TrackRow";

import useAudioPlayer from "./hooks/useAudioPlayer";

import {
  TRACKS,
  MIXES,
  NEW_RELEASES,
  PLAYLIST_NAMES,
} from "./data/tracks";

export default function Wavelength() {
  /* ---------------- Navigation ---------------- */

  const [activeNav, setActiveNav] = useState("home");
  const [activePlaylist, setActivePlaylist] = useState(0);

  /* ---------------- Search ---------------- */

  const [query, setQuery] = useState("");

  /* ---------------- UI ---------------- */

  const [toast, setToast] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  /* ---------------- Likes ---------------- */

  const [liked, setLiked] = useState(() => new Set());

  /* ---------------- Audio Hook ---------------- */

  const {
    audioRef,

    currentTrack,
    currentIndex,

    playing,

    currentTime,
    duration,
    progress,

    volume,
    shuffle,
    repeat,

    setVolume,
    setShuffle,
    setRepeat,

    playTrack,
    togglePlay,

    goNext,
    goPrev,

    handleSeek,
    handleEnded,

    setCurrentTime,
    setDuration,
  } = useAudioPlayer(TRACKS);

  /* ---------------- Search ---------------- */

  const filteredTracks = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return TRACKS;

    return TRACKS.filter(
      (track) =>
        track.title.toLowerCase().includes(q) ||
        track.artist.toLowerCase().includes(q) ||
        track.album.toLowerCase().includes(q)
    );
  }, [query]);

  /* ---------------- Like ---------------- */

  function toggleLike() {
    if (currentIndex === null) return;

    setLiked((prev) => {
      const next = new Set(prev);

      if (next.has(currentIndex)) {
        next.delete(currentIndex);
      } else {
        next.add(currentIndex);

        setToast(
          `Added "${TRACKS[currentIndex].title}" to Liked Songs`
        );

        setTimeout(() => {
          setToast(null);
        }, 1800);
      }

      return next;
    });
  }

  return (
    <div className="wl-root">

      {/* Sidebar */}

      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        playlists={PLAYLIST_NAMES}
        activePlaylist={activePlaylist}
        setActivePlaylist={setActivePlaylist}
      />

      {/* Main */}

      <main
        className="wl-main"
        onScroll={(e) =>
          setScrolled(e.currentTarget.scrollTop > 4)
        }
      >
        <Topbar
          query={query}
          setQuery={setQuery}
          scrolled={scrolled}
        />

        <div className="wl-content">

          {/* Hero */}

          <div className="wl-hero">

            <div className="wl-hero-art">
              <svg
                width="56"
                height="56"
                viewBox="0 0 24 24"
                fill="none"
                style={{ opacity: 0.85 }}
              >
                <path
                  d="M4 14C4 14 6 8 12 8C18 8 20 14 20 14"
                  stroke="#0B0B12"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <path
                  d="M4 18C4 18 7 12 12 12C17 12 20 18 20 18"
                  stroke="#0B0B12"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.55"
                />
              </svg>
            </div>

            <div>
              <div className="wl-hero-eyebrow">
                Featured Playlist
              </div>

              <div className="wl-hero-title">
                {PLAYLIST_NAMES[activePlaylist]}
              </div>

              <div className="wl-hero-meta">
                Curated for slow evenings ·{" "}
                <b>{TRACKS.length} tracks</b> · 46 min
              </div>
            </div>

          </div>
                    {/* Made For You */}

          <div className="wl-section">

            <div className="wl-section-head">

              <div className="wl-section-title">
                Made for you
              </div>

              <button className="wl-section-link">
                Show all
              </button>

            </div>

            <div className="wl-grid">

              {MIXES.map((mix, i) => (

                <Card
                  key={mix.title}
                  title={mix.title}
                  sub={mix.sub}
                  grad={mix.grad}
                  onPlay={() =>
                    playTrack(i % TRACKS.length)
                  }
                />

              ))}

            </div>

          </div>

          {/* Track List */}

          <div className="wl-section">

            <div className="wl-section-head">

              <div className="wl-section-title">
                {PLAYLIST_NAMES[activePlaylist]}
              </div>

            </div>

            <div className="wl-tracklist">

              <div className="wl-track-head">

                <div>#</div>

                <div>Title</div>

                <div>Album</div>

                <div
                  style={{
                    textAlign: "right",
                  }}
                >
                  Time
                </div>

              </div>

              {filteredTracks.map((track) => {

                const realIndex =
                  TRACKS.indexOf(track);

                return (

                  <TrackRow
                    key={track.id}
                    track={track}
                    index={realIndex}
                    isPlaying={
                      currentIndex === realIndex
                    }
                    onPlay={() =>
                      playTrack(realIndex)
                    }
                  />

                );

              })}

              {filteredTracks.length === 0 && (

                <div
                  style={{
                    padding: "24px 12px",
                    color: "var(--muted)",
                    fontSize: 13.5,
                  }}
                >
                  No tracks match "{query}".
                </div>

              )}

            </div>

          </div>

          {/* New Releases */}

          <div
            className="wl-section"
            style={{
              marginBottom: 60,
            }}
          >

            <div className="wl-section-head">

              <div className="wl-section-title">
                New Releases
              </div>

              <button className="wl-section-link">
                Show all
              </button>

            </div>

            <div className="wl-grid">

              {NEW_RELEASES.map((album, i) => (

                <Card
                  key={album.title}
                  title={album.title}
                  sub={album.sub}
                  grad={album.grad}
                  onPlay={() =>
                    playTrack(
                      (i + 3) % TRACKS.length
                    )
                  }
                />

              ))}

            </div>

          </div>

        </div>

        {toast && (
          <div className="wl-toast">
            {toast}
          </div>
        )}
              </main>

      {/* Player */}

      <Player
        currentTrack={currentTrack}
        currentIndex={currentIndex}
        liked={liked}
        toggleLike={toggleLike}

        shuffle={shuffle}
        setShuffle={setShuffle}

        repeat={repeat}
        setRepeat={setRepeat}

        playing={playing}
        togglePlay={togglePlay}

        goPrev={goPrev}
        goNext={goNext}

        currentTime={currentTime}
        duration={duration}
        progress={progress}

        handleSeek={handleSeek}

        volume={volume}
        setVolume={setVolume}
      />

      {/* Audio */}

      <audio
        ref={audioRef}
        onTimeUpdate={(e) =>
          setCurrentTime(e.currentTarget.currentTime)
        }
        onLoadedMetadata={(e) =>
          setDuration(e.currentTarget.duration)
        }
        onEnded={handleEnded}
      />

    </div>
  );
}