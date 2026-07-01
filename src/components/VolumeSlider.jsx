import { useEffect, useRef, useCallback } from "react";

export default function VolumeSlider({
  volume,
  onChange,
}) {
  const ref = useRef(null);

  const dragging = useRef(false);

  const update = useCallback(
    (e) => {
      const rect = ref.current.getBoundingClientRect();

      const pct = Math.max(
        0,
        Math.min(
          1,
          (e.clientX - rect.left) / rect.width
        )
      );

      onChange(pct);
    },
    [onChange]
  );

  useEffect(() => {
    const move = (e) => {
      if (dragging.current) update(e);
    };

    const up = () => {
      dragging.current = false;
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [update]);

  return (
    <div className="wl-volume-row">
      <div
        ref={ref}
        className="wl-volume-track"
        onMouseDown={(e) => {
          dragging.current = true;
          update(e);
        }}
      >
        <div
          className="wl-volume-fill"
          style={{
            width: `${volume * 100}%`,
          }}
        />
      </div>
    </div>
  );
}