import "./App.css";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import Navbar from "./components/Navbar/NavBar";
import CookieConsent from "./components/Cookies/CookieConsent";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import Footer from "./components/Footer/Footer.jsx";

import Hero from "./sections/Hero/Hero.jsx";
import Shift from "./sections/Shift/Shift.jsx";
import HowItWorks from "./sections/HowItWorks/HowItWorks.jsx";
import Pricing from "./sections/Pricing/Pricing.jsx";
import Contact from "./sections/Contact/Contact.jsx";
import Testimonials from "./sections/Testimonials/Testimonials.jsx";
import ComingSoon from "./sections/ComingSoon/ComingSoon.jsx";
import FAQ from "./sections/FAQ/FAQ.jsx";

function App() {
  const { i18n } = useTranslation();
  const isLv = i18n.language === "lv";

  return (
    <div className="page-wrapper" key={i18n.language}>
      <Helmet>
        <html lang={isLv ? "lv" : "en"} />
        <title>
          {isLv
            ? "OpenOura — Ražošanas vadības sistēma Latvijas uzņēmumiem"
            : "OpenOura — Production Management for Latvian Manufacturers"}
        </title>
        <meta
          name="description"
          content={
            isLv
              ? "Vienkārša un pieejama ražošanas vadības platforma. Pārvaldi darbus, materiālus un darbiniekus. No 5€/lietotājs mēnesī."
              : "Simple and affordable production management platform. Manage jobs, materials and employees. From €5/user/month."
          }
        />
      </Helmet>

      <Navbar />
      <CookieConsent />
      <section id="home"><Hero /></section>
      <section id="shift"><Shift /></section>
      <section id="how-it-works"><HowItWorks /></section>
      <section id="testimonials"><Testimonials /></section>
      <section id="pricing"><Pricing /></section>
      <section id="contact"><Contact /></section>
      <section id="coming-soon"><ComingSoon /></section>
      <section><FAQ /></section>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;