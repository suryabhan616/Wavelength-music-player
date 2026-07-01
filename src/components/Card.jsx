import { Play } from "lucide-react";

export default function Card({ title, sub, grad, onPlay }) {
  return (
    <div className="wl-card" onClick={onPlay}>
      <div className="wl-card-art" style={{ background: grad }}>
        <button
          className="wl-card-play"
          onClick={(e) => {
            e.stopPropagation();
            onPlay();
          }}
        >
          <Play
            size={16}
            fill="#0B0B12"
            color="#0B0B12"
            style={{ marginLeft: 2 }}
          />
        </button>
      </div>

      <div className="wl-card-title">{title}</div>
      <div className="wl-card-sub">{sub}</div>
    </div>
  );
}