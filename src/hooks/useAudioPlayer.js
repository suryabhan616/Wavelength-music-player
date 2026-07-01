import { useState, useRef, useEffect, useCallback } from "react";

export default function useAudioPlayer(tracks) {
  const audioRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(null);
  const [playing, setPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(0.7);

  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const currentTrack =
    currentIndex !== null
      ? tracks[currentIndex]
      : null;

  /* Load Track */

  useEffect(() => {
    if (!audioRef.current) return;
    if (currentIndex === null) return;

    const audio = audioRef.current;

    audio.src = tracks[currentIndex].src;

    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [currentIndex, tracks]);

  /* Volume */

  useEffect(() => {
    if (audioRef.current)
      audioRef.current.volume = volume;
  }, [volume]);

  /* Play */

  const playTrack = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  /* Toggle */

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;

    if (currentIndex === null) {
      playTrack(0);
      return;
    }

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current
        .play()
        .catch(() => {});

      setPlaying(true);
    }
  }, [playing, currentIndex, playTrack]);

  /* Next */

  const goNext = useCallback(() => {
    if (currentIndex === null) {
      playTrack(0);
      return;
    }

    const next = shuffle
      ? Math.floor(Math.random() * tracks.length)
      : (currentIndex + 1) % tracks.length;

    playTrack(next);
  }, [
    currentIndex,
    shuffle,
    tracks,
    playTrack,
  ]);

  /* Previous */

  const goPrev = useCallback(() => {
    if (currentIndex === null) {
      playTrack(0);
      return;
    }

    const prev =
      (currentIndex - 1 + tracks.length) %
      tracks.length;

    playTrack(prev);
  }, [currentIndex, tracks, playTrack]);

  /* Seek */

  const handleSeek = useCallback((pct) => {
    if (!audioRef.current) return;

    if (audioRef.current.duration) {
      audioRef.current.currentTime =
        pct * audioRef.current.duration;
    }
  }, []);

  /* End */

  const handleEnded = useCallback(() => {
    if (repeat) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      return;
    }

    goNext();
  }, [repeat, goNext]);

  const progress =
    duration === 0
      ? 0
      : currentTime / duration;

  return {
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
  };
}