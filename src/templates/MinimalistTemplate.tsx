import type { CVData, DesignSettings } from '../types/cv'
import { getFontClass, getFontSizeClass, SectionList } from './shared'

interface MinimalistTemplateProps {
  cv: CVData
  design: DesignSettings
}

export function MinimalistTemplate({ cv, design }: MinimalistTemplateProps) {
  const { personalInfo } = cv
  const primaryColor = design.primaryColor
  const fontStack =
    design.fontFamily === 'playfair'
      ? "Georgia, Cambria, 'Times New Roman', Times, serif"
      : design.fontFamily === 'georgia'
      ? 'Georgia, serif'
      : "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"

  return (
    <div
      className={`cv-page ${getFontClass(design.fontFamily)} ${getFontSizeClass(design.fontSize)}`}
      style={{ color: '#1f2937', fontFamily: fontStack }}
    >
      <header className="mb-8">
        <h1 className="text-4xl font-light tracking-tight" style={{ color: primaryColor }}>
          {personalInfo.firstName} <span className="font-semibold">{personalInfo.lastName}</span>
        </h1>
        <p className="text-base text-slate-500 mt-2 uppercase tracking-widest">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-[10pt] text-slate-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      <div className="space-y-5">
        <SectionList cv={cv} design={design} variant="minimalist" />
      </div>
    </div>
  )
}
