/**
 * 项目内容的读取与语言配对。
 *
 * 一个项目按语言分目录存放，文件名就是网址：
 *   src/content/projects/en/pwm-fan.md  → /projects/pwm-fan/
 *   src/content/projects/zh/pwm-fan.md  → /zh/projects/pwm-fan/
 *
 * 只写一种语言也能跑，另一种语言的列表里就不显示它。
 * （早期放在 projects/ 根目录下的单文件，按英文处理，向后兼容。）
 */
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n';

export type Project = CollectionEntry<'projects'>;

/**
 * 把内容 id 拆成语言和 slug。
 * Astro 的 glob loader 会把文件名里的点吃掉，所以按目录判断语言，不按 .zh 后缀。
 */
export function splitProjectId(id: string): { locale: Locale; slug: string } {
  const [head, ...rest] = id.split('/');
  if ((head === 'en' || head === 'zh') && rest.length > 0) {
    return { locale: head, slug: rest.join('/') };
  }
  return { locale: 'en', slug: id };
}

/** 项目属于哪种语言 */
export function projectLocale(id: string): Locale {
  return splitProjectId(id).locale;
}

/** 两种语言共用的 slug，也就是网址里那一段 */
export function projectSlug(id: string): string {
  return splitProjectId(id).slug;
}

function sortByOrderThenDate(a: Project, b: Project): number {
  return b.data.order - a.data.order || b.data.startDate.localeCompare(a.data.startDate);
}

/** 取某种语言下所有已发布项目，按 order、开始时间排序 */
export async function getProjects(locale: Locale): Promise<Project[]> {
  const all = await getCollection('projects', ({ data }) => !data.draft);
  return all.filter((p) => projectLocale(p.id) === locale).sort(sortByOrderThenDate);
}

/** 某个 slug 是否存在该语言的已发布版本，决定切换器要不要链过去 */
export async function hasTranslation(slug: string, locale: Locale): Promise<boolean> {
  const published = await getCollection('projects', ({ data }) => !data.draft);
  return published.some((p) => projectSlug(p.id) === slug && projectLocale(p.id) === locale);
}
