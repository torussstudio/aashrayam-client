import { useRef, useState } from 'react';
import './GalleryVideo.css';

const IconPlay = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
);
const IconPause = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
);
const IconMute = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12A4.5 4.5 0 0014.5 8v2.18l1.94 1.94c.04-.36.06-.73.06-1.12zM19 12c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.9 8.9 0 0021 12c0-4.28-3-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L18.73 21 20 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg>
);
const IconUnmute = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014.5 8v8a4.47 4.47 0 002-4.5z"/><path d="M14.5 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4-.91 7-4.49 7-8.77s-3-7.86-7-8.77z"/></svg>
);

const GalleryVideo = ({ src, className = '', poster, autoPlay = false }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(autoPlay);
  const [muted, setMuted] = useState(true);

  const togglePlay = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div className={`gallery-video ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="gallery-video__el"
        muted={muted}
        autoPlay={autoPlay}
        loop
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={togglePlay}
      />
      <div className="gallery-video__controls" onClick={e => e.stopPropagation()}>
        <button type="button" className="gallery-video__btn" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? <IconPause /> : <IconPlay />}
        </button>
        <button type="button" className="gallery-video__btn" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
          {muted ? <IconMute /> : <IconUnmute />}
        </button>
      </div>
    </div>
  );
};

export default GalleryVideo;