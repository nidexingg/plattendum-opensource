import en from "./locales/en.json";
import km from "./locales/km.json";

export const localeMap: { [k: string]: string } = {
  en: "🇺🇸 English",
  km: "🇰🇭 ភាសាខ្មែរ",
};

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en,
    km,
  },
}));
