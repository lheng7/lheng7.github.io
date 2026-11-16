import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteText } from '../site.config';
import { getProjects, projectSlug } from '../lib/projects';
import { localePath, url } from '../utils';

/**
 * 英文 RSS，地址 /rss.xml。
 * 加了新项目之后会自动出现在里面，不用手动维护。
 */
export async function GET(context: APIContext) {
  const locale = 'en' as const;
  const site = siteText(locale);

  const projects = (await getProjects(locale)).sort((a, b) =>
    b.data.startDate.localeCompare(a.data.startDate)
  );

  return rss({
    title: site.title,
    description: site.description,
    site: context.site ?? 'https://lheng7.github.io',
    items: projects.map((project) => ({
      title: project.data.title,
      description: project.data.summary,
      link: url(localePath(locale, `/projects/${projectSlug(project.id)}/`)),
      pubDate: new Date(`${project.data.endDate ?? project.data.startDate}-01T00:00:00Z`),
    })),
    customData: `<language>en</language>`,
  });
}
