import { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import './Resources.css';

const CATEGORIES = [
  { key: 'all', label: 'All Resources' },
  { key: 'Question Papers', label: 'Question Papers' },
  { key: 'Study Materials', label: 'Study Materials' },
  { key: 'Syllabus', label: 'Syllabus' },
  { key: 'Lecture Notes', label: 'Lecture Notes' },
  { key: 'Timetable', label: 'Timetables' },
  { key: 'Circulars', label: 'Circulars & Notices' },
  { key: 'Forms', label: 'Forms & Applications' },
];

const categoryIcons = {
  'Question Papers': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  'Study Materials': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
    </svg>
  ),
  'Syllabus': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/>
      <line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/>
      <line x1="3" y1="12" x2="3.01" y2="12"/>
      <line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  ),
  'Lecture Notes': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  'Timetable': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  'Circulars': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  'Forms': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  ),
  'General': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/>
      <polyline points="13 2 13 9 20 9"/>
    </svg>
  ),
};

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const getFileExtension = (url, name) => {
  const source = name || url || '';
  const ext = source.split('.').pop()?.toUpperCase();
  return ext?.length <= 5 ? ext : 'FILE';
};

const getFileBadgeColor = (ext) => {
  const map = {
    PDF: '#ef4444', DOC: '#2563eb', DOCX: '#2563eb',
    XLS: '#16a34a', XLSX: '#16a34a',
    PPT: '#d97706', PPTX: '#d97706',
    ZIP: '#7c3aed', RAR: '#7c3aed',
  };
  return map[ext] || '#6b7280';
};

const ResourceCard = ({ resource }) => {
  const ext = getFileExtension(resource.file_url, resource.file_name);
  const badgeColor = getFileBadgeColor(ext);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resource.file_url;
    link.download = resource.file_name || resource.title;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="resource-card">
      <div className="resource-card__icon-wrap">
        {categoryIcons[resource.category] || categoryIcons['General']}
      </div>
      <div className="resource-card__body">
        <div className="resource-card__meta">
          <span className="resource-card__badge" style={{ background: badgeColor + '18', color: badgeColor }}>{ext}</span>
          {resource.year && <span className="resource-card__year">{resource.year}</span>}
          {resource.subject && <span className="resource-card__subject">{resource.subject}</span>}
        </div>
        <h3 className="resource-card__title">{resource.title}</h3>
        {resource.description && (
          <p className="resource-card__desc">{resource.description}</p>
        )}
      </div>
      <button className="resource-card__download" onClick={handleDownload} title="Download file">
        <DownloadIcon />
        <span>Download</span>
      </button>
    </div>
  );
};

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.getResources()
      .then(data => {
        setResources(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = resources.filter(r => {
    const matchesCat = activeCategory === 'all' || r.category === activeCategory;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      r.title?.toLowerCase().includes(q) ||
      r.subject?.toLowerCase().includes(q) ||
      r.description?.toLowerCase().includes(q) ||
      r.year?.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const grouped = filtered.reduce((acc, r) => {
    const cat = r.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(r);
    return acc;
  }, {});

  return (
    <div className="resources-page">
      {/* Hero */}
      <section className="resources-hero">
        <div className="container">
          <div className="resources-hero__eyebrow">Student Resources</div>
          <h1 className="resources-hero__title">
            Download &amp; <span className="resources-hero__accent">Learn</span>
          </h1>
          <p className="resources-hero__sub">
            Access question papers, study materials, syllabi, timetables, and more — all in one place.
          </p>
          <div className="resources-hero__search">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search by title, subject, or year..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="resources-tabs-bar">
        <div className="container">
          <div className="resources-tabs">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                className={`resources-tab ${activeCategory === cat.key ? 'resources-tab--active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="resources-content section">
        <div className="container">
          {loading ? (
            <div className="resources-loading">
              <div className="spinner"></div>
              <p>Loading resources...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="resources-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/>
                <polyline points="13 2 13 9 20 9"/>
              </svg>
              <h3>No resources found</h3>
              <p>{search ? 'Try a different search term.' : 'Check back soon — more materials will be added.'}</p>
            </div>
          ) : activeCategory === 'all' ? (
            Object.entries(grouped).map(([cat, items]) => (
              <div key={cat} className="resources-group">
                <div className="resources-group__header">
                  <span className="resources-group__icon">{categoryIcons[cat] || categoryIcons['General']}</span>
                  <h2 className="resources-group__title">{cat}</h2>
                  <span className="resources-group__count">{items.length} file{items.length !== 1 ? 's' : ''}</span>
                </div>
                <div className="resources-list">
                  {items.map(r => <ResourceCard key={r.id} resource={r} />)}
                </div>
              </div>
            ))
          ) : (
            <div className="resources-list">
              {filtered.map(r => <ResourceCard key={r.id} resource={r} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;
