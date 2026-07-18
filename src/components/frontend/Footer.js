import { Link } from 'react-router-dom';
import logo from '../../images/aashrayam-logo-w.png';
import './Footer.css';

const IconFacebook = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);

const IconInstagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const IconYouTube = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);

const Footer = () => (
  <footer className="footer">
    <div className="footer__grid">

      {/* Brand */}
      <div className="footer__brand">
        <img src={logo} alt="Aashrayam College" className="footer__logo-img" />
        <p className="footer__desc">
          Aashrayam College of Arts & Science is built for students who want clarity,
          direction, and a meaningful start to their professional journey.
        </p>
        <div className="footer__socials">
          <a href="https://www.facebook.com/profile.php?id=61586136323556" target="_blank" rel="noreferrer" aria-label="Facebook" className="footer__social"><IconFacebook /></a>
          <a href="https://www.instagram.com/aashrayamcollege/?hl=en" target="_blank" rel="noreferrer" aria-label="Instagram" className="footer__social"><IconInstagram /></a>
          <a href="https://www.youtube.com/@aashrayamcollege" target="_blank" rel="noreferrer" aria-label="YouTube" className="footer__social"><IconYouTube /></a>
      </div>
      </div>

      {/* College */}
      <div className="footer__col">
        <h4 className="footer__heading">College</h4>
        <ul className="footer__list">
            {[
              { label: 'Home', to: '/' },
              { label: 'Why Aashrayam', to: '/why-aashrayam' },
              { label: 'Academics', to: '/academics' },
              { label: 'Admissions', to: '/admissions' },
              { label: 'Contact', to: '/contact' },
            ].map(l => (
            <li key={l.label}><Link to={l.to} className="footer__link">{l.label}</Link></li>
          ))}
        </ul>
      </div>

      {/* Programmes */}
      <div className="footer__col">
        <h4 className="footer__heading">Programmes</h4>
        <ul className="footer__list">
            {['B.Com Co-operation', 'B.Sc Psychology', 'B.Voc Banking', 'B.Sc AI (Coming)'].map(p => (
  <li key={p}><Link to="/#programs" className="footer__link">{p}</Link></li>
))}
<li>
  <Link to="/admissions#adm-fees-section" className="footer__link">
    Fees & Scholarships
  </Link>
</li>
        </ul>
      </div>

      {/* Students */}
      <div className="footer__col">
        <h4 className="footer__heading">Students</h4>
        <ul className="footer__list">
          {[
            { label: 'Student Clubs', to: '/student-life#slclubssection' },
            { label: 'Hall of Fame', to: '/outcomes#octopperssection' },
            { label: 'Alumni', to: '/outcomes#ocalumnisection' },
            { label: 'Gallery', to: '/gallery' },
          ].map(l => (
            <li key={l.label}><Link to={l.to} className="footer__link">{l.label}</Link></li>
          ))}
        </ul>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="footer__bottom">
      <span>© {new Date().getFullYear()} Aashrayam College of Arts & Science. A unit of SAMARPITHAM Educational Trust.</span>
      <span>
        Affiliated with <a href="https://uoc.ac.in" target="_blank" rel="noreferrer">University of Calicut</a>
      </span>
    </div>
  </footer>
);

export default Footer;