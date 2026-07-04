import type { CVData, DesignSettings } from '../types/cv'

const defaultAvatar = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyMDAnIGhlaWdodD0nMjAwJz48cmVjdCB3aWR0aD0nMjAwJyBoZWlnaHQ9JzIwMCcgZmlsbD0nJTIzMWU1MzU5Jy8+PHRleHQgeD0nNTAlJyB5PSc1NSUnIGRvbWluYW50LWJhc2VsaW5lPSdtaWRkbGUnIHRleHQtYW5jaG9yPSdtaWRkbGUnIGZpbGw9J3doaXRlJyBmb250LXNpemU9JzgwJyBmb250LWZhbWlseT0nc2Fucy1zZXJpZic+U1I8L3RleHQ+PC9zdmc+'

export const defaultCVData: CVData = {
  personalInfo: {
    firstName: 'Sofia',
    lastName: 'Ramirez',
    title: 'UX/UI Designer',
    email: 'sofia.ramirez@designstudio.com',
    phone: '+1 (555) 987-6543',
    location: 'Austin, Texas, United States',
    linkedin: 'linkedin.com/in/sofiaramirez',
    website: 'sofiaramirez.design',
    birthDate: 'Jun 22, 1992',
    nationality: 'Mexican-American',
    drivingLicense: 'Class B',
    photo: defaultAvatar,
    summary:
      'Creative and detail-oriented UX/UI Designer with over 8 years of experience crafting intuitive digital experiences for web and mobile applications. Passionate about user-centered design, accessibility, and design systems.',
  },

  experiences: [
    {
      id: '1',
      title: 'Senior UX/UI Designer',
      company: 'PixelCraft Studio',
      location: 'Austin, TX',
      startDate: 'Mar 2019',
      endDate: 'Present',
      current: true,
      description:
        '<ul><li>Lead the design of enterprise SaaS platforms used by over 500,000 users worldwide.</li><li>Established and maintained a comprehensive design system used across 12 product teams.</li><li>Conducted user research, usability testing, and A/B testing to improve conversion rates by 28%.</li></ul>',
    },
    {
      id: '2',
      title: 'UI Designer',
      company: 'Nova Digital Agency',
      location: 'Dallas, TX',
      startDate: 'Aug 2016',
      endDate: 'Feb 2019',
      current: false,
      description:
        '<ul><li>Designed responsive websites and mobile apps for clients in e-commerce, healthcare, and fintech.</li><li>Created wireframes, high-fidelity mockups, and interactive prototypes using Figma and Principle.</li></ul>',
    },
  ],

  education: [
    {
      id: '1',
      degree: 'Bachelor of Fine Arts in Graphic Design',
      school: 'University of Texas at Austin',
      location: 'Austin, TX',
      startDate: '2011',
      endDate: '2015',
      description: 'Graduated with honors. Specialized in digital design, typography, and interactive media.',
    },
  ],

  courses: [
    { id: '1', name: 'Advanced Figma Techniques', institution: 'DesignCode', date: '2020' },
    { id: '2', name: 'Design Systems Mastery', institution: 'Shift Nudge', date: '2022' },
  ],

  skills: [
    { id: '1', name: 'User Interface Design', level: 'Expert' },
    { id: '2', name: 'Figma & Prototyping', level: 'Expert' },
    { id: '3', name: 'Design Systems', level: 'Advanced' },
    { id: '4', name: 'Usability Testing', level: 'Advanced' },
    { id: '5', name: 'Accessibility (WCAG)', level: 'Intermediate' },
  ],

  languages: [
    { id: '1', name: 'English', level: 'Native' },
    { id: '2', name: 'Spanish', level: 'Native' },
  ],

  hobbies: [
    { id: '1', name: 'Photography' },
    { id: '2', name: 'Travel' },
  ],

  volunteering: [],
  internships: [],
  references: [],
  links: [],
  customSections: [],

  sectionOrder: [
    'personal',
    'summary',
    'experience',
    'education',
    'courses',
    'skills',
    'languages',
    'hobbies',
  ],
}

export const defaultDesignSettings: DesignSettings = {
  primaryColor: '#1e5359',
  fontFamily: 'inter',
  fontSize: 'normal',
  spacing: 'compact',
  pageSize: 'A4',
  template: 'modern',
}
