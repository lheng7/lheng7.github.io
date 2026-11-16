/**
 * 英文界面文案（默认语言）。
 * 加一条新文案：这里加 key，再在 zh.ts 加同名的中文，缺 key 会编译报错。
 */

const en = {
  'nav.home': 'Home',
  'nav.projects': 'Projects',
  'nav.about': 'About',
  'nav.aria': 'Main navigation',

  'lang.switchAria': 'Language',

  'home.featured': 'Selected work',
  'home.projects': 'Projects',
  'home.statement': 'If I cannot create it, I do not understand it.',
  'home.allProjects': 'All projects →',
  'home.emptyTitle': 'No projects yet.',
  'home.emptyHint': 'Add a Markdown file to src/content/projects/en/ and it shows up here.',

  'projects.metaTitle': 'Projects',
  'projects.metaDescription': 'Projects, experiments and course work by lheng7.',
  'projects.heading': 'Projects',
  'projects.intro':
    'Course design, side projects and self-taught exercises. Each one records the background, the approach, and an honest retrospective.',
  'projects.emptyTitle': 'No projects yet.',
  'projects.emptyHint': 'Add a Markdown file to src/content/projects/en/ and it appears here.',
  'projects.viewOther': 'Read this in Chinese →',

  'project.back': '← Back to projects',
  'project.time': 'Timeline',
  'project.tags': 'Tags',
  'project.coverAlt': 'cover image',

  'about.metaTitle': 'About',
  'about.metaDescription': 'About lheng7, undergraduate in Electrical Engineering at Tsinghua University.',
  'about.heading': 'About',
  'about.whatIDoHeading': 'What I work on',
  'about.whatIDoBody':
    'I am lheng7, an undergraduate in the Department of Electronic Engineering at Tsinghua University. Most of my time goes into analog circuits, digital systems and signal processing, with embedded and hardware projects on the side. This site collects records of those projects — the parts that went smoothly, and the parts where I hit a wall and later realised what I should have done differently.',
  'about.howIWriteHeading': 'How I write these notes',
  'about.howIWriteBody':
    'For each project I try to answer four things: why I built it, what approach I took, how it turned out, and what I did badly. The last one matters most — a write-up that only says "done" is of little use to me later.',
  'about.experienceHeading': 'Experience',
  'about.contactHeading': 'Contact',
  'about.contactPrefix': 'Questions or just want to talk? Email me at ',
  'about.contactSuffix': ', or find me on GitHub.',
  'about.builtWith':
    'This site is built with Astro and hosted on GitHub Pages. No analytics, no third-party scripts.',
  'about.back': '← Back home',

  'notFound.heading': 'Page not found',
  'notFound.body': 'The link may be wrong, or the page has moved.',
  'notFound.back': 'Back home',
};

export default en;
