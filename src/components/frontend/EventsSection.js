import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import './EventsSection.css';

const IconClock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconPin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconCalendar = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconArrow = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const formatDate = (d) => {
  const date = new Date(d);
  return {
    day:   date.toLocaleDateString('en-US', { day: '2-digit' }),
    month: date.toLocaleDateString('en-US', { month: 'short' }),
  };
};

const EventsSection = () => {
  const [events, setEvents]           = useState([]);
  const [loading, setLoading]         = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    api.getEvents().then(data => {
      setEvents(Array.isArray(data) ? data : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(events.map(e => e.category).filter(Boolean))];
  const filtered   = activeFilter === 'All' ? events : events.filter(e => e.category === activeFilter);
  const displayed  = filtered.slice(0, 3);

  return (
    <section className="events-section section" id="events">
      <div className="container">

        <div className="events-section__header">
          <div>
            <div className="section-label">Campus Life</div>
            <h2 className="section-title">Events &amp; Activities</h2>
          </div>
          <div className="events-section__filters">
            {categories.map(c => (
              <button
                key={c}
                className={activeFilter === c ? 'news-section__filter--active' : ''}
                onClick={() => setActiveFilter(c)}
              >{c}</button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="loader"><div className="spinner" /> Loading events...</div>
        ) : filtered.length === 0 ? (
          <div className="events-section__empty">No events yet. Check back soon!</div>
        ) : (
          <>
            <div className="events-grid">
              {displayed.map((ev, i) => {
                const d = ev.event_date ? formatDate(ev.event_date) : null;
                return (
                  <div className="event-card" key={ev.id} style={{ animationDelay: `${i * 0.08}s` }}>

                    {ev.image_url ? (
                      <div className="event-card__img-wrap">
                        <img src={ev.image_url} alt={ev.title} className="event-card__img" />
                        {d && (
                          <div className="event-card__date-badge">
                            <div className="day">{d.day}</div>
                            <div className="month">{d.month}</div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="event-card__no-img">
                        <IconCalendar />
                        {d && (
                          <div className="event-card__date-badge">
                            <div className="day">{d.day}</div>
                            <div className="month">{d.month}</div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="event-card__body">
                      <div className="event-card__top">
                        {ev.category && <span className="event-card__cat">{ev.category}</span>}
                      </div>
                      <h3 className="event-card__title">{ev.title}</h3>
                      {ev.description && (
                        <p className="event-card__desc">
                          {ev.description.length > 100 ? ev.description.substring(0, 100) + '…' : ev.description}
                        </p>
                      )}
                      <div className="event-card__meta">
                        {ev.event_time && <span><IconClock /> {ev.event_time}</span>}
                        {ev.location   && <span><IconPin />   {ev.location}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="events-section__footer">
              <button className="btn btn-outline" onClick={() => { window.scrollTo(0,0); navigate('/events'); }}>
                View All Events &amp; Activities <IconArrow />
              </button>
            </div>
          </>
        )}

      </div>
    </section>
  );
};

export default EventsSection;