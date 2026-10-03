import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { localeResources } from "./locales"

const storageKey = "qlic-locale"
const supportedLocales = ["en", "es-419"] as const
export type Locale = typeof supportedLocales[number]

const storedLocale =
  typeof window === "undefined" ? null : window.localStorage.getItem(storageKey)
const initialLocale: Locale = storedLocale === "es-419" ? "es-419" : "en"

void i18n.use(initReactI18next).init({
  resources: localeResources,
  lng: initialLocale,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
})

export function changeLocale(locale: Locale) {
  if (typeof window !== "undefined")
    window.localStorage.setItem(storageKey, locale)
  return i18n.changeLanguage(locale)
}

export { i18n, supportedLocales }
