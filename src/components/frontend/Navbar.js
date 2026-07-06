import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/aashrayam-logo.png';
import './Navbar.css';

/* ── NAV STRUCTURE ──────────────────────────────────────
   Flat links   → { label, to }
   Dropdown     → { label, children: [{ label, to, desc }] }
──────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: 'Why Aashrayam', to: '/why-aashrayam' },
  { label: 'Academics', to: '/academics' },
  { label: 'Admissions', to: '/admissions' },
  {
    label: 'Campus Life',
    children: [
      { label: 'Student Life',  to: '/student-life', desc: 'Campus, clubs & activities' },
      { label: 'Gallery',       to: '/gallery',       desc: 'Photos from campus'         },
    ],
  },
  {
    label: 'More',
    children: [
      { label: 'Outcomes',  to: '/outcomes',  desc: 'Toppers, careers & alumni'    },
      { label: 'News',      to: '/news',      desc: 'Notices & announcements'      },
      { label: 'Events',      to: '/events',      desc: 'Events & Activities'      },
      { label: 'Resources', to: '/resources', desc: 'Downloads & forms' }
    ],
  },
  { label: 'Contact', to: '/contact' },
];

const Navbar = () => {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // label of open dropdown
  const location  = useLocation();
  const navRef    = useRef(null);

  /* scroll effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close everything on route change */
useEffect(() => {
  setMenuOpen(false);
  setOpenDropdown(null);
  document.body.classList.remove('menu-open');
}, [location]);
  /* close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 20);
  window.addEventListener('scroll', onScroll);
  return () => {
    window.removeEventListener('scroll', onScroll);
    document.body.classList.remove('menu-open');
  };
}, []);

  /* helpers */
  const isActive = (item) => {
    if (item.to) return location.pathname === item.to;
    if (item.children) return item.children.some(c => location.pathname.startsWith(c.to));
    return false;
  };

  const toggleDropdown = (label) =>
    setOpenDropdown(prev => (prev === label ? null : label));

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${menuOpen ? 'navbar--menu-open' : ''}`}>
      <div className="container navbar__inner">

        {/* ── LOGO ── */}
        <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
  <img src={logo} alt="Aashrayam College" className="navbar__logo-img" />
  <div>
    <div className="navbar__logo-name">AASHRAYAM</div>
    <div className="navbar__logo-tag">College of Arts & Science</div>
  </div>
</Link>

        {/* ── LINKS ── */}
        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <li
              key={item.label}
              className={`navbar__item ${item.children ? 'navbar__item--has-dropdown' : ''} ${isActive(item) ? 'navbar__item--active' : ''}`}
            >
              {item.children ? (
                /* ── DROPDOWN TRIGGER ── */
                <>
                  <button
                    className={`navbar__link navbar__dropdown-trigger ${openDropdown === item.label ? 'navbar__dropdown-trigger--open' : ''}`}
                    onClick={() => toggleDropdown(item.label)}
                    aria-expanded={openDropdown === item.label}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <span className="navbar__chevron" aria-hidden="true">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>

                  {/* ── DROPDOWN PANEL ── */}
                  <div className={`navbar__dropdown ${openDropdown === item.label ? 'navbar__dropdown--open' : ''}`}>
                    <div className="navbar__dropdown-inner">
                      {item.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className={`navbar__dropdown-item ${location.pathname.startsWith(child.to) ? 'navbar__dropdown-item--active' : ''}`}
                        >
                          <span className="navbar__dropdown-label">{child.label}</span>
                          <span className="navbar__dropdown-desc">{child.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                /* ── FLAT LINK ── */
                <Link
                  to={item.to}
                  className={`navbar__link ${location.pathname === item.to ? 'navbar__link--active' : ''}`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}

          {/* mobile-only CTA */}
          <li className="navbar__cta-mobile">
            <Link to="/admissions" className="btn btn-primary btn-sm">Apply Now</Link>
          </li>
        </ul>

        {/* ── DESKTOP CTA + HAMBURGER ── */}
        <div className="navbar__actions">
          <Link to="/contact" className="btn btn-primary btn-sm navbar__cta-desktop">
            Apply Now
          </Link>
          <button
            className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => {
  const next = !menuOpen;
  setMenuOpen(next);
  document.body.classList.toggle('menu-open', next);
}}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
