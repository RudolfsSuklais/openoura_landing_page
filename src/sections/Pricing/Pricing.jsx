import React, { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import "./Pricing.css";
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton/SecondaryButton";

const pricingTiers = [
    { range: "1–10", price: 50, perUser: "5.00" },
    { range: "11–25", price: 125, perUser: "5.00" },
    { range: "26–50", price: 250, perUser: "5.00" },
    { range: "51–75", price: 350, perUser: "4.67" },
    { range: "76–100", price: 450, perUser: "4.50" },
    { range: "100+", price: 550, perUser: null, custom: true },
];

const featureKeys = [
    {
        icon: "fa-list-check",
        titleKey: "pricing_feature_projects_title",
        descKey: "pricing_feature_projects_desc",
    },
    {
        icon: "fa-clock",
        titleKey: "pricing_feature_time_title",
        descKey: "pricing_feature_time_desc",
    },
    {
        icon: "fa-chart-bar",
        titleKey: "pricing_feature_analytics_title",
        descKey: "pricing_feature_analytics_desc",
    },
    {
        icon: "fa-file-export",
        titleKey: "pricing_feature_export_title",
        descKey: "pricing_feature_export_desc",
    },
    {
        icon: "fa-users-gear",
        titleKey: "pricing_feature_manager_title",
        descKey: "pricing_feature_manager_desc",
    },
    {
        icon: "fa-headset",
        titleKey: "pricing_feature_support_title",
        descKey: "pricing_feature_support_desc",
    },
    {
        icon: "fa-graduation-cap",
        titleKey: "pricing_feature_onboarding_title",
        descKey: "pricing_feature_onboarding_desc",
    },
    {
        icon: "fa-shield-halved",
        titleKey: "pricing_feature_security_title",
        descKey: "pricing_feature_security_desc",
    },
    {
        icon: "fa-warehouse",
        titleKey: "pricing_feature_warehouse_title",
        descKey: "pricing_feature_warehouse_desc",
    },
    {
        icon: "fa-stopwatch",
        titleKey: "pricing_feature_deadline_title",
        descKey: "pricing_feature_deadline_desc",
    },
];

const Pricing = () => {
    const { t } = useTranslation();
    const [selectedTier, setSelectedTier] = useState(1);

    const tier = pricingTiers[selectedTier];

    const handleStartTrial = () => {
        // Ieraksta izvēlēto plānu URL un scroll uz contact
        const params = new URLSearchParams(window.location.search);
        params.set("plan", tier.range);
        const newUrl = `${window.location.pathname}?${params.toString()}#contact`;
        window.history.pushState({}, "", newUrl);

        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            // Dispatch custom event lai Contact.jsx var nolasīt jauno vērtību
            window.dispatchEvent(
                new CustomEvent("planSelected", {
                    detail: { plan: tier.range },
                }),
            );
        }
    };

    return (
        <section className="pricing-section">
            <div className="pricing-blur-glow" />

            <div className="pricing-header">
                <h2 className="pricing-title">
                    <Trans
                        i18nKey="pricing_title"
                        components={{
                            span: <span className="text-gradient" />,
                        }}
                    />
                </h2>
                <p className="pricing-subtitle">{t("pricing_subtitle")}</p>
            </div>

            <div className="tier-selector">
                <p className="tier-label">{t("pricing_tier_label")}</p>
                <div className="tier-grid">
                    {pricingTiers.map((t2, i) => (
                        <button
                            key={i}
                            className={`tier-btn ${selectedTier === i ? "active" : ""}`}
                            onClick={() => setSelectedTier(i)}>
                            <span className="tier-range">{t2.range}</span>
                            <span className="tier-users">
                                {t("pricing_tier_users")}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="price-display">
                <div className="price-card">
                    <div className="price-card-inner">
                        <div className="price-badge">
                            <i className="fa-solid fa-users" />
                            {tier.range} {t("pricing_tier_users")}
                        </div>

                        <div className="price-main">
                            <span className="price-currency">€</span>
                            <span className="price-amount">{tier.price}</span>
                            <span className="price-period">
                                {t("pricing_per_month")}
                            </span>
                        </div>

                        {tier.perUser && (
                            <p className="price-per-user">
                                {t("pricing_per_user", { price: tier.perUser })}
                            </p>
                        )}

                        {tier.custom && (
                            <p className="price-per-user">
                                {t("pricing_custom_note")}
                            </p>
                        )}

                        <div className="price-actions">
                            {tier.custom ? (
                                <div onClick={handleStartTrial}>
                                    <SecondaryButton
                                        btnText={t("pricing_btn_sales")}
                                        fullWidth
                                    />
                                </div>
                            ) : (
                                <>
                                    <div onClick={handleStartTrial}>
                                        <PrimaryButton
                                            btnText={t("pricing_btn_trial")}
                                            fullWidth
                                        />
                                    </div>
                                    <p className="price-trial-note">
                                        <i className="fa-solid fa-circle-check" />
                                        {t("pricing_trial_note")}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="price-card-glow" />
                </div>
            </div>

            <div className="features-section">
                <div className="features-header">
                    <div className="features-divider" />
                    <h3 className="features-title">
                        <i className="fa-solid fa-circle-check" />
                        {t("pricing_included_title")}
                    </h3>
                    <div className="features-divider" />
                </div>

                <div className="features-grid">
                    {featureKeys.map((f, i) => (
                        <div className="feature-item" key={i}>
                            <div className="feature-icon">
                                <i className={`fa-solid ${f.icon}`} />
                            </div>
                            <div className="feature-text">
                                <h4 className="feature-title">
                                    {t(f.titleKey)}
                                </h4>
                                <p className="feature-desc">{t(f.descKey)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
