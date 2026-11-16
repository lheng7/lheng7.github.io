/**
 * 站点元信息与导航。
 * 想改名字、邮箱、链接，基本只需要动这个文件。
 *
 * 中英两种语言的元信息都在这里，每个字段按语言分开写。
 * 界面上的固定文案（按钮、提示语）在 src/i18n/ 里。
 */
import type { Locale } from './i18n';

export const SITE = {
  /** 部署后的正式域名 */
  url: 'https://lheng7.github.io',
  /** 站点标题，显示在浏览器标签和页头 */
  title: {
    en: 'lheng7',
    zh: 'lheng7',
  },
  /** 站点描述，用于 SEO 与 RSS */
  description: {
    en: 'Personal homepage of lheng7, undergraduate in Electronic Engineering at Tsinghua University. Analog and digital circuits, embedded systems, signal processing — project write-ups and technical notes live here.',
    zh: 'lheng7的个人主页。清华大学电子工程系本科在读，关注模拟/数字电路、嵌入式系统与信号处理。这里放我的项目、实验记录和技术笔记。',
  },
  /** 页脚版权署名 */
  author: {
    en: 'lheng7',
    zh: 'lheng7',
  },
} as const;

/**
 * 页头导航。href 是"不带语言前缀"的路径，
 * 渲染时会按当前语言补成 /、/zh/ 这样的地址。
 */
export const NAV = [
  { key: 'home', href: '/' },
  { key: 'projects', href: '/projects/' },
  { key: 'about', href: '/about/' },
] as const;

/** 社交与联系方式，显示在页脚。不需要的整行删掉即可 */
export const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/lheng7' },
  { label: 'Email', href: 'mailto:liangh25@mails.tsinghua.edu.cn' },
] as const;

/** 取当前语言的站点信息，省得每处写 [locale] */
export function siteText(locale: Locale) {
  return {
    title: SITE.title[locale],
    description: SITE.description[locale],
    author: SITE.author[locale],
  };
}
