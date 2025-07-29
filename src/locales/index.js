// i18n configuration file
import { createI18n } from "vue-i18n";

import ua from "./ua.json";
import en from "./en.json";
// Importing locales from json files (dictionaries)

const savedLocale = localStorage.getItem("locale") || "ua";
// Getting saved locale from localStorage or default to "ua"

const i18n = createI18n({
  locale: savedLocale,
  fallbackLocale: "ua",
  messages: {
    ua,
    en,
  },
  legacy: false,
  globalInjection: true,
});
// Creating i18n instance with saved locale (current), fallback locale (if no translation - will be used "ua" language), legacy (for using composition API mode) and globalInjection (for using global function $t in templates)

export default i18n;
