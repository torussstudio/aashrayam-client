import React, { useEffect, useRef } from "react";
import "./Outcomes.css";

const Outcomes = () => {
  const observerRef = useRef(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("oc-visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".oc-animate").forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const toppers = [
    { name: "Shimna P",   prog: "B.Sc Psychology",        achievement: "College Topper",   body: "Consistent academic performance across semesters — a direct result of attentive teaching and a focused learning environment." },
    { name: "Abhilash S", prog: "B.Sc Psychology",        achievement: "College Topper",   body: "Recognised for academic achievement and the kind of steady, purposeful engagement with college life that Aashrayam works to cultivate." },
    { name: "Sabdhra K",  prog: "B.Com Co-operation",    achievement: "College Topper",   body: "Outstanding results in the B.Com programme — proof that commerce education at Aashrayam is taken seriously by both the college and its students." },
  ];

 const skills = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
      </svg>
    ),
    title: "Subject Knowledge",
    body: "Deep academic grounding in the chosen discipline, delivered by experienced faculty through a University of Calicut-affiliated curriculum."
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="13" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <path d="M7 9h4M7 12h2M15 9l2 2-2 2"/>
      </svg>
    ),
    title: "Digital & Practical Skills",
    body: "Built through technology-enabled classrooms, computer lab practice, and programmes like B.Voc and B.Sc AI that embed hands-on skills from Day 1."
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
    title: "Communication & Interpersonal Skills",
    body: "Developed through small-batch learning, presentations, community outreach, and the open culture of a personal, mentored environment."
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
    title: "Community Awareness",
    body: "Formed through outreach programmes like Prayanam, guest lectures, civic engagement, and the college's founding ethic of social responsibility."
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    title: "Career Readiness",
    body: "Placement support, job fairs, industry seminars, and expert interactions built into the academic culture from Year 1 — not bolted on at the end."
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 017 7c0 2.5-1.5 5-3.5 6.5V17a1 1 0 01-1 1h-5a1 1 0 01-1-1v-1.5C6.5 14 5 11.5 5 9a7 7 0 017-7z"/>
        <path d="M10 18v1a2 2 0 004 0v-1"/>
      </svg>
    ),
    title: "Self-Confidence",
    body: "The confidence that comes from being genuinely seen, supported, and guided through three years by faculty who know you by name — not roll number."
  },
];

  return (
    <div className="oc-page">
      {/* ── BANNER ── */}
      <section className="oc-banner">
        <div className="oc-banner-bg" />
        <div className="oc-container">
          <span className="oc-breadcrumb">Home &nbsp;/&nbsp; Outcomes</span>
          <h1 className="oc-banner-title">Outcomes</h1>
          <p className="oc-banner-sub">What four years at Aashrayam produces, in results, in capability, and in the person you become.</p>
        </div>
        <div className="oc-banner-shape" />
      </section>

      {/* ── TOPPERS — STANDOUT ── */}
      <section className="oc-toppers-section" id="octopperssection">
        <div className="oc-toppers-bg" />
        <div className="oc-container">
          <div className="oc-animate oc-section-header">
            <span className="oc-tag">Hall of Fame</span>
            <h2 className="oc-section-title">Student Journeys</h2>
            <p className="oc-section-sub">The first names in what will be a long and growing roll of honour.</p>
          </div>
          <div className="oc-toppers-grid">
            {toppers.map((t, i) => (
              <div key={i} className="oc-animate oc-topper-card" style={{ "--delay": `${i * 0.1}s` }}>
                <div className="oc-topper-avatar">
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="oc-topper-badge">{t.achievement}</div>
                <h3 className="oc-topper-name">{t.name}</h3>
                <p className="oc-topper-prog">{t.prog}</p>
                <p className="oc-topper-body">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="oc-skills-section">
        <div className="oc-container">
          <div className="oc-animate oc-section-header">
            <span className="oc-tag">What You Leave With</span>
            <h2 className="oc-section-title">Skills & Career Readiness</h2>
            <p className="oc-section-sub">A degree is a credential. What you carry beyond the degree determines what you actually do with it.</p>
          </div>
          <div className="oc-skills-grid">
            {skills.map((s, i) => (
              <div key={i} className="oc-animate oc-skill-card" style={{ "--delay": `${i * 0.07}s` }}>
                <span className="oc-skill-icon">{s.icon}</span>
                <h4 className="oc-skill-title">{s.title}</h4>
                <p className="oc-skill-body">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="oc-animate oc-placement-strip">
            <div className="oc-placement-left">
              <h3>Placement Support — From Year 1</h3>
              <p>Job fairs, industry seminars, expert interactions, and structured mentoring are woven into academic life throughout all three years. Students think about and prepare for their next step throughout their degree — not only in the final semester.</p>
            </div>
            <div className="oc-placement-tags">
              <span className="oc-ptag">Job Fairs</span>
              <span className="oc-ptag">Industry Seminars</span>
              <span className="oc-ptag">Expert Interactions</span>
              <span className="oc-ptag">Personal Mentoring</span>
              <span className="oc-ptag">CMA Add-on (B.Voc)</span>
              <span className="oc-ptag">Cyber Security Add-on (B.Sc AI)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALUMNI ── */}
      <section className="oc-alumni-section" id="ocalumnisection">
        <div className="oc-container">
          <div className="oc-alumni-inner">
            <div className="oc-animate">
              <span className="oc-tag">The Network</span>
              <h2 className="oc-section-title">Alumni</h2>
              <p className="oc-body">Our first graduating batches are now out in the world — and the college follows their journeys with genuine pride. The Aashrayam alumni network is young but growing, shaped by the distinctive values of this campus: focus, empathy, and a sense of responsibility toward community.</p>
              <p className="oc-body">We are building a formal alumni platform where graduates can stay connected to the college, to one another, and to current students who stand to benefit from their experience.</p>
              <p className="oc-body">If you're an Aashrayam alumnus and would like to reconnect, share your story, or simply let us know where life has taken you — we want to hear from you.</p>
              <a href="mailto:aashrayamcollege@gmail.com" className="oc-alumni-link">
                Get in Touch → aashrayamcollege@gmail.com
              </a>
            </div>
            <div className="oc-animate oc-alumni-quote-card" style={{ "--delay": ".12s" }}>
              <div className="oc-quote-mark">"</div>
              <p className="oc-quote-text">Once Aashrayam, always Aashrayam. The teachers here didn't just prepare me for an exam — they prepared me for what came after it.</p>
              <div className="oc-quote-author">
                <div className="oc-quote-avatar">A</div>
                <div>
                  <span className="oc-quote-name">Aashrayam Alumnus</span>
                  <span className="oc-quote-batch">Graduating Batch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="oc-cta">
        <div className="oc-container oc-animate">
          <h2 className="oc-cta-title">Your name could be on this page.</h2>
          <p className="oc-cta-sub">Admissions are open for 2025–26. Seats are limited. Start your journey today.</p>
          <div className="oc-cta-btns">
            <a href="/admissions" className="oc-btn-primary">Apply Now →</a>
            <a href="/contact"    className="oc-btn-secondary">Talk to Us</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Outcomes;
