/** 日期与链接小工具 */
import { DEFAULT_LOCALE, type Locale } from './i18n/config';

const MONTHS_EN = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/**
 * 把 "2025-03" 格式化成人看得懂的样子。
 * en: Mar 2025    zh: 2025 年 3 月
 */
export function formatMonth(ym: string, locale: Locale = DEFAULT_LOCALE): string {
  const [year, month] = ym.split('-');
  const m = Number(month);
  if (!year || !month || Number.isNaN(m) || m < 1 || m > 12) return ym;
  return locale === 'zh' ? `${year} 年 ${m} 月` : `${MONTHS_EN[m - 1]} ${year}`;
}

/**
 * 把起止时间拼成 "Mar 2025 – Jun 2025" / "2025 年 3 月 – 2025 年 6 月"。
 * 没有结束时间就显示为 Present / 至今。
 */
export function formatRange(start: string, end?: string, locale: Locale = DEFAULT_LOCALE): string {
  const from = formatMonth(start, locale);
  if (end) return `${from} – ${formatMonth(end, locale)}`;
  return locale === 'zh' ? `${from} 至今` : `${from} – Present`;
}

/** 站点 base（GitHub Pages 项目仓库需要），末尾不带斜杠 */
function baseUrl(): string {
  return import.meta.env.BASE_URL.replace(/\/$/, '');
}

/**
 * 拼接站内绝对路径，自动带上 base。
 * 例：url('/projects/x') → '/personal-site/projects/x'
 */
export function url(path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl()}${clean}` || '/';
}

/**
 * 按语言补前缀，不处理 base。
 * en: /projects/    zh: /zh/projects/
 */
export function localePath(locale: Locale, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  if (clean === '/') return `/${locale}/`;
  return `/${locale}${clean}`;
}

/** localePath + base，页面里直接拿去当 href */
export function localeUrl(locale: Locale, path = '/'): string {
  return url(localePath(locale, path));
}

/** 去掉 base，只留站内路径（总是以 / 开头） */
function stripBase(pathname: string): string {
  const base = baseUrl();
  if (base && pathname.startsWith(base)) {
    return pathname.slice(base.length) || '/';
  }
  return pathname;
}

/** 去掉语言前缀，得到"语言无关"的路径（总以 / 开头） */
function stripLocale(pathname: string): string {
  for (const seg of ['zh'] as const) {
    if (pathname === `/${seg}`) return '/';
    if (pathname.startsWith(`/${seg}/`)) return `/${pathname.slice(seg.length + 2)}`;
  }
  return pathname;
}

/**
 * 当前页面在另一种语言下的地址，给语言切换器用。
 * 例：/zh/projects/ → 切到 en 得 /projects/
 */
export function alternateLocaleUrl(currentPathname: string, target: Locale): string {
  const bare = stripLocale(stripBase(currentPathname)) || '/';
  return url(localePath(target, bare));
}

/** 从 URL 判断当前语言，给 404 这类拿不到 props 的地方用 */
export function localeFromPathname(pathname: string): Locale {
  const bare = stripBase(pathname);
  return bare === '/zh' || bare.startsWith('/zh/') ? 'zh' : DEFAULT_LOCALE;
}
