"use client";
import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext<{
  language: 'en' | 'fr' | 'es' | 'de';
  setLanguage: (language: 'en' | 'fr' | 'es' | 'de') => void;
}>({
  language: 'en',
  setLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<'en' | 'fr' | 'es' | 'de'>('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};