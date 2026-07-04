import type { CVData, DesignSettings } from '../types/cv'
import { getFontClass, getFontSizeClass, SectionList } from './shared'

interface ModernTemplateProps {
  cv: CVData
  design: DesignSettings
}

export function ModernTemplate({ cv, design }: ModernTemplateProps) {
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
      <header className="flex items-start gap-5 mb-5 pb-4 border-b-2" style={{ borderColor: primaryColor }}>
        {personalInfo.photo ? (
          <img
            src={personalInfo.photo}
            alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
            className="w-28 h-28 rounded-full object-cover border-4"
            style={{ borderColor: primaryColor }}
          />
        ) : (
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center text-white text-3xl font-bold border-4"
            style={{ backgroundColor: primaryColor, borderColor: primaryColor }}
          >
            {personalInfo.firstName?.[0] || '?'}
            {personalInfo.lastName?.[0] || '?'}
          </div>
        )}
        <div className="flex-1 pt-1">
          <h1 className="text-3xl font-bold uppercase tracking-tight" style={{ color: primaryColor }}>
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className="text-lg font-medium text-slate-600 mt-1">{personalInfo.title}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[10pt] text-slate-600">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.location && <span>• {personalInfo.location}</span>}
            {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
            {personalInfo.website && <span>• {personalInfo.website}</span>}
          </div>
        </div>
      </header>

      <div className="space-y-5">
        <SectionList cv={cv} design={design} variant="modern" />
      </div>
    </div>
  )
}
