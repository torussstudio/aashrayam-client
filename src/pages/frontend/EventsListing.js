import { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import './EventsListing.css';

const IconClock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconPin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconClose = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const formatDate = (d) => {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
};
const formatMonth = (d) => {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const EventsListing = () => {
  const [events, setEvents]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState('All');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.getEvents()
      .then(data => { setEvents(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  const categories = ['All', ...new Set(events.map(e => e.category).filter(Boolean))];
  const filtered   = filter === 'All' ? events : events.filter(e => e.category === filter);

  return (
    <div className="evl-page">

      {/* Banner */}
      <section className="evl-banner">
        <div className="evl-banner-bg" />
        <div className="evl-container">
          <span className="evl-breadcrumb">Home &nbsp;/&nbsp; Events &amp; Activities</span>
          <h1 className="evl-banner-title">Events &amp; Activities</h1>
          <p className="evl-banner-sub">Everything that happens at Aashrayam — outreach, arts, academics, and community life.</p>
        </div>
        <div className="evl-banner-shape" />
      </section>

      {/* Content */}
      <section className="evl-section">
        <div className="evl-container">

          {/* Filters */}
          <div className="evl-filters">
            {categories.map(c => (
              <button key={c} className={`evl-filter-btn ${filter === c ? 'evl-filter-btn--active' : ''}`} onClick={() => setFilter(c)}>
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="loader"><div className="spinner" /> Loading events...</div>
          ) : filtered.length === 0 ? (
            <div className="evl-empty">No events found for this category.</div>
          ) : (
            <div className="evl-grid">
              {filtered.map((ev, i) => {
                const d = ev.event_date ? new Date(ev.event_date) : null;
                return (
                  <div
                    className="evl-card"
                    key={ev.id}
                    style={{ animationDelay: `${i * 0.06}s` }}
                    onClick={() => setSelected(ev)}
                  >
                    {ev.image_url ? (
                      <div className="evl-card__img-wrap">
                        <img src={ev.image_url} alt={ev.title} className="evl-card__img" />
                        {d && (
                          <div className="evl-card__date-badge">
                            <div className="evl-card__day">{d.toLocaleDateString('en-US', { day: '2-digit' })}</div>
                            <div className="evl-card__month">{d.toLocaleDateString('en-US', { month: 'short' })}</div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="evl-card__no-img">
                        {d && (
                          <div className="evl-card__date-badge evl-card__date-badge--center">
                            <div className="evl-card__day">{d.toLocaleDateString('en-US', { day: '2-digit' })}</div>
                            <div className="evl-card__month">{d.toLocaleDateString('en-US', { month: 'short' })}</div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="evl-card__body">
                      {ev.category && <span className="evl-card__cat">{ev.category}</span>}
                      <h3 className="evl-card__title">{ev.title}</h3>
                      {ev.description && (
                        <p className="evl-card__desc">
                          {ev.description.length > 110 ? ev.description.substring(0, 110) + '…' : ev.description}
                        </p>
                      )}
                      <div className="evl-card__meta">
                        {ev.event_time && <span><IconClock /> {ev.event_time}</span>}
                        {ev.location   && <span><IconPin />   {ev.location}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      {selected && (
        <div className="evl-overlay" onClick={() => setSelected(null)}>
          <div className="evl-modal" onClick={e => e.stopPropagation()}>
            <button className="evl-modal__close" onClick={() => setSelected(null)}><IconClose /></button>
            {selected.image_url && (
              <div className="evl-modal__img">
                <img src={selected.image_url} alt={selected.title} />
              </div>
            )}
            <div className="evl-modal__body">
              {selected.category && <span className="evl-card__cat">{selected.category}</span>}
              <h2 className="evl-modal__title">{selected.title}</h2>
              <div className="evl-modal__meta">
                {selected.event_date && (
                  <span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {formatDate(selected.event_date)}
                  </span>
                )}
                {selected.event_time && <span><IconClock /> {selected.event_time}</span>}
                {selected.location   && <span><IconPin />   {selected.location}</span>}
              </div>
              {selected.description && <p className="evl-modal__desc">{selected.description}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsListing;