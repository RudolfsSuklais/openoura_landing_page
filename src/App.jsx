import './App.css'

import Navbar from './components/Navbar/NavBar'
import CookieConsent from './components/Cookies/CookieConsent'

import Hero from './sections/Hero/Hero.jsx'
import Shift from './sections/Shift/Shift.jsx'
import HowItWorks from './sections/HowItWorks/HowItWorks.jsx'
import Pricing from './sections/Pricing/Pricing.jsx'

import { useTranslation } from 'react-i18next';




function App() {

const { i18n } = useTranslation();
  return (
    <div className="page-wrapper" key={i18n.language}>
      <Navbar />
      <CookieConsent />
      <Hero />
      <Shift />
      <HowItWorks />
      <Pricing />
    </div>
  )
}

export default App
