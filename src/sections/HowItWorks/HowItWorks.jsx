import React, { useState, useEffect, useRef } from 'react';
import './HowItWorks.css';
import { useTranslation } from 'react-i18next';

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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const steps = [
    { id: 1, title: t('step_1_title', 'Tāmēšana'), desc: t('step_1_desc', 'Viss sākas ar precīzu aprēķinu. Tāmētājs pievieno pozīcijas, stundas un materiālus pirms projekta uzsākšanas.') },
    { id: 2, title: t('step_2_title', 'Projekta izveide'), desc: t('step_2_desc', 'Apstiprināta tāme automātiski kļūst par projektu. Nekādas dubultas datu ievades.') },
    { id: 3, title: t('step_3_title', 'Tasku ģenerēšana'), desc: t('step_3_desc', 'Darbi tiek sadalīti uzdevumos, piesaistot konkrētus darbiniekus un termiņus.') },
    { id: 4, title: t('step_4_title', 'Darbinieks strādā'), desc: t('step_4_desc', 'Start/Stop sistēma mobilajā lietotnē. Reāllaika laika uzskaite bez papīriem.') },
    { id: 5, title: t('step_5_title', 'Reālā uzskaite'), desc: t('step_5_desc', 'Sistēma automātiski salīdzina plānotās stundas pret reālajām darba gaitā.') },
    { id: 6, title: t('step_6_title', 'Pārskats un Atskaites'), desc: t('step_6_desc', 'Automātiskas atskaites par budžetu, darbinieku efektivitāti un projekta peļņu.') }
  ];

  return (
    <section 
      className={`how-section ${isVisible ? 'animate-in' : ''}`} 
      ref={sectionRef}
    >
      <div className="how-container">
        <div className="how-header">
          <h2 className="reveal-text">
            {t('how_it_works_title', 'Kā OpenOura strādā')} 
            <span> {t("how_it_works_subtitle")}</span>
          </h2>
        </div>

        <div className="how-content">
          <div className="how-steps">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className={`step-item ${activeStep === step.id ? 'active' : ''} reveal-step`}
                style={{ '--index': index }}
                onMouseEnter={() => setActiveStep(step.id)}
              >
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
              <div className={`visual-element step-vis-${activeStep}`}>
                <div className="visual-icon-circle">
                   {activeStep === 1 && <i className="fa-solid fa-calculator"></i>}
                   {activeStep === 2 && <i className="fa-solid fa-file-signature"></i>}
                   {activeStep === 3 && <i className="fa-solid fa-list-check"></i>}
                   {activeStep === 4 && <i className="fa-solid fa-stopwatch"></i>}
                   {activeStep === 5 && <i className="fa-solid fa-chart-column"></i>}
                   {activeStep === 6 && <i className="fa-solid fa-file-invoice-dollar"></i>}
                </div>
               
              </div>
              <div className="visual-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;