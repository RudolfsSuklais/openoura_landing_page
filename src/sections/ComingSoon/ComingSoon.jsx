import React, { useState, useEffect, useRef } from "react";
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

  if (type === "schedule") {
    const months = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun"];
    const CAP = 5280;
    const workloadH = [3270, 3960, 4380, 4800, 5690, 4640];

    const W = 210;
    const H = 105;
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
          <span className="legend-cap">
            <span />
            {t("mockup_capacity")} (5280h)
          </span>
          <span className="legend-load">
            <span />
            {t("mockup_load")}
          </span>
          <span className="legend-over">
            <span />
            {t("mockup_over")}
          </span>
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
              <line
                x1={pad.l}
                y1={toY(v)}
                x2={pad.l + innerW}
                y2={toY(v)}
                stroke={
                  v === CAP ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)"
                }
                strokeWidth={v === CAP ? "0.8" : "0.5"}
                strokeDasharray={v === CAP ? "0" : "2,3"}
              />
              <text
                x={pad.l - 3}
                y={toY(v) + 3}
                fontSize="4.8"
                fill={
                  v === CAP ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.22)"
                }
                textAnchor="end"
                fontWeight={v === CAP ? "700" : "400"}
              >
                {v === 0 ? "0" : `${v / 1000}k`}
              </text>
            </g>
          ))}

          <text
            x={8}
            y={pad.t + innerH / 2}
            fontSize="4.5"
            fill="rgba(255,255,255,0.25)"
            textAnchor="middle"
            fontWeight="600"
            transform={`rotate(-90, 8, ${pad.t + innerH / 2})`}
          >
            {t("mockup_hours")}
          </text>

          <path
            d={areaPath}
            fill="url(#loadGrad2)"
            clipPath="url(#chartClip2)"
          />
          <path
            d={overflowPath}
            fill="url(#overGrad2)"
            clipPath="url(#chartClip2)"
            className="overflow-area"
          />

          <polyline
            points={workloadH.map((v, i) => `${toX(i)},${toY(v)}`).join(" ")}
            fill="none"
            stroke={color}
            strokeWidth="1.6"
            strokeLinejoin="round"
            strokeLinecap="round"
            className="chart-line-load"
            clipPath="url(#chartClip2)"
          />

          <line
            x1={toX(0)}
            y1={toY(CAP)}
            x2={toX(5)}
            y2={toY(CAP)}
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1.2"
            strokeDasharray="4,2.5"
            className="chart-line-cap"
          />

          {workloadH.map((v, i) => (
            <circle
              key={i}
              cx={toX(i)}
              cy={toY(v)}
              r="2.2"
              fill={v > CAP ? "#ff5f56" : color}
              stroke="#0a0a0a"
              strokeWidth="1"
              className="chart-dot"
              style={{ animationDelay: `${0.4 + i * 0.1}s` }}
            />
          ))}

          <g className="overflow-badge" style={{ animationDelay: "0.8s" }}>
            <rect
              x={toX(4) - 13}
              y={toY(workloadH[4]) - 12}
              width="26"
              height="11"
              rx="3"
              fill="#ff5f56"
            />
            <text
              x={toX(4)}
              y={toY(workloadH[4]) - 4.5}
              fontSize="6"
              fill="#fff"
              textAnchor="middle"
              fontWeight="800"
            >
              +{overloadPct}%
            </text>
          </g>

          {months.map((m, i) => (
            <text
              key={i}
              x={toX(i)}
              y={H - 3}
              fontSize="5.5"
              fill="rgba(255,255,255,0.3)"
              textAnchor="middle"
              fontWeight="600"
            >
              {m}
            </text>
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
                <span className="phone-kpi-val" style={{ color }}>
                  94%
                </span>
                <span className="phone-kpi-label">KPI</span>
              </div>
              <div className="phone-kpi" style={{ borderColor: `${color}33` }}>
                <span className="phone-kpi-val" style={{ color }}>
                  12
                </span>
                <span className="phone-kpi-label">{t("mockup_tasks")}</span>
              </div>
            </div>
            <div className="phone-bar-group">
              {[70, 85, 60, 90, 75].map((h, i) => (
                <div
                  key={i}
                  className="phone-bar"
                  style={{
                    height: `${h}%`,
                    background: `linear-gradient(180deg, ${color}, ${colorSecondary})`,
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function FeatureCard({ feature, index, isVisible }) {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`cs-card ${isVisible ? "card-visible" : ""} ${hovered ? "card-hovered" : ""}`}
      style={{
        "--card-color": feature.color,
        "--card-color-sec": feature.colorSecondary,
        transitionDelay: `${0.15 + index * 0.12}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="card-glow" />

      <div className="cs-card-top">
        <div className="cs-icon-wrap">
          <i className={feature.icon}></i>
        </div>
        <div className="cs-eta-badge">
          <span className="eta-dot" />
          {feature.eta}
        </div>
      </div>

      <div className="cs-card-body">
        <span className="cs-tag-en">{feature.tagEn}</span>
        <h3 className="cs-card-title">{feature.tag}</h3>
        <p className="cs-card-desc">{feature.description}</p>
      </div>

      <div className="cs-mockup-wrap">
        <Mockup
          type={feature.mockup}
          color={feature.color}
          colorSecondary={feature.colorSecondary}
        />
      </div>

      <div className="cs-card-footer">
        <div className="cs-status">
          <div className="cs-progress-bar">
            <div
              className="cs-progress-fill"
              style={{ width: `${[38, 20, 10][index]}%` }}
            />
          </div>
          <span className="cs-progress-label">{t("cs_in_development")}</span>
        </div>
      </div>

      <span className="cs-card-number">0{index + 1}</span>
    </div>
  );
}

export default function ComingSoon() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

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
      eta: "Q2 2026",
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`coming-soon ${visible ? "in-view" : ""}`}
      ref={sectionRef}
    >
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
              <div
                key={i}
                className={`tl-dot ${i < 3 ? "tl-done" : i === 3 ? "tl-current" : ""}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              />
            ))}
            <div className="tl-line" />
          </div>
        </div>

        <div className="cs-cards-grid">
          {features.map((f, i) => (
            <FeatureCard key={f.id} feature={f} index={i} isVisible={visible} />
          ))}
        </div>

        <div className={`cs-footer-note ${visible ? "note-visible" : ""}`}>
          <div className="note-inner">
            <i className="fa-solid fa-lightbulb-on"></i>
            <p>
              {t("cs_note")}
              <a href="#contact" className="note-link">
                {" "}
                {t("cs_write_us")}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
