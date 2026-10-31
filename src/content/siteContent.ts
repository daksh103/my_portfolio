export const site = {
  name: 'Daksh Arora',
  role: 'ASSOCIATE PRODUCT MANAGER · PAYTM',
  portfolioLabel: 'PORTFOLIO — 2026',
  headline: {
    before: "I'm a product manager who ",
    accent: 'builds',
    after: ' the systems behind the product.',
  },
  bio: "I'm Daksh Arora, an Associate Product Manager at Paytm. Before this I ran product and revenue operations at Omniful.ai, where I designed the billing module in the platform dashboard and built the CRM and automation behind it. I still build: n8n workflows, API integrations and small AI tools.",
  email: 'daksh007arora@gmail.com',
  links: {
    linkedin: {
      label: 'LINKEDIN',
      href: 'https://www.linkedin.com/in/daksh-arora-1338ab234/',
      display: 'linkedin.com/in/daksh-arora-1338ab234',
    },
    x: {
      label: 'X',
      href: 'https://x.com/dksh007',
      display: 'x.com/dksh007',
    },
    github: {
      label: 'GITHUB',
      href: 'https://github.com/daksh103',
      display: 'github.com/daksh103',
    },
  },
  facts: [
    'APM at Paytm',
    'Ex-Omniful.ai, Product & RevOps',
    'B.Tech CSE, JIIT Noida',
    'India',
  ],
} as const;

export const navItems = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
] as const;

export const caseStudies = [
  {
    meta: 'CASE 01 — AUTOMATION · REVOPS',
    stack: 'n8n / HubSpot / REST APIs / Webhooks',
    title: 'Business process automation with n8n',
    problem:
      'Business workflows that ran across HubSpot and other tools depended on people moving data between systems by hand.',
    problemNote:
      'CRM, lead routing, and billing ops needed consistent handoffs without duplicate entry.',
    did: 'Designed and built automated workflows in n8n that connect HubSpot with other services through APIs and webhooks, so records and actions flow between systems without manual steps.',
    result: 'Live automations across CRM & billing',
    resultNote:
      'Multiple production workflows for lead handling, lifecycle stages, and internal ops—replacing repetitive manual updates.',
  },
  {
    meta: 'CASE 02 — AI · CONTENT PIPELINE',
    stack: 'Python / LLM scripts / Automation',
    title: 'AI short-form video generator',
    problem:
      'Making short-form videos by hand is slow and repetitive, which makes it hard to publish consistently.',
    did: 'Built an automated Python pipeline that turns AI-generated scripts into finished short-form videos end to end.',
    result: 'Script-to-video in one pipeline',
    resultNote:
      'Minimal manual steps from generated script to publish-ready clips—built for speed and repeatability.',
  },
] as const;

export const experience = [
  {
    when: 'Now',
    current: true,
    title: 'Associate Product Manager',
    org: 'Paytm',
    bullets: [
      'I work with engineering, design and business teams to define, ship and improve product features for Paytm’s users, from problem discovery and requirements through launch and iteration.',
    ],
  },
  {
    when: 'Jun 2025 – May 2026',
    title: 'Product Management & Revenue Operations Manager',
    org: 'Omniful.ai',
    bullets: [
      'Led product design of the billing module in the platform dashboard.',
      'Built the end-to-end HubSpot CRM architecture: lifecycle automation, lead routing and billing operations workflows.',
      'Set up support operations on DevRev and built RevOps dashboards.',
    ],
  },
  {
    when: 'Jun – Jul 2024',
    title: 'Policy Formulation Intern',
    org: 'Department of IT, Government of Himachal Pradesh',
    bullets: [
      'Worked on technology-adoption policy with the Principal IT Advisor’s office.',
    ],
  },
  {
    when: 'Jun – Jul 2023',
    title: 'Data Analysis Intern',
    org: 'MeitY / Digital India Corporation',
    bullets: [
      'Analysed and classified data for the Poshan Tracker project using MySQL.',
    ],
  },
] as const;

export const alsoItems = [
  '2nd place, OSDCODE JAM-4v: a music player with chat rooms for people with similar taste.',
  'Led a team of 6 at Smart India Hackathon 2023 on an AI/ML problem statement from the Ministry of Education.',
] as const;

export const skillGroups = [
  {
    title: 'Product',
    items: [
      'Product management',
      'Data analysis',
      'Jira',
      'Notion',
      'Rocketlane',
      'Canva',
      'Photoshop',
    ],
  },
  {
    title: 'Ops & RevOps',
    items: [
      'HubSpot CRM',
      'Revenue operations',
      'Lead routing',
      'Billing ops',
      'DevRev',
    ],
  },
  {
    title: 'Tech',
    items: [
      'Python',
      'JavaScript',
      'SQL / MySQL',
      'C++',
      'C',
      'Django',
      'HTML & CSS',
      'Bootstrap',
    ],
  },
  {
    title: 'AI & automation',
    items: [
      'n8n',
      'Zapier',
      'Workflow automation',
      'API integrations',
      'Webhooks',
      'Local LLMs (Ollama)',
    ],
  },
] as const;

export const about = {
  title: { before: 'Engineer by training, ', accent: 'PM by choice' },
  paragraphs: [
    'I studied Computer Science at Jaypee Institute of Information Technology, Noida (B.Tech, 2026). Along the way I worked on government data and policy, built side projects, and then spent a year owning product and revenue operations at a SaaS start-up.',
    'That mix shapes how I work as a PM. I like to understand how a system really works before I change it, and when a process is slow, my first instinct is to automate it rather than add a step.',
  ],
  footnote:
    'Currently focused on shipping user-facing product at Paytm while keeping a builder’s habit—automations, integrations, and small tools when they unblock the team.',
} as const;
