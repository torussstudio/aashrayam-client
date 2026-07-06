import { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import './ProgramsSection.css';

const IconClock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const IconUsers = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" />
    <path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const ProgramsSection = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    api.getPrograms().then(data => {
      setPrograms(Array.isArray(data) ? data : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <section className="programs-section section" id="programs">
      <div className="container">

        {/* ── Header — untouched ── */}
        <div className="programs-section__header">
          <div className="section-label">Our Programmes</div>
          <h2 className="section-title">Programmes Designed for<br />Real-World Readiness</h2>
          <p className="section-desc">
            Every programme at Aashrayam is designed with industry input, ensuring graduates
            are equipped with skills employers actually need.
          </p>
        </div>

        {loading ? (
          <div className="loader"><div className="spinner"></div> Loading programmes...</div>
        ) : programs.length === 0 ? (
          <div className="news-section__empty">No programmes listed yet.</div>
        ) : (
          <div className="programs-grid-section" onMouseLeave={() => setFeaturedIndex(0)}>
            {programs.map((prog, i) => (
  <div
    className={`program-card${featuredIndex === i ? ' program-card--featured' : ''}${prog.is_proposed ? ' program-card--proposed' : ''}`}
    key={prog.id}
    style={{ animationDelay: `${i * 0.08}s` }}
    onMouseEnter={() => setFeaturedIndex(i)}
  >
    {/* Top: Program type label + proposed badge */}
    <div className="program-card__top">
      {prog.tags && prog.tags.length > 0 && (
        <span className="program-card__type-label">{prog.tags[0]}</span>
      )}
      {prog.is_proposed && (
        <div className="program-card__proposed-badge">Proposed</div>
      )}
    </div>

    {/* Title */}
    <h3 className="program-card__title">{prog.title}</h3>

    {/* Description */}
    {prog.description && (
      <p className="program-card__desc">{prog.description}</p>
    )}

    {/* Included Add-on as pill */}
    {prog.addon_courses && prog.addon_courses.length > 0 && (
      <div className="program-card__addons">
        <div className="program-card__addon-title">Add-on</div>
        <div className="program-card__addon-pills">
          {prog.addon_courses.map((course, courseIdx) => (
            <span key={courseIdx} className="program-card__addon-pill">{course}</span>
          ))}
        </div>
      </div>
    )}

    {/* Career Paths (from features field) */}
    {prog.features && prog.features.length > 0 && (
      <div className="program-card__careers">
        <div className="program-card__careers-title">Career Paths After Graduation</div>
        <ul className="program-card__careers-list">
          {prog.features.map((feat, fIdx) => (
            <li key={fIdx}>{feat}</li>
          ))}
        </ul>
      </div>
    )}

    {/* Tuition Fee box */}
    {prog.normal_fee && (
      <div className="program-card__fee-box">
        <span className="program-card__fee-label">Tuition Fee</span>
        <span className="program-card__fee-value">{prog.normal_fee} <small>/Sem</small></span>
      </div>
    )}

    {/* Footer: Seats + Enquire button */}
    <div className="program-card__footer">
      <span className="program-card__seats">
        Seats: <strong>~{prog.seats} (Limited)</strong>
      </span>
      <a href="/contact" className="program-card__enquire-btn">
        Enquire →
      </a>
    </div>
  </div>
))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProgramsSection;
