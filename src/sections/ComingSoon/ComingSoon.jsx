import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import "./ComingSoon.css";

function Mockup({ type, color, colorSecondary }) {
  const { t } = useTranslation();

  if (type === "pdf") {
    return (
      <div className="mockup mockup-pdf">
        <div className="pdf-drop-zone">
          <i className="fa-solid fa-cloud-arrow-up"></i>
          <span>{t("mockup_drop_files")}</span>
        </div>
        {[
          "Ražošanas_grāmata_v2.pdf",
          "Optimizācija_Q3.pdf",
          "Projekts_A.docx",
        ].map((name, i) => (
          <div
            className="pdf-file-row"
            key={i}
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <i className="fa-solid fa-file-lines"></i>
            <span>{name}</span>
            <div className="pdf-progress">
              <div
                className="pdf-progress-fill"
                style={{
                  width: `${[100, 72, 45][i]}%`,
                  background: `linear-gradient(90deg, ${color}, ${colorSecondary})`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "warehouse") {
    const items = [
      { name: "Metāla profils 40x40", sku: "MP-4040", qty: 248, max: 300, warn: false },
      { name: "Skrūves M8x25", sku: "SC-M825", qty: 42, max: 500, warn: true },
      { name: "Gumijas blīve 12mm", sku: "GB-012", qty: 190, max: 200, warn: false },
      { name: "Alumīnija loksne", sku: "AL-2MM", qty: 18, max: 100, warn: true },
    ];
    return (
      <div className="mockup mockup-warehouse">
        <div className="wh-header">
          <span className="wh-title"><i className="fa-solid fa-warehouse" /> Noliktava</span>
          <span className="wh-count">{items.length} pozīcijas</span>
        </div>
        <div className="wh-table">
          {items.map((item, i) => {
            const pct = Math.round((item.qty / item.max) * 100);
            return (
              <div className="wh-row" key={i} style={{ animationDelay: `${i * 0.12}s` }}>
                <div className="wh-row-info">
                  <span className="wh-item-name">{item.name}</span>
                  <span className="wh-item-sku">{item.sku}</span>
                </div>
                <div className="wh-row-right">
                  <div className="wh-bar-wrap">
                    <div className="wh-bar">
                      <div
                        className="wh-bar-fill"
                        style={{
                          width: `${pct}%`,
                          background: item.warn
                            ? "linear-gradient(90deg, #f59e0b, #ef4444)"
                            : `linear-gradient(90deg, ${color}, ${colorSecondary})`,
                        }}
                      />
                    </div>
                  </div>
                  <span className={`wh-qty ${item.warn ? "wh-qty-warn" : ""}`}>
                    {item.warn && <i className="fa-solid fa-triangle-exclamation" />}
                    {item.qty}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (type === "schedule") {
    const months = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun"];
    const CAP = 5280;
    const workloadH = [3270, 3960, 4380, 4800, 5690, 4640];
    const W = 210, H = 105;
    const pad = { t: 10, r: 14, b: 20, l: 38 };
    const innerW = W - pad.l - pad.r;
    const innerH = H - pad.t - pad.b;
    const maxVal = 6400;
    const yTicks = [0, 1760, 3520, 5280];
    const toX = (i) => pad.l + (i / (months.length - 1)) * innerW;
    const toY = (v) => pad.t + innerH - (v / maxVal) * innerH;

    const areaPath = [
      `M ${toX(0)},${toY(workloadH[0])}`,
      ...workloadH.slice(1).map((v, i) => `L ${toX(i + 1)},${toY(v)}`),
      `L ${toX(workloadH.length - 1)},${pad.t + innerH}`,
      `L ${toX(0)},${pad.t + innerH}`,
      "Z",
    ].join(" ");

    const tCross = (CAP - workloadH[3]) / (workloadH[4] - workloadH[3]);
    const crossX = toX(3) + tCross * (toX(4) - toX(3));
    const crossY = toY(CAP);

    const overflowPath = [
      `M ${crossX},${crossY}`,
      `L ${toX(4)},${toY(workloadH[4])}`,
      `L ${toX(5)},${toY(workloadH[5])}`,
      `L ${toX(5)},${crossY}`,
      `L ${crossX},${crossY}`,
      "Z",
    ].join(" ");

    const overloadPct = Math.round(((workloadH[4] - CAP) / CAP) * 100);

    return (
      <div className="mockup mockup-schedule">
        <div className="chart-legend">
          <span className="legend-cap"><span />{t("mockup_capacity")} (5280h)</span>
          <span className="legend-load"><span />{t("mockup_load")}</span>
          <span className="legend-over"><span />{t("mockup_over")}</span>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="capacity-svg">
          <defs>
            <linearGradient id="loadGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="overGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff5f56" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ff5f56" stopOpacity="0.12" />
            </linearGradient>
            <clipPath id="chartClip2">
              <rect x={pad.l} y={pad.t} width={innerW} height={innerH} />
            </clipPath>
          </defs>
          {yTicks.map((v) => (
            <g key={v}>
              <line x1={pad.l} y1={toY(v)} x2={pad.l + innerW} y2={toY(v)}
                stroke={v === CAP ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)"}
                strokeWidth={v === CAP ? "0.8" : "0.5"}
                strokeDasharray={v === CAP ? "0" : "2,3"} />
              <text x={pad.l - 3} y={toY(v) + 3} fontSize="4.8"
                fill={v === CAP ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.22)"}
                textAnchor="end" fontWeight={v === CAP ? "700" : "400"}>
                {v === 0 ? "0" : `${v / 1000}k`}
              </text>
            </g>
          ))}
          <text x={8} y={pad.t + innerH / 2} fontSize="4.5" fill="rgba(255,255,255,0.25)"
            textAnchor="middle" fontWeight="600"
            transform={`rotate(-90, 8, ${pad.t + innerH / 2})`}>
            {t("mockup_hours")}
          </text>
          <path d={areaPath} fill="url(#loadGrad2)" clipPath="url(#chartClip2)" />
          <path d={overflowPath} fill="url(#overGrad2)" clipPath="url(#chartClip2)" className="overflow-area" />
          <polyline
            points={workloadH.map((v, i) => `${toX(i)},${toY(v)}`).join(" ")}
            fill="none" stroke={color} strokeWidth="1.6"
            strokeLinejoin="round" strokeLinecap="round"
            className="chart-line-load" clipPath="url(#chartClip2)" />
          <line x1={toX(0)} y1={toY(CAP)} x2={toX(5)} y2={toY(CAP)}
            stroke="rgba(255,255,255,0.55)" strokeWidth="1.2"
            strokeDasharray="4,2.5" className="chart-line-cap" />
          {workloadH.map((v, i) => (
            <circle key={i} cx={toX(i)} cy={toY(v)} r="2.2"
              fill={v > CAP ? "#ff5f56" : color} stroke="#0a0a0a" strokeWidth="1"
              className="chart-dot" style={{ animationDelay: `${0.4 + i * 0.1}s` }} />
          ))}
          <g className="overflow-badge" style={{ animationDelay: "0.8s" }}>
            <rect x={toX(4) - 13} y={toY(workloadH[4]) - 12} width="26" height="11" rx="3" fill="#ff5f56" />
            <text x={toX(4)} y={toY(workloadH[4]) - 4.5} fontSize="6" fill="#fff"
              textAnchor="middle" fontWeight="800">+{overloadPct}%</text>
          </g>
          {months.map((m, i) => (
            <text key={i} x={toX(i)} y={H - 3} fontSize="5.5"
              fill="rgba(255,255,255,0.3)" textAnchor="middle" fontWeight="600">{m}</text>
          ))}
        </svg>
      </div>
    );
  }

  if (type === "mobile") {
    return (
      <div className="mockup mockup-mobile">
        <div className="phone-frame">
          <div className="phone-notch" />
          <div className="phone-screen">
            <div className="phone-header">
              <span>{t("mockup_greeting")}</span>
              <i className="fa-solid fa-bell" style={{ color }}></i>
            </div>
            <div className="phone-kpi-row">
              <div className="phone-kpi" style={{ borderColor: `${color}33` }}>
                <span className="phone-kpi-val" style={{ color }}>94%</span>
                <span className="phone-kpi-label">KPI</span>
              </div>
              <div className="phone-kpi" style={{ borderColor: `${color}33` }}>
                <span className="phone-kpi-val" style={{ color }}>12</span>
                <span className="phone-kpi-label">{t("mockup_tasks")}</span>
              </div>
            </div>
            <div className="phone-bar-group">
              {[70, 85, 60, 90, 75].map((h, i) => (
                <div key={i} className="phone-bar"
                  style={{
                    height: `${h}%`,
                    background: `linear-gradient(180deg, ${color}, ${colorSecondary})`,
                    animationDelay: `${i * 0.08}s`,
                  }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function FeatureCard({ feature, index, position, onClick, isVisible }) {
  const { t } = useTranslation();

  const isCenter = position === 0;
  const absPos = Math.abs(position);

  const getTransform = () => {
    if (isCenter) return "translateX(0px) translateZ(0px) rotateY(0deg) scale(1)";
    if (absPos === 1) {
      const dir = position > 0 ? 1 : -1;
      return `translateX(${dir * 62}%) translateZ(-140px) rotateY(${dir * -18}deg) scale(0.82)`;
    }
    const dir = position > 0 ? 1 : -1;
    return `translateX(${dir * 115}%) translateZ(-260px) rotateY(${dir * -28}deg) scale(0.65)`;
  };

  const isDone = feature.status === "done";
  const isCompleted = feature.status === "completed";
  const isReleased = isDone || isCompleted;

  return (
    <div
      className={`cs-card cs-card-carousel ${isVisible ? "card-visible" : ""} ${isCenter ? "card-center" : ""} ${isReleased ? "card-released" : ""}`}
      style={{
        "--card-color": feature.color,
        "--card-color-sec": feature.colorSecondary,
        transform: getTransform(),
        opacity: isCenter ? 1 : absPos === 1 ? 0.65 : 0.2,
        zIndex: isCenter ? 10 : absPos === 1 ? 6 : 2,
        cursor: "default",
        filter: isCenter ? "none" : `brightness(0.65)`,
      }}
      onClick={() => !isCenter && onClick(index)}
    >
      {/* Released overlay shimmer */}
      {isReleased && <div className="released-shimmer" />}

      <div className="card-glow" />

      {/* Done / Completed badge */}
      {isReleased && (
        <div className={`released-badge ${isDone ? "badge-done" : "badge-completed"}`}>
          <i className={isDone ? "fa-solid fa-circle-check" : "fa-solid fa-box-check"} />
          <span>{isDone ? t("cs_badge_done") : t("cs_badge_completed")}</span>
        </div>
      )}

      <div className="cs-card-top">
        <div className="cs-icon-wrap">
          <i className={feature.icon}></i>
        </div>
        {isReleased ? (
          <div className={`cs-eta-badge eta-released ${isDone ? "eta-done" : "eta-completed"}`}>
            <i className="fa-solid fa-check" />
            {isDone ? t("cs_status_live") : t("cs_status_completed")}
          </div>
        ) : (
          <div className="cs-eta-badge">
            <span className="eta-dot" />
            {feature.eta}
          </div>
        )}
      </div>

      <div className="cs-card-body">
        <span className="cs-tag-en">{feature.tagEn}</span>
        <h3 className="cs-card-title">{feature.tag}</h3>
        <p className="cs-card-desc">{feature.description}</p>
      </div>

      <div className="cs-mockup-wrap">
        <Mockup type={feature.mockup} color={feature.color} colorSecondary={feature.colorSecondary} />
      </div>

      <div className="cs-card-footer">
        <div className="cs-status">
          <div className="cs-progress-bar">
            <div
              className="cs-progress-fill"
              style={{ width: isReleased ? "100%" : `${[38, 20, 10][index] || 15}%` }}
            />
          </div>
          <span className="cs-progress-label">
            {isReleased ? t("cs_progress_done") : t("cs_in_development")}
          </span>
        </div>
      </div>

      <span className="cs-card-number">0{index + 1}</span>
    </div>
  );
}

export default function ComingSoon() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef(null);
  const autoRef = useRef(null);

  const features = [
    {
      id: "pdf",
      icon: "fa-solid fa-file-pdf",
      tag: t("feature_pdf_tag"),
      tagEn: t("file_management"),
      description: t("feature_pdf_desc"),
      color: "#e11dff",
      colorSecondary: "#7b3ff2",
      mockup: "pdf",
      status: "done",
    },
    {
      id: "warehouse",
      icon: "fa-solid fa-warehouse",
      tag: t("feature_warehouse_tag"),
      tagEn: t("feature_warehouse_tag_en"),
      description: t("feature_warehouse_desc"),
      color: "#f59e0b",
      colorSecondary: "#f97316",
      mockup: "warehouse",
      status: "completed",
    },
    {
      id: "schedule",
      icon: "fa-solid fa-chart-gantt",
      tag: t("feature_schedule_tag"),
      tagEn: t("feature_schedule_tag"),
      description: t("feature_schedule_desc"),
      color: "#3b82f6",
      colorSecondary: "#06b6d4",
      mockup: "schedule",
      eta: "Q3 2026",
    },
    {
      id: "mobile",
      icon: "fa-solid fa-mobile-screen-button",
      tag: t("feature_mobile_tag"),
      tagEn: t("feature_mobile_tag"),
      description: t("feature_mobile_desc"),
      color: "#10b981",
      colorSecondary: "#34d399",
      mockup: "mobile",
      eta: "Q1 2027",
    },
  ];

  const total = features.length;

  const goTo = useCallback((index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(((index % total) + total) % total);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, total]);

  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4500);
  }, [total]);

  useEffect(() => {
    resetAuto();
    return () => clearInterval(autoRef.current);
  }, [resetAuto]);

  const handleCardClick = (index) => { goTo(index); resetAuto(); };
  const handleNav = (dir) => {
    dir === "prev" ? goTo(activeIndex - 1) : goTo(activeIndex + 1);
    resetAuto();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const getPosition = (i) => {
    let pos = i - activeIndex;
    if (pos > total / 2) pos -= total;
    if (pos < -total / 2) pos += total;
    return pos;
  };

  const activeFeature = features[activeIndex];

  return (
    <section className={`coming-soon ${visible ? "in-view" : ""}`} ref={sectionRef}>
      <div className="cs-blur cs-blur-1" />
      <div className="cs-blur cs-blur-2" />
      <div className="cs-blur cs-blur-3" />
      <div className="cs-grid-overlay" />

      <div className="cs-container">
        <div className="cs-header">
          <div className="cs-eyebrow">
            <span className="eyebrow-pulse" />
            <i className="fa-solid fa-rocket-launch"></i>
            {t("cs_eyebrow")}
          </div>
          <h2 className="cs-title">
            {t("cs_title_1")} <br />
            <span className="text-gradient">{t("cs_title_2")}</span>
          </h2>
          <p className="cs-subtitle">{t("cs_subtitle")}</p>
          <div className="cs-timeline-dots">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className={`tl-dot ${i < 3 ? "tl-done" : i === 3 ? "tl-current" : ""}`}
                style={{ animationDelay: `${i * 0.08}s` }} />
            ))}
            <div className="tl-line" />
          </div>
        </div>

        <div className="cs-carousel-root">
          <div className="cs-carousel-ambient"
            style={{
              background: `radial-gradient(ellipse at 50% 70%, ${activeFeature.color}1a 0%, transparent 65%)`,
              transition: "background 0.6s ease",
            }} />

          <div className="cs-carousel-stage">
            {features.map((feature, i) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                index={i}
                position={getPosition(i)}
                onClick={handleCardClick}
                isVisible={visible}
              />
            ))}
          </div>

          <button className="cs-carousel-btn cs-carousel-prev" onClick={() => handleNav("prev")} aria-label="Previous">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button className="cs-carousel-btn cs-carousel-next" onClick={() => handleNav("next")} aria-label="Next">
            <i className="fa-solid fa-chevron-right"></i>
          </button>

          <div className="cs-carousel-dots">
            {features.map((f, i) => (
              <button key={i}
                className={`cs-dot-btn ${i === activeIndex ? "cs-dot-active" : ""}`}
                style={i === activeIndex ? {
                  background: activeFeature.color,
                  boxShadow: `0 0 12px ${activeFeature.color}88`,
                  width: "28px",
                } : {}}
                onClick={() => handleCardClick(i)}
                aria-label={`Go to slide ${i + 1}`} />
            ))}
          </div>
        </div>

        <div className={`cs-footer-note ${visible ? "note-visible" : ""}`}>
          <div className="note-inner">
            <i className="fa-solid fa-lightbulb-on"></i>
            <p>
              {t("cs_note")}
              <a href="#contact" className="note-link"> {t("cs_write_us")}</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}