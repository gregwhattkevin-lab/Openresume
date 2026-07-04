import type { SectionDef } from '../types/cv'

export const baseSections: SectionDef[] = [
  {
    key: 'personal',
    label: 'Personal details',
    icon: 'user',
    description: 'Fill in your details and the job title you are aiming for to make a clear first impression.',
  },
  {
    key: 'summary',
    label: 'Professional summary',
    icon: 'fileText',
    description: 'Write a short professional summary that highlights your key skills and experience.',
  },
  {
    key: 'experience',
    label: 'Employment history',
    icon: 'briefcase',
    description: 'Showcase your relevant work experience and key achievements.',
  },
  {
    key: 'education',
    label: 'Education',
    icon: 'graduationCap',
    description: 'Add your academic background, degrees, and certifications.',
  },
  {
    key: 'courses',
    label: 'Courses',
    icon: 'wrench',
    description: 'List additional courses, certifications, and training programs.',
  },
  {
    key: 'skills',
    label: 'Skills',
    icon: 'zap',
    description: 'Highlight your key skills and competencies.',
  },
  {
    key: 'languages',
    label: 'Languages',
    icon: 'languages',
    description: 'Add the languages you speak and your proficiency level.',
  },
  {
    key: 'hobbies',
    label: 'Hobbies',
    icon: 'heart',
    description: 'Share your interests and hobbies to show your personality.',
  },
  {
    key: 'volunteering',
    label: 'Volunteering',
    icon: 'handHeart',
    description: 'Add any volunteer work or community service experience.',
  },
]

export const additionalSections: SectionDef[] = [
  {
    key: 'internships',
    label: 'Internships',
    icon: 'briefcase',
    description: 'Add internships or trainee positions relevant to your career.',
  },
  {
    key: 'references',
    label: 'References',
    icon: 'messageCircle',
    description: 'List professional references who can vouch for your work.',
  },
  {
    key: 'links',
    label: 'Links',
    icon: 'link',
    description: 'Add links to your portfolio, GitHub, LinkedIn, or other relevant profiles.',
  },
  {
    key: 'custom',
    label: 'Custom section',
    icon: 'plus',
    description: 'Create a custom section for any additional information you want to include.',
  },
]

export function getSectionIcon(key: string): string {
  const all = [...baseSections, ...additionalSections]
  return all.find((s) => s.key === key)?.icon || 'fileText'
}

export function getSectionLabel(key: string): string {
  const all = [...baseSections, ...additionalSections]
  return all.find((s) => s.key === key)?.label || key
}
