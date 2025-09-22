import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Language {
  code: string;
  name: string;
  isRTL: boolean;
}

interface LanguageContextType {
  currentLanguage: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const languages: Language[] = [
  { code: 'en', name: 'English', isRTL: false },
  { code: 'ar', name: 'العربية', isRTL: true }
];

const translations: { [key: string]: { en: string; ar: string } } = {
    'hero.title': {
      en: 'Taiba Pharmacy — Trusted care, delivered across Oman',
      ar: 'صيدلية طيبة — رعاية موثوقة تصل إلى جميع محافظات عُمان'
    },
    'hero.subtitle': {
      en: 'Order medicines, upload prescriptions, and get fast delivery from nearby branches.',
      ar: 'اطلب الأدوية، ارفع الوصفات الطبية، واحصل على توصيل سريع من الفروع القريبة منك.'
    },
    'hero.cta1': {
      en: 'Shop All Products',
      ar: 'تسوق كل المنتجات'
    },
    'trust.support': {
      en: '24/7 WhatsApp Support',
      ar: 'دعم واتساب 24/7'
    },
    'trust.stores': {
      en: 'Multiple stores in Oman',
      ar: 'فروع متعددة في عُمان'
    },
    'trust.delivery': {
      en: 'Fast delivery',
      ar: 'توصيل سريع'
    },
    'categories.medicines': {
      en: 'Medicines',
      ar: 'الأدوية'
    },
    'categories.cosmetics': {
      en: 'Cosmetics',
      ar: 'مستحضرات التجميل'
    },
    'categories.babycare': {
      en: 'Baby Care',
      ar: 'العناية بالأطفال'
    },
    'search.placeholder': {
      en: 'Search for medicines, health products...',
      ar: 'البحث عن الأدوية ومنتجات الصحة...'
    },
    'prescription.upload': {
      en: 'Upload Prescription',
      ar: 'رفع الوصفة الطبية'
    },
    'prescription.required': {
      en: 'Prescription Required',
      ar: 'وصفة طبية مطلوبة'
    },
    'prescription.pending': {
      en: 'Pending Admin Approval',
      ar: 'في انتظار موافقة الإدارة'
    },
    'footer.about': {
      en: 'About Us',
      ar: 'من نحن'
    },
    'footer.contact': {
      en: 'Contact',
      ar: 'اتصل بنا'
    },
    'footer.privacy': {
      en: 'Privacy Policy',
      ar: 'سياسة الخصوصية'
    },
    'footer.terms': {
      en: 'Terms of Service',
      ar: 'شروط الخدمة'
    }
  };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  const toggleLanguage = () => {
    const newLang = currentLanguage.code === 'en' ? languages[1] : languages[0];
    setCurrentLanguage(newLang);
    document.documentElement.dir = newLang.isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang.code;
  };

  const t = (key: string): string => {
    return translations[key]?.[currentLanguage.code] || key;
  };

  const value = {
    currentLanguage,
    toggleLanguage,
    t,
    isRTL: currentLanguage.isRTL
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
