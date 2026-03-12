import React, { useEffect, useRef, useState } from "react";
import "./Footer.css";
import { useTranslation } from "react-i18next";
import OpenOuraLogo from "../../../public/openoura_logo_sm.png";

export default function Footer() {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const footerRef = useRef(null);

    const SOCIALS = [
        // { icon: "fa-brands fa-linkedin-in", href: "#", label: "LinkedIn" },
        // { icon: "fa-brands fa-x-twitter", href: "#", label: "X / Twitter" },
        // { icon: "fa-brands fa-github", href: "#", label: "GitHub" },
        { icon: "fa-brands fa-instagram", href: "https://www.instagram.com/openoura/", label: "Instagram" },
        { icon: "fa-brands fa-facebook", href: "https://www.facebook.com/profile.php?id=61585488167703", label: "Instagram" },
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
            ref={footerRef}>
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
                    <form
                        className="newsletter-form"
                        onSubmit={handleSubscribe}>
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
                                <button
                                    type="submit"
                                    className="newsletter-btn">
                                    <i className="fa-solid fa-paper-plane" />
                                    {t("footer_newsletter_btn")}
                                </button>
                            </>
                        )}
                    </form>
                </div>

                <div className="footer-divider" />

                <div className="footer-main">
                    <div className="footer-brand-identity">
                        <div className="footer-logo">
                            <img src={OpenOuraLogo} alt="Logo" />
                        </div>
                        <p className="footer-tagline">{t("footer_tagline")}</p>
                    </div>

                    <div className="footer-contact-block">
                        <p className="footer-block-label">
                            {t("footer_contact_label")}
                        </p>
                        <div className="footer-contact-mini">
                            <a
                                href="mailto:info@openoura.com"
                                className="contact-mini-row">
                                <i className="fa-solid fa-envelope" />
                                info@openoura.com
                            </a>
                            <a
                                href="tel:+37120510502"
                                className="contact-mini-row">
                                <i className="fa-solid fa-phone" />
                                +371 20 510 502
                            </a>
                            <div className="contact-mini-row">
                                <i className="fa-solid fa-location-dot" />
                                {t("footer_location")}
                            </div>
                        </div>
                    </div>

                    <div className="footer-socials-block">
                        <p className="footer-block-label">
                            {t("footer_socials_label")}
                        </p>
                        <div className="footer-socials">
                            {SOCIALS.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    className="social-btn"
                                    aria-label={s.label}>
                                    <i className={s.icon} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="footer-divider" />

                <div className="footer-bottom">
                    <p className="footer-copy">
                        © {new Date().getFullYear()} OpenOura.{" "}
                        {t("footer_rights")}
                    </p>
                    <div className="footer-bottom-badges"></div>
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
