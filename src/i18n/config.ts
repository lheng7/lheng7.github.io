/**
 * 语言清单。要加第三种语言（比如日语），在这里加一项，
 * 再补一个字典文件、一串页面和 BASE_PATH 前缀即可。
 */

export const LOCALES = ['en', 'zh'] as const;

export type Locale = (typeof LOCALES)[number];

/** 默认语言：英文，放在站点根路径 */
export const DEFAULT_LOCALE: Locale = 'en';

/** <html lang> 用的标记 */
export const HTML_LANG: Record<Locale, string> = {
  en: 'en',
  zh: 'zh-CN',
};

/** Open Graph 的地区标记 */
export const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  zh: 'zh_CN',
};

/** 切换器上显示的语言名：用该语言自己的写法，方便看不懂当前语言的人找到母语 */
export const LOCALE_LABEL: Record<Locale, string> = {
  en: 'EN',
  zh: '中文',
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
