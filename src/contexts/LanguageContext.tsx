
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { enUS } from '../locales/en-US';
import { ruRU } from '../locales/ru-RU';
import { kkKZ } from '../locales/kk-KZ';

// Define available languages
export type Language = 'en' | 'ru' | 'kk';

// Create an interface for our translations
interface Translations {
  [key: string]: string | Translations;
}

// Map language codes to translation objects
const translationMap: Record<Language, Translations> = {
  en: enUS,
  ru: ruRU,
  kk: kkKZ,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get language from localStorage or default to English
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem('language') as Language) || 'en'
  );

  // Save language preference to localStorage when it changes
  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // Translation function that gets nested keys using dot notation
  // and handles replacements like {name} or {count}
  const translate = (key: string, replacements?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = translationMap[language];
    
    for (const k of keys) {
      if (value === undefined) break;
      value = value[k];
    }
    
    // Fallback to English if translation is missing
    if (typeof value !== 'string') {
      let fallbackValue: any = translationMap['en'];
      for (const k of keys) {
        if (fallbackValue === undefined) break;
        fallbackValue = fallbackValue[k];
      }
      
      // If still no translation found, return the key itself
      value = typeof fallbackValue === 'string' ? fallbackValue : key;
    }
    
    // Handle replacements if any
    if (replacements && typeof value === 'string') {
      Object.entries(replacements).forEach(([replaceKey, replaceValue]) => {
        value = value.replace(`{${replaceKey}}`, String(replaceValue));
      });
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
