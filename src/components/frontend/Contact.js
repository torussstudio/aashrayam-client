import React, { useEffect, useRef, useState } from "react";
import { sendEnquiry } from "../../utils/sendEnquiry";
import "./Contact.css";

const Contact = () => {
  const observerRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("ct-visible"),
        ),
      { threshold: 0.1 },
    );
    document
      .querySelectorAll(".ct-animate")
      .forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    sendEnquiry({
      form_source: "Contact Page",
      name: form.name,
      phone: form.phone,
      email: form.email || "Not provided",
      programme: form.course,
      message: form.message || "—",
    })
      .then(() => {
        setSubmitted(true);
      })
      .catch((err) => {
        console.error("Enquiry send failed:", err);
        setError(true);
      })
      .finally(() => {
        setSending(false);
      });
  };

  const courses = [
    "B.Com (Hons) — Co-operation",
    "B.Sc Psychology (Hons)",
    "B.Voc Banking, Finance & Insurance",
    "B.Sc Artificial Intelligence (Proposed)",
    "Not sure yet — need guidance",
  ];

  const contactDetails = [
    {
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
        </svg>
      ),
      label: "Phone / WhatsApp",
      value: "+91 8078 478 506",
      href: "tel:+918078478506",
    },
    {
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: "Email",
      value: "aashrayamcollege@gmail.com",
      href: "mailto:aashrayamcollege@gmail.com",
    },
    {
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: "Address",
      value:
        "Aashrayam Orchard, Viruthy, Nenmeni P.O, Kollengode, Palakkad, Kerala – 678506",
      href: null,
    },
  ];

  const socials = [
    {
      label: "Facebook",
      href: "https://facebook.com/Aashrayamcollege",
      icon: "f",
    },
    {
      label: "Instagram",
      href: "https://instagram.com/aashrayam.college",
      icon: "ig",
    },
  ];

  return (
    <div className="ct-page">
      {/* ── BANNER ── */}
      <section className="ct-banner">
        <div className="ct-banner-bg" />
        <div className="ct-container">
          <span className="ct-breadcrumb">Home &nbsp;/&nbsp; Contact</span>
          <h1 className="ct-banner-title">Get in Touch</h1>
          <p className="ct-banner-sub">
            Our admissions counsellor responds within 24 hours. Or come see the
            campus — some things are better experienced than explained.
          </p>
        </div>
        <div className="ct-banner-shape" />
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="ct-main">
        <div className="ct-container">
          <div className="ct-grid">
            {/* ── LEFT — CONTACT INFO ── */}
            <div className="ct-animate ct-left">
              <h2 className="ct-left-title">Reach Us Directly</h2>
              <p className="ct-left-sub">
                Call, WhatsApp, or email — we'll get back to you within 24
                hours.
              </p>

              <div className="ct-contact-items">
                {contactDetails.map((d, i) =>
                  d.href ? (
                    <a key={i} href={d.href} className="ct-contact-item">
                      <div className="ct-contact-icon-wrap">{d.icon}</div>
                      <div>
                        <span className="ct-contact-label">{d.label}</span>
                        <span className="ct-contact-value">{d.value}</span>
                      </div>
                    </a>
                  ) : (
                    <div
                      key={i}
                      className="ct-contact-item ct-contact-item--static"
                    >
                      <div className="ct-contact-icon-wrap">{d.icon}</div>
                      <div>
                        <span className="ct-contact-label">{d.label}</span>
                        <span className="ct-contact-value">{d.value}</span>
                      </div>
                    </div>
                  ),
                )}
              </div>

              <div className="ct-hours">
                <h4>Office Hours</h4>
                <p>Monday – Saturday &nbsp;|&nbsp; 9:00 AM – 5:00 PM</p>
                <p className="ct-hours-note">
                  Admissions counsellor available on WhatsApp outside office
                  hours.
                </p>
              </div>

              <div className="ct-social-row">
                <span className="ct-social-label">Follow us</span>
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="ct-social-chip"
                  >
                    {s.label}
                  </a>
                ))}
              </div>

              {/* Map embed placeholder */}
              <div className="ct-map-wrap">
                <iframe
                  title="Aashrayam College Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919!2d76.6!3d10.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAashrayam+College+Kollengode!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="220"
                  style={{ border: 0, borderRadius: "12px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <p className="ct-map-note">
                  Aashrayam Orchard, Nenmeni, Kollengode
                </p>
              </div>
            </div>

            {/* ── RIGHT — ENQUIRY FORM ── */}
            <div className="ct-animate ct-right" style={{ "--delay": ".12s" }}>
              {!submitted ? (
                <div className="ct-form-card">
                  <div className="ct-form-header">
                    <h2 className="ct-form-title">Send an Enquiry</h2>
                    <p className="ct-form-sub">
                      Free counselling. No obligations. We'll call you back
                      within 24 hours.
                    </p>
                  </div>

                  <form className="ct-form" onSubmit={handleSubmit}>
                    <div className="ct-form-row">
                      <div className="ct-field">
                        <label className="ct-label">
                          Full Name <span className="ct-required">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="ct-input"
                          placeholder="Your full name"
                          value={form.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="ct-field">
                        <label className="ct-label">
                          Phone Number <span className="ct-required">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          className="ct-input"
                          placeholder="+91 XXXXX XXXXX"
                          value={form.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="ct-field">
                      <label className="ct-label">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        className="ct-input"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="ct-field">
                      <label className="ct-label">
                        Programme of Interest{" "}
                        <span className="ct-required">*</span>
                      </label>
                      <select
                        name="course"
                        required
                        className="ct-select"
                        value={form.course}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Select a programme
                        </option>
                        {courses.map((c, i) => (
                          <option key={i} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="ct-field">
                      <label className="ct-label">Message / Questions</label>
                      <textarea
                        name="message"
                        rows="4"
                        className="ct-textarea"
                        placeholder="Anything you'd like to ask us..."
                        value={form.message}
                        onChange={handleChange}
                      />
                    </div>

                    <button
                      type="submit"
                      className="ct-submit-btn"
                      disabled={sending}
                    >
                      {sending ? "Sending..." : "Send Enquiry →"}
                    </button>

                    {error && (
                      <p className="ct-error-msg">
                        Something went wrong sending your enquiry. Please try
                        again, or contact us directly at +91 8078 478 506 /
                        aashrayamcollege@gmail.com.
                      </p>
                    )}
                  </form>
                </div>
              ) : (
                <div className="ct-success-card">
                  <div className="ct-success-icon">✓</div>
                  <h3 className="ct-success-title">
                    We've received your enquiry.
                  </h3>
                  <p className="ct-success-body">
                    Our admissions counsellor will call you back within 24
                    hours. In the meantime, feel free to WhatsApp us at +91 8078
                    478 506 if you have any urgent questions.
                  </p>
                  <button
                    className="ct-reset-btn"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        phone: "",
                        email: "",
                        course: "",
                        message: "",
                      });
                    }}
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
