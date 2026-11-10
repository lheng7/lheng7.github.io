import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '../site.config';

/**
 * RSS 订阅。地址是 /rss.xml。
 * 加了新项目之后会自动出现在里面，不用手动维护。
 */
export async function GET(context: APIContext) {
  const projects = (await getCollection('projects', ({ data }) => !data.draft)).sort((a, b) =>
    b.data.startDate.localeCompare(a.data.startDate)
  );

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: projects.map((project) => ({
      title: project.data.title,
      description: project.data.summary,
      link: `/projects/${project.id}/`,
      pubDate: new Date(`${project.data.endDate ?? project.data.startDate}-01T00:00:00Z`),
    })),
    customData: `<language>zh-CN</language>`,
  });
}
