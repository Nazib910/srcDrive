"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { translations, Language } from '@/lib/translations';

interface LocalizationContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

interface LocalizationProviderProps {
  children: ReactNode;
}

const LOCAL_STORAGE_KEY = 'srcdrive-language';

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const translation = translations[key]?.[language];
    return translation || key; // Fallback to key if not found
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t('site.title');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t('site.description'));
    }
  }, [language, t]);

  useEffect(() => {
    // Load from localStorage
    const savedLanguage = localStorage.getItem(LOCAL_STORAGE_KEY) as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'de' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem(LOCAL_STORAGE_KEY, newLanguage);
  };

  return (
    <LocalizationContext.Provider value={{ language, toggleLanguage, setLanguage, t }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};
