import type { CVData, DesignSettings } from '../types/cv'
import { getFontClass, getFontSizeClass, SectionList } from './shared'

interface ClassicTemplateProps {
  cv: CVData
  design: DesignSettings
}

export function ClassicTemplate({ cv, design }: ClassicTemplateProps) {
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
      <header className="text-center border-b-2 pb-5 mb-6" style={{ borderColor: primaryColor }}>
        <h1 className="text-4xl font-bold uppercase tracking-wide" style={{ color: primaryColor }}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-lg font-medium text-slate-600 mt-2">{personalInfo.title}</p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 text-[10pt] text-slate-600">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.email && <span>• {personalInfo.email}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </header>

      <div className="space-y-5">
        <SectionList cv={cv} design={design} variant="classic" />
      </div>
    </div>
  )
}
