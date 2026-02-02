import React, { useState } from 'react';
import './Pricing.css';
import PrimaryButton from '../../components/Buttons/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../components/Buttons/SecondaryButton/SecondaryButton';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [hoveredCard, setHoveredCard] = useState(null);

  const plans = [
    {
      name: 'Free',
      price: '0',
      yearlyPrice: '0',
      icon: 'fa-seedling',
      tagline: 'Perfect for getting started',
      features: [
        { text: 'Up to 3 projects', included: true },
        { text: 'Basic analytics', included: true },
        { text: 'Community support', included: true },
        { text: '1GB Storage', included: true },
        { text: 'Export functionality', included: false },
        { text: 'Custom domains', included: false },
      ],
      button: <SecondaryButton btnText="Start for free" fullWidth />
    },
    {
      name: 'Starter',
      price: '19',
      yearlyPrice: '15',
      icon: 'fa-rocket',
      tagline: 'For growing projects',
      features: [
        { text: 'Up to 10 projects', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Priority email support', included: true },
        { text: '10GB Storage', included: true },
        { text: 'Custom domains', included: true },
        { text: 'Team collaboration', included: false },
      ],
      button: <SecondaryButton btnText="Get Started" fullWidth />
    },
    {
      name: 'Pro',
      price: '49',
      yearlyPrice: '39',
      icon: 'fa-bolt',
      popular: true,
      tagline: 'Most popular choice',
      features: [
        { text: 'Unlimited projects', included: true },
        { text: 'Real-time tracking', included: true },
        { text: '24/7 Phone support', included: true },
        { text: '100GB Storage', included: true },
        { text: 'Team collaboration', included: true },
        { text: 'API Access', included: true },
      ],
      button: <PrimaryButton btnText="Try Pro Now" fullWidth />
    },
    {
      name: 'Enterprise',
      price: '99',
      yearlyPrice: '79',
      icon: 'fa-crown',
      tagline: 'For large organizations',
      features: [
        { text: 'Custom solutions', included: true },
        { text: 'Dedicated manager', included: true },
        { text: 'SLA Guarantee', included: true },
        { text: 'Unlimited Storage', included: true },
        { text: 'Custom Security', included: true },
        { text: 'White-labeling', included: true },
      ],
      button: <SecondaryButton btnText="Contact Sales" fullWidth />
    }
  ];

  return (
    <section className="pricing-section">
   
      <div className="pricing-blur-glow"></div>
      <div className="pricing-floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <div className="pricing-header">
       
        <h2 className="pricing-title">
          Simple & <span className="text-gradient">Transparent</span> Pricing
        </h2>
        <p className="pricing-subtitle">
          Choose the perfect plan for your needs. No hidden fees, no surprises.
        </p>
        
        <div className="billing-toggle">
          <button 
            className={`toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </button>
          <button 
            className={`toggle-btn ${billingCycle === 'yearly' ? 'active' : ''}`}
            onClick={() => setBillingCycle('yearly')}
          >
            Yearly <span className="save-badge">Save up to 20%</span>
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
                <i className="fa-solid fa-star"></i> Most Popular
              </div>
            )}
            
            <div className="card-top">
              <div className="plan-icon">
                <i className={`fa-solid ${plan.icon}`}></i>
              </div>
              <h3 className="plan-name">{plan.name}</h3>
              <p className="plan-tagline">{plan.tagline}</p>
              <div className="plan-price">
                <span className="currency">$</span>
                <span className="amount">
                  {billingCycle === 'yearly' ? plan.yearlyPrice : plan.price}
                </span>
                <span className="period">/mo</span>
                {billingCycle === 'yearly' && plan.yearlyPrice !== plan.price && (
                  <span className="yearly-note">billed annually</span>
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
                  <i className="fa-solid fa-bolt"></i> Join 2,500+ teams
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="comparison-section">
        <h3 className="comparison-title">Feature Comparison</h3>
        <div className="comparison-table">
          <div className="comparison-row header">
            <div className="comparison-cell">Feature</div>
            <div className="comparison-cell">Free</div>
            <div className="comparison-cell">Starter</div>
            <div className="comparison-cell">Pro</div>
            <div className="comparison-cell">Enterprise</div>
          </div>
          <div className="comparison-row">
            <div className="comparison-cell">Projects</div>
            <div className="comparison-cell">3</div>
            <div className="comparison-cell">10</div>
            <div className="comparison-cell">Unlimited</div>
            <div className="comparison-cell">Unlimited</div>
          </div>
          <div className="comparison-row">
            <div className="comparison-cell">Support</div>
            <div className="comparison-cell">Community</div>
            <div className="comparison-cell">Email</div>
            <div className="comparison-cell">24/7 Phone</div>
            <div className="comparison-cell">Dedicated</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;