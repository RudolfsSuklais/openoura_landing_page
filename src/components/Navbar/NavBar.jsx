import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { useTranslation } from 'react-i18next'; 
import PrimaryButton from '../Buttons/PrimaryButton/PrimaryButton';
import SecondaryButton from '../Buttons/SecondaryButton/SecondaryButton';
import OpenOuraLogoSM from "../../assets/openoura_logo_sm.png"


function Navbar() {
  const { t, i18n } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

return (
    <>
      <nav className={`navbar ${loaded ? 'nav-visible' : ''}`}>
        
        <div className="nav-logo animate-nav-item">
          <img src={OpenOuraLogoSM} alt="Logo" />
        </div>

        <ul className="nav-links">
          <li className="animate-nav-item delay-1">
            <a className="nav-item">
              <i className="fa-solid fa-house-chimney"></i> {t('home')}
            </a>
          </li>
          <li className="animate-nav-item delay-2">
            <a className="nav-item">
              <i className="fa-solid fa-layer-group"></i> {t('showcase')}
            </a>
          </li>
          <li className="animate-nav-item delay-3">
            <a className="nav-item">
              <i className="fa-solid fa-tag"></i> {t('pricing')}
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <div className='nav-actions-buttons-wrapper animate-nav-item delay-4'>
            <SecondaryButton 
              btnText={t('login')} 
              icon={<i className="fa-solid fa-arrow-right-to-bracket"></i>}
            />
            <PrimaryButton 
              btnText={t('get_started')} 
              icon={<i className="fa-solid fa-rocket"></i>}
            />
          </div>
          

    <div 
  className="lang-custom-dropdown animate-nav-item delay-5"
  onMouseEnter={() => setLangOpen(true)}
  onMouseLeave={() => setLangOpen(false)}
>
  <div className={`lang-selected-wrapper ${langOpen ? 'active' : ''}`}>
    <i className="fa-solid fa-globe globe-icon"></i>
    <span className="lang-code-text">{i18n.language}</span>
    <i className="fa-solid fa-chevron-down lang-arrow"></i>
  </div>


  <div className={`lang-options-list ${langOpen ? 'visible' : ''}`}>
    <div 
      className={`lang-opt ${i18n.language === 'lv' ? 'selected' : ''}`} 
      onClick={() => changeLanguage('lv')}
    >
      <span className="lang-name">Latviešu</span>
      {i18n.language === 'lv' && <i className="fa-solid fa-circle-check"></i>}
    </div>
    <div 
      className={`lang-opt ${i18n.language === 'en' ? 'selected' : ''}`} 
      onClick={() => changeLanguage('en')}
    >
      <span className="lang-name">English</span>
      {i18n.language === 'en' && <i className="fa-solid fa-circle-check"></i>}
    </div>
  </div>
</div>
        </div>

        <div className="hamburger-menu animate-nav-item" onClick={toggleMobileMenu}>
          <div className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></div>
          <div className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></div>
          <div className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></div>
        </div>
      </nav>

      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
        <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <div className="mobile-logo">
              <img src={OpenOuraLogoSM} alt="Logo" />
            </div>
            <div className="mobile-menu-close" onClick={toggleMobileMenu}>
              <i className="fa-solid fa-times"></i>
            </div>
          </div>

          <div className="mobile-menu-buttons">
            <SecondaryButton 
              btnText={t('login')} 
              icon={<i className="fa-solid fa-arrow-right-to-bracket"></i>}
              fullWidth={true}
            />
            <PrimaryButton 
              btnText={t('get_started')} 
              icon={<i className="fa-solid fa-rocket"></i>}
              fullWidth={true}
            />
          </div>

    
         <div className="mobile-lang-container">
  <p className="mobile-lang-label">{t('select_language')}</p>
  <div className="mobile-lang-list">
    <div 
      className={`mobile-lang-item ${i18n.language === 'lv' ? 'active' : ''}`}
      onClick={() => changeLanguage('lv')}
    >
      <div className="mobile-lang-info">
        <span className="mobile-lang-dot"></span>
        <span className="mobile-lang-name">Latviešu</span>
      </div>
      {i18n.language === 'lv' && <i className="fa-solid fa-circle-check"></i>}
    </div>

    <div 
      className={`mobile-lang-item ${i18n.language === 'en' ? 'active' : ''}`}
      onClick={() => changeLanguage('en')}
    >
      <div className="mobile-lang-info">
        <span className="mobile-lang-dot"></span>
        <span className="mobile-lang-name">English</span>
      </div>
      {i18n.language === 'en' && <i className="fa-solid fa-circle-check"></i>}
    </div>
  </div>
</div>
        </div>
      </div>
    </>
  );
}

export default Navbar;