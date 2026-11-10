// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * 站点配置
 *
 * SITE 与 BASE_PATH 两个环境变量用于适配 GitHub Pages：
 *   - 用户主页仓库（仓库名叫 <user>.github.io）  → base 留空
 *   - 普通项目仓库（例如 personal-site）         → base = /personal-site
 *
 * 部署时在 GitHub Actions 里自动注入，本地开发默认走本地地址。
 */
const SITE = process.env.SITE ?? 'http://localhost:4321';
const BASE_PATH = process.env.BASE_PATH ?? '';

export default defineConfig({
  site: SITE,
  base: BASE_PATH || undefined,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: true,
    },
  },
});
