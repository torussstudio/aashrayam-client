import { useState, useEffect, useRef } from "react";
import { api } from "../../utils/api";
import "./TestimonialsSection.css";

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const Stars = ({ count = 5 }) => (
  <div className="t-stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={`t-star${i < count ? " t-star--filled" : ""}`}>
        <StarIcon />
      </span>
    ))}
  </div>
);

const VideoTestimonialCard = ({ t }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className="testimonial-card testimonial-card--video">
      <video
        ref={videoRef}
        src={t.video_url}
        className="t-video"
        poster={t.thumbnail_url || undefined}
        muted
        playsInline
        loop
        onEnded={() => setPlaying(false)}
      />
      <div className="t-video-overlay">
        <button
          className="t-video-btn"
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>
        <button
          className="t-video-btn"
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            >
              <polygon
                points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"
                fill="currentColor"
                stroke="none"
              />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            >
              <polygon
                points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"
                fill="currentColor"
                stroke="none"
              />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

const TextTestimonialCard = ({ t }) => (
  <div className="testimonial-card">
    <div className="t-quote">"</div>
    <Stars count={t.rating || 5} />
    <p className="t-text">{t.content}</p>
    <div className="t-author">
      {t.avatar_url ? (
        <img
          src={t.avatar_url}
          alt={t.name}
          className="t-avatar t-avatar--img"
        />
      ) : (
        <div className="t-avatar">
          {t.name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)}
        </div>
      )}
      <div>
        <div className="t-name">{t.name}</div>
        {t.role && <div className="t-role">{t.role}</div>}
      </div>
    </div>
  </div>
);

const TestimonialCard = ({ t }) =>
  t.video_url ? <VideoTestimonialCard t={t} /> : <TextTestimonialCard t={t} />;

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    api
      .getTestimonials()
      .then((data) => {
        setTestimonials(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const track = trackRef.current;
    if (!track) return;
    const speed = 0.5;
    const step = () => {
      if (!pausedRef.current) {
        posRef.current += speed;
        const halfWidth = track.scrollWidth / 2;
        if (posRef.current >= halfWidth) posRef.current = 0;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [testimonials]);

  return (
    <section className="testimonials-section section" id="testimonials">
      <div className="container">
        <div className="testimonials-section__header">
          <div className="section-label">Trusted by Students & Parents</div>
          <h2 className="section-title">What Our Community Says</h2>
        </div>
      </div>

      {loading ? (
        <div className="container">
          <div className="loader">
            <div className="spinner"></div> Loading testimonials...
          </div>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="container">
          <div className="news-section__empty">No testimonials yet.</div>
        </div>
      ) : (
        <div
          className="testimonials-carousel"
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
        >
          <div className="testimonials-track" ref={trackRef}>
            {[...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard key={`${t.id}-${i}`} t={t} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialsSection;
