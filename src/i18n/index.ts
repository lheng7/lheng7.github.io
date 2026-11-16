/**
 * 取文案的唯一入口。
 *
 *   const t = useTranslations(locale);
 *   t('nav.projects')   // 'Projects' / '项目'
 */
import en from './en';
import zh from './zh';
import type { Locale } from './config';

export type Dict = typeof en;

const dict: Record<Locale, Dict> = { en, zh };

export function useTranslations(locale: Locale): (key: keyof Dict) => string {
  const table = dict[locale] ?? dict.en;
  return (key) => table[key] ?? dict.en[key] ?? key;
}

export { LOCALES, DEFAULT_LOCALE, HTML_LANG, OG_LOCALE, LOCALE_LABEL, isLocale } from './config';
export type { Locale } from './config';
