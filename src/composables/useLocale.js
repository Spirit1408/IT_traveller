// Language switcher composable
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

export function useLocale() {
  const { locale, availableLocales } = useI18n()

  const currentLocale = computed(() => locale.value)
  const locales = computed(() => availableLocales)

  const setLocale = (newLocale) => {
    if (availableLocales.includes(newLocale)) {
      locale.value = newLocale
      localStorage.setItem('locale', newLocale)
    }
  }

  const isLocaleActive = (localeCode) => locale.value === localeCode

  return {
    currentLocale,
    locales,
    setLocale,
    isLocaleActive,
  }
}
// Function for using language switcher in components. useI18n hook for using i18n instance, which is created in locales/index.js file. setLocale function - for changing the active language and saving it to localStorage. isLocaleActive function - for checking if the current language is active (for styling the button elements in the switcher).
