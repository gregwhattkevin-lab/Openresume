export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  birthDate: string;
  nationality: string;
  drivingLicense: string;
  photo: string;
  summary: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface CourseItem {
  id: string;
  name: string;
  institution: string;
  date: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  level: string;
}

export interface HobbyItem {
  id: string;
  name: string;
}

export interface VolunteerItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface InternshipItem {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
}

export interface LinkItem {
  id: string;
  label: string;
  url: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface CustomSection {
  id: string;
  key: string;
  title: string;
  items: CustomSectionItem[];
}

export type TemplateType =
  | 'modern'
  | 'classic'
  | 'minimalist'
  | 'creative'
  | 'executive'
  | 'corporate'
  | 'compact'
  | 'sidebarLeft'
  | 'magazine'
  | 'elegant'
  | 'bold'
  | 'swiss'
  | 'infographic'
  | 'simple'
  | 'professional'
  | 'dynamic'
  | 'cards'
  | 'centered'
  | 'modernDark'
  | 'timeline';

export interface DesignSettings {
  primaryColor: string;
  fontFamily: 'inter' | 'playfair' | 'georgia';
  fontSize: 'small' | 'normal' | 'large';
  spacing: 'compact' | 'normal' | 'spacious';
  pageSize: 'A4' | 'Letter' | 'Legal';
  template: TemplateType;
}

export interface CVData {
  personalInfo: PersonalInfo;
  experiences: ExperienceItem[];
  education: EducationItem[];
  courses: CourseItem[];
  skills: SkillItem[];
  languages: LanguageItem[];
  hobbies: HobbyItem[];
  volunteering: VolunteerItem[];
  internships: InternshipItem[];
  references: ReferenceItem[];
  links: LinkItem[];
  customSections: CustomSection[];
  sectionOrder: string[];
}

export interface AppState {
  cv: CVData;
  design: DesignSettings;
}

export type SectionKey =
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'courses'
  | 'skills'
  | 'languages'
  | 'hobbies'
  | 'volunteering'
  | 'internships'
  | 'references'
  | 'links'
  | string;

export interface SectionDef {
  key: SectionKey;
  label: string;
  icon: string;
  description: string;
}
