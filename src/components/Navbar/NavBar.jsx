import React, { useEffect, useRef, useState } from "react";
import "./NavBar.css";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton/SecondaryButton";
import OpenOuraLogo from "../../../public/openoura_logo_sm.png";

const BREAKPOINT = 1200;
const SECTIONS = [
    "home",
    "shift",
    "how-it-works",
    "testimonials",
    "pricing",
    "contact",
];

export default function Navbar() {
    const { t, i18n } = useTranslation();

    const [mounted, setMounted] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [scrolled, setScrolled] = useState(false);
    const [scrollDir, setScrollDir] = useState("up");
    const [progress, setProgress] = useState(0);
    const [isDesktop, setIsDesktop] = useState(false);

    const langRef = useRef(null);
    const lastScroll = useRef(0);

    useEffect(() => {
        setMounted(true);
        setIsDesktop(window.innerWidth >= BREAKPOINT);

        const onResize = () => {
            const desktop = window.innerWidth >= BREAKPOINT;
            setIsDesktop(desktop);
            if (desktop) setDrawerOpen(false);
        };

        const onScroll = () => {
            const y = window.scrollY;
            const max =
                document.documentElement.scrollHeight - window.innerHeight;
            setScrolled(y > 30);
            setScrollDir(y > lastScroll.current ? "down" : "up");
            setProgress(max > 0 ? (y / max) * 100 : 0);
            lastScroll.current = y;

            const offset = y + 120;
            for (const id of SECTIONS) {
                const el = document.getElementById(id);
                if (
                    el &&
                    offset >= el.offsetTop &&
                    offset < el.offsetTop + el.offsetHeight
                ) {
                    setActiveSection(id);
                }
            }
        };

        const onClickOutside = (e) => {
            if (langRef.current && !langRef.current.contains(e.target))
                setLangOpen(false);
        };

        window.addEventListener("resize", onResize, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        document.addEventListener("mousedown", onClickOutside);
        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("scroll", onScroll);
            document.removeEventListener("mousedown", onClickOutside);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = drawerOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [drawerOpen]);

    const scrollTo = (id) => {
        setDrawerOpen(false);
        setActiveSection(id);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const changeLang = (code) => {
        i18n.changeLanguage(code);
        setLangOpen(false);
    };

    const hideBar = isDesktop && scrollDir === "down" && scrolled;

    const NAV_ITEMS = [
        { id: "home", icon: "fa-house", label: t("home") },
        { id: "shift", icon: "fa-layer-group", label: t("introduction") },
        { id: "how-it-works", icon: "fa-book", label: t("how") },
        { id: "testimonials", icon: "fa-star", label: t("testimonials") },
        { id: "pricing", icon: "fa-tag", label: t("pricing") },
        { id: "contact", icon: "fa-envelope", label: t("contact") },
        {
            id: "coming-soon",
            icon: "fa-clock",
            label: t("coming_soon"),
            special: true,
        },
    ];

    const LANGS = [
        { code: "lv", name: "Latviešu", flag: "🇱🇻" },
        { code: "en", name: "English", flag: "🇬🇧" },
    ];

    return (
        <>
            <div
                className="nb-progress"
                style={{ width: `${progress}%` }}
                aria-hidden="true"
            />

            <header
                className={[
                    "nb",
                    mounted ? "nb--on" : "",
                    scrolled ? "nb--scrolled" : "",
                    hideBar ? "nb--hidden" : "",
                ]
                    .filter(Boolean)
                    .join(" ")}>
                <div className="nb__inner">
                    <button
                        className="nb__logo"
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                        aria-label="Back to top">
                        <img src={OpenOuraLogo} alt="Openoura" />
                    </button>

                    <nav className="nb__links" aria-label="Main navigation">
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className={[
                                    "nb__link",
                                    activeSection === item.id
                                        ? "nb__link--active"
                                        : "",
                                    item.special ? "nb__link--special" : "",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollTo(item.id);
                                }}>
                                <i
                                    className={`fa-solid ${item.icon}`}
                                    aria-hidden="true"
                                />
                                <span>{item.label}</span>
                            </a>
                        ))}
                    </nav>

                    <div className="nb__right">
                        <SecondaryButton
                            btnText={t("login")}
                            icon={
                                <i className="fa-solid fa-arrow-right-to-bracket" />
                            }
                            onClick={() => window.open("https://openoura.com", "_blank")}
                        />
                        <PrimaryButton
                            btnText={t("get_started")}
                            icon={<i className="fa-solid fa-rocket" />}
                        />

                        <div className="nb__lang" ref={langRef}>
                            <button
                                className={`nb__lang-btn${langOpen ? " nb__lang-btn--open" : ""}`}
                                onClick={() => setLangOpen((v) => !v)}
                                aria-haspopup="listbox"
                                aria-expanded={langOpen}
                                aria-label="Select language">
                                <i
                                    className="fa-solid fa-globe"
                                    aria-hidden="true"
                                />
                                <span>{i18n.language.toUpperCase()}</span>
                                <i
                                    className="fa-solid fa-chevron-down nb__chevron"
                                    aria-hidden="true"
                                />
                            </button>
                            <div
                                className={`nb__lang-drop${langOpen ? " nb__lang-drop--open" : ""}`}
                                role="listbox">
                                {LANGS.map((lang) => (
                                    <button
                                        key={lang.code}
                                        role="option"
                                        aria-selected={
                                            i18n.language === lang.code
                                        }
                                        className={`nb__lang-opt${i18n.language === lang.code ? " nb__lang-opt--on" : ""}`}
                                        onClick={() => changeLang(lang.code)}>
                                        <span aria-hidden="true">
                                            {lang.flag}
                                        </span>
                                        <span>{lang.name}</span>
                                        {i18n.language === lang.code && (
                                            <i
                                                className="fa-solid fa-circle-check"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        className={`nb__burger${drawerOpen ? " nb__burger--open" : ""}`}
                        onClick={() => setDrawerOpen((v) => !v)}
                        aria-label={drawerOpen ? "Close menu" : "Open menu"}
                        aria-expanded={drawerOpen}
                        aria-controls="nb-drawer">
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </header>

            <div
                id="nb-drawer"
                className={`nb-drawer${drawerOpen ? " nb-drawer--open" : ""}`}
                aria-hidden={!drawerOpen}>
                <div
                    className="nb-drawer__backdrop"
                    onClick={() => setDrawerOpen(false)}
                    aria-hidden="true"
                />
                <div
                    className="nb-drawer__panel"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Navigation"
                    onClick={(e) => e.stopPropagation()}>
                    <div className="nb-drawer__head">
                        <span className="nb-drawer__title">MENU</span>
                    </div>

                    <div className="nb-drawer__scroll">
                        <nav className="nb-drawer__nav">
                            {NAV_ITEMS.map((item, i) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className={[
                                        "nb-drawer__item",
                                        activeSection === item.id
                                            ? "nb-drawer__item--active"
                                            : "",
                                        item.special
                                            ? "nb-drawer__item--special"
                                            : "",
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                    style={{ "--i": i }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollTo(item.id);
                                    }}>
                                    <i
                                        className={`fa-solid ${item.icon}`}
                                        aria-hidden="true"
                                    />
                                    <span>{item.label}</span>
                                    {activeSection === item.id && (
                                        <i
                                            className="fa-solid fa-chevron-right"
                                            aria-hidden="true"
                                        />
                                    )}
                                </a>
                            ))}
                        </nav>

                        <div className="nb-drawer__cta">
                            <SecondaryButton
                                btnText={t("login")}
                                icon={
                                    <i className="fa-solid fa-arrow-right-to-bracket" />
                                }
                                fullWidth
                                onClick={() => window.open("https://openoura.com", "_blank")}
                            />
                            <PrimaryButton
                                btnText={t("get_started")}
                                icon={<i className="fa-solid fa-rocket" />}
                                fullWidth
                                onClick={() => {
                                    setDrawerOpen(false);
                                    setTimeout(() => {
                                        document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
                                    }, 300);
                                }}
                            />
                        </div>
                        <div className="nb-drawer__lang">
                            <p className="nb-drawer__lang-heading">
                                {t("select_language")}
                            </p>
                            <div className="nb-drawer__lang-list">
                                {LANGS.map((lang) => (
                                    <button
                                        key={lang.code}
                                        className={`nb-drawer__lang-item${i18n.language === lang.code ? " nb-drawer__lang-item--on" : ""}`}
                                        onClick={() => changeLang(lang.code)}>
                                        <span>{lang.flag}</span>
                                        <span>{lang.name}</span>
                                        {i18n.language === lang.code && (
                                            <i
                                                className="fa-solid fa-circle-check"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}