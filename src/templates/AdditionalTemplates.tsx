import type { CVData, DesignSettings } from '../types/cv'
import { SectionList, getFontClass, getFontSizeClass } from './shared'
import { MapPin, Phone, Mail } from 'lucide-react'

interface TemplateProps {
  cv: CVData
  design: DesignSettings
}

const serifStack = "Georgia, Cambria, 'Times New Roman', Times, serif"

function ContactLine({ icon: IconComponent, value, href }: { icon: typeof MapPin; value: string; href?: string }) {
  if (!value) return null
  const content = (
    <span className="flex items-start gap-2 text-[9pt]">
      <IconComponent size={12} className="flex-shrink-0 mt-0.5" />
      <span style={{ overflowWrap: 'break-word', wordBreak: 'normal', minWidth: 0 }}>{value}</span>
    </span>
  )
  if (href) return <a href={href} className="hover:underline">{content}</a>
  return content
}

function Avatar({ cv, color }: { cv: CVData; color: string }) {
  if (cv.personalInfo.photo) {
    return <img src={cv.personalInfo.photo} alt="" className="w-24 h-24 rounded-full object-cover border-4" style={{ borderColor: color }} />
  }
  return (
    <div className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{ backgroundColor: color }}>
      {cv.personalInfo.firstName?.[0] || '?'}{cv.personalInfo.lastName?.[0] || '?'}
    </div>
  )
}

// 5. Executive
export function ExecutiveTemplate({ cv, design }: TemplateProps) {
  return (
    <div className={`cv-page ${getFontClass(design.fontFamily)} ${getFontSizeClass(design.fontSize)}`} style={{ color: '#1f2937' }}>
      <header className="bg-slate-900 text-white -mx-[15mm] -mt-[15mm] px-[15mm] pt-10 pb-8 mb-8">
        <h1 className="text-4xl font-bold uppercase tracking-widest">{cv.personalInfo.firstName} {cv.personalInfo.lastName}</h1>
        <p className="text-lg text-slate-300 mt-2">{cv.personalInfo.title}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-400 mt-4">
          {cv.personalInfo.email && <span>{cv.personalInfo.email}</span>}
          {cv.personalInfo.phone && <span>{cv.personalInfo.phone}</span>}
          {cv.personalInfo.location && <span>{cv.personalInfo.location}</span>}
          {cv.personalInfo.linkedin && <span>{cv.personalInfo.linkedin}</span>}
        </div>
      </header>
      <div className="space-y-5">
        <SectionList cv={cv} design={design} variant="executive" />
      </div>
    </div>
  )
}

// 6. Corporate
export function CorporateTemplate({ cv, design }: TemplateProps) {
  const c = design.primaryColor
  return (
    <div className={`cv-page ${getFontClass(design.fontFamily)} ${getFontSizeClass(design.fontSize)}`} style={{ color: '#1f2937' }}>
      <header className="border-b-4 pb-6 mb-6" style={{ borderColor: c }}>
        <div className="flex items-center gap-5">
          <Avatar cv={cv} color={c} />
          <div>
            <h1 className="text-3xl font-bold" style={{ color: c }}>{cv.personalInfo.firstName} {cv.personalInfo.lastName}</h1>
            <p className="text-lg text-slate-600">{cv.personalInfo.title}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-[10pt] text-slate-600 mt-4">
          {cv.personalInfo.email && <span>{cv.personalInfo.email}</span>}
          {cv.personalInfo.phone && <span>{cv.personalInfo.phone}</span>}
          {cv.personalInfo.location && <span>{cv.personalInfo.location}</span>}
          {cv.personalInfo.linkedin && <span>{cv.personalInfo.linkedin}</span>}
        </div>
      </header>
      <div className="space-y-5">
        <SectionList cv={cv} design={design} variant="corporate" />
      </div>
    </div>
  )
}

// 7. Compact
export function CompactTemplate({ cv, design }: TemplateProps) {
  const c = design.primaryColor
  return (
    <div className={`cv-page ${getFontClass(design.fontFamily)} ${getFontSizeClass(design.fontSize)} leading-tight`} style={{ color: '#1f2937', padding: '12mm' }}>
      <header className="border-b-2 pb-3 mb-4" style={{ borderColor: c }}>
        <h1 className="text-2xl font-bold" style={{ color: c }}>{cv.personalInfo.firstName} {cv.personalInfo.lastName}</h1>
        <div className="flex justify-between text-[9pt] text-slate-600">
          <span>{cv.personalInfo.title}</span>
          <span>{cv.personalInfo.email} • {cv.personalInfo.phone} • {cv.personalInfo.location}</span>
        </div>
      </header>
      <div className="space-y-5">
        <SectionList cv={cv} design={design} variant="compact" />
      </div>
    </div>
  )
}

// 8. Sidebar Left
export function SidebarLeftTemplate({ cv, design }: TemplateProps) {
  const c = design.primaryColor
  return (
    <div className={`cv-page ${getFontClass(design.fontFamily)} ${getFontSizeClass(design.fontSize)}`} style={{ color: '#1f2937' }}>
      <div className="flex gap-5">
        <aside className="w-[200px] flex-shrink-0" style={{ backgroundColor: `${c}10`, margin: '-15mm', marginRight: '0', padding: '15mm' }}>
          <div className="text-center mb-6">
            <Avatar cv={cv} color={c} />
            <h1 className="text-lg font-bold mt-3" style={{ color: c }}>{cv.personalInfo.firstName}</h1>
            <h1 className="text-lg font-bold" style={{ color: c }}>{cv.personalInfo.lastName}</h1>
            <p className="text-[10pt] text-slate-600 mt-1">{cv.personalInfo.title}</p>
          </div>
          <div className="space-y-4 text-[9pt]">
            <section>
              <h2 className="font-bold uppercase text-[10pt] mb-2" style={{ color: c }}>Contact</h2>
              <div className="space-y-1.5">
                <ContactLine icon={MapPin} value={cv.personalInfo.location} />
                <ContactLine icon={Phone} value={cv.personalInfo.phone} href={`tel:${cv.personalInfo.phone}`} />
                <ContactLine icon={Mail} value={cv.personalInfo.email} href={`mailto:${cv.personalInfo.email}`} />
              </div>
            </section>
          </div>
        </aside>
        <div className="flex-1 min-w-0 space-y-5">
          <SectionList cv={cv} design={design} variant="sidebarLeft" />
        </div>
      </div>
    </div>
  )
}

// 9. Magazine
export function MagazineTemplate({ cv, design }: TemplateProps) {
  const c = design.primaryColor
  return (
    <div className={`cv-page ${getFontClass(design.fontFamily)} ${getFontSizeClass(design.fontSize)}`} style={{ color: '#1f2937', fontFamily: serifStack }}>
      <header className="text-center mb-8">
        <p className="text-[10pt] uppercase tracking-[0.3em] text-slate-500 mb-2">Curriculum Vitae</p>
        <h1 className="text-5xl font-bold" style={{ color: c }}>{cv.personalInfo.firstName} {cv.personalInfo.lastName}</h1>
        <div className="w-24 h-1 mx-auto my-4" style={{ backgroundColor: c }}></div>
        <p className="text-lg italic text-slate-600">{cv.personalInfo.title}</p>
      </header>
      <div className="space-y-5">
        <SectionList cv={cv} design={design} variant="magazine" />
      </div>
    </div>
  )
}

// 10. Elegant
export function ElegantTemplate({ cv, design }: TemplateProps) {
  const c = design.primaryColor
  return (
    <div className={`cv-page ${getFontClass(design.fontFamily)} ${getFontSizeClass(design.fontSize)}`} style={{ color: '#1f2937', fontFamily: serifStack }}>
      <header className="border-b pb-6 mb-6" style={{ borderColor: c }}>
        <h1 className="text-4xl font-light italic" style={{ color: c }}>{cv.personalInfo.firstName} <span className="font-bold not-italic">{cv.personalInfo.lastName}</span></h1>
        <p className="text-base mt-2 text-slate-600">{cv.personalInfo.title}</p>
      </header>
      <div className="space-y-5">
        <SectionList cv={cv} design={design} variant="elegant" />
      </div>
    </div>
  )
}

// 11. Bold
export function BoldTemplate({ cv, design }: TemplateProps) {
  const c = design.primaryColor
  return (
    <div className={`cv-page ${getFontClass(design.fontFamily)} ${getFontSizeClass(design.fontSize)}`} style={{ color: '#1f2937' }}>
      <header className="-mx-[15mm] -mt-[15mm] px-[15mm] pt-12 pb-10 mb-8" style={{ backgroundColor: c }}>
        <h1 className="text-6xl font-black text-white uppercase tracking-tighter">{cv.personalInfo.firstName}<br />{cv.personalInfo.lastName}</h1>
        <p className="text-xl text-white/90 mt-4 font-medium">{cv.personalInfo.title}</p>
      </header>
      <div className="space-y-5">
        <SectionList cv={cv} design={design} variant="bold" />
      </div>
    </div>
  )
}

// 12. Swiss
export function SwissTemplate({ cv, design }: TemplateProps) {
  const c = design.primaryColor
  return (
    <div className={`cv-page ${getFontClass(design.fontFamily)} ${getFontSizeClass(design.fontSize)}`} style={{ color: '#1f2937' }}>
      <header className="grid grid-cols-2 gap-4 border-b-4 pb-4 mb-6" style={{ borderColor: c }}>
        <div>
          <h1 className="text-3xl font-bold" style={{ color: c }}>{cv.personalInfo.firstName} {cv.personalInfo.lastName}</h1>
          <p className="text-base text-slate-600 mt-1">{cv.personalInfo.title}</p>
        </div>
        <div className="text-right text-[9pt] text-slate-600 self-end">
          <p>{cv.personalInfo.email}</p>
          <p>{cv.personalInfo.phone}</p>
          <p>{cv.personalInfo.location}</p>
        </div>
      </header>
      <div className="space-y-5">
        <SectionList cv={cv} design={design} variant="swiss" />
      </div>
    </div>
  )
}

// 13. Infographic
export function InfographicTemplate({ cv, design }: TemplateProps) {
  const c = design.primaryColor
  return (
    <div className={`cv-page ${getFontClass(design.fontFamily)} ${getFontSizeClass(design.fontSize)}`} style={{ color: '#1f2937' }}>
      <header className="flex items-center gap-5 mb-6">
        <Avatar cv={cv} color={c} />
        <div>
          <h1 className="text-3xl font-bold" style={{ color: c }}>{cv.personalInfo.firstName} {cv.personalInfo.lastName}</h1>
          <p className="text-lg text-slate-600">{cv.personalInfo.title}</p>
          <p className="text-[10pt] text-slate-500 mt-1">{cv.personalInfo.email} • {cv.personalInfo.phone} • {cv.personalInfo.location}</p>
        </div>
      </header>
      <div className="space-y-5">
        <SectionList cv={cv} design={design} variant="infographic" />
      </div>
    </div>
  )
}

// 14. Simple
export function SimpleTemplate({ cv, design }: TemplateProps) {
  const c = design.primaryColor
  return (
    <div className={`cv-page ${getFontClass(design.fontFamily)} ${getFontSizeClass(design.fontSize)}`} style={{ color: '#1f2937' }}>
      <header className="mb-8">
        <h1 className="text-4xl font-bold" style={{ color: c }}>{cv.personalInfo.firstName} {cv.personalInfo.lastName}</h1>
        <p className="text-lg text-slate-600 mt-2">{cv.personalInfo.title}</p>
        <div className="text-[10pt] text-slate-500 mt-3 space-y-0.5">
          <p>{cv.personalInfo.location}</p>
          <p>{cv.personalInfo.email} • {cv.personalInfo.phone}</p>
          <p>{cv.personalInfo.linkedin}</p>
        </div>
      </header>
      <div className="space-y-5">
        <SectionList cv={cv} design={design} variant="simple" />
      </div>
    </div>
  )
}

// 15. Professional
export function ProfessionalTemplate({ cv, design }: TemplateProps) {
  const c = design.primaryColor
  return (
    <div className={`cv-page ${getFontClass(design.fontFamily)} ${getFontSizeClass(design.fontSize)}`} style={{ color: '#1f2937' }}>
      <header className="flex items-start gap-6 border-b-2 pb-6 mb-6" style={{ borderColor: c }}>
        {cv.personalInfo.photo ? <img src={cv.personalInfo.photo} alt="" className="w-28 h-36 object-cover rounded" /> : <Avatar cv={cv} color={c} />}
        <div>
          <h1 className="text-3xl font-bold" style={{ color: c }}>{cv.personalInfo.firstName} {cv.personalInfo.lastName}</h1>
          <p className="text-lg text-slate-700 mt-1">{cv.personalInfo.title}</p>
          <div className="text-[10pt] text-slate-600 mt-3 grid grid-cols-2 gap-x-6 gap-y-1">
            <span>{cv.personalInfo.email}</span>
            <span>{cv.personalInfo.phone}</span>
            <span>{cv.personalInfo.location}</span>
            <span>{cv.personalInfo.linkedin}</span>
          </div>
        </div>
      </header>
      <div className="space-y-5">
        <SectionList cv={cv} design={design} variant="corporate" />
      </div>
    </div>
  )
}

// 16. Dynamic
export function DynamicTemplate({ cv, design }: TemplateProps) {
  const c = design.primaryColor
  return (
    <div className={`cv-page ${getFontClass(design.fontFamily)} ${getFontSizeClass(design.fontSize)}`} style={{ color: '#1f2937' }}>
      <header className="relative mb-8">
        <div className="absolute top-0 right-0 w-32 h-32 -mr-[15mm] -mt-[15mm]" style={{ backgroundColor: `${c}20` }}></div>
        <h1 className="text-5xl font-black relative z-10" style={{ color: c }}>{cv.personalInfo.firstName}<br/>{cv.personalInfo.lastName}</h1>
        <p className="text-xl text-slate-600 mt-2 relative z-10">{cv.personalInfo.title}</p>
        <div className="flex flex-wrap gap-x-4 text-[10pt] text-slate-500 mt-4 relative z-10">
          {cv.personalInfo.email && <span>{cv.personalInfo.email}</span>}
          {cv.personalInfo.phone && <span>{cv.personalInfo.phone}</span>}
          {cv.personalInfo.location && <span>{cv.personalInfo.location}</span>}
        </div>
      </header>
      <div className="space-y-5">
        <SectionList cv={cv} design={design} variant="dynamic" />
      </div>
    </div>
  )
}

// 17. Cards
export function CardsTemplate({ cv, design }: TemplateProps) {
  const c = design.primaryColor
  return (
    <div className={`cv-page ${getFontClass(design.fontFamily)} ${getFontSizeClass(design.fontSize)}`} style={{ color: '#1f2937' }}>
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: c }}>{cv.personalInfo.firstName} {cv.personalInfo.lastName}</h1>
        <p className="text-lg text-slate-600">{cv.personalInfo.title}</p>
        <p className="text-[10pt] text-slate-500 mt-2">{cv.personalInfo.email} • {cv.personalInfo.phone} • {cv.personalInfo.location}</p>
      </header>
      <div className="space-y-5">
        <SectionList cv={cv} design={design} variant="cards" />
      </div>
    </div>
  )
}

// 18. Centered
export function CenteredTemplate({ cv, design }: TemplateProps) {
  const c = design.primaryColor
  return (
    <div className={`cv-page ${getFontClass(design.fontFamily)} ${getFontSizeClass(design.fontSize)}`} style={{ color: '#1f2937' }}>
      <header className="text-center mb-8">
        <Avatar cv={cv} color={c} />
        <h1 className="text-4xl font-bold mt-4" style={{ color: c }}>{cv.personalInfo.firstName} {cv.personalInfo.lastName}</h1>
        <p className="text-lg text-slate-600 mt-2">{cv.personalInfo.title}</p>
        <div className="flex justify-center gap-x-4 text-[10pt] text-slate-500 mt-3">
          {cv.personalInfo.email && <span>{cv.personalInfo.email}</span>}
          {cv.personalInfo.phone && <span>{cv.personalInfo.phone}</span>}
          {cv.personalInfo.location && <span>{cv.personalInfo.location}</span>}
        </div>
      </header>
      <div className="space-y-5">
        <SectionList cv={cv} design={design} variant="centered" />
      </div>
    </div>
  )
}

// 19. Modern Dark
export function ModernDarkTemplate({ cv, design }: TemplateProps) {
  const c = design.primaryColor
  return (
    <div className={`cv-page ${getFontClass(design.fontFamily)} ${getFontSizeClass(design.fontSize)}`} style={{ color: '#1f2937' }}>
      <header className="flex items-center gap-6 mb-6 pb-6 border-b-4" style={{ borderColor: c }}>
        <Avatar cv={cv} color={c} />
        <div>
          <h1 className="text-4xl font-bold text-slate-900">{cv.personalInfo.firstName} {cv.personalInfo.lastName}</h1>
          <p className="text-lg font-medium mt-1" style={{ color: c }}>{cv.personalInfo.title}</p>
          <div className="flex flex-wrap gap-x-4 text-[10pt] text-slate-500 mt-2">
            {cv.personalInfo.email && <span>{cv.personalInfo.email}</span>}
            {cv.personalInfo.phone && <span>{cv.personalInfo.phone}</span>}
            {cv.personalInfo.location && <span>{cv.personalInfo.location}</span>}
          </div>
        </div>
      </header>
      <div className="space-y-5">
        <SectionList cv={cv} design={design} variant="modernDark" />
      </div>
    </div>
  )
}

// 20. Timeline
export function TimelineTemplate({ cv, design }: TemplateProps) {
  const c = design.primaryColor
  return (
    <div className={`cv-page ${getFontClass(design.fontFamily)} ${getFontSizeClass(design.fontSize)}`} style={{ color: '#1f2937' }}>
      <header className="mb-6">
        <h1 className="text-4xl font-bold" style={{ color: c }}>{cv.personalInfo.firstName} {cv.personalInfo.lastName}</h1>
        <p className="text-lg text-slate-600 mt-1">{cv.personalInfo.title}</p>
        <p className="text-[10pt] text-slate-500 mt-2">{cv.personalInfo.email} • {cv.personalInfo.phone} • {cv.personalInfo.location}</p>
      </header>
      <div className="space-y-5">
        <SectionList cv={cv} design={design} variant="timeline" />
      </div>
    </div>
  )
}
