import React, { useEffect, useRef, useState } from "react";
import "./Footer.css";
import { useTranslation } from "react-i18next";

import OpenOuraLogoSM from "../../assets/openoura_logo_sm.png";

export default function Footer() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const footerRef = useRef(null);

  const NAV_LINKS = {
    [t("footer_col_product")]: [
      { label: t("footer_link_features"), href: "#features" },
      { label: t("footer_link_coming_soon"), href: "#coming-soon" },
      { label: t("footer_link_pricing"), href: "#pricing" },
      { label: t("footer_link_integrations"), href: "#integrations" },
    ],
    [t("footer_col_company")]: [
      { label: t("footer_link_about"), href: "#about" },
      { label: t("footer_link_team"), href: "#team" },
      { label: t("footer_link_careers"), href: "#careers" },
      { label: t("footer_link_blog"), href: "#blog" },
    ],
    [t("footer_col_support")]: [
      { label: t("footer_link_docs"), href: "#docs" },
      { label: t("footer_link_contact"), href: "#contact" },
      { label: t("footer_link_privacy"), href: "#privacy" },
      { label: t("footer_link_terms"), href: "#terms" },
    ],
  };

  const SOCIALS = [
    { icon: "fa-brands fa-linkedin-in", href: "#", label: "LinkedIn" },
    { icon: "fa-brands fa-x-twitter", href: "#", label: "X / Twitter" },
    { icon: "fa-brands fa-github", href: "#", label: "GitHub" },
    { icon: "fa-brands fa-instagram", href: "#", label: "Instagram" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setSubscribed(true);
  };

  return (
    <footer
      className={`site-footer ${visible ? "footer-visible" : ""}`}
      ref={footerRef}
    >
      <div className="footer-top-glow" />
      <div className="footer-blur footer-blur-1" />
      <div className="footer-blur footer-blur-2" />
      <div className="footer-grid-overlay" />

      <div className="footer-inner">
        <div className="footer-newsletter">
          <div className="newsletter-text">
            <h4>{t("footer_newsletter_title")}</h4>
            <p>{t("footer_newsletter_desc")}</p>
          </div>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            {subscribed ? (
              <div className="newsletter-success">
                <i className="fa-solid fa-circle-check" />
                <span>{t("footer_newsletter_success")}</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer_newsletter_ph")}
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn">
                  <i className="fa-solid fa-paper-plane" />
                  {t("footer_newsletter_btn")}
                </button>
              </>
            )}
          </form>
        </div>

        <div className="footer-divider" />

        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={OpenOuraLogoSM} alt="openoura-logo" />
            </div>
            <p className="footer-tagline">{t("footer_tagline")}</p>

            <div className="footer-contact-mini">
              <a href="mailto:info@openoura.com" className="contact-mini-row">
                <i className="fa-solid fa-envelope" />
                info@openoura.com
              </a>
              <a href="tel:+37120510502" className="contact-mini-row">
                <i className="fa-solid fa-phone" />
                +371 20 510 502
              </a>
              <div className="contact-mini-row">
                <i className="fa-solid fa-location-dot" />
                {t("footer_location")}
              </div>
            </div>

            <div className="footer-socials">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="social-btn"
                  aria-label={s.label}
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(NAV_LINKS).map(([group, links], gi) => (
            <div
              className="footer-nav-col"
              key={group}
              style={{ animationDelay: `${0.1 + gi * 0.08}s` }}
            >
              <h5 className="footer-nav-heading">{group}</h5>
              <ul className="footer-nav-list">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer-nav-link">
                      <span className="link-arrow">→</span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} OpenOura. {t("footer_rights")}
          </p>
          <div className="footer-bottom-badges">
            <span className="footer-badge">
              <i className="fa-solid fa-shield-halved" />
              {t("footer_badge_gdpr")}
            </span>
            <span className="footer-badge">
              <i className="fa-solid fa-lock" />
              {t("footer_badge_ssl")}
            </span>
            <span className="footer-badge">
              <i className="fa-solid fa-server" />
              {t("footer_badge_uptime")}
            </span>
          </div>
          <p className="footer-made">
            {t("footer_made_with")}{" "}
            <i className="fa-solid fa-heart footer-heart" />{" "}
            {t("footer_country")}
          </p>
        </div>
      </div>
    </footer>
  );
}
