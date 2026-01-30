import React, { useEffect, useRef, useState } from 'react';
import './Shift.css';
import { useTranslation } from 'react-i18next';
import DashboardImg from "../../assets/dashboard_screenshot.png"; 

function Shift() {
  const { t } = useTranslation();
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

  return (
    <section 
      className={`shift-section ${isVisible ? 'animate-in' : ''}`} 
      ref={sectionRef}
    >
      <div className="shift-text">
        <h2>
          {t('shift_title', 'Aizmirstiet par')} 
          <span> {t('shift_title_span', 'failu haosu')}</span>
        </h2>
        <p>
          {t('shift_subtitle')}
        </p>
      </div>

      <div className="shift-container">
  
        <div className="chaos-files">
          <div className="file-item xlsx">
            <i className="fa-regular fa-file-excel"></i> 
            <span>{t('shift_file_xlsx')}</span>
          </div>
          
          <div className="file-item csv">
            <i className="fa-solid fa-file-csv"></i> 
            <span>{t('shift_file_csv')}</span>
          </div>
          
          <div className="file-item whatsapp">
            <i className="fa-brands fa-whatsapp"></i> 
            <span>{t('shift_whatsapp')}</span>
          </div>
          
          <div className="file-item sticky">
            <i className="fa-regular fa-comment"></i> 
            <span>{t('shift_note')}</span>
          </div>
        </div>

    
        <div className="dashboard-reveal">
          <div className="dashboard-window">
            <div className="window-header">
              <div className="window-dots">
                <span className="dot-red"></span>
                <span className="dot-yellow"></span>
                <span className="dot-green"></span>
              </div>
              <div className="window-title">{t("window-title")}</div>
            </div>
            
            <div className="dashboard-image-container">
             <div className="dashboard-mockup">

  <div className="mockup-card main-stats animate-float">
    <div className="mockup-inner">
      <div className="mockup-header-sm">
        <i className="fa-solid fa-chart-pie"></i>
        <span>{t('production_summary', 'Ražošanas kopsavilkums')}</span>
      </div>
      <div className="mockup-data-row">
        <div className="data-group">
          <small>{t('efficiency', 'Efektivitāte')}</small>
          <strong>94.2%</strong>
        </div>
        <div className="data-group">
          <small>{t('output', 'Projektu izpilde')}</small>
          <strong className="text-gradient">248/250</strong>
        </div>
      </div>
      <div className="mockup-progress-full">
        <div className="progress-bar" style={{ width: '94%' }}></div>
      </div>
    </div>
  </div>

 
  <div className="mockup-card live-workers animate-float-delayed">
    <div className="worker-status">
      <div className="pulse-dot"></div>
      <span>12 {t('active_now', 'aktīvi darbinieki šodien strādājuši')}</span>
    </div>
    <div className="worker-avatars">
      <div className="avatar">A</div>
      <div className="avatar">J</div>
      <div className="avatar">K</div>
      <div className="avatar-plus">+9</div>
    </div>
  </div>

<div className="mockup-card material-card animate-float-diag">
  <div className="material-info">
    <div className="material-header">
      <i className="fa-solid fa-box-open"></i>
      <span>{t('worked_hours', 'Darba stundu uzskaite')}</span>
    </div>
    <div className="material-status">
      <span className="status-label">{t("employee_worked")}</span>
      <span className="status-val text-warning">{t("low_level")}</span>
    </div>
  </div>
</div>


<div className="mockup-card alert-card animate-float-fast">
  <div className="alert-content">
    <div className="alert-icon">
      <i className="fa-solid fa-triangle-exclamation"></i>
    </div>
    <div className="alert-text">
      <small>{t('downtime', 'Dīkstāve')}</small>
      <strong>42h 12min</strong>
    </div>
  </div>
</div>

  {/* Peļņas/Izmaksu karte */}
  <div className="mockup-card cost-card animate-float-slow">
    <div className="cost-info">
      <i className="fa-solid fa-euro-sign"></i>
      <div>
        <small>{t('real_time_cost', 'Peļņa 2025. gadā')}</small>
        <strong>675,250.00 €</strong>
      </div>
    </div>
  </div>
</div>
              <div className="dashboard-overlay"></div>
            </div>
          </div>
          <div className="dashboard-glow"></div>
        </div>
      </div>
    </section>
  );
}

export default Shift;