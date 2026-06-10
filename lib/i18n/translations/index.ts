import type { Locale } from "../types";
import en from "./en";
import es from "./es";

export const translations = { en, es } as const;

export function getTranslation(locale: Locale) {
  return translations[locale];
}
