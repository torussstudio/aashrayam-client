import React, { useEffect, useRef } from "react";
import "./WhyAashrayam.css";
import anilImg from '../../images/Anil.webp';
import prabhulladasImg from '../../images/Prabhulladas.webp';
import bibithImg from '../../images/Bibith.webp';
import mohanImg from '../../images/Mohan.webp';
import pillaiImg from '../../images/Sreemahadevan.webp';
import ajoyImg from '../../images/Ajoy.webp';
import studentsImg from '../../images/students.webp';
import classroomImg from '../../images/DSC00779.webp';
import openAirImg from '../../images/DSC00844.webp';
import libraryImg from '../../images/students-at-library.webp';
import ecoImg from '../../images/IMG_9068.HEIC.webp';
import safeImg from '../../images/DSC00791.webp';

const WhyAashrayam = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("wa-visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".wa-animate").forEach((el) => {
      observerRef.current.observe(el);
    });
    return () => observerRef.current && observerRef.current.disconnect();
  }, []);

  const envFeatures = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/>
          <path d="M12 11a2 2 0 100-4 2 2 0 000 4z"/>
        </svg>
      ),
      title: "5-Acre Orchard Campus",
      desc: "Over a hundred mango trees, clean air, and open space — a natural environment built for focused, distraction-free learning.",
      img: studentsImg,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="13" rx="2"/>
          <path d="M8 21h8M12 17v4"/>
          <path d="M7 9h4M7 12h2M15 9l2 2-2 2"/>
        </svg>
      ),
      title: "Digitally Enabled Classrooms",
      desc: "16,000 sq. ft. of modern classrooms with audio-visual aids, Wi-Fi throughout, and technology-assisted instruction.",
      img: classroomImg,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <path d="M9 22V12h6v10"/>
          <path d="M12 2v4M8 6l4-4 4 4"/>
        </svg>
      ),
      title: "Open-Air Learning",
      desc: "Outdoor classrooms and an open-air auditorium bring a different quality to learning — one you won't find behind four walls.",
      img: openAirImg,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
        </svg>
      ),
      title: "Labs & Library",
      desc: "A computer lab, Psychology lab, and a well-stocked growing library for hands-on practice and independent research.",
      img: libraryImg,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 19H4.815a1.83 1.83 0 01-1.57-2.163l2.9-12.856A2 2 0 017.986 2h8.028a2 2 0 011.841 1.981l2.9 12.856A1.83 1.83 0 0118.185 19H16"/>
          <path d="M12 19v3M9.5 16.5L12 19l2.5-2.5"/>
          <circle cx="12" cy="11" r="3"/>
        </svg>
      ),
      title: "Eco-Conscious by Design",
      desc: "Plastic-free campus, active water conservation practices, and solar energy on the horizon — sustainability as a shared value.",
      img: ecoImg,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3L4 6v6c0 5.25 3.5 9.74 8 11 4.5-1.26 8-5.75 8-11V6l-8-3z"/>
          <polyline points="9 12 11 14 15 10"/>
        </svg>
      ),
      title: "Safe & Supervised",
      desc: "Structured routines, clear grooming standards, and close faculty oversight. Parents are always kept in the loop.",
      img: safeImg,
    },
  ];

  const facultyPillars = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/>
          <path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>
      ),
      label: "Retired Govt. Professors",
      detail: "Decades of teaching experience from Government and Government-Aided colleges. Real depth. Real credibility.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      ),
      label: "NET-Qualified Faculty",
      detail: "Current academic rigour combined with seasoned wisdom — a blend that keeps learning both grounded and relevant.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87"/>
          <path d="M16 3.13a4 4 0 010 7.75"/>
        </svg>
      ),
      label: "Personal Mentoring",
      detail: "Every student is assigned an academic mentor who tracks progress, addresses concerns, and guides them through — and beyond — their degree.",
    },
  ];

  return (
    <div className="wa-page">

      {/* ── PAGE BANNER ── */}
      <section className="wa-banner">
        <div className="wa-banner-bg" />
        <div className="wa-banner-content">
          <span className="wa-breadcrumb">Home &nbsp;/&nbsp; Why Aashrayam</span>
          <h1 className="wa-banner-title">Why Aashrayam?</h1>
          <p className="wa-banner-sub">
            A college built around one conviction that quality education
            should never be out of reach.
          </p>
        </div>
        <div className="wa-banner-shape" />
      </section>

      {/* ── PHILOSOPHY INTRO ── */}
      <section className="wa-section wa-philosophy">
        <div className="wa-container">
          <div className="wa-philosophy-grid">
            <div className="wa-animate wa-philosophy-left">
              <span className="wa-tag">Our Story</span>
              <h2 className="wa-section-title">
                A College Built on a Conviction
              </h2>
              <p className="wa-body-text">
                Aashrayam College of Arts & Science was founded in 2016 by the
                Samarpitham Educational Trust in Kollengode, Palakkad with a
                purpose that went against the grain of private higher education:
                to make genuinely good education available to the students who
                need it most, at fees that don't stand in the way.
              </p>
              <p className="wa-body-text">
                In 2021, the college moved to its permanent home Aashrayam
                Orchard in Nenmeni, Kollengode a five-acre campus set inside a
                working mango orchard. In 2024–25, the college received
                affiliation from the University of Calicut.
              </p>
              <div className="wa-founders-note">
                <div className="wa-founders-line" />
                <p>
                  <em>
                    "A degree without direction is just a certificate. Aashrayam
                    was built to give students both."
                  </em>
                </p>
              </div>
            </div>

            <div className="wa-animate wa-philosophy-right" style={{ "--delay": "0.15s" }}>
              <div className="wa-vision-card">
                <div className="wa-card-icon">✦</div>
                <h3>Vision</h3>
                <p>
                  To ignite the potential in every student and enable them to
                  experience an educational journey that is intellectually
                  stimulating and socially transformative one that opens doors
                  they never imagined were theirs to open.
                </p>
              </div>
              <div className="wa-mission-card">
                <div className="wa-card-icon">◈</div>
                <h3>Mission</h3>
                <p>
                  To prepare students to be independent individuals who are
                  socially and environmentally responsible people who lead with
                  empathy and fellow-feeling. To undertake community enrichment
                  programmes. To take education to the most deserving, on the
                  principle that{" "}
                  <strong>nobody is left behind.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS ── */}
      <section className="wa-section wa-pillars-section">
        <div className="wa-pillars-bg" />
        <div className="wa-container wa-animate">
          <div className="wa-section-header wa-header-light">
            <span className="wa-tag wa-tag-light">What We Stand For</span>
            <h2 className="wa-section-title wa-title-light">
              Three Principles. One Direction.
            </h2>
          </div>
          <div className="wa-pillars-grid">
            {[
              {
                num: "01",
                title: "Accessible Education",
                body: "Fees 3–5× lower than comparable private colleges in Kerala not as a compromise, but as the founding intention. Nobody deserves to be left behind because of what education costs.",
              },
              {
                num: "02",
                title: "Career-First Learning",
                body: "Every programme is structured around real career outcomes. Placement support, mentoring, and industry exposure begin from Year 1 not as an afterthought at graduation.",
              },
              {
                num: "03",
                title: "The Person, Not Just the Student",
                body: "Small batches. Personal mentors. Counselling support. At Aashrayam, students are known by name not roll number. Academic performance and personal wellbeing are treated as inseparable.",
              },
            ].map((p) => (
              <div key={p.num} className="wa-pillar-card">
                <span className="wa-pillar-num">{p.num}</span>
                <h3 className="wa-pillar-title">{p.title}</h3>
                <p className="wa-pillar-body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANAGEMENT ── */}
      <section className="wa-section wa-management-section">
        <div className="wa-container">
          <div className="wa-animate wa-section-header">
            <span className="wa-tag">Leadership</span>
            <h2 className="wa-section-title">The Management</h2>
            <p className="wa-section-sub">
              Aashrayam College is a unit of Samarpitham Educational Trust — managed by eminent leaders committed to accessible, quality education.
            </p>
          </div>
          <div className="wa-mgmt-grid">
            {[
              {
                name: "Mr. Anil Kumar K",
                qual: "BSc., CAIIB",
                role: "Chairman",
                img: anilImg,
                bio: "A career banker with nearly 4 decades of experience at senior levels. Former Chief Executive Officer of Axis Bank Foundation. Co-founder and Chairman of Akshara Foundation, one of the well-known charitable institutions in the district.",
              },
              {
                name: "Mr. Prabhulladas R",
                qual: "MSW",
                role: "Managing Trustee",
                img: prabhulladasImg,
                bio: "Currently Project Coordinator, Unnat Bharat Abhiyan, IIT Palakkad. Nearly 2 decades of experience in the social sector. Former Protection Officer — Institutional Care, District Child Protection Unit, Government of Kerala.",
              },
              {
                name: "Mr. Bibith K B",
                qual: "MSW, MPhil",
                role: "Trustee (Finance)",
                img: bibithImg,
                bio: "Assistant Professor, Social Work Department, Aashrayam College. Former Professional Counsellor, NACO (Central Government). State Level Coordinator, AHT Anti Human Trafficking project under Kudumbashree.",
              },
              {
                name: "Prof. Mohan Das K",
                qual: "MA (English)",
                role: "Trustee",
                img: mohanImg,
                bio: "One of the most revered English professors in Palakkad. Over 3 decades of teaching. Former Head of Department, Principal, and Deputy Director of Collegiate Education, Government of Kerala.",
              },
              {
                name: "Dr. P R Sreemahadevan Pillai",
                qual: "MTech (Civil), PhD",
                role: "Independent Trustee",
                img: pillaiImg,
                bio: "Chairman, Anova Group. Former Director, Ahalia Group of Academic Institutions. Dean, University of Calicut. Principal of NSS College of Engineering, Palakkad for over 35 years. Member of expert panels at AICTE, UGC, NBA and NAAC.",
              },
              {
                name: "Mr. Ajoy K N",
                qual: "",
                role: "Trustee",
                img: ajoyImg,
                bio: "A benevolent investor and one of the principal investors of Samarpitham Educational Trust. Runs a successful small-scale industrial business in Palakkad.",
              },
            ].map((m, i) => (
              <div
                key={i}
                className="wa-animate wa-mgmt-card"
                style={{ "--delay": `${i * 0.08}s` }}
              >
                <div className="wa-mgmt-img-wrap">
                  <img src={m.img} alt={m.name} className="wa-mgmt-img" />
                </div>
                <div className="wa-mgmt-body">
                  <span className="wa-mgmt-role">{m.role}</span>
                  <h4 className="wa-mgmt-name">{m.name}</h4>
                  {m.qual && <p className="wa-mgmt-qual">{m.qual}</p>}
                  <p className="wa-mgmt-bio">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEARNING ENVIRONMENT ── */}
      <section className="wa-section wa-env-section">
        <div className="wa-container">
          <div className="wa-animate wa-section-header">
            <span className="wa-tag">The Campus</span>
            <h2 className="wa-section-title">Learning Environment</h2>
            <p className="wa-section-sub">
              A focused, green campus that reduces distraction and keeps you
              consistent — designed as part of the learning, not separate from it.
            </p>
          </div>
          <div className="wa-env-grid">
            {envFeatures.map((f, i) => (
              <div
                key={i}
                className="wa-animate wa-env-card"
                style={{ "--delay": `${i * 0.08}s` }}
              >
                <img src={f.img} alt={f.title} className="wa-env-img" />
                <div className="wa-env-overlay">
                  <h4 className="wa-env-title">{f.title}</h4>
                  <p className="wa-env-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="wa-cta-section">
        <div className="wa-container wa-animate">
          <h2 className="wa-cta-title">Come see it for yourself.</h2>
          <p className="wa-cta-sub">
            The campus, the faculty, the environment — some things are better
            experienced than explained.
          </p>
          <div className="wa-cta-btns">
            <a href="/admissions" className="wa-btn-primary">
              Apply Now →
            </a>
            <a href="/contact" className="wa-btn-secondary">
              Book a Campus Visit
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default WhyAashrayam;