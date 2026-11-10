/** 日期与链接小工具 */

/**
 * 把 "2025-03" 格式化成人看得懂的样子。
 * @param ym YYYY-MM
 */
export function formatMonth(ym: string): string {
  const [year, month] = ym.split('-');
  if (!year || !month) return ym;
  return `${year} 年 ${Number(month)} 月`;
}

/**
 * 把起止时间拼成 "2025 年 3 月 – 2025 年 6 月"。
 * 没有结束时间就显示为"至今"。
 */
export function formatRange(start: string, end?: string): string {
  return end ? `${formatMonth(start)} – ${formatMonth(end)}` : `${formatMonth(start)} 至今`;
}

/**
 * 拼接站内绝对路径，自动带上 base（GitHub Pages 项目仓库需要）。
 * 例：url('/projects/x') → '/personal-site/projects/x'
 */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}
