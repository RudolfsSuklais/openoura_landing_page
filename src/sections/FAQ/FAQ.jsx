import React, { useState } from "react";
import "./FAQ.css";
import { useTranslation } from "react-i18next";

function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: t("faq_q1"), a: t("faq_a1") },
    { q: t("faq_q2"), a: t("faq_a2") },
    { q: t("faq_q3"), a: t("faq_a3") },
    { q: t("faq_q4"), a: t("faq_a4") },
    { q: t("faq_q5"), a: t("faq_a5") },
    { q: t("faq_q6"), a: t("faq_a6") },
  ];

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="faq" id="faq">
      <div className="faq-container">
        <div className="faq-header">
          <span className="faq-eyebrow">{t("faq_eyebrow")}</span>
          <h2 className="faq-title">
            {t("faq_title_1")}{" "}
            <span className="text-gradient">{t("faq_title_2")}</span>
          </h2>
          <p className="faq-subtitle">{t("faq_subtitle")}</p>
        </div>

        <div className="faq-list">
          {faqs.map((item, i) => (
            <div
              key={i}
              className={`faq-item ${openIndex === i ? "open" : ""}`}
              onClick={() => toggle(i)}
            >
              <div className="faq-question">
                <span>{item.q}</span>
                <div className="faq-icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-cta">
          <p>{t("faq_still_questions")}</p>
          <a href="#contact" className="faq-cta-link">
            {t("faq_contact_us")} →
          </a>
        </div>
      </div>
    </section>
  );
}

export default FAQ;