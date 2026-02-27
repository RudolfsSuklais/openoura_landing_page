import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import "./Testimonials.css";

import FINESTRA_LOGO from "../../../assets/finestra_solution_logo.png";

function StarRating({ count }) {
  return (
    <div className="star-rating" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <i
          key={i}
          className={`fa-star ${i < count ? "fa-solid" : "fa-regular"}`}
        ></i>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, isActive }) {
  return (
    <div
      className={`testimonial-card glass-card ${isActive ? "is-active" : ""}`}
    >
      <div className="quote-mark" aria-hidden="true">
        <i className="fa-solid fa-quote-left"></i>
      </div>

      <StarRating count={testimonial.rating} />

      <blockquote className="testimonial-quote">{testimonial.quote}</blockquote>

      <div className="testimonial-footer">
        <div className="testimonial-author-block">
          <div className="author-avatar">
            <span>{testimonial.author.charAt(0)}</span>
          </div>
          <div className="author-meta">
            <span className="author-name">{testimonial.author}</span>
            <span className="author-role">{testimonial.role}</span>
          </div>
        </div>

        <div className="testimonial-company">
          <img
            src={testimonial.logo}
            alt={`${testimonial.company} logo`}
            className="company-logo"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              if (e.currentTarget.nextSibling) {
                e.currentTarget.nextSibling.style.display = "block";
              }
            }}
          />
          <span className="company-name-fallback" style={{ display: "none" }}>
            {testimonial.company}
          </span>
        </div>
      </div>

      <div className="metric-pill">
        <span className="metric-value">{testimonial.metric}</span>
        <span className="metric-label">{testimonial.metricLabel}</span>
      </div>
    </div>
  );
}

function Testimonials() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      quote: t("testimonial_1_quote"),
      author: "Gatis Šuklais",
      role: t("testimonial_1_role"),
      company: "Finestra Solution",
      logo: FINESTRA_LOGO,
      rating: 5,
      metric: t("testimonial_1_metric"),
      metricLabel: t("testimonial_1_metric_label"),
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  return (
    <section
      className={`testimonials ${visible ? "in-view" : ""}`}
      ref={sectionRef}
    >
      <div
        className="testimonials-blur testimonials-blur-1"
        aria-hidden="true"
      />
      <div
        className="testimonials-blur testimonials-blur-2"
        aria-hidden="true"
      />
      <div className="testimonials-grid-overlay" aria-hidden="true" />

      <div className="testimonials-container">
        <div className="testimonials-header">
          <span className="section-eyebrow">
            <i className="fa-solid fa-stars"></i> {t("testimonials_eyebrow")}
          </span>
          <h2 className="testimonials-title">
            {t("testimonials_title_1")} <br />
            <span className="text-gradient">{t("testimonials_title_2")}</span>
          </h2>
          <p className="testimonials-subtitle">{t("testimonials_subtitle")}</p>
        </div>

        <div className="testimonials-stage">
          <div className="stage-orb" aria-hidden="true" />

          {testimonials.map((item, i) => (
            <TestimonialCard
              key={item.id}
              testimonial={item}
              isActive={i === activeIndex}
            />
          ))}

          {testimonials.length > 1 && (
            <div
              className="testimonials-dots"
              role="tablist"
              aria-label="Testimonial navigation"
            >
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === activeIndex}
                  className={`dot-btn ${i === activeIndex ? "active" : ""}`}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="trust-bar">
          <div className="trust-stat">
            <span className="trust-number">98%</span>
            <span className="trust-desc">{t("trust_stat_satisfaction")}</span>
          </div>
          <div className="trust-divider" />
          <div className="trust-stat">
            <span className="trust-number">50+</span>
            <span className="trust-desc">{t("trust_stat_companies")}</span>
          </div>
          <div className="trust-divider" />
          <div className="trust-stat">
            <span className="trust-number">24/7</span>
            <span className="trust-desc">{t("trust_stat_support")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
