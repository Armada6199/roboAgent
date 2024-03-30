import Common_ar from "src/dictonaries/ar/common.json";
import Common_en from "src/dictonaries/en/common.json";
import i18next from "i18next";

const lang = localStorage.getItem("lang") || "English";
i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: lang, // language to use
  resources: {
    English: {
      common: Common_en, // 'common' is our custom namespace
    },
    Arabic: {
      common: Common_ar,
    },
  },
});

export const i18nextInit = i18next;
