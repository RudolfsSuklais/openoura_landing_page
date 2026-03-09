import React, { useState, useEffect, useRef } from "react";
import "./HowItWorks.css";
import { useTranslation } from "react-i18next";

import step1IMG from "../../assets/step_1.png";
import step2IMG from "../../assets/step_2.png";
import step3IMG from "../../assets/step_3.png";
import step4IMG from "../../assets/step_4.png";
import step5IMG from "../../assets/step_5.png";
import step6IMG from "../../assets/step_6.png";

function HowItWorks() {
    const { t } = useTranslation();
    const [activeStep, setActiveStep] = useState(1);
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 },
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    const stepRefs = useRef([]);

    useEffect(() => {
        const handleScroll = () => {
            stepRefs.current.forEach((el, i) => {
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const middle = window.innerHeight / 2;
                if (rect.top <= middle && rect.bottom >= middle) {
                    setActiveStep(i + 1);
                }
            });
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const steps = [
        {
            id: 1,
            title: t("step_1_title", "Tāmēšana"),
            desc: t("step_1_desc", "..."),
            img: step1IMG,
        },
        {
            id: 2,
            title: t("step_2_title", "Projekta izveide"),
            desc: t("step_2_desc", "..."),
            img: step2IMG,
        },
        {
            id: 3,
            title: t("step_3_title", "Uzdevumu izveide"),
            desc: t("step_3_desc", "..."),
            img: step3IMG,
        },
        {
            id: 4,
            title: t("step_4_title", "Darbinieks strādā"),
            desc: t("step_4_desc", "..."),
            img: step4IMG,
        },
        {
            id: 5,
            title: t("step_5_title", "Noliktava"),
            desc: t("step_5_desc", "..."),
            img: step5IMG,
        },
        {
            id: 6,
            title: t("step_6_title", "Pārskats un Atskaites"),
            desc: t("step_6_desc", "..."),
            img: step6IMG,
        },
    ];
    return (
        <section
            className={`how-section ${isVisible ? "animate-in" : ""}`}
            ref={sectionRef}>
            <div className="how-container">
                <div className="how-header">
                    <h2 className="reveal-text">
                        {t("how_it_works_title", "Kā OpenOura strādā")}
                        <span> {t("how_it_works_subtitle")}</span>
                    </h2>
                </div>

                <div className="how-content">
                    <div className="how-steps">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className={`step-item ${activeStep === step.id ? "active" : ""} reveal-step`}
                                style={{ "--index": index }}
                                onMouseEnter={() => setActiveStep(step.id)}>
                                <div className="step-number">{step.id}</div>
                                <div className="step-info">
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="how-visual reveal-visual">
                        <div className="visual-box">
                            {steps.map((step) => (
                                <div
                                    key={step.id}
                                    className={`visual-card ${activeStep === step.id ? "active" : ""}`}>
                                    <div className="visual-card-inner">
                                        <img src={step.img} alt={step.title} />
                                        <div className="visual-card-label">
                                            <span className="visual-card-step">
                                                0{step.id}
                                            </span>
                                            <span className="visual-card-title">
                                                {step.title}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="visual-glow"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
