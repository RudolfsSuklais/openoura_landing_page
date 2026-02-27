import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import "./Contact.css";
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton";

function Contact() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const [focused, setFocused] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        handleBlur("subject");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t("contact_err_name");
    if (!formData.email.trim()) newErrors.email = t("contact_err_email_req");
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = t("contact_err_email_inv");
    if (!formData.message.trim()) newErrors.message = t("contact_err_message");
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSelectSubject = (value) => {
    setFormData((prev) => ({ ...prev, subject: value }));
    if (errors.subject) setErrors((prev) => ({ ...prev, subject: "" }));
    setIsDropdownOpen(false);
    handleFocus("subject");
  };

  const handleFocus = (name) =>
    setFocused((prev) => ({ ...prev, [name]: true }));
  const handleBlur = (name) =>
    setFocused((prev) => ({ ...prev, [name]: false }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: "", email: "", company: "", subject: "", message: "" });
    setErrors({});
  };

  const contactMethods = [
    {
      icon: "fa-solid fa-envelope",
      label: t("contact_method_email"),
      value: "info@openoura.com",
    },
    {
      icon: "fa-solid fa-phone",
      label: t("contact_method_phone"),
      value: "+371 20 510 502",
    },
    {
      icon: "fa-solid fa-location-dot",
      label: t("contact_method_address"),
      value: t("contact_method_address_value"),
    },
  ];

  const subjectOptions = [
    { value: "demo", label: t("contact_subj_demo") },
    { value: "pricing", label: t("contact_subj_pricing") },
    { value: "support", label: t("contact_subj_support") },
    { value: "partnership", label: t("contact_subj_partnership") },
    { value: "other", label: t("contact_subj_other") },
  ];

  return (
    <section className="contact">
      <div className="contact-blur-glow contact-blur-1"></div>
      <div className="contact-blur-glow contact-blur-2"></div>

      <div className="contact-container">
        <div className="contact-info">
          <h2 className="contact-title animate-slide-up">
            {t("contact_title_1")} <br />
            <span className="text-gradient">{t("contact_title_2")}</span>
          </h2>

          <p className="contact-subtitle animate-slide-up-delayed">
            {t("contact_subtitle")}
          </p>

          <div className="contact-methods animate-fade-in-delayed">
            {contactMethods.map((method, i) => (
              <div className="contact-method" key={i}>
                <div className="method-icon">
                  <i className={method.icon}></i>
                </div>
                <div className="method-info">
                  <span className="method-label">{method.label}</span>
                  <span className="method-value">{method.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-form-wrapper animate-slide-up">
          <div className="glass-card form-card">
            <div className="card-header">
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
              <span className="card-header-title">
                {t("contact_form_title")}
              </span>
            </div>

            {submitted ? (
              <div className="success-state">
                <div className="success-icon">
                  <i className="fa-solid fa-circle-check"></i>
                </div>
                <h3>{t("contact_success_title")}</h3>
                <p>{t("contact_success_desc")}</p>
                <div onClick={handleReset}>
                  <PrimaryButton
                    icon={<i className="fa-solid fa-arrow-rotate-left"></i>}
                    btnText={t("contact_btn_send_another")}
                  />
                </div>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div
                    className={`form-group ${focused.name ? "focused" : ""} ${errors.name ? "error" : ""} ${formData.name ? "filled" : ""}`}
                  >
                    <label htmlFor="name">
                      <i className="fa-solid fa-user"></i>{" "}
                      {t("contact_label_name")}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus("name")}
                      onBlur={() => handleBlur("name")}
                      placeholder={t("contact_ph_name")}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <span className="field-error">
                        <i className="fa-solid fa-triangle-exclamation"></i>{" "}
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div
                    className={`form-group ${focused.email ? "focused" : ""} ${errors.email ? "error" : ""} ${formData.email ? "filled" : ""}`}
                  >
                    <label htmlFor="email">
                      <i className="fa-solid fa-envelope"></i>{" "}
                      {t("contact_label_email")}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus("email")}
                      onBlur={() => handleBlur("email")}
                      placeholder={t("contact_ph_email")}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <span className="field-error">
                        <i className="fa-solid fa-triangle-exclamation"></i>{" "}
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div
                    className={`form-group ${focused.company ? "focused" : ""} ${formData.company ? "filled" : ""}`}
                  >
                    <label htmlFor="company">
                      <i className="fa-solid fa-building"></i>{" "}
                      {t("contact_label_company")}
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      onFocus={() => handleFocus("company")}
                      onBlur={() => handleBlur("company")}
                      placeholder={t("contact_ph_company")}
                      autoComplete="organization"
                    />
                  </div>

                  <div
                    className={`form-group ${focused.subject || isDropdownOpen ? "focused" : ""} ${formData.subject ? "filled" : ""}`}
                    ref={dropdownRef}
                  >
                    <label>
                      <i className="fa-solid fa-tag"></i>{" "}
                      {t("contact_label_subject")}
                    </label>
                    <div className="custom-select-wrapper">
                      <div
                        className={`custom-select-trigger ${isDropdownOpen ? "active" : ""}`}
                        onClick={() => {
                          setIsDropdownOpen(!isDropdownOpen);
                          handleFocus("subject");
                        }}
                      >
                        <span
                          className={!formData.subject ? "placeholder" : ""}
                        >
                          {formData.subject
                            ? subjectOptions.find(
                                (opt) => opt.value === formData.subject,
                              )?.label
                            : t("contact_subj_placeholder")}
                        </span>
                        <i
                          className={`fa-solid fa-chevron-down select-arrow ${isDropdownOpen ? "rotated" : ""}`}
                        ></i>
                      </div>

                      {isDropdownOpen && (
                        <div className="custom-options-menu animate-fade-in-fast">
                          {subjectOptions.map((option) => (
                            <div
                              key={option.value}
                              className={`custom-option ${formData.subject === option.value ? "selected" : ""}`}
                              onClick={() => handleSelectSubject(option.value)}
                            >
                              {option.label}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className={`form-group full-width ${focused.message ? "focused" : ""} ${errors.message ? "error" : ""} ${formData.message ? "filled" : ""}`}
                >
                  <label htmlFor="message">
                    <i className="fa-solid fa-comment-dots"></i>{" "}
                    {t("contact_label_message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus("message")}
                    onBlur={() => handleBlur("message")}
                    placeholder={t("contact_ph_message")}
                  />
                  <span className="char-count">
                    {formData.message.length} / 1000
                  </span>
                  {errors.message && (
                    <span className="field-error">
                      <i className="fa-solid fa-triangle-exclamation"></i>{" "}
                      {errors.message}
                    </span>
                  )}
                </div>

                <div
                  className="submit-btn-wrapper"
                  onClick={!loading ? handleSubmit : undefined}
                >
                  {loading ? (
                    <button className="btn-loading" disabled>
                      <span className="spinner"></span>
                      {t("contact_btn_sending")}
                    </button>
                  ) : (
                    <PrimaryButton
                      icon={<i className="fa-solid fa-paper-plane"></i>}
                      btnText={t("contact_btn_send")}
                      fullWidth={true}
                    />
                  )}
                </div>

                <p className="form-note">
                  <i className="fa-solid fa-shield-halved"></i>
                  {t("contact_note_privacy")}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
