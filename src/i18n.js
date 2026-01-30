import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  lv: {
    translation: {
      "home": "Sākums",
      "showcase": "Portfolio",
      "pricing": "Cenas",
      "login": "Ienākt",
      "get_started": "Sākt bez maksas",
      "cookie_text": "Mēs izmantojam sīkdatnes, lai uzlabotu tavu pieredzi mūsu platformā.",
      "cookie_accept": "Piekrītu",
      
    
      "hero_new_feature": "Jaunums: Projekti vadītājiem – pārvaldi un tamē projektus!",
      "hero_title_1": "Pārvaldi projektus",
      "hero_title_2": "bez piepūles",
      "hero_subtitle": "OpenOura ir nākamās paaudzes platforma uzņemumiem, kas vēlas sasniegt vairāk. Apvieno projektus, darbiniekus un procesus vienā viedā ekosistēmā.",
      "book_demo": "Pieteikt demo",
      "stat_costs": "izmaksu pārskats",
      "stat_support": "Atbalsts",
      'floating_card_user': 'Artūrs P.',
      "floating_card_work": "Sāka strādāt: CNC griešana 09:10",
      "floating_card_project": "Projekts: Brīvibas iela 12A",
      'floating_card_project_cost': 'Izmaksāja 98 492€ | 28% peļņa',
      "break": "Pārtraukums",
      'status_break': 'Pauze',
      
      
  
      "cookie_title": "Mēs cienām jūsu privātumu",
      "cookie_description": "Mēs izmantojam sīkfailus, lai uzlabotu jūsu pārlūkošanas pieredzi un analizētu mūsu trafiku.",
      "cookie_settings": "Iestatījumi",
      "cookie_accept_all": "Pieņemt visu",
      "cookie_save": "Saglabāt izvēli",
      "cookie_necessary": "Nepieciešamās",
      "cookie_analytics": "Analītika",
      "cookie_marketing": "Mārketings",


      "today": "Šodien",
       "worker": "Artūrs P",
      "live_tracking": "Reāllaika uzskaite",
      "day_progress": "Dienas progress",
      
  
      "project": "Projekts",
      "project_name": "Brīvības iela 12A",
      "project_name_2": "Debesskrāpis #42",
      "task_done": "Izdarīts",
      "task_planned": "Plānots",
      "task_efficiency": "Efektivitāte",
      "status": "Statuss",
      "status_finished": "Pabeigts",
      "status_active": "Aktīvs",
      
  
      "task_quadra": "Quadras pārbaude",
      "task_cnc": "CNC Griešana",

      "shift_file_xlsx": "darbinieku_stundas(101).xlsx",
      "shift_file_csv": "ražošanas_atskaite_2025.csv",
      "shift_whatsapp": "WhatsApp: \"Cikos Jānis sāka zāģēt?\"",
      "shift_note": "Cik laiks pagāja uz šo projektu?",
      "shift_title": "Aizmirstiet par",
      "shift_title_span": "failu haosu",
      "shift_subtitle": "Apnikuši 100 dažādi Excel faili, kuros neko nevar saprast un savilkt atskaites?",

      "window-title": "OpenOura apvieno visu vienā",
      "production_summary": "Ražošanas kopsavilkums",
      "efficiency": "Efektivitāte",
      "output": "Projektu izpilde",
      "active_now": "aktīvi darbinieki šodien strādājuši",
      "worked_hours": "Darba stundu uzskaite",
      "employee_worked": "Jānis nostrādāja 115h Februārī",
      "low_level": "Zems līmenis",
      "downtime": "Dīkstāve",
      "real_time_cost": "Peļņa 2025. gadā",

      "how_it_works_subtitle": "no nulles"
    }
  },
  en: {
    translation: {
      "home": "Home",
      "showcase": "Showcase",
      "pricing": "Pricing",
      "login": "Log In",
      "get_started": "Start for free",
      "cookie_text": "We use cookies to improve your experience on our platform.",
      "cookie_accept": "I Accept",
      

      "hero_new_feature": "New: Projects for managers – plan and manage projects!",
      "hero_title_1": "Manage projects",
      "hero_title_2": "with ease",
      "hero_subtitle": "OpenOura is the next-generation platform for companies that strive for more. Unify projects, people, and processes in one smart ecosystem.",
      "book_demo": "Book a demo",
      "stat_costs": "Costs overview",
      "stat_support": "Support",
      'floating_card_user': 'Jake D',
      "floating_card_work": "Started working: CNC from 09:10",
      "floating_card_project": "Project: Liberty Street 12A",
      'floating_card_project_cost': 'Cost 99 583$ | 28% profit',
      "break": "Break",
      'status_break': 'Break',

  
      "cookie_title": "We respect your privacy",
      "cookie_description": "We use cookies to enhance your browsing experience and analyze our traffic.",
      "cookie_settings": "Settings",
      "cookie_accept_all": "Accept All",
      "cookie_save": "Save preferences",
      "cookie_necessary": "Necessary",
      "cookie_analytics": "Analytics",
      "cookie_marketing": "Marketing",

      "today": "Today",
      "worker": "Jake D",
      "live_tracking": "Live tracking",
      "day_progress": "Daily progress",
      
     
      "project": "Project",
      "project_name": "Liberty Street 12A",
      "project_name_2": "Skyscraper #42",
      "task_done": "Done",
      "task_planned": "Planned",
      "task_efficiency": "Efficiency",
      "status": "Status",
      "status_finished": "Finished",
      "status_active": "Active",
      
    
      "task_quadra": "Quadra inspection",
      "task_cnc": "CNC Cutting",

      "shift_file_xlsx": "employee_hours(101).xlsx",
      "shift_file_csv": "production_report_2025.csv",
      "shift_whatsapp": "WhatsApp: \"What time did John start?\"",
      "shift_note": "How much time spent on this project?",
      "shift_title": "Forget about",
      "shift_title_span": "file chaos",
      "shift_subtitle": "Tired of 100 different Excel files where nothing makes sense and reports are a nightmare to put together?",

      "window-title": "OpenOura brings everything together in one place",
      "production_summary": "Production Summary",
      "efficiency": "Efficiency",
      "output": "Project Output",
      "active_now": "active workers tracked today",
      "worked_hours": "Work Hour Tracking",
      "employee_worked": "Jake worked 115h in February",
      "low_level": "Low level",
      "downtime": "Downtime",
      "real_time_cost": "Profit in 2025"

    }
  }
};

i18n
  .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'lv', 
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;