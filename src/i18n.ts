import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      appTitle: 'Mandarina Holidays Web',
      language: 'Language',
      country: 'Country',
      previous: 'Previous',
      next: 'Next',
      holidaysInMonth: '{{country}} holidays in {{month}}',
      noHolidays: 'No holidays found for this month.',
      switchToLightMode: 'Switch to light mode',
      switchToDarkMode: 'Switch to dark mode'
    }
  },
  es: {
    translation: {
      appTitle: 'Mandarina Holidays Web',
      language: 'Idioma',
      country: 'País',
      previous: 'Anterior',
      next: 'Siguiente',
      holidaysInMonth: 'Festivos de {{country}} en {{month}}',
      noHolidays: 'No se encontraron festivos para este mes.',
      switchToLightMode: 'Cambiar a modo claro',
      switchToDarkMode: 'Cambiar a modo oscuro'
    }
  },
  fr: {
    translation: {
      appTitle: 'Mandarina Holidays Web',
      language: 'Langue',
      country: 'Pays',
      previous: 'Precedent',
      next: 'Suivant',
      holidaysInMonth: 'Jours feries de {{country}} en {{month}}',
      noHolidays: 'Aucun jour ferie trouve pour ce mois.',
      switchToLightMode: 'Passer en mode clair',
      switchToDarkMode: 'Passer en mode sombre'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
