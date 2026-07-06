import React, { useEffect, useRef } from "react";
import "./Admissions.css";

const Admissions = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("adm-visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".adm-animate").forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
  if (window.location.hash === '#adm-fees-section') {
    setTimeout(() => {
      const el = document.getElementById('adm-fees-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
}, []);

  const fees = [
    { program: "B.Com (Hons) — Co-operation", sem: "₹10,000", admission: "₹5,000", addon: "CMA", seats: "~48", color: "teal" },
    { program: "B.Sc Psychology (Hons)",       sem: "₹12,000", admission: "₹5,000", addon: "Cyber Security", seats: "~28", color: "teal" },
    { program: "B.Voc — Banking, Finance & Insurance", sem: "₹25,000", admission: "₹5,000", addon: "CMA", seats: "~24", color: "amber" },
    { program: "B.Sc Artificial Intelligence (Proposed)", sem: "₹30,000", admission: "₹5,000", addon: "German Language", seats: "~24", color: "purple" },
  ];  

  const steps = [
    { num: "01", title: "Call or WhatsApp Us", body: "Reach our admissions counsellor at +91 8078 478 506. We'll confirm seat availability for your preferred programme and respond within 24 hours." },
    { num: "02", title: "Get Full Details", body: "Receive a complete fee breakdown, programme information, and an invitation to visit the campus. Some things are better seen than explained." },
    { num: "03", title: "Submit Your Application", body: "Fill in the Application Form and submit it with the required documents — in person at the college or by post to our Kollengode address." },
    { num: "04", title: "Brief Interaction", body: "You'll be invited for a short interaction with faculty and the admissions team. This is a conversation, not an exam — just to understand your goals." },
    { num: "05", title: "Confirm Your Seat", body: "Pay the one-time admission fee and your first semester fee. Your seat is confirmed. Welcome to Aashrayam." },
  ];

  const documents = [
    "Plus Two Mark List (original + photocopy)",
    "Transfer Certificate from last institution",
    "Conduct Certificate",
    "Aadhaar Card (photocopy)",
    "Community Certificate (if applicable)",
    "4 recent passport-size photographs",
    "Scholarship documents (if applying for scholarship)",
  ];

  const eligibility = [
    { prog: "B.Com (Hons) Co-operation",    crit: "Pass in Plus Two in any stream. Commerce background preferred but not mandatory." },
    { prog: "B.Sc Psychology (Hons)",        crit: "Pass in Plus Two in any stream from a recognised board." },
    { prog: "B.Voc Banking, Finance & Insurance", crit: "Pass in Plus Two in any stream." },
    { prog: "B.Sc Artificial Intelligence (Proposed)", crit: "Pass in Plus Two, preferably with Mathematics or Science. Other streams eligible." },
  ];

  return (
    <div className="adm-page">
      {/* ── BANNER ── */}
      <section className="adm-banner">
        <div className="adm-banner-bg" />
        <div className="adm-container">
          <span className="adm-breadcrumb">Home &nbsp;/&nbsp; Admissions</span>
          <h1 className="adm-banner-title">Admissions</h1>
          <p className="adm-banner-sub">
            Same University of Calicut degree. Fees 3–5× lower than comparable private colleges. No compromise on what matters.
          </p>
        </div>
        <div className="adm-banner-shape" />
      </section>

      {/* ── WHY AFFORDABLE — STANDOUT ── */}
      <section className="adm-why-section">
        <div className="adm-why-bg" />
        <div className="adm-container adm-animate">
          <div className="adm-why-inner">
            <div className="adm-why-left">
              <span className="adm-tag adm-tag--light">The Intent</span>
              <h2 className="adm-section-title adm-title-light">
                Low Fees Are Not a Compromise.<br />They Are the Point.
              </h2>
              <p className="adm-why-body">
                Private unaided college fees in Kerala typically run to ₹50,000–₹80,000 per semester or more. Aashrayam's fee structure sits at a fraction of that — not because corners are being cut, but because access is the mission.
              </p>
              <p className="adm-why-body">
                Our infrastructure is modern. Our faculty are experienced. Our affiliation is with the University of Calicut. What we've chosen not to do is charge students for things that don't add value to their education.
              </p>
              <p className="adm-why-body">
                This is rooted in the founding principle of Samarpitham Educational Trust: <strong>nobody deserves to be left behind because of what education costs.</strong>
              </p>
            </div>
            <div className="adm-why-right">
              <div className="adm-compare-card">
                <p className="adm-compare-title">What you get at Aashrayam that you'd pay full price for elsewhere</p>
                {[
                  "University of Calicut affiliation",
                  "B.Voc / B.Com / B.Sc Honours degree",
                  "Experienced, NET-qualified faculty",
                  "Career guidance & placement support from Year 1",
                  "Personal mentor throughout your programme",
                  "No hidden charges",
                ].map((item, i) => (
                  <div key={i} className="adm-compare-item">
                    <span className="adm-compare-check">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
                <div className="adm-compare-footer">
                  <span className="adm-compare-label">Starting from just</span>
                  <span className="adm-compare-price">₹10,000<span className="adm-compare-period"> first semester</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEE TABLE ── */}
      <section className="adm-fees-section" id="adm-fees-section">
        <div className="adm-container">
          <div className="adm-animate adm-section-header">
            <span className="adm-tag">Fee Structure</span>
            <h2 className="adm-section-title">Fees & Scholarships</h2>
            <p className="adm-section-sub">Academic Year 2025–26. All figures in Indian Rupees.</p>
          </div>

          {/* Fee cards */}
          <div className="adm-animate adm-fee-cards">
            {fees.map((f, i) => (
              <div key={i} className={`adm-fee-card adm-fee-card--${f.color}`} style={{ "--delay": `${i * 0.08}s` }}>
                <div className="adm-fee-card-header">
                  <p className="adm-fee-program">{f.program}</p>
                  <span className="adm-fee-seats">{f.seats} seats</span>
                </div>
                <div className="adm-fee-amounts">
                  <div className="adm-fee-col">
                    <span className="adm-fee-label">Per Semester</span>
                    <span className="adm-fee-value">{f.sem}</span>
                  </div>
                  <div className="adm-fee-divider" />
                  <div className="adm-fee-col">
                    <span className="adm-fee-label">Admission Fee <span className="adm-fee-once">(once)</span></span>
                    <span className="adm-fee-value">{f.admission}</span>
                  </div>
                  <div className="adm-fee-divider" />
                  <div className="adm-fee-col">
                    <span className="adm-fee-label">Included Add-on</span>
                    <span className="adm-fee-value adm-fee-value--big">{f.addon}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Admission fee note */}
          <div className="adm-animate adm-fee-note">
            <div className="adm-fee-note-icon">ℹ</div>
            <div>
              <p className="adm-fee-note-title">What the ₹5,000 admission fee covers</p>
              <p className="adm-fee-note-body">University Registration Fee &nbsp;·&nbsp; PTA Fund Contribution &nbsp;·&nbsp; Admission Kit</p>
              <p className="adm-fee-note-body">The admission fee is a one-time payment at joining. Tuition fees are paid at the start of each semester.</p>
            </div>
          </div>

          {/* Scholarships */}
          <div className="adm-scholarships">
  <div className="adm-animate adm-scholarship-card">
    <div className="adm-sch-icon">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/>
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    </div>
    <div>
      <h4>Merit Scholarship — Incoming Students</h4>
      <p>Higher Secondary students who scored above 80% in Plus Two examinations are eligible to apply for a scholarship at the time of admission. Recognises academic achievement and eases the transition into undergraduate study.</p>
    </div>
  </div>
  <div className="adm-animate adm-scholarship-card" style={{ "--delay": ".1s" }}>
    <div className="adm-sch-icon">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    </div>
    <div>
      <h4>Higher Education Scholarship — Continuing Students</h4>
      <p>Undergraduate students who demonstrate high academic performance throughout their time at Aashrayam are eligible for scholarships to support postgraduate study after graduation. We invest in our best students beyond their three years here.</p>
    </div>
  </div>
</div>
        </div>
      </section>

      {/* ── ELIGIBILITY ── */}
      <section className="adm-eligibility-section">
        <div className="adm-container">
          <div className="adm-animate adm-section-header">
            <span className="adm-tag">Who Can Apply</span>
            <h2 className="adm-section-title">Eligibility Criteria</h2>
          </div>
          <div className="adm-animate adm-eligibility-grid">
            {eligibility.map((e, i) => (
              <div key={i} className="adm-elig-card">
                <h4 className="adm-elig-prog">{e.prog}</h4>
                <p className="adm-elig-crit">{e.crit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO APPLY ── */}
      <section className="adm-steps-section">
        <div className="adm-container">
          <div className="adm-animate adm-section-header">
            <span className="adm-tag">The Process</span>
            <h2 className="adm-section-title">How to Apply</h2>
            <p className="adm-section-sub">Five straightforward steps from enquiry to enrolment.</p>
          </div>
          <div className="adm-steps">
            {steps.map((s, i) => (
  <div key={i} className="adm-animate adm-step" style={{ "--delay": `${i * 0.09}s` }}>
    <div className="adm-step-left">
      <div className="adm-step-num">{s.num}</div>
      {i < steps.length - 1 && <div className="adm-step-connector" />}
    </div>
    <div className="adm-step-content">
      <h4 className="adm-step-title">{s.title}</h4>
      <p className="adm-step-body">{s.body}</p>
    </div>
  </div>
))}
          </div>
        </div>
      </section>

      {/* ── DOCUMENTS ── */}
      <section className="adm-docs-section">
        <div className="adm-container">
          <div className="adm-docs-inner">
            <div className="adm-animate adm-docs-left">
              <span className="adm-tag">What to Bring</span>
              <h2 className="adm-section-title">Documents Required</h2>
              <ul className="adm-docs-list">
                {documents.map((d, i) => (
                  <li key={i} className="adm-doc-item">
                    <span className="adm-doc-check">✓</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="adm-animate adm-contact-card" style={{ "--delay": ".12s" }}>
              <h3 className="adm-contact-title">Talk to Our Admissions Team</h3>
              <p className="adm-contact-sub">Our counsellor will call you back within 24 hours.</p>
              <div className="adm-contact-items">
               <a href="tel:+918078478506" className="adm-contact-item">
  <span className="adm-contact-icon">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
    </svg>
  </span>
  <div>
    <span className="adm-contact-label">Phone / WhatsApp</span>
    <span className="adm-contact-value">+91 8078 478 506</span>
  </div>
</a>
<a href="mailto:aashrayamcollege@gmail.com" className="adm-contact-item">
  <span className="adm-contact-icon">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  </span>
  <div>
    <span className="adm-contact-label">Email</span>
    <span className="adm-contact-value">aashrayamcollege@gmail.com</span>
  </div>
</a>
<div className="adm-contact-item adm-contact-item--addr">
  <span className="adm-contact-icon">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  </span>
  <div>
    <span className="adm-contact-label">College Address</span>
    <span className="adm-contact-value">Aashrayam Orchard, Viruthy, Nenmeni P.O,<br />Kollengode, Palakkad, Kerala – 678506</span>
  </div>
</div>
              </div>
              <a href="/contact" className="adm-enquire-btn">Send an Enquiry →</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;
