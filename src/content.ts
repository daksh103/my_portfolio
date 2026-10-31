/**
 * All site copy lives here. Edit this file to change what the site says.
 * Rules: no phone number, no confidential Paytm details, never invent numbers.
 * Anything starting with "TODO" renders as a visible placeholder until you replace it.
 */

export type Case = {
  id: string;
  title: string;
  kicker: string;
  tags: string[];
  problem: string;
  problemTodo?: string;
  did: string;
  result: string;
  resultNote?: string;
};

export type Role = {
  when: string;
  role: string;
  org: string;
  current?: boolean;
  notes: string[];
};

export const site = {
  name: 'Daksh Arora',
  handle: 'daksh.arora',
  email: 'daksh007arora@gmail.com',

  nav: [
    { id: 'work', label: 'Work' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ],

  hero: {
    status: 'Currently · Associate Product Manager · Paytm',
    // The word in `accent` is highlighted in lime inside the headline.
    headline: 'I’m a product manager who builds the systems behind the product.',
    accent: 'builds',
    lede:
      'I’m Daksh Arora, an Associate Product Manager at Paytm. Before this I ran product and revenue operations at Omniful.ai, where I designed the billing module in the platform dashboard and built the CRM and automation behind it. I still build: n8n workflows, API integrations and small AI tools.',
    primaryCta: 'See selected work',
    secondaryCta: 'Email me',
    photo: {
      webp: '/images/daksh-headshot-800.webp',
      jpg: '/images/daksh-headshot-800.jpg',
      width: 800,
      height: 735,
      alt: 'Portrait of Daksh Arora smiling, in a dark pinstripe blazer',
    },
    spec: [
      { key: 'ROLE', value: 'APM at Paytm' },
      { key: 'PREV', value: 'Ex-Omniful.ai, Product & RevOps' },
      { key: 'EDU', value: 'B.Tech CSE, JIIT Noida' },
      { key: 'BASE', value: 'India' },
    ],
  },

  // Hovering a stack item highlights skills and case-study tags that contain any `match` word.
  stack: [
    { label: 'n8n', match: ['n8n'] },
    { label: 'HubSpot', match: ['hubspot'] },
    { label: 'REST APIs', match: ['rest api', 'api integrations'] },
    { label: 'Webhooks', match: ['webhooks'] },
    { label: 'Python', match: ['python'] },
    { label: 'LLM pipelines', match: ['llm'] },
    { label: 'SQL', match: ['sql'] },
    { label: 'Jira', match: ['jira'] },
    { label: 'DevRev', match: ['devrev'] },
  ],

  work: {
    title: 'Two things I built, and why',
    sub: 'Each one is written as the problem, what I did, and what came of it.',
    cases: [
      {
        id: 'CASE_01',
        title: 'Business process automation with n8n',
        kicker: 'Automation · RevOps',
        tags: ['n8n', 'HubSpot', 'REST APIs', 'Webhooks'],
        problem:
          'Business workflows that ran across HubSpot and other tools depended on people moving data between systems by hand.',
        problemTodo: '[TODO: which workflows, and what it cost: time, errors, delays. Daksh to confirm.]',
        did: 'Designed and built automated workflows in n8n that connect HubSpot with other services through APIs and webhooks, so records and actions flow between systems without manual steps.',
        result: '[Result metric]',
        resultNote: 'TODO: e.g. hours saved per week or number of workflows live. Real numbers only.',
      },
      {
        id: 'CASE_02',
        title: 'AI short-form video generator',
        kicker: 'AI · Content pipeline',
        tags: ['Python', 'LLM scripts', 'Automation'],
        problem:
          'Making short-form videos by hand is slow and repetitive, which makes it hard to publish consistently.',
        did: 'Built an automated Python pipeline that turns AI-generated scripts into finished short-form videos end to end.',
        result: '[Result metric]',
        resultNote: 'TODO: videos produced, time per video, or views. Add a link or sample clip.',
      },
    ] satisfies Case[],
  },

  experience: {
    title: 'Where I’ve worked',
    roles: [
      {
        when: 'Now',
        role: 'Associate Product Manager',
        org: 'Paytm',
        current: true,
        // Generic, non-confidential summary. Edit freely.
        notes: [
          'I work with engineering, design and business teams to define, ship and improve product features for Paytm’s users, from problem discovery and requirements through launch and iteration.',
        ],
      },
      {
        when: 'Jun 2025 – May 2026',
        role: 'Product Management & Revenue Operations Manager',
        org: 'Omniful.ai',
        notes: [
          'Led product design of the billing module in the platform dashboard.',
          'Built the end-to-end HubSpot CRM architecture: lifecycle automation, lead routing and billing operations workflows.',
          'Set up support operations on DevRev and built RevOps dashboards.',
          '[TODO: any shareable results]',
        ],
      },
      {
        when: 'Jun – Jul 2024',
        role: 'Policy Formulation Intern',
        org: 'Department of IT, Government of Himachal Pradesh',
        notes: ['Worked on technology-adoption policy with the Principal IT Advisor’s office.'],
      },
      {
        when: 'Jun – Jul 2023',
        role: 'Data Analysis Intern',
        org: 'MeitY / Digital India Corporation',
        notes: ['Analysed and classified data for the Poshan Tracker project using MySQL.'],
      },
    ] satisfies Role[],
    also: [
      '2nd place, OSDCODE JAM-4v: a music player with chat rooms for people with similar taste.',
      'Led a team of 6 at Smart India Hackathon 2023 on an AI/ML problem statement from the Ministry of Education.',
      '[TODO: Daksh to confirm these stay]',
    ],
  },

  skills: {
    title: 'What I work with',
    groups: [
      { name: 'Product', items: ['Product management', 'Data analysis', 'Jira', 'Notion', 'Rocketlane', 'Canva', 'Photoshop'] },
      { name: 'Ops & RevOps', items: ['HubSpot CRM', 'Revenue operations', 'Lead routing', 'Billing ops', 'DevRev', 'Sheets / Excel'] },
      { name: 'Tech', items: ['Python', 'JavaScript', 'SQL / MySQL', 'C++', 'C', 'Django', 'HTML & CSS', 'Bootstrap'] },
      { name: 'AI & automation', items: ['n8n', 'Zapier', 'Workflow automation', 'API integrations', 'Webhooks', 'Local LLMs (Ollama)'] },
    ],
  },

  about: {
    title: 'Engineer by training, PM by choice',
    accent: 'PM by choice',
    paragraphs: [
      'I studied Computer Science at Jaypee Institute of Information Technology, Noida (B.Tech, 2026). Along the way I worked on government data and policy, built side projects, and then spent a year owning product and revenue operations at a SaaS start-up.',
      'That mix shapes how I work as a PM. I like to understand how a system really works before I change it, and when a process is slow, my first instinct is to automate it rather than add a step.',
      '[TODO: one or two lines in Daksh’s own voice on what he wants to work on next, or what he’s learning now.]',
    ],
  },

  contact: {
    title: 'Let’s talk product.',
    accent: 'product.',
    sub: 'The fastest way to reach me is email. I’m also on LinkedIn and X.',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/daksh-arora-1338ab234/', display: 'linkedin.com/in/daksh-arora-1338ab234' },
      { label: 'X', href: 'https://x.com/dksh007', display: 'x.com/dksh007' },
      { label: 'GitHub', href: 'https://github.com/daksh103', display: 'github.com/daksh103' },
      // TODO(resume): add { label: 'Résumé', href: '/Daksh-Arora-Resume.pdf', display: 'resume.pdf' } once a phone-free PDF is in /public.
    ],
  },
};

/** True for copy that is still a placeholder. */
export const isTodo = (s: string) => /^\[?TODO/.test(s) || s.startsWith('[Result');
