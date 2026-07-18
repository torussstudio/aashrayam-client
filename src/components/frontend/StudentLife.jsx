import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import "./StudentLife.css";

const categoryColors = {
  community: { bg: '#dcfce7', color: '#166534' },
  arts:      { bg: '#fce7f3', color: '#9d174d' },
  outreach:  { bg: '#fef3c7', color: '#92400e' },
  academic:  { bg: '#dbeafe', color: '#1e40af' },
  cultural:  { bg: '#ede9fe', color: '#5b21b6' },
  sports:    { bg: '#fee2e2', color: '#991b1b' },
  workshop:  { bg: '#e0f2fe', color: '#0369a1' },
  seminar:   { bg: '#fdf2f8', color: '#701a75' },
  social:    { bg: '#ecfdf5', color: '#065f46' },
  career:    { bg: '#fff7ed', color: '#9a3412' },
};
const getCatStyle = (cat) =>
  cat ? (categoryColors[cat.toLowerCase()] || { bg: '#e8f4f1', color: '#009191' }) : {};

const formatMonth = (d) => {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const StudentLife = () => {
  const observerRef = useRef(null);
  const navigate = useNavigate();

  // ── STATE (declare before any useEffect that references them) ──
  const [events, setEvents] = useState([]);
  const [actsLoading, setActsLoading] = useState(true);

  // ── INTERSECTION OBSERVER (depends on events, so declared after state) ──
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("sl-visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".sl-animate").forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, [events]);

  // ── FETCH EVENTS (single useEffect, with debug logs) ──
  useEffect(() => {
    api.getEvents()
      .then(data => {
        console.log('Events API response:', data);
        setEvents(Array.isArray(data) ? data : []);
        setActsLoading(false);
      })
      .catch((err) => {
        console.error('Events fetch failed:', err);
        setActsLoading(false);
      });
  }, []);

  const clubs = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13.5" cy="6.5" r="2.5"/>
          <path d="M17 13c0 2.5-1.5 4.5-3.5 5.5L12 20l-1.5-1.5C8.5 17.5 7 15.5 7 13a5 5 0 0110 0z"/>
          <path d="M3 9l3-3 2 2M21 9l-3-3-2 2"/>
        </svg>
      ),
      name: "Arts Club",
      tagline: "Where creativity finds its stage",
      body: "A platform for writers, performers, musicians, and visual artists. Students regularly represent Aashrayam at A Zone Arts competitions organised by Calicut University — poem recitation, light music, short story writing, group song, and patriotic song."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22V12M12 12C12 7 8 4 3 5c0 5 3 9 9 7zM12 12c0-5 4-8 9-7 0 5-3 9-9 7z"/>
        </svg>
      ),
      name: "Eco Club",
      tagline: "Responsibility as a shared value",
      body: "In a campus that is itself a living statement about the environment, the Eco Club takes it further — conservation activities, awareness campaigns, and active participation in the college's plastic-free, eco-conscious campus culture."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
          <path d="M2 12h20"/>
        </svg>
      ),
      name: "Sports Club",
      tagline: "Compete, stay fit, build team spirit",
      body: "Physical fitness, team sport, and competitive athletics are part of a complete education. The Sports Club gives students access to recreational and competitive sporting activity throughout the academic year."
    },
  ];

  const campusValues = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: "5-Acre Orchard Campus"
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
        </svg>
      ),
      label: "Plastic-Free Policy"
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v6M12 22v-4M5.2 5.2l4.2 4.2M14.6 14.6l4.2 4.2M2 12h6M22 12h-4M5.2 18.8l4.2-4.2M14.6 9.4l4.2-4.2"/>
        </svg>
      ),
      label: "Water Conservation"
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ),
      label: "Solar Energy Planned"
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3L4 6v6c0 5.25 3.5 9.74 8 11 4.5-1.26 8-5.75 8-11V6l-8-3z"/>
          <polyline points="9 12 11 14 15 10"/>
        </svg>
      ),
      label: "Safe & Supervised"
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.55a11 11 0 0114.08 0"/>
          <path d="M1.42 9a16 16 0 0121.16 0"/>
          <path d="M8.53 16.11a6 6 0 016.95 0"/>
          <circle cx="12" cy="20" r="1" fill="currentColor"/>
        </svg>
      ),
      label: "Wi-Fi Throughout"
    },
  ];

  return (
    <div className="sl-page">
      {/* ── BANNER ── */}
      <section className="sl-banner">
        <div className="sl-banner-bg" />
        <div className="sl-container">
          <span className="sl-breadcrumb">Home &nbsp;/&nbsp; Student Life</span>
          <h1 className="sl-banner-title">Student Life</h1>
          <p className="sl-banner-sub">Three years in a mango orchard, shaped by mentors who know your name and a campus that asks something of you every day.</p>
        </div>
        <div className="sl-banner-shape" />
      </section>

      {/* ── CAMPUS LIFE ── */}
      <section className="sl-section sl-campus">
        <div className="sl-container">
          <div className="sl-campus-inner">
            <div className="sl-animate sl-campus-text">
              <span className="sl-tag">The Place</span>
              <h2 className="sl-section-title">Life in the Orchard</h2>
              <p className="sl-body">The Aashrayam campus is not what most people expect when they picture a college. Set across 5 acres inside a mango orchard, it is calm, green, and largely free of the noise that defines urban college environments. Over a hundred mango trees shade the grounds. The air is clean. The pace is deliberate.</p>
              <p className="sl-body">This is by design. A focused campus environment is not incidental to good learning — it is part of it. Students at Aashrayam consistently find that the environment shapes how they work: with more consistency, less distraction, and a stronger daily rhythm.</p>
              <p className="sl-body">Structured routines, clear grooming standards, and close faculty oversight give the campus a safe, disciplined character. Parents are kept informed and involved throughout — academic progress and personal wellbeing are tracked together.</p>
            </div>
            <div className="sl-animate sl-campus-values" style={{ "--delay": ".12s" }}>
              <p className="sl-values-heading">Campus at a Glance</p>
              <div className="sl-values-grid">
                {campusValues.map((v, i) => (
                  <div key={i} className="sl-value-chip">
                    <span className="sl-value-icon">{v.icon}</span>
                    <span className="sl-value-label">{v.label}</span>
                  </div>
                ))}
              </div>
              <div className="sl-wellbeing-card">
                <h4>Student Wellbeing</h4>
                <p>Every student at Aashrayam has access to personal mentoring and counselling. Academic performance and personal circumstances are not treated as separate things — our faculty engage with both, consistently and without judgement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLUBS — STANDOUT ── */}
      <section className="sl-clubs-section" id="slclubssection">
        <div className="sl-clubs-bg" />
        <div className="sl-container">
          <div className="sl-animate sl-section-header sl-header-light">
            <span className="sl-tag sl-tag--light">Beyond the Classroom</span>
            <h2 className="sl-section-title sl-title-light">Student Clubs</h2>
            <p className="sl-section-sub sl-sub-light">Three clubs that shape the non-academic life of the campus.</p>
          </div>
          <div className="sl-clubs-grid">
            {clubs.map((c, i) => (
              <div key={i} className="sl-animate sl-club-card" style={{ "--delay": `${i * 0.1}s` }}>
                <div className="sl-club-icon">{c.icon}</div>
                <h3 className="sl-club-name">{c.name}</h3>
                <p className="sl-club-tagline">{c.tagline}</p>
                <p className="sl-club-body">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTIVITIES ── */}
      <section className="sl-section sl-activities">
        <div className="sl-container">
          <div className="sl-animate sl-section-header">
            <span className="sl-tag">What We've Done</span>
            <h2 className="sl-section-title">Activities &amp; Exposure</h2>
            <p className="sl-section-sub">Going beyond the classroom — through outreach, culture, and community engagement.</p>
          </div>

          {actsLoading ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--muted)' }}>Loading...</div>
          ) : events.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--muted)', fontSize: '15px' }}>
              No activities yet. Check back soon!
            </div>
          ) : (
            <>
              <div className="sl-activities-list">
                {events.slice(0, 3).map((ev, i) => (
                  <div key={ev.id} className="sl-animate sl-activity-item" style={{ "--delay": `${i * 0.09}s` }}>
                    <div className="sl-activity-meta">
                      <span className="sl-activity-date">{formatMonth(ev.event_date)}</span>
                      {ev.category && (
                        <span className="sl-activity-cat" style={{
                          ...getCatStyle(ev.category),
                          fontSize: '9px', fontWeight: 700, textTransform: 'uppercase',
                          letterSpacing: '1px', padding: '3px 10px', borderRadius: '50px',
                          display: 'inline-block'
                        }}>{ev.category}</span>
                      )}
                    </div>
                    <div className="sl-activity-content">
                      <h4 className="sl-activity-title">{ev.title}</h4>
                      {ev.description && <p className="sl-activity-body">{ev.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                <button
                  className="sl-btn-outline"
                  onClick={() => { window.scrollTo(0, 0); navigate('/events'); }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  View All Activities &amp; Events
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sl-cta">
        <div className="sl-container sl-animate">
          <h2 className="sl-cta-title">Want to see it in person?</h2>
          <p className="sl-cta-sub">Campus visits are welcome. Come spend an hour with us — talk to students, walk the orchard, and see what a different kind of college feels like.</p>
          <div className="sl-cta-btns">
            <a href="/admissions" className="sl-btn-primary">Apply Now →</a>
            <a href="/contact"    className="sl-btn-secondary">Book a Visit</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentLife;