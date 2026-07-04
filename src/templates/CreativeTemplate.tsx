import type { CVData, DesignSettings } from '../types/cv'
import { getFontClass, getFontSizeClass, SectionList } from './shared'

interface CreativeTemplateProps {
  cv: CVData
  design: DesignSettings
}

export function CreativeTemplate({ cv, design }: CreativeTemplateProps) {
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
      <header className="-mx-[15mm] -mt-[15mm] px-[15mm] pt-8 pb-6 mb-6 text-white" style={{ backgroundColor: primaryColor }}>
        <div className="flex items-center gap-6">
          {personalInfo.photo ? (
            <img
              src={personalInfo.photo}
              alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
              className="w-24 h-24 rounded-lg object-cover border-2 border-white/30"
            />
          ) : (
            <div className="w-24 h-24 rounded-lg bg-white/20 flex items-center justify-center text-3xl font-bold">
              {personalInfo.firstName?.[0] || '?'}
              {personalInfo.lastName?.[0] || '?'}
            </div>
          )}
          <div>
            <h1 className="text-4xl font-bold">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p className="text-lg text-white/90 mt-1">{personalInfo.title}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-white/80">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>• {personalInfo.phone}</span>}
              {personalInfo.location && <span>• {personalInfo.location}</span>}
              {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
            </div>
          </div>
        </div>
      </header>

      <div className="space-y-5">
        <SectionList cv={cv} design={design} variant="creative" />
      </div>
    </div>
  )
}
