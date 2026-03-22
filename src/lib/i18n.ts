import { useState, useCallback, createContext, useContext } from "react";
import en from "../translations/en.json";
import et from "../translations/et.json";

type Lang = "en" | "et";
type TranslationKey = keyof typeof en;

const translations: Record<Lang, Record<string, string>> = { en, et };

function getInitialLang(): Lang {
  const saved = localStorage.getItem("pricehntr-lang");
  return saved === "et" ? "et" : "en";
}

export function useI18nState() {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("pricehntr-lang", newLang);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next = prev === "en" ? "et" : "en";
      localStorage.setItem("pricehntr-lang", next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>) => {
      let text = translations[lang][key] || translations.en[key] || key;
      if (params) {
        for (const [k, v] of Object.entries(params)) {
          text = text.replace(`{${k}}`, String(v));
        }
      }
      return text;
    },
    [lang]
  );

  return { lang, setLang, toggleLang, t };
}

type I18nContextType = ReturnType<typeof useI18nState>;

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider = I18nContext.Provider;

export function useI18n(): I18nContextType {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
