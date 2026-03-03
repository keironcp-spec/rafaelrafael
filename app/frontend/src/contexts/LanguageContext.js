import React, { createContext, useContext, useState, useEffect } from 'react';
import ru from '../locales/ru.json';
import en from '../locales/en.json';
import ua from '../locales/ua.json';

const LanguageContext = createContext();

const translations = { ru, en, ua };

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ru');

  const languages = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ua', name: 'Українська', flag: '🇺🇦' },
  ];

  useEffect(() => {
    const savedLang = localStorage.getItem('onlycrm-lang');
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('onlycrm-lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (path) => {
    const keys = path.split('.');
    let result = translations[language];
    
    for (const key of keys) {
      if (result && result[key] !== undefined) {
        result = result[key];
      } else {
        return path;
      }
    }
    
    return result;
  };

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};