/**
 * The languages offered in the header's language picker.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * WHAT THIS IS, AND WHAT IT IS NOT
 *
 * This list drives the picker UI and the `lang` attribute on <html>. It does
 * NOT translate the site — there are no message catalogues in this repo, and
 * inventing 20 machine translations of regulated financial copy would be
 * actively dangerous, not merely incomplete.
 *
 * So: choosing a language records the preference, sets the document language
 * (which matters for screen readers and for the browser's own translate
 * prompt), and reloads onto the locale path. Wiring the actual copy is a real
 * i18n project — `next-intl` or Next's own i18n routing, one catalogue per
 * locale, with the legal pages translated by a human who is accountable for
 * them.
 *
 * Until that exists, `available: false` entries are shown but marked, so the
 * picker never silently promises a translation that isn't there.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * `native` is the endonym — what speakers call the language themselves. It is
 * the label people actually scan for; the English name is the subtitle. That
 * ordering is what XM and StarTrader both use, and it is correct: someone
 * looking for Chinese is looking for 简体中文, not for the word "Chinese".
 */

export type Language = {
  /** BCP 47 tag. Becomes <html lang> and the URL prefix. */
  code: string;
  /** Endonym — the primary label. */
  native: string;
  /** English name — the subtitle. */
  english: string;
  /** Right-to-left script. Sets <html dir>. */
  rtl?: boolean;
  /** Whether a translated catalogue actually exists yet. */
  available?: boolean;
};

export const languages: Language[] = [
  { code: "en", native: "English", english: "English", available: true },
  { code: "zh-Hans", native: "简体中文", english: "Simplified Chinese" },
  { code: "zh-Hant", native: "繁體中文", english: "Traditional Chinese" },
  { code: "ja", native: "日本語", english: "Japanese" },
  { code: "ko", native: "한국어", english: "Korean" },
  { code: "th", native: "ภาษาไทย", english: "Thai" },
  { code: "vi", native: "Tiếng Việt", english: "Vietnamese" },
  { code: "id", native: "Bahasa Indonesia", english: "Indonesian" },
  { code: "ms", native: "Bahasa Melayu", english: "Malay" },
  { code: "hi", native: "हिन्दी", english: "Hindi" },
  { code: "ar", native: "العربية", english: "Arabic", rtl: true },
  { code: "fa", native: "فارسی", english: "Persian", rtl: true },
  { code: "es", native: "Español", english: "Spanish" },
  { code: "pt", native: "Português", english: "Portuguese" },
  { code: "fr", native: "Français", english: "French" },
  { code: "de", native: "Deutsch", english: "German" },
  { code: "it", native: "Italiano", english: "Italian" },
  { code: "nl", native: "Nederlands", english: "Dutch" },
  { code: "pl", native: "Polski", english: "Polish" },
  { code: "tr", native: "Türkçe", english: "Turkish" },
  { code: "ru", native: "Русский", english: "Russian" },
];

export const DEFAULT_LANGUAGE = "en";

/** Persisted so the choice survives a reload. */
export const LANGUAGE_STORAGE_KEY = "elite-capital:language";
