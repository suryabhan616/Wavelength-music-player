/* ===========================
   Gradients
=========================== */

export const GRADIENTS = [
  "linear-gradient(150deg,#ff7a3d,#FFB020)",
  "linear-gradient(150deg,#00D9C0,#2b6cff)",
  "linear-gradient(150deg,#8b5cf6,#ec4899)",
  "linear-gradient(150deg,#FFB020,#ffd873)",
  "linear-gradient(150deg,#2b6cff,#00D9C0)",
  "linear-gradient(150deg,#ec4899,#ff7a3d)",
  "linear-gradient(150deg,#22c55e,#00D9C0)",
  "linear-gradient(150deg,#ffd873,#ff7a3d)",
];

/* ===========================
   Artists
=========================== */

export const ARTISTS = [
  "Nadia Vale",
  "The Low Static",
  "Orin Marsh",
  "Fable & Coast",
  "June Hollow",
  "Reiko Tide",
  "Static Bloom",
  "Marlowe Sun",
  "The Amber Room",
  "Kite Season",
];

/* ===========================
   Albums
=========================== */

export const ALBUMS = [
  "Late Signal",
  "Slow Weather",
  "Nightframe",
  "Paper Tide",
  "Wire & Bone",
  "Glass Corridor",
  "After Blue",
  "Dust Radio",
];

/* ===========================
   Track Names
=========================== */

export const TRACK_NAMES = [
  "Halflight",
  "Undertow",
  "Static Bloom",
  "Coastline Static",
  "Amber Hours",
  "Paper Weather",
  "Slow Machine",
  "Nightframe",
  "Wire Season",
  "Blue Corridor",
  "Faultline",
  "Afterglow",
  "Dust Radio",
  "Glass & Hollow",
  "Kite Sky",
];

/* ===========================
   Playlists
=========================== */

export const PLAYLIST_NAMES = [
  "Late Signal",
  "Focus Flow",
  "Rainy Desk",
  "Night Drive",
  "Slow Burn",
  "Open Road",
  "Low Light",
  "Sunday Static",
  "Analog Heart",
  "Drift",
];

/* ===========================
   Demo Audio
=========================== */

const srcFor = (i) =>
  `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${
    (i % 16) + 1
  }.mp3`;

/* ===========================
   Tracks
=========================== */

export const TRACKS = Array.from(
  { length: 12 },
  (_, i) => ({
    id: i,
    title: TRACK_NAMES[i % TRACK_NAMES.length],
    artist: ARTISTS[i % ARTISTS.length],
    album: ALBUMS[i % ALBUMS.length],
    duration: 150 + ((i * 13) % 140),
    src: srcFor(i),
    grad: GRADIENTS[i % GRADIENTS.length],
  })
);

/* ===========================
   Made For You
=========================== */

export const MIXES = Array.from(
  { length: 6 },
  (_, i) => ({
    title: [
      "Focus Flow",
      "Rainy Desk",
      "Night Drive",
      "Slow Burn",
      "Open Road",
      "Low Light",
    ][i],

    sub: "Playlist · Wavelength",

    grad: GRADIENTS[(i + 2) % GRADIENTS.length],
  })
);

/* ===========================
   New Releases
=========================== */

export const NEW_RELEASES = Array.from(
  { length: 6 },
  (_, i) => ({
    title: ALBUMS[(i + 2) % ALBUMS.length],

    sub: ARTISTS[(i + 3) % ARTISTS.length],

    grad: GRADIENTS[(i + 5) % GRADIENTS.length],
  })
);

/* ===========================
   Waveform
=========================== */

function seededHeights(count, seed = 42) {
  let s = seed;

  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  return Array.from(
    { length: count },
    () => 4 + rand() * 22
  );
}

export const WAVE_HEIGHTS =
  seededHeights(64);