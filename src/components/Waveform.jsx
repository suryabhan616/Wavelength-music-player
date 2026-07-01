import { useRef } from "react";

const WAVE_HEIGHTS = [
  8,14,10,20,12,18,8,22,
  10,18,14,24,8,12,20,10,
  16,22,12,18,10,20,8,16,
  24,10,14,18,12,20,10,16,
  8,20,12,18,10,22,14,16,
  12,20,10,18,8,22,12,20,
  16,10,24,12,18,14,20,10,
  22,12,18,10,20,8,14,18
];

export default function Waveform({
  progress,
  onSeek,
}) {
  const ref = useRef(null);

  const filledCount = Math.floor(
    progress * WAVE_HEIGHTS.length
  );

  function handleClick(e) {
    const rect = ref.current.getBoundingClientRect();

    const pct = Math.max(
      0,
      Math.min(
        1,
        (e.clientX - rect.left) / rect.width
      )
    );

    onSeek(pct);
  }

  return (
    <div
      className="wl-waveform"
      ref={ref}
      onClick={handleClick}
    >
      {WAVE_HEIGHTS.map((h, i) => (
        <div
          key={i}
          className={`wl-bar${
            i < filledCount ? " filled" : ""
          }`}
          style={{ height: h }}
        />
      ))}
    </div>
  );
}