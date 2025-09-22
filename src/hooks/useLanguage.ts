import { useContext } from 'react';
// This file is now a wrapper around the context for simplicity.
// The actual logic is in LanguageContext.tsx
import { LanguageProvider, useLanguage as useLanguageContext } from '../contexts/LanguageContext';

export const useLanguage = useLanguageContext;
export { LanguageProvider };
