import React, { useState, useEffect } from 'react';
import './CookieConsent.css';
import { useTranslation } from 'react-i18next';
import PrimaryButton from '../Buttons/PrimaryButton/PrimaryButton';
import SecondaryButton from '../Buttons/SecondaryButton/SecondaryButton';

function CookieConsent() {
  const { t } = useTranslation();
  const [showSettings, setShowSettings] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Sīkdatņu kategoriju stāvoklis
  const [options, setOptions] = useState({
    necessary: true, // Šo parasti nevar atslēgt
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent-v2');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 800);
    }
  }, []);

  const saveConsent = (finalOptions) => {
    localStorage.setItem('cookie-consent-v2', JSON.stringify(finalOptions));
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    const allIn = { necessary: true, analytics: true, marketing: true };
    saveConsent(allIn);
  };

  const handleSavePreferences = () => {
    saveConsent(options);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-overlay">
      <div className={`cookie-modal ${showSettings ? 'expanded' : ''}`}>
        {!showSettings ? (
          /* PAMATA SKATS */
          <div className="cookie-main">
            <h3>{t('cookie_title', 'Mēs cienām jūsu privātumu')}</h3>
            <p>{t('cookie_description', 'Mēs izmantojam sīkfailus, lai uzlabotu jūsu pārlūkošanas pieredzi un analizētu mūsu trafiku.')}</p>
            <div className="cookie-buttons">
              <div onClick={() => setShowSettings(true)}>
                <SecondaryButton btnText={t('cookie_settings', 'Iestatījumi')} />
              </div>
              <div onClick={handleAcceptAll}>
                <PrimaryButton btnText={t('cookie_accept_all', 'Pieņemt visu')} />
              </div>
            </div>
          </div>
        ) : (
          /* IESTATĪJUMU SKATS */
          <div className="cookie-settings">
            <h3>{t('cookie_settings_title', 'Sīkdatņu iestatījumi')}</h3>
            
            <div className="option-item">
              <div className="option-info">
                <h4>{t('cookie_necessary', 'Nepieciešamās')}</h4>
                <p>{t('cookie_necessary_desc', 'Nepieciešamas lapas darbībai. Nevar atslēgt.')}</p>
              </div>
              <input type="checkbox" checked disabled />
            </div>

            <div className="option-item">
              <div className="option-info">
                <h4>{t('cookie_analytics', 'Analītika')}</h4>
                <p>{t('cookie_analytics_desc', 'Palīdz mums saprast, kā apmeklētāji mijiedarbojas ar mājaslapu.')}</p>
              </div>
              <input 
                type="checkbox" 
                checked={options.analytics} 
                onChange={() => setOptions({...options, analytics: !options.analytics})} 
              />
            </div>

            <div className="option-item">
              <div className="option-info">
                <h4>{t('cookie_marketing', 'Mārketings')}</h4>
                <p>{t('cookie_marketing_desc', 'Tiek izmantotas, lai rādītu personalizētas reklāmas.')}</p>
              </div>
              <input 
                type="checkbox" 
                checked={options.marketing} 
                onChange={() => setOptions({...options, marketing: !options.marketing})} 
              />
            </div>

            <div className="cookie-buttons">
              <button className="btn-text-only" onClick={() => setShowSettings(false)}>
                {t('back', 'Atpakaļ')}
              </button>
              <div onClick={handleSavePreferences}>
                <PrimaryButton btnText={t('cookie_save', 'Saglabāt izvēli')} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CookieConsent;