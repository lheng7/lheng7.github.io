import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 项目集合。
 * 每个项目 = src/content/projects/ 下的一个 .md 文件，文件名就是网址。
 *   例：pid-温度控制器.md → /projects/pid-温度控制器
 *
 * 需要新增字段时，在下面的 schema 里加一行即可，构建时会自动校验。
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      /** 项目名，显示在卡片和详情页标题 */
      title: z.string(),
      /** 一句话简介，显示在卡片上 */
      summary: z.string(),
      /** 开始时间，YYYY-MM。用于排序 */
      startDate: z.string().regex(/^\d{4}-\d{2}$/, '格式应为 YYYY-MM'),
      /** 结束时间，YYYY-MM；留空表示进行中 */
      endDate: z
        .string()
        .regex(/^\d{4}-\d{2}$/, '格式应为 YYYY-MM')
        .optional(),
      /** 排序权重，越大越靠前；同权重按开始时间倒序 */
      order: z.number().default(0),
      /** 是否在首页精选区显示 */
      featured: z.boolean().default(false),
      /** 技术栈 / 关键词标签 */
      tags: z.array(z.string()).default([]),
      /** 封面图，放在 src/assets/ 下，用相对路径引用 */
      cover: image().optional(),
      /** 外部链接，例如 GitHub 仓库或演示地址 */
      links: z
        .array(z.object({ label: z.string(), href: z.string().url() }))
        .default([]),
      /** 草稿：true 则构建时跳过 */
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
