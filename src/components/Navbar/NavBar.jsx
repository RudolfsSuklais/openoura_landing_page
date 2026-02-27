import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton/SecondaryButton";
import OpenOuraLogoSM from "../../assets/openoura_logo_sm.png";

function Navbar() {
  const { t, i18n } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDir, setScrollDir] = useState("up");
  const [lastScroll, setLastScroll] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setLoaded(true);

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollDir(currentScroll > lastScroll ? "down" : "up");
      setLastScroll(currentScroll);
      setScrolled(currentScroll > 20);

      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setScrollProgress((currentScroll / height) * 100);

      const sections = [
        "home",
        "shift",
        "how-it-works",
        "testimonials",
        "pricing",
        "contact",
      ];
      const scrollPosition = currentScroll + 150;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + height
          ) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  const menuItems = [
    { icon: "fa-house", label: t("home"), section: "home" },
    { icon: "fa-layer-group", label: t("introduction"), section: "shift" },
    { icon: "fa-book", label: t("how"), section: "how-it-works" },
    { icon: "fa-star", label: t("testimonials"), section: "testimonials" },
    { icon: "fa-tag", label: t("pricing"), section: "pricing" },
    { icon: "fa-envelope", label: t("contact"), section: "contact" },
    {
      icon: "fa-clock",
      label: t("coming_soon"),
      section: "coming-soon",
      comingSoon: true,
    },
  ];

  const languages = [
    { code: "lv", name: "Latviešu", flag: "🇱🇻" },
    { code: "en", name: "English", flag: "🇬🇧" },
  ];

  return (
    <>
      <div
        className="nav-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <nav
        className={`navbar ${loaded ? "nav-visible" : ""} ${scrollDir === "down" ? "navbar-hidden" : ""} ${scrolled ? "navbar-scrolled" : ""}`}
      >
        <div className="nav-container">
          <div
            className="nav-logo animate-nav-item"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            title="Back to top"
          >
            <img src={OpenOuraLogoSM} alt="Logo" />
            <div className="logo-glow"></div>
          </div>

          <nav
            className="nav-links animate-nav-item delay-2"
            aria-label="Main navigation"
          >
            {menuItems.map((item) => (
              <a
                key={item.section}
                href={`#${item.section}`}
                className={`nav-link ${activeSection === item.section ? "active" : ""} ${item.comingSoon ? "nav-link-special" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.section);
                }}
              >
                <i
                  className={`fa-solid ${item.icon} ${item.comingSoon ? "ticking-clock" : ""}`}
                ></i>
                <span>{item.label}</span>

                {activeSection === item.section && (
                  <span className="nav-link-indicator" />
                )}
              </a>
            ))}
          </nav>

          <div className="nav-actions animate-nav-item delay-4">
            <div className="lang-custom-dropdown">
              <div
                className={`lang-selected-wrapper ${langOpen ? "active" : ""}`}
                onClick={() => setLangOpen(!langOpen)}
                aria-label="Select language"
              >
                <i className="fa-solid fa-globe globe-icon"></i>
                <span className="lang-code-text">
                  {i18n.language.toUpperCase()}
                </span>
                <i className="fa-solid fa-chevron-down lang-arrow"></i>
              </div>

              <div className={`lang-options-list ${langOpen ? "visible" : ""}`}>
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    className={`lang-opt ${i18n.language === lang.code ? "selected" : ""}`}
                    onClick={() => changeLanguage(lang.code)}
                  >
                    <span className="lang-flag">{lang.flag}</span>
                    <span className="lang-name">{lang.name}</span>
                    {i18n.language === lang.code && (
                      <i className="fa-solid fa-circle-check"></i>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="nav-actions-buttons-wrapper">
              <SecondaryButton
                btnText={t("login")}
                icon={<i className="fa-solid fa-arrow-right-to-bracket"></i>}
                onClick={() => {}}
              />
              <PrimaryButton
                btnText={t("get_started")}
                icon={<i className="fa-solid fa-rocket"></i>}
              />
            </div>
          </div>

          <button
            className="hamburger-menu animate-nav-item"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <div
              className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`}
            ></div>
            <div
              className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`}
            ></div>
            <div
              className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`}
            ></div>
          </button>
        </div>

        <div className="nav-section-indicators">
          {menuItems.map((item) => (
            <div
              key={item.section}
              className={`section-dot ${activeSection === item.section ? "active" : ""}`}
              onClick={() =>
                document
                  .getElementById(item.section)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              title={item.label}
            />
          ))}
        </div>
      </nav>

      <div
        className={`mobile-menu-overlay ${mobileMenuOpen ? "open" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className="mobile-menu-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mobile-menu-header">
            <img
              src={OpenOuraLogoSM}
              alt="openoura_logo"
              className="mobile-logo"
            />
            <button
              className="mobile-menu-close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <i className="fa-solid fa-times"></i>
            </button>
          </div>

          <div className="mobile-menu-items">
            {menuItems.map((item, index) => (
              <a
                key={item.section}
                href={`#${item.section}`}
                className={`mobile-menu-item ${activeSection === item.section ? "active" : ""} ${item.comingSoon ? "mobile-special" : ""}`}
                style={{ animationDelay: `${index * 0.07}s` }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.section);
                }}
              >
                <i
                  className={`fa-solid ${item.icon} ${item.comingSoon ? "ticking-clock" : ""}`}
                ></i>
                <span>{item.label}</span>

                {activeSection === item.section && (
                  <i className="fa-solid fa-chevron-right"></i>
                )}
              </a>
            ))}
          </div>

          <div className="mobile-menu-actions">
            <SecondaryButton
              btnText={t("login")}
              icon={<i className="fa-solid fa-arrow-right-to-bracket"></i>}
              fullWidth={true}
            />
            <PrimaryButton
              btnText={t("get_started")}
              icon={<i className="fa-solid fa-rocket"></i>}
              fullWidth={true}
            />
          </div>

          <div className="mobile-lang-container">
            <p className="mobile-lang-label">{t("select_language")}</p>
            <div className="mobile-lang-list">
              {languages.map((lang) => (
                <div
                  key={lang.code}
                  className={`mobile-lang-item ${i18n.language === lang.code ? "active" : ""}`}
                  onClick={() => changeLanguage(lang.code)}
                >
                  <div className="mobile-lang-info">
                    <span className="lang-flag">{lang.flag}</span>
                    <span className="mobile-lang-name">{lang.name}</span>
                  </div>
                  {i18n.language === lang.code && (
                    <i className="fa-solid fa-circle-check"></i>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
