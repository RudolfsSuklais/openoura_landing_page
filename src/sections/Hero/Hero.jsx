  import React from 'react';
  import './Hero.css';
  import PrimaryButton from '../../components/Buttons/PrimaryButton/PrimaryButton';
  import SecondaryButton from '../../components/Buttons/SecondaryButton/SecondaryButton';
  import { useTranslation } from 'react-i18next';

  function Hero() {
    const { t } = useTranslation();

    return (
      <section className="hero">

        <div className="hero-blur-glow"></div>
        
        <div className="hero-container">
          <div className="hero-content">
            <div className="badge animate-fade-in">
            <span>✨ {t('hero_new_feature', 'Jaunums: Projekti vadītājiem – pārvaldi un tamē projektus!')}</span>
            </div>
            
            <h1 className="hero-title animate-slide-up">
              {t('hero_title_1', 'Pārvaldi projektus')} <br />
              <span className="text-gradient">{t('hero_title_2', 'bez piepūles')}</span>
            </h1>
            
            <p className="hero-subtitle animate-slide-up-delayed">
              {t('hero_subtitle', 'OpenOura ir nākamās paaudzes platforma uzņēmumiem, kas vēlas sasniegt vairāk. Apvieno projektus, darbiniekus un procesus vienā viedā ekosistēmā.')}
            </p>
            
            <div className="hero-actions animate-slide-up-button">
              <PrimaryButton  icon={<i className="fa-solid fa-rocket"></i>} btnText={t('get_started', 'Sākt bez maksas')} />
              <SecondaryButton  btnText={t('book_demo', 'Pieteikt demo')} />
            </div>
            
            <div className="hero-stats animate-fade-in-delayed">
              <div className="stat-item">
                <strong>100%</strong>
                <span>{t('stat_costs', 'izmaksu pārskats')}</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <strong>24/7</strong>
                <span>{t('stat_support', 'atbalsts')}</span>
              </div>
            </div>
          </div>


          <div className="hero-visual animate-float">
            <div className="glass-card main-card">
              <div className="card-header">
                <div className="dot red"></div>
                <div className="dot yellow"></div>
                <div className="dot green"></div>
              </div>


              <div className="card-body-visual">
  <div className="visual-header">
    <div className="worker-info">
      <div className="worker-avatar-sm">AP</div>
      <span>{t('worker')} — {t('today')}</span>
    </div>
    <div className="live-dot-container">
      <div className="live-dot"></div>
      <span className="live-text">LIVE</span>
    </div>
  </div>

  <div className="timeline-container">
    <div className="time-scale">
      <span>07:00</span><span>08:00</span><span>09:00</span><span>10:00</span><span>11:00</span>
    </div>

    <div className="timeline-track">

      <div className="timeline-task purple" style={{ left: '10%', width: '34%' }}>
        <div className="task-label"><i className="fa-solid fa-hammer"></i> {t('task_quadra')}</div>
        
        <div className="task-tooltip">
          <div className="tooltip-header">{t('project')}: {t('project_name')}</div>
          <div className="tooltip-time">{t('task_done')}: 07:15 — 08:30 (1h 15m)</div>
          <div className="tooltip-time">{t('task_planned')}: 1h 04m</div>
          <div className="tooltip-time">{t('task_efficiency')}: 85%</div>
          <div className="tooltip-status">{t('status')}: <span className="text-green">{t('status_finished')}</span></div>
        </div>
      </div>
<div className="timeline-task orange" style={{ left: '48%', width: '3%' }}>
  <div className="task-label"><i className="fa-solid fa-coffee"></i> </div>
  
  <div className="task-tooltip">
    <div className="tooltip-header">{t('break', 'Pārtraukums')}</div>
    <div className="tooltip-time">08:30 — 09:10 (40m)</div>
    <div className="tooltip-status">{t('status')}: <span className="text-orange">{t('status_break', 'Pauze')}</span></div>
  </div>
</div>
 
      <div className="timeline-task blue" style={{ left: '55%', width: '30%' }}>
        <div className="task-label"><i className="fa-solid fa-gear"></i> {t('task_cnc')}</div>
        
        <div className="task-tooltip">
          <div className="tooltip-header">{t('project')}: {t('project_name_2')}</div>
          <div className="tooltip-time">09:10 — 10:45 (1h 35m)</div>
          <div className="tooltip-status">{t('status')}: <span className="text-purple">{t('status_active')}</span></div>
        </div>
      </div>
      
      <div className="now-indicator" style={{ left: '85%' }}></div>
    </div>
  </div>

  <div className="timeline-footer">
    <div className="efficiency-mini">
      <div className="mini-label">{t('day_progress')}</div>
      <div className="mini-bar-bg">
        <div className="mini-bar-fill" style={{width: '75%'}}></div>
      </div>
    </div>
  </div>
</div>
            </div>
            
    
            <div className="floating-card task-card animate-float-slow">
              <div className="check-icon"><i className="fa-solid fa-screwdriver-wrench"></i> </div>
              <div>
                <p>{t('floating_card_project', 'Projekts: Brīvibas iela 12A')}</p>
                <span>{t('floating_card_project_cost', 'Izmaksāja 98 000€ | 28% peļņa')}</span>
              </div>
            </div>
            
            <div className="floating-card user-card animate-float-medium">
              <div className="user-avatar"><i className="fa-regular fa-user"></i></div>
              <div>
                <p>{t('floating_card_user', 'Artūrs P.')}</p>
                <span>{t('floating_card_work', 'Sāka zāģēt 12:00')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  export default Hero;