/**
 * 站点元信息与导航。
 * 想改名字、邮箱、链接，基本只需要动这个文件。
 */

export const SITE = {
  /** 站点标题，显示在浏览器标签和页头 */
  title: '梁衡',
  /** 一句话定位，显示在主页 */
  tagline: '清华大学 · 电子工程 · 本科在读',
  /** 站点描述，用于 SEO 与 RSS */
  description:
    '梁衡的个人主页。清华大学电子工程系本科在读，关注模拟/数字电路、嵌入式系统与信号处理。这里放我的项目、实验记录和技术笔记。',
  /** 语言标记，用于 <html lang> 与日期格式 */
  lang: 'zh-CN',
  /** 部署后的正式域名 */
  url: 'https://lheng7.github.io',
  /** 页脚版权署名 */
  author: '梁衡',
} as const;

/** 页头导航。改这里就能增删栏目 */
export const NAV = [
  { href: '/', label: '首页' },
  { href: '/projects/', label: '项目' },
  { href: '/about/', label: '关于' },
] as const;

/** 社交与联系方式，显示在页脚。不需要的整行删掉即可 */
export const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/lheng7' },
  { label: 'Email', href: 'mailto:liangh25@mails.tsinghua.edu.cn' },
] as const;

/** 主页顶部的技能/兴趣标签。没有就留空数组 */
export const TAGS = [
  '模拟电路',
  '嵌入式',
  '信号处理',
  'Python',
  'Verilog',
] as const;
