import Common_ar from "src/dictonaries/ar/common.json";
import Common_en from "src/dictonaries/en/common.json";
import i18next from "i18next";
import { useLocalStorage } from "./useLocalStorage";

const lang = useLocalStorage("lang") || "English";
i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: lang, // language to use
  debug: true,
  react: {
    useSuspense: false, //   <---- this will do the magic
  },
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
