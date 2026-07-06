import React, { useEffect, useRef, useState } from "react";
import "./Academics.css";

import classroomImg from '../../images/DSC00779.webp';
import openAirImg from '../../images/DSC00807.webp';
import computerLabImg from '../../images/IMG_8961.webp';
import psychLabImg from '../../images/DSC00758.webp';
import libraryImg from '../../images/students-at-library.webp';
import smallBatchImg from '../../images/DSC00776.webp';

const Academics = () => {
  const observerRef = useRef(null);
  const [activeProgram, setActiveProgram] = useState(0);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("ac-visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".ac-animate").forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

const programs = [
    {
      code: "B.Com",
      title: "B.Com (Hons)",
      stream: "Co-operation",
      badge: "Honours Programme",
      badgeColor: "teal",
      fee: "₹10,000",
      seats: "~49 Seats",
      duration: "3 Years · 6 Semesters",
      affiliation: "University of Calicut",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      tag: "CMA Add-on",
      summary:
        "Commerce, banking, and finance — with a specialist focus on Kerala's cooperative economy. The most accessible route into the financial and public sector.",
      description:
        "A comprehensive foundation in accounting, business management, banking, and economics — combined with specialist knowledge in cooperative institutions and their governance. Graduates are well-positioned for government and cooperative sector careers, as well as professional qualification routes like CA, CMA, and MBA.",
      careers: [
        "Banks & Cooperative Societies",
        "Finance Offices & Administration",
        "PSC & Competitive Exams",
        "CA / CMA / MBA Pathways",
      ],
      highlight: "CMA (Cost & Management Accountancy) add-on",
    },
    {
      code: "B.Sc Psy",
      title: "B.Sc Psychology (Hons)",
      stream: "Honours",
      badge: "Honours Programme",
      badgeColor: "teal",
      fee: "₹12,000",
      seats: "~29 Seats",
      duration: "3 Years · 6 Semesters",
      affiliation: "University of Calicut",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a6 6 0 016 6c0 2.5-1.5 4.5-3 5.5V16a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2.5C7.5 12.5 6 10.5 6 8a6 6 0 016-6z"/>
          <path d="M10 17v1a2 2 0 004 0v-1"/>
        </svg>
      ),
      tag: "German Language Add-on",
      summary:
        "An in-depth study of human behaviour, mental health, and psychological practice — one of India's fastest-growing fields.",
      description:
        "From developmental and social psychology to counselling approaches and research methods, this Honours programme provides the academic foundation for a range of meaningful careers. The dedicated Psychology lab gives students hands-on experience beyond the textbook.",
      careers: [
        "Counselling Support Roles",
        "Human Resources & People Management",
        "Social Service & NGO Sector",
        "M.Sc Psychology & Clinical Pathways",
      ],
      highlight: "German Language add-on",
    },
    {
      code: "B.Voc",
      title: "B.Voc - Banking, Finance & Insurance",
      stream: "Banking, Finance & Insurance",
      badge: "Job-Ready Programme",
      badgeColor: "amber",
      fee: "₹25,000",
      seats: "~24 Seats",
      duration: "3 Years · 6 Semesters",
      affiliation: "University of Calicut",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2"/>
          <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
          <line x1="12" y1="12" x2="12" y2="16"/>
          <line x1="10" y1="14" x2="14" y2="14"/>
        </svg>
      ),
      tag: "CMA Add-on",
      summary:
        "A skill-based degree built for direct entry into banking, insurance, and financial services — with a CMA add-on for a professional head start.",
      description:
        "B.Voc is structured around real career outcomes from Day 1. Students graduate interview-ready for financial services roles. The CMA (Cost and Management Accountancy) add-on gives graduates a structured pathway into professional accounting qualifications alongside their degree.",
      careers: [
        "Banking & NBFC Roles",
        "Insurance Sector Positions",
        "Financial Advisory Services",
        "Fintech Entry-Level Positions",
      ],
      highlight: "CMA (Cost & Management Accountancy) add-on",
    },
    {
      code: "B.Sc AI",
      title: "B.Sc Artificial Intelligence",
      stream: "Proposed",
      badge: "Proposed Programme",
      badgeColor: "purple",
      fee: "₹30,000",
      seats: "~24 Seats",
      duration: "3 Years · 6 Semesters",
      affiliation: "University of Calicut",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2"/>
          <path d="M7 11V7a5 5 0 0110 0v4"/>
          <circle cx="12" cy="16" r="1" fill="currentColor"/>
        </svg>
      ),
      tag: "Cyber Security Add-on",
      summary:
        "Affordable AI foundations that open doors to tech careers — with a Cyber Security add-on that broadens employability significantly.",
      description:
        "As AI reshapes every industry, graduates who understand its foundations will have a clear advantage. This programme introduces AI in an accessible, structured way — and the Cyber Security add-on significantly expands what graduates can do and where they can go.",
      careers: [
        "AI & Data Assistant Roles",
        "Tech Company Entry-Level Positions",
        "M.Sc / M.Tech Pathways",
        "Applied AI in Business & Research",
      ],
      highlight: "Cyber Security add-on",
    },
  ];

const howItems = [
  {
    img: classroomImg,
    title: "AV-Enabled Classrooms",
    body: "Technology-assisted instruction in 16,000 sq. ft. of modern classrooms — making complex concepts tangible and lectures genuinely engaging."
  },
  {
    img: openAirImg,
    title: "Open-Air Sessions",
    body: "Outdoor classrooms and an open-air auditorium bring a reflective quality to learning that no four-walled room can replicate."
  },
  {
    img: computerLabImg,
    title: "Computer Lab",
    body: "Hands-on digital skills development, data tools, and practical application exercises built into the curriculum."
  },
  {
    img: psychLabImg,
    title: "Psychology Lab",
    body: "Dedicated lab for B.Sc Psychology students — practical, real-world application of theory from Year 1."
  },
  {
    img: libraryImg,
    title: "Library",
    body: "A well-stocked and growing library for independent research, reference, and quiet study throughout the degree."
  },
  {
    img: smallBatchImg,
    title: "Small Batches",
    body: "Limited seats per programme aren't a constraint — they're the design. Faculty adapt to the room. No student falls through the cracks."
  },
];
  const p = programs[activeProgram];

  return (
    <div className="ac-page">
      {/* ── BANNER ── */}
      <section className="ac-banner">
        <div className="ac-banner-bg" />
        <div className="ac-container">
          <span className="ac-breadcrumb">Home &nbsp;/&nbsp; Academics</span>
          <h1 className="ac-banner-title">Academics</h1>
          <p className="ac-banner-sub">
            Four programmes. Every one structured around where you actually want to go — not just a degree to collect.
          </p>
          <div className="ac-banner-stats">
            <div className="ac-stat"><span className="ac-stat-num">4</span><span className="ac-stat-label">Programmes</span></div>
            <div className="ac-stat-div" />
            <div className="ac-stat"><span className="ac-stat-num">4 Yrs</span><span className="ac-stat-label">Undergraduate</span></div>
            <div className="ac-stat-div" />
            <div className="ac-stat"><span className="ac-stat-num">Calicut</span><span className="ac-stat-label">University Affiliated</span></div>
            <div className="ac-stat-div" />
            <div className="ac-stat"><span className="ac-stat-num">2</span><span className="ac-stat-label">Add-on Certifications</span></div>
          </div>
        </div>
        <div className="ac-banner-shape" />
      </section>

      {/* ── PROGRAMME EXPLORER — STANDOUT ── */}
      <section className="ac-programs-section">
        <div className="ac-container">
          <div className="ac-animate ac-section-header">
            <span className="ac-tag">Programmes Offered</span>
            <h2 className="ac-section-title">Choose Your Direction</h2>
            <p className="ac-section-sub">
              All programmes are affiliated to the University of Calicut. Select a programme to explore.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="ac-animate ac-tabs">
            {programs.map((prog, i) => (
              <button
                key={i}
                className={`ac-tab ${activeProgram === i ? "ac-tab--active" : ""}`}
                onClick={() => setActiveProgram(i)}
              >
                <span className="ac-tab-icon">{prog.icon}</span>
                <span className="ac-tab-code">{prog.code}</span>
              </button>
            ))}
          </div>

          {/* Programme Detail Card */}
          <div className="ac-program-card" key={activeProgram}>
            <div className="ac-program-left">
              <div className="ac-program-header">
                <span className={`ac-badge ac-badge--${p.badgeColor}`}>{p.badge}</span>
                {p.tag && <span className="ac-badge ac-badge--accent">{p.tag}</span>}
              </div>
              <h2 className="ac-program-title">{p.title}</h2>
              <p className="ac-program-stream">{p.stream}</p>
              <p className="ac-program-summary">{p.summary}</p>
              <p className="ac-program-desc">{p.description}</p>
              {p.highlight && (
                <div className="ac-highlight-strip">
                  <span className="ac-highlight-icon">✦</span>
                  {p.highlight}
                </div>
              )}
            </div>

            <div className="ac-program-right">
              <div className="ac-program-meta">
                <div className="ac-meta-item">
                  <span className="ac-meta-label">Semester Fee</span>
                  <span className="ac-meta-value ac-meta-value--big">{p.fee}<span className="ac-meta-per">/sem</span></span>
                </div>
                <div className="ac-meta-item">
                  <span className="ac-meta-label">Seats Available</span>
                  <span className="ac-meta-value">{p.seats}</span>
                </div>
                <div className="ac-meta-item">
                  <span className="ac-meta-label">Duration</span>
                  <span className="ac-meta-value">{p.duration}</span>
                </div>
                <div className="ac-meta-item">
                  <span className="ac-meta-label">Affiliation</span>
                  <span className="ac-meta-value">{p.affiliation}</span>
                </div>
              </div>

              <div className="ac-careers">
                <p className="ac-careers-heading">Career Paths</p>
                <ul className="ac-careers-list">
                  {p.careers.map((c, i) => (
                    <li key={i} className="ac-career-item">
                      <span className="ac-career-dot" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <a href="/admissions" className="ac-apply-btn">
                Apply for This Programme →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW LEARNING HAPPENS ── */}
      <section className="ac-how-section">
        <div className="ac-container">
          <div className="ac-animate ac-section-header">
            <span className="ac-tag">The Approach</span>
            <h2 className="ac-section-title">How Learning Happens</h2>
            <p className="ac-section-sub">
              Designed to develop skills, not just complete a syllabus. Every element of the learning environment is chosen with real outcomes in mind.
            </p>
          </div>
          <div className="ac-how-grid">
  {howItems.map((item, i) => (
    <div
      key={i}
      className="ac-animate ac-how-card"
      style={{ "--delay": `${i * 0.07}s` }}
    >
      <img src={item.img} alt={item.title} className="ac-how-img" />
      <div className="ac-how-overlay">
        <h4 className="ac-how-title">{item.title}</h4>
        <p className="ac-how-body">{item.body}</p>
      </div>
    </div>
  ))}
</div>
        </div>
      </section>

      {/* ── ACADEMIC TEAM TEASER ── */}
      <section className="ac-team-section">
        <div className="ac-team-bg" />
        <div className="ac-container">
          <div className="ac-animate ac-team-inner">
            <div className="ac-team-left">
              <span className="ac-tag ac-tag--light">The Faculty</span>
              <h2 className="ac-section-title ac-title-light">
                Teaching That Doesn't Clock Out at 4 PM
              </h2>
              <p className="ac-team-body">
                Our faculty combine retired Government Professors with decades of institutional depth, and NET-qualified teachers with current academic rigour. Concepts are taught through discussion, real scenarios, and practical exercises — not textbook recitation.
              </p>
              <p className="ac-team-body">
                Every student is assigned a personal academic mentor from Day 1. Career readiness is woven into this relationship throughout the degree — through placement support, job fairs, seminars, and expert interactions.
              </p>
            </div>
          <div className="ac-team-right">
  <div className="ac-team-card">
    <div className="ac-team-card-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    </div>
    <h4>Retired Govt. Professors</h4>
    <p>Decades of experience from Government and Government-Aided colleges.</p>
  </div>
  <div className="ac-team-card">
    <div className="ac-team-card-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    </div>
    <h4>NET-Qualified Faculty</h4>
    <p>Current academic rigour, grounded in real teaching experience.</p>
  </div>
  <div className="ac-team-card">
    <div className="ac-team-card-icon">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
            </svg>
           </div>
              <h4>Career-Focused Mentoring</h4>
             <p>Personal mentors track your progress and guide you toward what comes next.</p>
            </div>
           </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="ac-cta">
        <div className="ac-container ac-animate">
          <h2 className="ac-cta-title">Ready to choose your programme?</h2>
          <p className="ac-cta-sub">Seats are limited across all programmes. Talk to our admissions counsellor today.</p>
          <div className="ac-cta-btns">
            <a href="/admissions#adm-fees-section" className="ac-btn-primary">See Fees & Apply →</a>
            <a href="/contact" className="ac-btn-secondary">Talk to a Counsellor</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academics;
