import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: require("./en/common.json"),
    },
    ar: {
      translation: require("./ar/common.json"),
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  ns: ["translation"],
  defaultNS: "translation",
});

i18n.languages = ["en", "ar"];

export default i18n;
