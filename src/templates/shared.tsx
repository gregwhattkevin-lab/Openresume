import type { ReactNode } from 'react'
import type { CVData, DesignSettings } from '../types/cv'
import { baseSections, additionalSections } from '../data/sections'

export function HtmlContent({ html, className = '' }: { html: string; className?: string }) {
  if (!html) return null
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
}

export function getFontClass(fontFamily: DesignSettings['fontFamily']): string {
  switch (fontFamily) {
    case 'playfair':
      return 'font-serif'
    case 'georgia':
      return 'font-serif'
    default:
      return 'font-sans'
  }
}

export function getFontSizeClass(fontSize: DesignSettings['fontSize']): string {
  switch (fontSize) {
    case 'small':
      return 'text-[10pt]'
    case 'large':
      return 'text-[12pt]'
    default:
      return 'text-[11pt]'
  }
}

export function getSpacingClass(spacing: DesignSettings['spacing']): string {
  switch (spacing) {
    case 'compact':
      return 'space-y-2'
    case 'spacious':
      return 'space-y-5'
    default:
      return 'space-y-3'
  }
}

export function ContactItem({
  icon,
  value,
  href,
}: {
  icon: ReactNode
  value: string
  href?: string
}) {
  if (!value) return null
  const content = (
    <div className="flex items-start gap-2 text-[10pt]">
      <span className="mt-0.5 opacity-80 flex-shrink-0">{icon}</span>
      <span style={{ overflowWrap: 'break-word', wordBreak: 'normal', minWidth: 0 }}>{value}</span>
    </div>
  )
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="hover:underline">
        {content}
      </a>
    )
  }
  return content
}

export function getSectionTitle(key: string, cv: CVData): string {
  if (key.startsWith('custom-')) {
    return cv.customSections.find((s) => s.key === key)?.title || 'Custom section'
  }
  const all = [...baseSections, ...additionalSections]
  return all.find((s) => s.key === key)?.label || key
}

const variantStyles: Record<
  string,
  {
    title: string
    item: string
    date: string
    subtitle: string
  }
> = {
  default: {
    title: 'text-sm font-bold uppercase tracking-widest mb-3',
    item: 'mb-3',
    date: 'text-[10pt] text-slate-500',
    subtitle: 'text-[10pt] italic',
  },
  modern: {
    title: 'section-title',
    item: 'mb-3',
    date: 'text-[10pt] text-slate-600',
    subtitle: 'text-[10pt] font-semibold',
  },
  classic: {
    title: 'section-title',
    item: 'mb-3',
    date: 'text-[10pt] text-slate-500',
    subtitle: 'text-[10pt] italic',
  },
  minimalist: {
    title: 'text-xs font-bold uppercase tracking-widest text-slate-400 mb-4',
    item: 'border-l-2 pl-4 mb-4',
    date: 'text-[10pt] text-slate-500',
    subtitle: 'text-[10pt] text-slate-500',
  },
  creative: {
    title: 'text-xs font-bold uppercase tracking-widest mb-3',
    item: 'relative pl-4 border-l-2 mb-4',
    date: 'text-[10pt] text-slate-600',
    subtitle: 'text-[10pt] text-slate-600',
  },
  bold: {
    title: 'text-2xl font-black uppercase mb-4',
    item: 'mb-4',
    date: 'text-[10pt] text-slate-500',
    subtitle: 'text-[10pt] italic',
  },
  simple: {
    title: 'text-sm font-bold uppercase tracking-widest text-slate-400 mb-4',
    item: 'mb-4',
    date: 'text-[10pt] text-slate-500',
    subtitle: 'text-[10pt] italic',
  },
  magazine: {
    title: 'text-center text-sm font-bold uppercase tracking-widest mb-4',
    item: 'mb-4',
    date: 'text-[10pt] text-slate-500',
    subtitle: 'text-[10pt] italic',
  },
  compact: {
    title: 'text-[10pt] font-bold uppercase mb-2',
    item: 'mb-3',
    date: 'text-[9pt] text-slate-500',
    subtitle: 'text-[9pt] italic',
  },
  swiss: {
    title: 'text-xs font-bold uppercase tracking-widest mb-4',
    item: 'mb-4',
    date: 'text-[9pt] text-slate-500',
    subtitle: 'text-[10pt] italic',
  },
  executive: {
    title: 'section-title',
    item: 'mb-4',
    date: 'text-[9pt] text-slate-500',
    subtitle: 'text-[10pt] italic',
  },
  corporate: {
    title: 'section-title',
    item: 'mb-4',
    date: 'text-[9pt] text-slate-500',
    subtitle: 'text-[10pt] italic',
  },
  sidebarLeft: {
    title: 'section-title',
    item: 'mb-3',
    date: 'text-[10pt] text-slate-500',
    subtitle: 'text-[10pt] font-semibold',
  },
  modernDark: {
    title: 'section-title',
    item: 'mb-4',
    date: 'text-[10pt] text-slate-500',
    subtitle: 'text-[10pt] italic',
  },
  elegant: {
    title: 'text-sm font-bold uppercase tracking-widest mb-4',
    item: 'mb-4',
    date: 'text-[10pt] text-slate-500',
    subtitle: 'text-[10pt] italic',
  },
  dynamic: {
    title: 'section-title',
    item: 'mb-4',
    date: 'text-[10pt] text-slate-500',
    subtitle: 'text-[10pt] font-semibold',
  },
  cards: {
    title: 'text-sm font-bold uppercase mb-3',
    item: 'mb-3',
    date: 'text-[9pt] text-slate-500',
    subtitle: 'text-[10pt] italic',
  },
  centered: {
    title: 'section-title text-center',
    item: 'mb-4',
    date: 'text-[10pt] text-slate-500',
    subtitle: 'text-[10pt] italic',
  },
  timeline: {
    title: 'text-sm font-bold uppercase tracking-widest mb-4',
    item: 'mb-4',
    date: 'text-[9pt] font-bold text-slate-500',
    subtitle: 'text-[10pt]',
  },
  infographic: {
    title: 'section-title',
    item: 'mb-4',
    date: 'text-[9pt] font-bold text-slate-500',
    subtitle: 'text-[10pt]',
  },
}

interface SectionContentProps {
  sectionKey: string
  cv: CVData
  design: DesignSettings
  variant?: string
}

export function SectionContent({ sectionKey, cv, design, variant = 'default' }: SectionContentProps) {
  const c = design.primaryColor
  const styles = variantStyles[variant] || variantStyles.default
  const title = getSectionTitle(sectionKey, cv)

  const SectionTitle = () => (
    <h2 className={styles.title} style={{ color: c, borderColor: c }}>
      {title}
    </h2>
  )

  switch (sectionKey) {
    case 'summary':
      if (!cv.personalInfo.summary) return null
      return (
        <section>
          <SectionTitle />
          <HtmlContent html={cv.personalInfo.summary} className="rich-content leading-relaxed" />
        </section>
      )

    case 'experience':
      if (cv.experiences.length === 0) return null
      return (
        <section>
          <SectionTitle />
          <div className={getSpacingClass(design.spacing)}>
            {cv.experiences.map((exp) => (
              <div key={exp.id} className={styles.item} style={{ borderColor: c }}>
                <h3 className="font-bold text-slate-900">{exp.title}</h3>
                <div className={`${styles.subtitle} flex flex-wrap gap-x-3`} style={{ color: c }}>
                  <span>{exp.company}</span>
                  {exp.location && <span>{exp.location}</span>}
                </div>
                <div className={styles.date}>
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </div>
                <HtmlContent html={exp.description} className="mt-1.5 rich-content" />
              </div>
            ))}
          </div>
        </section>
      )

    case 'education':
      if (cv.education.length === 0) return null
      return (
        <section>
          <SectionTitle />
          <div className={getSpacingClass(design.spacing)}>
            {cv.education.map((edu) => (
              <div key={edu.id} className={styles.item} style={{ borderColor: c }}>
                <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                <div className={`${styles.subtitle} flex flex-wrap gap-x-3`} style={{ color: c }}>
                  <span>{edu.school}</span>
                  {edu.location && <span>{edu.location}</span>}
                </div>
                <div className={styles.date}>
                  {edu.startDate} - {edu.endDate}
                </div>
                {edu.description && <p className="text-[10pt] text-slate-600 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )

    case 'courses':
      if (cv.courses.length === 0) return null
      return (
        <section>
          <SectionTitle />
          <div className="flex flex-wrap gap-2">
            {cv.courses.map((course) => (
              <span key={course.id} className="text-[10pt]">
                {course.name} {course.institution && <span className="text-slate-500">({course.institution}{course.date && `, ${course.date}`})</span>}
              </span>
            ))}
          </div>
        </section>
      )

    case 'skills':
      if (cv.skills.length === 0) return null
      return (
        <section>
          <SectionTitle />
          <p className="text-[10pt] leading-relaxed">{cv.skills.map((s) => s.name).join(' • ')}</p>
        </section>
      )

    case 'languages':
      if (cv.languages.length === 0) return null
      return (
        <section>
          <SectionTitle />
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10pt]">
            {cv.languages.map((lang) => (
              <span key={lang.id}>
                {lang.name} <span className="text-slate-500">({lang.level})</span>
              </span>
            ))}
          </div>
        </section>
      )

    case 'hobbies':
      if (cv.hobbies.length === 0) return null
      return (
        <section>
          <SectionTitle />
          <p className="text-[10pt]">{cv.hobbies.map((h) => h.name).join(' • ')}</p>
        </section>
      )

    case 'volunteering':
      if (cv.volunteering.length === 0) return null
      return (
        <section>
          <SectionTitle />
          <div className={getSpacingClass(design.spacing)}>
            {cv.volunteering.map((vol) => (
              <div key={vol.id} className={styles.item} style={{ borderColor: c }}>
                <h3 className="font-bold text-slate-900">{vol.role}</h3>
                <div className={`${styles.subtitle} flex flex-wrap gap-x-3`} style={{ color: c }}>
                  <span>{vol.organization}</span>
                  {vol.location && <span>{vol.location}</span>}
                </div>
                <div className={styles.date}>
                  {vol.startDate} - {vol.endDate}
                </div>
                {vol.description && <p className="text-[10pt] text-slate-600 mt-1">{vol.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )

    case 'internships':
      if (cv.internships.length === 0) return null
      return (
        <section>
          <SectionTitle />
          <div className={getSpacingClass(design.spacing)}>
            {cv.internships.map((intern) => (
              <div key={intern.id} className={styles.item} style={{ borderColor: c }}>
                <h3 className="font-bold text-slate-900">{intern.title}</h3>
                <div className={`${styles.subtitle} flex flex-wrap gap-x-3`} style={{ color: c }}>
                  <span>{intern.company}</span>
                  {intern.location && <span>{intern.location}</span>}
                </div>
                <div className={styles.date}>
                  {intern.startDate} - {intern.current ? 'Present' : intern.endDate}
                </div>
                <HtmlContent html={intern.description} className="mt-1.5 rich-content" />
              </div>
            ))}
          </div>
        </section>
      )

    case 'references':
      if (cv.references.length === 0) return null
      return (
        <section>
          <SectionTitle />
          <div className="grid grid-cols-2 gap-4">
            {cv.references.map((ref) => (
              <div key={ref.id} className="text-[10pt]">
                <h3 className="font-bold text-slate-900">{ref.name}</h3>
                <div className="text-slate-600">{ref.company}</div>
                <div className="text-slate-500">{ref.phone}</div>
                <div className="text-slate-500">{ref.email}</div>
              </div>
            ))}
          </div>
        </section>
      )

    case 'links':
      if (cv.links.length === 0) return null
      return (
        <section>
          <SectionTitle />
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10pt]">
            {cv.links.map((link) => (
              <a
                key={link.id}
                href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
                style={{ color: c }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      )

    default: {
      if (!sectionKey.startsWith('custom-')) return null
      const custom = cv.customSections.find((s) => s.key === sectionKey)
      if (!custom || custom.items.length === 0) return null
      return (
        <section>
          <SectionTitle />
          <div className={getSpacingClass(design.spacing)}>
            {custom.items.map((item) => (
              <div key={item.id} className={styles.item} style={{ borderColor: c }}>
                <h3 className="font-bold text-slate-900">{item.title}</h3>
                <div className={`${styles.subtitle} flex flex-wrap gap-x-3`} style={{ color: c }}>
                  <span>{item.subtitle}</span>
                </div>
                <div className={styles.date}>
                  {item.startDate} {item.endDate && `- ${item.endDate}`}
                </div>
                {item.description && <p className="text-[10pt] text-slate-600 mt-1">{item.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )
    }
  }
}

export function SectionList({
  cv,
  design,
  variant = 'default',
}: {
  cv: CVData
  design: DesignSettings
  variant?: string
}) {
  return (
    <>
      {cv.sectionOrder.map((key) => (
        <SectionContent key={key} sectionKey={key} cv={cv} design={design} variant={variant} />
      ))}
    </>
  )
}
