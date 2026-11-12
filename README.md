# 个人作品集站点

梁衡的个人主页。用 [Astro](https://astro.build/) 搭的静态站，部署在 GitHub Pages 上。

**线上地址：https://lheng7.github.io**

内容全部走 Markdown，**加一个新项目 = 新建一个 `.md` 文件**，不用碰任何页面代码。

> **当前状态：项目列表是空的。**
> 之前拿来演示的两个示例项目（以及「关于」页的三条编造经历）已经删干净了，
> 首页和 `/projects/` 显示「还没有项目」，等你放假自己填。
> 想知道怎么加，看 [编辑指南](docs/编辑指南.md)，或者直接看下面的「加一个新项目」。

---

## 快速开始

```bash
pnpm install      # 首次
pnpm dev          # 本地开发，打开 http://localhost:4321
pnpm build        # 生成静态文件到 dist/
pnpm preview      # 预览构建结果
```

> 这台机器上 `pnpm` 不在全局 PATH 里，DSH 自带的那个在
> `~/.dsh/dsh-runtimes/dsh-primary-runtime/dependencies/pnpm/bin/pnpm.mjs`，
> 用 `node` 直接跑它即可。

---

## 目录结构

```
personal-site/
├── astro.config.mjs          # 站点配置（base 路径、sitemap、代码高亮）
├── pnpm-workspace.yaml       # pnpm 配置（放行 esbuild / sharp 的构建脚本）
├── .github/workflows/deploy.yml   # 推送到 main 自动部署
├── docs/
│   └── 编辑指南.md          # ★ 日常怎么改，看这个就够了
├── public/
│   ├── robots.txt
│   ├── favicon.png           # 浏览器标签图标（蓝底"梁"字）
│   └── favicon.ico
└── src/
    ├── site.config.ts        # ★ 站点元信息：名字、邮箱、导航、标签
    ├── content.config.ts     # 项目 Markdown 的字段定义与校验规则
    ├── utils.ts              # 日期格式化、带 base 的链接拼接
    ├── styles/global.css     # 全部样式（含深色模式）
    ├── layouts/
    │   └── BaseLayout.astro  # 页头 / 页脚 / <head>
    ├── components/
    │   ├── BaseHead.astro    # SEO、Open Graph
    │   └── ProjectCard.astro # 项目卡片
    ├── content/
    │   └── projects/         # ★ 项目内容（Markdown）
    │       └── .gitkeep      # 占位文件，让 git 保留这个空目录
    └── pages/
        ├── index.astro       # 首页
        ├── about.astro       # 关于页
        ├── 404.astro
        ├── rss.xml.ts        # RSS 订阅
        └── projects/
            ├── index.astro   # 项目列表
            └── [slug].astro  # 项目详情（由 Markdown 自动生成）
```

标了 ★ 的地方是日常要改的，其余基本不用动。更细的编辑说明见 [docs/编辑指南.md](docs/编辑指南.md)。

---

## 改内容

### 改名字、邮箱、导航

编辑 `src/site.config.ts`：

```ts
export const SITE = {
  title: '梁衡',
  tagline: '清华大学 · 电子工程 · 本科在读',
  description: '……用于 SEO 和 RSS……',
  url: 'http://localhost:4321',   // ← 上线后改成真实域名
  author: '梁衡',
};

export const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/your-username' },  // ← 改成你的
  { label: 'Email', href: 'mailto:your-email@example.com' },      // ← 改成你的
];
```

不想显示的条目整行删掉即可，页脚会自动适配。

### 加一个项目

在 `src/content/projects/` 下新建一个 `.md`：

```markdown
---
title: 项目名称
summary: 一句话简介，显示在卡片上
startDate: "2025-09"
endDate: "2025-12"        # 留空表示"至今"
order: 20                 # 越大越靠前
featured: true            # 是否上首页精选
tags: ["标签1", "标签2"]
links:
  - label: GitHub 仓库
    href: https://github.com/you/repo
draft: false              # true 则构建时跳过
---

正文用 Markdown 写。支持标题、列表、表格、引用、代码块、图片。
```

字段写错或漏写，`pnpm build` 会直接报错并指出是哪一行，不会静默生成坏页面。

> **文件名请用英文或拼音**，比如 `pid-thermostat.md`。
> 文件名会成为网址：`/projects/pid-thermostat/`。
> 用中文文件名也能跑，但网址会变成 `%E6%B8%A9%E5%BA%A6...` 这种编码，分享出去很难看。

### 加图片

把图放到 `src/assets/`，然后在 frontmatter 里引用：

```yaml
cover: ../../assets/my-photo.png
```

Astro 会自动压缩并生成响应式尺寸。

### 改图标

`public/favicon.png` 和 `favicon.ico` 是我用脚本生成的一个简单占位图（蓝底 + "梁"字）。
换成自己的图：把你的图片存成 `public/favicon.png`（建议 64×64 或 128×128）覆盖即可，
浏览器会自动缩放。想换成 `.svg` 的话，把 `src/components/BaseHead.astro` 里的
`type="image/png"` 改成 `type="image/svg+xml"`。

### 改「关于」页的经历时间线

`src/pages/about.astro` 顶部的 `timeline` 数组现在是空的，所以页面上不显示「经历」这一段。
往数组里加 `{ when, what, detail }` 就会自动渲染出来：

```js
const timeline = [
  { when: '2025 年 3 月 – 6 月', what: '做了个什么东西', detail: '一句话说明。' },
];
```

---

## 部署到 GitHub Pages

**已经部署好了**，不用再做第一次的配置：

| 项 | 值 |
|---|---|
| 仓库 | https://github.com/lheng7/lheng7.github.io |
| 线上地址 | https://lheng7.github.io |
| Pages 源 | GitHub Actions（已通过 API 设好，别改成 "Deploy from a branch"） |
| 触发器 | 推送到 `main` 自动部署，也可在 Actions 页手动触发 |

### 以后更新

改完内容，三条命令：

```bash
cd ~/project_lh/personal-site
git add . && git commit -m "新增项目：xxx"
git push
```

推送后 GitHub 会自动重新构建部署，一两分钟生效。进度看
[Actions](https://github.com/lheng7/lheng7.github.io/actions)。

### 仓库命名决定网址（给以后新建别的站参考）

- `<用户名>.github.io` → 网址是 `https://<用户名>.github.io/`（本站在用这个）
- 其他名字 → 网址是 `https://<用户名>.github.io/<仓库名>/`

两种都不用改配置：workflow 里的 `configure-pages` 会自动判断基路径。

### 改域名

`src/site.config.ts` 里的 `url` 现在是 `https://lheng7.github.io`（影响 canonical 和 RSS）。
绑自定义域名时把它改成新域名即可；workflow 会用 `SITE` 环境变量覆盖它，所以两边一致最稳。

---

## 踩过的坑（CI 相关）

**pnpm 版本只能声明一处。** `package.json` 里的 `packageManager: pnpm@10.20.0` 和
workflow 里 `pnpm/action-setup` 的 `with: version` 同时存在，会直接报
`Multiple versions of pnpm specified` 让构建失败。现在只保留 `package.json` 一处，
workflow 不写 version。

**步骤顺序有依赖。** `actions/setup-node` 的 `cache: pnpm` 需要 pnpm 已存在，
所以 `Setup pnpm` 必须排在 `Setup Node` 前面。

---

## 几个设计决定

**为什么用 Astro 而不是 React 单页应用**：这个站的主体是文字和项目记录，不是交互工具。Astro 默认输出纯 HTML，没有框架运行时，加载快、SEO 好。以后真需要交互组件，可以只在那一个组件里挂 React/Vue，不用重写整站。

**为什么内容放在 Markdown 而不是数据文件里**：写项目复盘需要标题、列表、表格、代码块、图片混排。Markdown 天然适合，而且十年后还能直接读。

**为什么没用 UI 框架**：整站 CSS 就一个文件、约 600 行，改配色只需要动 `:root` 里的变量。少一层依赖，以后回来看还能看懂。

**深色模式**：跟随系统设置自动切换，没有手动开关，也没有闪烁。代码块配色也是双主题的。

**没有追踪脚本**：不引 Google Analytics、不引第三方字体，`global.css` 里用的是系统字体栈。页面加载不向任何第三方发请求。

---

## 已做的事，和还没做的

已验证可跑：`pnpm build` 通过；有内容时生成 6 个页面，**项目清空后生成 4 个页面**
（`/`、`/projects/`、`/about/`、`/404`，零项目的 RSS 也验证过是合法 XML）；本地 `pnpm preview`
下所有路由返回 200；`BASE_PATH` 子路径模式下的链接、CSS 资源、canonical、sitemap 都正确加了前缀。

已上线并实测：https://lheng7.github.io 及其 `/projects/`、`/about/`、`/favicon.png`、
`/robots.txt`、`/rss.xml`、`/sitemap-index.xml` 全部返回 200，CSS 正常加载（8485 字节），
页面内无 `localhost` 残留链接，RSS 内链接指向正式域名。

**还没做**：
- 站内搜索（项目多了以后可能需要，可以用 Pagefind）
- 暗色/亮色手动切换开关
- 自定义域名（Pages 自带 HTTPS，`https_enforced` 已是 true；换域名要先买域名并加 DNS 记录）
- 填充真实项目与经历——**这一步留给你自己**

---

## 可复现的验证命令

```bash
pnpm build
find dist -name "*.html" | sort        # 看生成了哪些页面
pnpm preview &                          # 起本地服务器
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/projects/
```

模拟 GitHub Pages 子路径构建：

```bash
SITE=https://example.github.io BASE_PATH=/personal-site ASTRO_TELEMETRY_DISABLED=1 pnpm build
grep -o 'href="/personal-site[^"]*"' dist/index.html | sort -u
```

---

## 怎么回退

这个站点是新建目录 `~/project_lh/personal-site/`，没有改动任何现有文件。不想要了直接删整个目录：

```bash
rm -rf ~/project_lh/personal-site
```

已经在 GitHub 上的话，去仓库 Settings 底部 Delete this repository。
