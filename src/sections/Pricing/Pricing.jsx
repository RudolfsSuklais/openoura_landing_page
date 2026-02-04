import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import './Pricing.css';
import PrimaryButton from '../../components/Buttons/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../components/Buttons/SecondaryButton/SecondaryButton';

const Pricing = () => {
  const { t } = useTranslation();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [hoveredCard, setHoveredCard] = useState(null);

  const plans = [
    {
      name: 'Free',
      price: '0',
      yearlyPrice: '0',
      icon: 'fa-seedling',
      tagline: t('plan_free_tag'),
      features: [
        { text: 'Up to 3 users', included: true },
        { text: '1 Project', included: true },
        { text: 'Basic analytics', included: true },
        { text: 'Community support', included: true },
        { text: 'Export data functionality', included: false },
        { text: 'Project manager functionality', included: false },
        { text: 'Paid onboarding process (149.99 €)', included: false },

      ],
      button: <SecondaryButton btnText={t('btn_start_free')} fullWidth />
    },
    {
      name: 'Starter',
      price: '29',
      yearlyPrice: '15',
      icon: 'fa-rocket',
      tagline: t('plan_starter_tag'),
      features: [
        { text: 'Up to 10 users', included: true },
        { text: 'Up to 5 projects', included: true },
        { text: 'Basic analytics', included: true },
        { text: 'Community support', included: true },
        { text: 'Export data functionality', included: false },
        { text: 'Project manager functionality', included: false },
        { text: 'Paid onboarding process (119.99 €)', included: false },
      ],
      button: <SecondaryButton btnText={t('btn_get_started')} fullWidth />
    },
    {
      name: 'Pro',
      price: '99',
      yearlyPrice: '39',
      icon: 'fa-bolt',
      popular: true,
      tagline: t('plan_pro_tag'),
      features: [
        { text: 'Up to 30 users', included: true },
        { text: 'Unlimited projects', included: true },
        { text: 'Basic analytics', included: true },
        { text: 'Community support', included: true },
        { text: 'Export data functionality', included: true },
        { text: 'Project manager functionality', included: true },
        { text: 'Paid onboarding process (99.99 €)', included: false },
      ],
      button: <PrimaryButton btnText={t('btn_try_pro')} fullWidth />
    },
    {
      name: 'Enterprise',
      price: '249',
      yearlyPrice: '79',
      icon: 'fa-crown',
      tagline: t('plan_enterprise_tag'),
      features: [
        { text: 'Unilited users', included: true },
        { text: 'Unlimited projects', included: true },
        { text: 'Basic analytics', included: true },
        { text: 'Dedicated manager', included: true },
        { text: 'Export data functionality', included: true },
        { text: 'Project manager functionality', included: true },
        { text: 'Free onboarding process', included: true },
      ],
      button: <SecondaryButton btnText={t('btn_contact_sales')} fullWidth />
    }
  ];

  return (
   <section className="pricing-section">
      <div className="pricing-blur-glow"></div>
      
      <div className="pricing-header">
          <h2 className="pricing-title">
        <Trans 
            i18nKey="pricing_title" 
            components={{ span: <span className="text-gradient" /> }} 
        />
        </h2>
        <p className="pricing-subtitle">{t('pricing_subtitle')}</p>
        
        <div className="billing-toggle">
          <button 
            className={`toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
            onClick={() => setBillingCycle('monthly')}
          >
            {t('monthly')}
          </button>
          <button 
            className={`toggle-btn ${billingCycle === 'yearly' ? 'active' : ''}`}
            onClick={() => setBillingCycle('yearly')}
          >
            {t('yearly')} <span className="save-badge">{t('save_20')}</span>
          </button>
        </div>
      </div>

      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={`pricing-card ${plan.popular ? 'popular' : ''} ${hoveredCard === index ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {plan.popular && (
              <div className="popular-badge">
                <i className="fa-solid fa-star"></i> {t('most_popular')}
              </div>
            )}
            
            <div className="card-top">
              <div className="plan-icon">
                <i className={`fa-solid ${plan.icon}`}></i>
              </div>
              <h3 className="plan-name">{plan.name}</h3>
              <p className="plan-tagline">{plan.tagline}</p>
              <div className="plan-price">
                <span className="currency">€</span>
                <span className="amount">
                  {billingCycle === 'yearly' ? plan.yearlyPrice : plan.price}
                </span>
                <span className="period">{t('per_month')}</span>
                {billingCycle === 'yearly' && plan.yearlyPrice !== plan.price && (
                  <span className="yearly-note">{t('billed_annually')}</span>
                )}
              </div>
            </div>

            <ul className="plan-features">
              {plan.features.map((feature, i) => (
                <li key={i} className={feature.included ? 'included' : 'excluded'}>
                  <i className={`fa-solid ${feature.included ? 'fa-circle-check' : 'fa-circle-xmark'}`}></i>
                  {feature.text}
                </li>
              ))}
            </ul>

            <div className="card-action">
              {plan.button}
              {plan.popular && (
                <p className="popular-note">
                  <i className="fa-solid fa-bolt"></i> {t('join_teams')}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>


    </section>
  );
};

export default Pricing;