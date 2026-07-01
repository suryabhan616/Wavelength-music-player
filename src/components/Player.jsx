import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Heart,
  Volume2,
} from "lucide-react";

import Waveform from "./Waveform";
import VolumeSlider from "./VolumeSlider";

function fmtTime(s) {
  if (!isFinite(s) || s < 0) s = 0;

  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);

  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function Player({
  currentTrack,
  currentIndex,
  liked,
  toggleLike,

  shuffle,
  setShuffle,

  repeat,
  setRepeat,

  playing,
  togglePlay,

  goPrev,
  goNext,

  currentTime,
  duration,
  progress,

  handleSeek,

  volume,
  setVolume,
}) {
  return (
    <div className="wl-player">
      {/* Left */}
      <div className="wl-now-playing">
        <div
          className="wl-now-thumb"
          style={{
            background: currentTrack
              ? currentTrack.grad
              : "linear-gradient(150deg,#ff7a3d,#FFB020)",
          }}
        />

        <div className="wl-now-text">
          <div className="wl-now-title">
            {currentTrack
              ? currentTrack.title
              : "Choose a track"}
          </div>

          <div className="wl-now-artist">
            {currentTrack
              ? currentTrack.artist
              : "—"}
          </div>
        </div>

        <button
          className={`wl-like-btn${
            currentIndex !== null &&
            liked.has(currentIndex)
              ? " liked"
              : ""
          }`}
          onClick={toggleLike}
        >
          <Heart
            size={16}
            fill={
              currentIndex !== null &&
              liked.has(currentIndex)
                ? "var(--amber)"
                : "none"
            }
          />
        </button>
      </div>

      {/* Center */}
      <div className="wl-player-center">
        <div className="wl-controls">
          <button
            className={`wl-ctrl-btn${
              shuffle ? " wl-active" : ""
            }`}
            onClick={() => setShuffle(!shuffle)}
          >
            <Shuffle size={15} />
          </button>

          <button
            className="wl-ctrl-btn"
            onClick={goPrev}
          >
            <SkipBack
              size={17}
              fill="currentColor"
            />
          </button>

          <button
            className="wl-play-toggle"
            onClick={togglePlay}
          >
            {playing ? (
              <Pause
                size={15}
                fill="currentColor"
              />
            ) : (
              <Play
                size={15}
                fill="currentColor"
                style={{ marginLeft: 2 }}
              />
            )}
          </button>

          <button
            className="wl-ctrl-btn"
            onClick={goNext}
          >
            <SkipForward
              size={17}
              fill="currentColor"
            />
          </button>

          <button
            className={`wl-ctrl-btn${
              repeat ? " wl-active" : ""
            }`}
            onClick={() => setRepeat(!repeat)}
          >
            <Repeat size={15} />
          </button>
        </div>

        <div className="wl-scrub-row">
          <div className="wl-time">
            {fmtTime(currentTime)}
          </div>

          <Waveform
            progress={progress}
            onSeek={handleSeek}
          />

          <div className="wl-time right">
            {fmtTime(duration)}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="wl-player-right">
        <div
          className="wl-eq-icon"
          style={{
            visibility: playing
              ? "visible"
              : "hidden",
          }}
        >
          <span
            style={{
              animationPlayState: playing
                ? "running"
                : "paused",
              height: 6,
            }}
          />

          <span
            style={{
              animationPlayState: playing
                ? "running"
                : "paused",
              height: 10,
            }}
          />

          <span
            style={{
              animationPlayState: playing
                ? "running"
                : "paused",
              height: 4,
            }}
          />
        </div>

        <Volume2
          size={16}
          color="var(--muted)"
        />

        <VolumeSlider
          volume={volume}
          onChange={setVolume}
        />
      </div>
    </div>
  );
}