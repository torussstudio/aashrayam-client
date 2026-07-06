import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import './NewsListing.css';

const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

const NewsListing = () => {
  const navigate = useNavigate();
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    api.getNews().then(data => {
      setAllNews(Array.isArray(data) ? data : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(allNews.map(n => n.category).filter(Boolean))];

  const filtered = allNews.filter(item => {
    const matchCategory = activeFilter === 'All' || item.category === activeFilter;
    const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       (item.excerpt && item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filtered.slice(startIdx, startIdx + itemsPerPage);

  const handleFilterChange = (category) => {
    setActiveFilter(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="nl-page">

      {/* ── BANNER ── */}
      <section className="nl-banner">
        <div className="nl-banner-bg" />
        <div className="nl-container">
          <span className="nl-breadcrumb">Home &nbsp;/&nbsp; News &amp; Announcements</span>
          <h1 className="nl-banner-title">News &amp; Announcements</h1>
          <p className="nl-banner-sub">Stay informed with the latest updates, notices, and announcements from our institution.</p>

          {/* ── SEARCH + FILTER INSIDE BANNER ── */}
          <div className="nl-controls">
            <div className="nl-search-wrap">
              <svg className="nl-search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search announcements..."
                className="nl-search-input"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="nl-filters">
              {categories.map(c => (
                <button
                  key={c}
                  className={`nl-filter-btn ${activeFilter === c ? 'nl-filter-btn--active' : ''}`}
                  onClick={() => handleFilterChange(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="nl-banner-shape" />
      </section>

      {/* ── CONTENT ── */}
      <section className="nl-listing">
        <div className="nl-container">

          {searchTerm && (
            <div className="nl-search-status">
              Found <strong>{filtered.length}</strong> result{filtered.length !== 1 ? 's' : ''} for "<strong>{searchTerm}</strong>"
            </div>
          )}

          {loading ? (
            <div className="nl-loader"><div className="nl-spinner"></div> Loading announcements...</div>
          ) : filtered.length === 0 ? (
            <div className="nl-empty">
              <div className="nl-empty-icon">📋</div>
              <h3>No announcements found</h3>
              <p>{searchTerm ? 'Try adjusting your search terms.' : 'Check back soon for updates!'}</p>
            </div>
          ) : (
            <>
              <div className="nl-grid">
                {paginatedItems.map((item, idx) => (
                  <article
                    className="nl-card"
                    key={item.id}
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    {item.image_url ? (
                      <div className="nl-card__img-wrap">
                        <img src={item.image_url} alt={item.title} className="nl-card__img" />
                        <div className="nl-card__overlay" onClick={() => { window.scrollTo(0,0); navigate(`/news/${item.id}`); }}>
                          <button className="nl-overlay-btn">View Details</button>
                        </div>
                      </div>
                    ) : (
                      <div className="nl-card__no-img">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                          <line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/>
                          <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                      </div>
                    )}
                    <div className="nl-card__body">
                      <div className="nl-card__meta">
                        {item.badge_text && (
                          <span className="nl-badge" style={{ background: (item.badge_color || '#2D7D6F') + '20', color: item.badge_color || '#2D7D6F' }}>
                            {item.badge_text}
                          </span>
                        )}
                        <span className="nl-card__date">{formatDate(item.created_at)}</span>
                      </div>
                      <h3 className="nl-card__title">{item.title}</h3>
                      {item.excerpt && <p className="nl-card__excerpt">{item.excerpt}</p>}
                      <button
                        className="nl-read-more"
                        onClick={() => { window.scrollTo(0, 0); navigate(`/news/${item.id}`); }}
                      >
                        Read Full Article
                        <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="nl-pagination">
                  <button
                    className="nl-page-btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    ← Previous
                  </button>
                  <div className="nl-page-info">
                    Page <span>{currentPage}</span> of <span>{totalPages}</span>
                  </div>
                  <button
                    className="nl-page-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewsListing;