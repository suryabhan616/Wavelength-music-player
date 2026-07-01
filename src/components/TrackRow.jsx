function fmtTime(s) {
  if (!isFinite(s) || s < 0) s = 0;

  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);

  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function TrackRow({
  track,
  index,
  isPlaying,
  onPlay,
}) {
  return (
    <button
      className={`wl-track-row${isPlaying ? " playing" : ""}`}
      onClick={onPlay}
    >
      <div className="wl-track-num">{index + 1}</div>

      <div className="wl-track-info">
        <div
          className="wl-track-thumb"
          style={{ background: track.grad }}
        />

        <div className="wl-track-name-wrap">
          <div className="wl-track-name">{track.title}</div>

          <div className="wl-track-artist">
            {track.artist}
          </div>
        </div>
      </div>

      <div className="wl-track-album">
        {track.album}
      </div>

      <div className="wl-track-dur">
        {fmtTime(track.duration)}
      </div>
    </button>
  );
}